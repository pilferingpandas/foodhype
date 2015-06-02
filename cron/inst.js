var keys = require('../config/panda-config.js');
var express = require('express');
var app = require('../server.js')
var instagram = require('instagram-node-lib');
var fs = require('fs');

instagram.set('client_id', keys.instagram.client_id);
instagram.set('client_secret', keys.instagram.client_secret);

 // get data with tags for sushirrito
 instagram.tags.recent({ name: 'sushirrito', 
    complete: function(data){

    //console.log(data);
    }
  });

// Fill me out!
module.exports = {
  getApiData : function(thisYelpData, callback) {
    // Contact the API with thisYelpData, then...

    callback(dataReturnedFromApi);
  }
}

// format: 
// dataReturnedFromApi.numPics
//   ^ number of pictures
// dataReturnedFromApi.bestPicture
//   ^ url of whatever the best picture is
// dataReturnedFromApi.url
//   ^ url of instagram results (is this possible?)
