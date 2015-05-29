// The order of this file matters!
  // 1. All React components are created
  // 2. The AppView is rendered
  // 3. The Google Map is rendered 

//////////////////////////
/// React Views        ///
//////////////////////////

// Creates a View for the whole app, with only two things in it: a single WindowView, and the map canvas
var AppView = React.createClass({
  getInitialState: function() {
    // Fakey data
    return {
      selectedMarkerData: {
        display: true,
        name: "The Melt",
        picture:'http://aht.seriouseats.com/images/2012/04/20120427-bk-japan-ringo-burger-product-shot.jpg',
        location: "115 New Montgomery St,\nSan Francisco, CA 94105",
        rating: 56,
        yelpUrl: 'http://www.yelp.com/biz/the-melt-new-montgomery-san-francisco',
        twitterUrl: 'https://twitter.com/search?q=%22the%20melt%22%20%3A%29&geocode=37.7880000,-122.3998380,15km',
        tripadvisorUrl: 'http://www.tripadvisor.com/Restaurant_Review-g60713-d4834219-Reviews-The_Melt-San_Francisco_California.html'
      }
    }
  },

  render: function() {
    // Every React component needs a single DOM element to wrap all its html. In this case it's <div id="wrapper">
      // The WindowView component will be updated with data associated with a clicked marker
    return (
      <div id="wrapper">
        <h1 id="title">Food Hyped</h1>
        <input id="pac-input" className="controls" type="text" placeholder="Start typing here"></input>

        <WindowView data={this.state.selectedMarkerData} />
        
        <div id="map-canvas"></div>
      </div>
    )
  }
});

// Creates a View for the browser window
var WindowView = React.createClass({
  render: function() {
    if(this.props.data.display === false) {return(<div></div>);}
    return (
      <div id="window"> 
        <div id="windowTitle">{this.props.data.name}</div>
        <img id="windowPicture" src={this.props.data.picture}></img>
        <div>Its at {this.props.data.location} </div>
        <div id="windowScore">{this.props.data.rating}</div>
        <a href={this.props.data.yelpUrl}><button className="linkButton" id="yelp"></button></a>
        <a href={this.props.data.yelpUrl}><button className="linkButton" id="twitter"></button></a>
        <a href={this.props.data.yelpUrl}><button className="linkButton" id="tripadvisor"></button></a>
      </div>
    )
  }
});


// Renders the whole application
React.render(
  <AppView />,
  document.getElementById('AppView')
);


//////////////////////////
/// Map Initialization ///
//////////////////////////

// Creates new map
var map;

// Add markers for the search box
var markers = [];

// Sets starting point for rendering to San Francisco, CA
var myLatLng = new google.maps.LatLng(37.7749300, -122.4194200);

// Uses center for starting point and zoom when page loads
var mapOptions = {
  center: myLatLng,
  zoom: 14
};

// Renders new map
map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

// Set the default bounds for the autocomplete search results
  // This will bias the search results to the entire globe using the coordinates listed below
var defaultBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(-90, -180),
  new google.maps.LatLng(90, 180));

var options = {
  bounds: defaultBounds
};

// Create the search box and link it to the UI element
// Get the HTML input element for the autocomplete search box
var input = document.getElementById('pac-input');

// Create the autocomplete object
  // allow the user to search
  // for and select a place. The sample then displays an info window containing
  // the place ID and other information about the place that the user has
  // selected
var autocomplete = new google.maps.places.Autocomplete(input, options);

map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

var infowindow = new google.maps.InfoWindow();