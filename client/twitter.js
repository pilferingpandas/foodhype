// Search for the tweets
client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
  console.log(tweets);
});

var Twitter = require('twitter');

var client = new Twitter(require('../config/panda-config.js').twitter);

client.get(path, params, callback);
client.post(path, params, callback);
client.stream([path, params, callback]);



