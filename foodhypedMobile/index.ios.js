/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  MapView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var foodhypedMobile = React.createClass({
  getInitialState: function() {
    return {
      loading: true,
      name: '',
      address: '',
      pins: [],
      region: {
        latitude: 37.7833,
        longitude: -122.4167
      }
    }
  },
  render: function() {
    return (
      <View>
        <MapView style={styles.map} 
                 showsUserLocation={true}
                 annotations={this.state.pins} 
                 region={this.state.region} 
                 maxDelta={.035} />
        <RestaurantScroll clickHandler={this.clickHandler} 
                          data={this.state.pins} />
      </View>
    );      
  },
  clickHandler: function(data) {
    this.setState({
      region: {      
        latitude: data.latitude,
        longitude: data.longitude
      }
    });
  },
  moveToNewSpot: function(lat, long) {

  },
  componentDidMount: function() {
    console.log('mounted!');
    var that = this;
    fetch('https://afternoon-cliffs-3448.herokuapp.com/yelpresults',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userLat:'37.7794820',
        userLong:'-122.4068210',
      })
    })
    .then(function(response) {
      console.log('about to set state');
      response = (response._bodyInit)
        .replace("'", "")
        .replace("\"", "'")
        .replace("'", '"');
      response = JSON.parse(response);
      console.log(response.length);
      var resPins = [];
      for(var i = 0; i < response.length; i++) {
        resPins.push({
          title: response[i].name,
          latitude: response[i].latitude,
          longitude: response[i].longitude,
          address: response[i].address[0]
        });
      }
      that.setState({pins: resPins});
      })
    .catch((error) => {
      console.warn(error);
    });
    var jsonData = {
      'userLat': '37.774929', 
      'userLong': '-122.419416'
    };
  },
});

var RestaurantScroll = React.createClass({
  render: function() {
    var that = this;
    var makeViewEntry = function(data) {
      var clickHandler = function() {
        that.props.clickHandler(data);
      }
      return (
        <View style={styles.restaurant}>
          <Text onPress={clickHandler}>Name: {data.title}</Text>
          <Text onPress={clickHandler}>Address: {data.address}</Text>
          <Text onPress={clickHandler}>Latitude: {data.latitude}</Text>
          <Text onPress={clickHandler}>Longitude: {data.longitude}</Text>
        </View>
      )
    };
    return (
      <ScrollView
        scrollEventThrottle={200}
        style={styles.scrollView}>
          {this.props.data.map(makeViewEntry)}
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  map: {
    height: 400,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    top:8,
    height: 140,
  },
  restaurant: {
    margin:10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding:5,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 5,
  }
});

AppRegistry.registerComponent('foodhypedMobile', 
  () => foodhypedMobile);
