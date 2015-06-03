var Twitter = require('twitter');
var client = new Twitter(require('../config/panda-config.js').twitter);

// Search for the tweets
var params = {q: 'restaurant%20%3A)&geocode=37.7880000,-122.3998380,15km&lang=en&result_type=recent&src=typd'};

client.get('https://api.twitter.com/1.1/search/tweets.json', params, function(error, tweets, response) {
 if (error) {
   console.log(error);
 } else {
   console.log(tweets);
 }
});



// Fill this out!
module.exports = {
  getApiData : function(thisRestaurant, callback ){
    //console.log('returning one restaurant-object from yelp at a time', thisRestaurant)
     // call twitter with thisRestaurant, for example thisRestaurant.name ,thisRestaurant.latitude
     // data returned from twitter for each restaurant should be passed back as an object: dataReturnedFromApi into callback 
    

    // callback(dataReturnedFromApi);
 }
}


// format: 
// dataReturnedFromApi.numTweets
//   ^ number of tweets
// dataReturnedFromApi.url
//   ^ url of search query (host is not api.twitter.com)
