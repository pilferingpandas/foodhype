var keys = require('../config/panda-config.js');
var Twitter = require('twitter');

module.exports = {
  getApiData : function(thisRestaurant, callback){
    var client = new Twitter(keys.twitter);

    // Search for the tweets
    // Call twitter with thisRestaurant, for example thisRestaurant.name ,thisRestaurant.latitude
    var params = {
      q: thisRestaurant.name, 
      geocode: thisRestaurant.latitude+','+thisRestaurant.longitude+','+'1mi',
      result_type: 'recent',
      attitude: '%3A)'
    };
    
    var path = 'https://twitter.com/search?q='+thisRestaurant.name+'+%3A)';
    var url = path.replace(/ /g,'+')
                  .replace(/'/g, '%27')
                  .replace(/&/g, 'and');
    url += '&geocode:'+thisRestaurant.latitude+','+thisRestaurant.longitude+',1mi';

    client.get('https://api.twitter.com/1.1/search/tweets.json', params, function(error, tweets, response) {
      if (error) {
        console.log(error);
      } else {
           var numTweets = tweets.statuses.length;
 
           var leastRecentTweet = tweets.statuses[0];
           
           var created_at = leastRecentTweet ? leastRecentTweet.created_at : null;
           // Data returned from twitter for each restaurant should be passed back as an object: dataReturnedFromApi into callback 
           var dataFromTwitter = {
               numTweets: numTweets,
               leastRecentTweet: created_at,
               twitterUrl: url 
           };
 
           callback(dataFromTwitter);
      }
    });
  }
}
 