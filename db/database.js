// Includes mongoose in project
var mongoose = require('mongoose');

// Opens a connection to the test database on our locally running instance of MongoDB
mongoose.connect('mongodb://pilferingpandas:pandaexpress17@ds037272.mongolab.com:37272/pilferingpandas');

// There is a pending connection to the test database running on localhost
// Notify if we connect successfully or if a connection error occurs
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    // TODO: fill this in
  });
});

// Declares callback we will use in db.once call above
// Create reference to Schema and define restaurant
// Compile Schema into model
// Model is that class in which we construct documents
// Create example restaurant document for testing purposes
// Save document to MongoDB using 'save' method
// Display all restaurants using 'find' method
// Perform query to filter by name
var restaurantCallback = function() { 
  var restaurantSchema = mongoose.Schema({
    name: String,
    score: {type: Number, min: 1, max: 17},
    // latitude: {type: Number, // TODO: make this schema type work with decimals for geolocation coordinates },
    // longitude: {type: Number, // TODO: make this schema type work with decimals for geolocation coordinates },
    address: Schema.Types.Mixed
    // TODO: figure out how to add an image to the Schema
  });
 
  var Restaurant = mongoose.model('Restaurant', restaurantSchema);

  var theMelt = new Restaurat({ name: 'The Melt'});
  console.log(theMelt.name); // 'The Melt'

  theMelt.save(function(err, theMelt) {
    if (err) {
      return console.error(err);
    }
  });

  // Restaurant.find(function(err, restaurants) {
  //   if (err) {
  //     return console.error(err);
  //     console.log(restaurants);
  //   }
  // });
  
  // Restaurant.find({name: /^The Me/}, callback);
};


var cityCallback = function() {
  var citySchema = mongoose.Schema({
    name: String,
    // latitude: {type: Number, // TODO: make this schema type work with decimals for geolocation coordinates },
    // longitude: {type: Number, // TODO: make this schema type work with decimals for geolocation coordinates }
    state: String
  });

  var City = mongoose.model('City', citySchema);

  var sanFrancisco = new City({ 
    name: 'San Francisco',
    latitude: 37.7749300,
    longitude: -122.4194200,
    state: 'California'
  });
  console.log(sanFrancisco.name + ', ' + sanFrancisco.state + ': ' + sanFrancisco.latitude + ', ' + sanFrancisco.longitude)

  sanFrancisco.save(function(err, sanFrancisco) {
    if (err) {
      return console.error(err);
    }
  });

  // City.find(function(err, cities) {
  //   if (err) {
  //     return console.error(err);
  //     console.log(cities)
  //   }
  // });

  // City.find({name: /^San/}, callback);
};