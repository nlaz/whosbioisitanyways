require 'sinatra'
require 'omniauth-twitter'
require 'httparty'
require 'json'

require 'dotenv'
Dotenv.load

# Configuration

configure do
  enable :sessions

  use OmniAuth::Builder do
    provider :twitter, ENV['TWITTER_CLIENT_KEY'], ENV['TWITTER_CLIENT_SECRET']
  end
end

# Helpers

helpers do
  def current_user
    !session[:uid].nil?
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

get '/auth/twitter/callback' do
  session[:uid] = env['omniauth.auth']['uid']
  redirect to('/')
end

get '/auth/failure' do
  # TODO: Create Failure Page
end

get '/auth/login' do
  erb :login
end
