require 'sinatra'
require 'omniauth-twitter'
require 'httparty'
require 'json'
require 'twitter'
require 'pry'

require 'dotenv'
Dotenv.load

class WhoseBioApp < Sinatra::Base

  # Configuration

  configure do
    enable :sessions

    use OmniAuth::Builder do
      provider :twitter, ENV['TWITTER_CONSUMER_KEY'], ENV['TWITTER_CONSUMER_SECRET']
    end
  end

  # Helpers

  helpers do
    def current_user
      !session[:uid].nil?
    end

    def twitter_client
      @client ||= Twitter::REST::Client.new do |config|
        config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
        config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
        config.access_token        = session[:token]
        config.access_token_secret = session[:secret]
      end
    end

    def friends_list
      @friends_list ||= fetch_all_friends
    end

    def fetch_all_friends
      slice_size = 100
      friends = []
      twitter_client.friend_ids.each_slice(slice_size).with_index do |slice, i|
        twitter_client.users(slice).each do |friend|
          if friend.description
            friends << friend
          end
        end
      end
      friends
    end
  end

  before do
    pass if request.path_info =~ /^\/auth\//
    redirect to('/auth/login') unless current_user
  end

  # Routes

  get '/' do
    erb :index
  end

  get '/friend.json' do
    $friend.attrs.to_json
  end

  get '/new_user.json' do
    $friend = friends_list.sample
    $friend.attrs.to_json
  end

  get '/auth/twitter/callback' do
    session[:uid]    = env['omniauth.auth']['uid']
    session[:token]  = env['omniauth.auth']['extra']['access_token'].token
    session[:secret] = env['omniauth.auth']['extra']['access_token'].secret

    redirect to('/')
  end

  get '/auth/failure' do
    # TODO: Create Failure Page
  end

  get '/auth/login' do
    erb :login
  end
end