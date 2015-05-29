// Search for the tweets
client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
  console.log(tweets);
});

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.6X5h60ceRIg24nAbUkyRtEck3,
  consumer_secret: process.env.X0rz6kMTsv8y5f2eEb3bOT3UtamOJsveu2pi7GhftqeVzdpoH7,
  access_token_key: process.env.3301316320-GbGjfR2IJeoE7TplUgIiQIMzC0Q3YIJ4VSAMVuQ,
  access_token_secret: process.env.5VdZkiYl5Wd7F1hXqfjYWNWCHwtaEAyYv7AhVW55ILRms
});

client.get(path, params, callback);
client.post(path, params, callback);
client.stream([path, params, callback]);



