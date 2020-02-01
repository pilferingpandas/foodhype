//put yelp data here
var keys = require('../config/panda-config.js');
var yelp = require("yelp").createClient(keys.yelp);
const yelpFusion = require('yelp-fusion');
const client = yelpFusion.client(keys.apiKey);

// Fill me out!
module.exports = {
  getAllRestaurantData : function(callback) {
    console.log('heyyyyy')
    client.search({
      term: 'food',
      location: 'San Francisco',
      limit: 20
    }).then(response => {
      console.log(response.jsonBody.businesses[0].name);
      callback(response.jsonBody.businesses);
    }).catch(e => {
      console.log(e);
    });
  }

//   var yelp = require("yelp").createClient(keys.yelp);

//   var returnNum = 20;
//   var allBizs;

//   // search san francisco for all food restaurants
//   yelp.search({term: "food", location: "San Francisco", limit: returnNum}, function(error, data) {
//     if (!error) {

//       allBizs = [];

//       var biz = data.businesses;


//       for (var i = 0; i < biz.length; i++) {
//         // once we have a list of restaurants we want to make yelp api requests for each restaurant individually to get more info
//         yelp.business( biz[i].id, function(error, business) {
//           if (business.location){
//           allBizs.push({
//             name: business.name,
//             id: business.id,
//             address: business.location.address,
//             reviewCount: business.review_count,
//             rating: business.rating,
//             url: business.url,
//             longitude : business.location.coordinate.longitude,
//             latitude : business.location.coordinate.latitude
//           });
//         }
//           if (allBizs.length === biz.length) {
//             callback(allBizs);
//           }
//         });
//       }
//     } else {
//       console.log('error!');
//     }
//   });
// }
}