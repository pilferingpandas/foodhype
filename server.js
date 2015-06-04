var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var fs = require('fs');
var keys = PROCESS.ENV.MONGOLAB || require('./config/panda-config.js');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/client'));
app.use(favicon(__dirname + '/client/favicon/favicon.ico'));
app.use(bodyParser.json());


var yelp = require("yelp").createClient(keys.yelp);

var returnNum = 20;
var allBizs;

app.post('/yelpresults', function(req, res) {
  var locationString = req.body.userLat+','+req.body.userLong;

  // search san francisco for all food restaurants
  yelp.search({term: "food", ll: locationString, limit: returnNum}, function(error, data) {
    if (!error) {

      allBizs = [];

      var biz = data.businesses;


      for (var i = 0; i < biz.length; i++) {
        // once we have a list of restaurants we want to make yelp api requests for each restaurant individually to get more info
        yelp.business( biz[i].id, function(error, business) {
          if (business.location) {
          allBizs.push({
            name: business.name,
            id: business.id,
            address: business.location.address,
            reviewCount: business.review_count,
            rating: business.rating,
            image_url: business.image_url,
            longitude : business.location.coordinate.longitude,
            latitude : business.location.coordinate.latitude
          });
        }
          if (allBizs.length === biz.length) {
            res.send(allBizs);
          }
        });
      }

    } else {
      console.log('error!');
    }
  });

});

var port = 3000;
app.listen(port);

console.log('Express server started on port %s', port);