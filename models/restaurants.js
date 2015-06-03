// var db = require('../db/database');
// var mongoose = require('mongoose');

// // Note: for now we are including the scores that the cronjob will fetch in the database
// var restaurantSchema = mongoose.Schema({
//   name: String,
//   yelpUrl: String,
//   instagramPictureUrl: String,
//   score: {type: Number, min: 1, max: 100},
//   address: String,
//   latitude: Number, // TODO: determine if we need to calculate decimals and to what number do we round after the deimal point
//   longitude: Number // TODO: determine if we need to calculate decimals and to what number do we round after the deimal point
//   // google places api query string?
//   // twitter search string?
// });

// var Restaurant = mongoose.model('Restuarant', restaurantSchema);

// module.exports = Restuarant;