var keys = require('../config/panda-config.js');
var instagram = require('instagram-node-lib');
var yelp = require('./yelp.js');
instagram.set('client_id', keys.instagram.client_id);
instagram.set('client_secret', keys.instagram.client_secret);

module.exports = {
  getApiData : function(restaurantName, latitude, callback) {

    var latitudeFromYelp = Math.floor(latitude);
    // processing of the name in preparation for calling instagram
    resName = restaurantName.replace(/'/g, "");
    resName = resName.replace(/&/g, "and")
    // join words into one string
    resName = resName.replace(/ /g, "").toLowerCase();
    // call instagram
    instagram.tags.recent({ name: resName, 
      complete: function(data){
        var count = 0; 
        var url = null;
        var urlInstagramProfile = null;
        // iterate through the data array returned from instagram and check if coordinates are the same as yelp cors
        for ( var i=0 ; i<data.length; i++){
              if (data[i].location){
                    if (Math.floor(data[i].location.latitude) === latitudeFromYelp){
                          if (count === 0){

                            // return instagram profile page
                            urlInstagramProfile = data[i].link;
                            // url = data[i].images.standard_resolution.url
                            // ur for thumbnail
                            url = data[i].images.thumbnail.url
                          }
                          count++;
                        }
              }
        }
        var dataFromInstagram = {
          numPics : count,
          instagramPictureUrl : url,
          urlInstagramProfile: urlInstagramProfile
        }
        callback(dataFromInstagram);
    }
    });
  }
}
