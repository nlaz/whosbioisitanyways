require 'sinatra'
require 'omniauth-twitter'
require 'httparty'
require 'json'
require 'twitter'
require 'pry'
require 'tilt/erubis'

require 'dotenv'
Dotenv.load

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

  def client
    client ||= Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      config.access_token        = session[:token]
      config.access_token_secret = session[:secret]
    end
  end
end

before do
  pass if request.path_info =~ /^\/auth\//
  redirect to('/auth/login') unless current_user
end

# Routes

get '/' do
  screen_names = client.friends.collect {|f| p client.user(f).screen_name }

  erb :index
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
