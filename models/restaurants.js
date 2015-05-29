var db = require('../db/database');
var mongoose = require('mongoose');

// Note: for now we are including the scores that the cronjob will fetch in the database
var restaurantSchema = mongoose.Schema({
  name: String,
  yelpUrl: String,
  tripadvisorUrl: String,
  googleplacesUrl: String,
  instagramPictureUrl: String,
  yelpScore: Number,
  twitterScore: Number,
  tripadvisorScore: Number,
  instagramScore: Number,
  googleplacesScore: Number,
  score: {type: Number, min: 1, max: 100},
  address: Schema.Types.Mixed, // TODO: confirm this is the right syntax for combining letters and numbers
  latitude: Number, // TODO: determine if we need to calculate decimals and to what number do we round after the deimal point
  longitude: Number // TODO: determine if we need to calculate decimals and to what number do we round after the deimal point
});

var Restaurant = mongoose.model('Restuarant', restaurantSchema);

module.exports = Restuarant;