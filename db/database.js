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

module.exports = db;

// var restaurantSchema = mongoose.Schema({
//   name: String,
//   url: String,
//   score: {type: Number, min: 1, max: 17},
//   address: Schema.Types.Mixed,
//   latitude: Number, // TODO: determine if we need to calculate decimals and to what number do we round after the deimal point
//   longitude: Number, // TODO: determine if we need to calculate decimals and to what number do we round after the deimal point
//   numberReviews: Number
// });

// var Restaurant = mongoose.model('Restuarant', restaurantSchema);

// var citySchema = mongoose.Schema({
//   name: String,
//   state: String,
//   latitude: Number, // TODO: determine if we need to calculate decimals and to what number do we round after the deimal point
//   longitude: Number // TODO: determine if we need to calculate decimals and to what number do we round after the deimal point
// })

// var City = mongoose.model('City', citySchema);


// module.exports = Restuarant;
// module.exports = City;


