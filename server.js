var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var fs = require('fs');
var keys = require('./config/panda-config.js');
var bodyParser = require('body-parser');

var apiTalker = require('./apis/apiTalker.js');

/// twilio
var twilioClient = require('twilio')(keys.twilio.accountSid, keys.twilio.authToken);

app.use(express.static(__dirname + '/client'));
app.use(favicon(__dirname + '/client/favicon/favicon.ico'));
app.use(bodyParser.json());


var yelp = require("yelp").createClient(keys.yelp);

var returnNum = 20;
var allBizs;

app.post('/twilioSend', function(req, res) {
  console.log(req.body);
  var phoneNumber = req.body.theNum;
  var message = 'Tubular, dude! Check out ' + req.body.restName + ' at ' + req.body.restAddress + ' with a patented FoodHyped score of ' + req.body.restScore;

  console.log(phoneNumber);
  console.log(keys.twilio.accountSid, keys.twilio.authToken)
  twilioClient.messages.create({
      body: message,
      to: phoneNumber,
      from: "+12568260192"
  }, function(error, message) {
      if (error) {
        console.log(error.message);
        res.error(error.message);
      } else {
        res.send('Success!  SMS sent.');
      }
  });
});

app.post('/yelpresults', function(req, res) {
  var hasReturnedData = false;

  var locationString = req.body.userLat+','+req.body.userLong;

  console.log(locationString);
  
  yelp.search({term: "food", ll: locationString, limit: returnNum}, function(error, data) {
    if (!error) {

      allBizs = [];

      var biz = data.businesses;

      for (var i = 0; i < biz.length; i++) {
        // once we have a list of restaurants we want to make yelp api requests for each restaurant individually to get more info
        yelp.business( biz[i].id, function(error, business) {
          if (business.location) {
            apiTalker.contactOtherApis({
              name: business.name,
              id: business.id,
              address: business.location.address,
              reviewCount: business.review_count,
              rating: business.rating,
              yelpUrl: business.url,
              image_url: business.image_url,
              longitude : business.location.coordinate.longitude,
              latitude : business.location.coordinate.latitude
            }, function(finalData) {
              allBizs.push(finalData);
              console.log(allBizs.length + " out of " + biz.length);
              if (allBizs.length > 12 && !hasReturnedData) {
                res.send(allBizs);
                hasReturnedData = true;
              }
            });
          }
        });
      }

    } else {
      console.log('error!');
    }
  });

});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Express server started on port %s', port);
