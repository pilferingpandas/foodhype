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
  TextInput,
  View,
} = React;

var foodhypedMobile = React.createClass({
  getInitialState: function() {
    return {
      loading: true,
      name: '',
      address: '',
      pins: []
    }
  },
  render: function() {
    return (
      <View>
        <MapView style={styles.map} 
                 showsUserLocation={true}
                 annotations={this.state.pins}  />
        <RestaurantScroll clickHandler={this.clickHandler} 
                          data={this.state.pins} />
      </View>
    );
  },
  clickHandler: function(data) {
    console.log(data);
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

var makeViewEntry = function(data) {
    // <View onClick={this.handleClick(data)}>
  return (
    <View>
      <Text>Name: {data.title}</Text>
      <Text>Address: {data.address}</Text>
      <Text>Latitude: {data.latitude}</Text>
      <Text>Longitude: {data.longitude}</Text>
    </View>
  )}
var RestaurantScroll = React.createClass({
  render: function() {
    return (
      <ScrollView
        onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}
        contentInset={{top: -50}}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    top:48,
    height: 100,
  }
});

AppRegistry.registerComponent('foodhypedMobile', 
  () => foodhypedMobile);
