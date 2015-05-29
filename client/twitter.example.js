// Search for the tweets
client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
  console.log(tweets);
});

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.INSERT_CONSUMER_KEY,
  consumer_secret: process.env.INSERT_CONSUMER_SECRET,
  access_token_key: process.env.INSERT_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.INSERT_ACCESS_TOKEN_SECRET
});

client.get(path, params, callback);
client.post(path, params, callback);
client.stream([path, params, callback]);



