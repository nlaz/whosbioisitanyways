# Whose Bio Is It Anyway?
Can you guess your friends by their Twitter Bio? Built using Sinatra, HTTParty, and OmniAuth.

## Setup

These are the steps to get the app up and running:

###  Step 1. Clone this repository
Make a local copy of this project and move into the directory. This project requires Ruby and RubyGems.
```
  $ git clone https://github.com/nlaz/whosebioisitanyway.git
  $ cd starbot
```

### Step 2. Connect your twitter app
Copy your Twitter secrets (consumer key and secret) in a file named `.env` in your project directory like so:
```
  TWITTER_CONSUMER_KEY=[INSERT TWITTER CONSUMER KEY]
  TWITTER_CONSUMER_SECRET=[INSERT TWITTER CONSUMER SECRET]
```  


### Step 3. Bundle and run locally
You now need to install the dependencies used in the project. You can do that using the Ruby bundler:
 
```
$ bundle install
```
You should now be able to run your sinatra app locally and test it.  
```
$ rackup
```
