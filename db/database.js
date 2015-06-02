// Includes mongoose in project
var mongoose = require('mongoose');

var keys = require('../config/panda-config.js');
// Opens a connection to the test database on our locally running instance of MongoDB
mongoose.connect('mongodb://' + keys.mongo.username + ':' + keys.mongo.password + '@ds037272.mongolab.com:37272/pilferingpandas');

// Notify if we connect successfully or if a connection error occurs
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongodb connection is open');
});

db.insertRestaurantData = function(data) {
  // It's already formatted for the restaurantSchema
  // db.San_Francisco.insert(data);
}

db.getAllRestaurantsInCity = function(callback) { // no argument because we're only searching sf
  // one of the last things for us to implement  

  // var allRestaurants = all restaurants in the city as an array
  // callback(allRestaurants)
}

module.exports = db;