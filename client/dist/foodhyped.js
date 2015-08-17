// Would be used in animations
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

//////////////////////////
/// React Views        ///
//////////////////////////

// Creates a View for the whole app, with only two things in it: a single WindowView, and the map canvas
var AppView = React.createClass({displayName: "AppView",
  componentDidMount: function() {
    $(document).on('markerClick', this.handleMarkerClick);
  },
  handleMarkerClick: function(e, data) {
    //If the user clicks on a marker, update the state, which gets passed to the window view.
    this.setState({
      selectedMarkerData:data,
    });
    this.render();
  },
  getInitialState: function() {
    // Fakey data
    return {
      selectedMarkerData: {
        display: false,
      }
    }
  },
  render: function() {
    // Every React component needs a single DOM element to wrap all its html. In this case it's <div id="wrapper">
      // The WindowView component will be updated with data associated with a clicked marker
    return (
      React.createElement("div", {id: "wrapper"}, 
        React.createElement("h1", {id: "title"}, "Food Hyped"), 
        React.createElement("input", {id: "pac-input", className: "controls", type: "text", placeholder: "Start typing here"}), 
        React.createElement(WindowView, {data: this.state.selectedMarkerData})
      )
    )
  }
});
// Creates a View for the browser window
var WindowView = React.createClass({displayName: "WindowView",
  handleTwilioClick: function(){


    var theDiv = $('<div id="twilioForm"><form method="post" action="">Enter phone number (must be registered with twilio)<br><input type="text" name="phoneNumber" id="phoneNumber"><input type="submit"></div>').hide().fadeIn(1500);
    $("body").append(theDiv);

    var restName = this.props.data.name;
    var restAddress = this.props.data.address;
    var restScore = this.props.data.score;

    $("#twilioForm form").on("submit", function(e) {
      e.preventDefault();
      var theNumber = $("#phoneNumber").val();

      $.ajax({
        url: "/twilioSend",
        type: 'POST',
        data: JSON.stringify({
          'theNum': theNumber,
          'restName': restName,
           'restAddress': restAddress,
           'restScore': restScore
        }),
        dataType: "text",
        contentType: "application/json",
        success: function(data) {
          $("#twilioForm").fadeOut(1000, function() {
            $(this).remove();
          });
        },
        error: function(err) {
          console.error(err);
        }
      })
    });
  },
  render: function() {
    if(this.props.data.display === false) {
      return(React.createElement("div", null));
    } else {    
      var instagramPictureUrl = this.props.data.instagramPictureUrl ||
        'http://i.imgur.com/8SoMYyh.jpg';
      return (
        React.createElement("div", {id: "window", className: "animated bounceInRight"}, 
          React.createElement("div", {id: "windowTitle"}, this.props.data.name), 
          React.createElement("img", {id: "windowPicture", src: instagramPictureUrl}), 
          React.createElement("div", null, "Its at ", this.props.data.address, " "), 
          React.createElement("div", {id: "windowScore"}, this.props.data.score), 
          React.createElement("a", {href: this.props.data.yelpUrl}, React.createElement("button", {className: "linkButton", id: "yelp"})), 
          React.createElement("a", {href: this.props.data.twitterUrl}, React.createElement("button", {className: "linkButton", id: "twitter"})), 
          React.createElement("a", {href: this.props.data.instagramUrl}, React.createElement("button", {className: "linkButton", id: "instagram"})), 
          React.createElement("a", {href: this.props.data.googlePlacesUrl}, React.createElement("button", {className: "linkButton", id: "googlePlaces"})), 
          React.createElement("a", {onClick: this.handleTwilioClick}, React.createElement("button", {className: "linkButton", id: "twilio"}))
        )
      )
    }
  }
});

// Renders the whole application
React.render(
  React.createElement(AppView, null),
  document.getElementById('AppView')
);
;//////////////////////////
/// Map Initialization ///
//////////////////////////

// Creates new map
var map;

// List of all markers
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

// Create infowindow
var infowindow = new google.maps.InfoWindow();

// Create the searchbox and link it to the UI element
var searchBox = new google.maps.places.SearchBox(input);

// Listen for the event fired when the user selects an item from the 
// pick list. Retrieve the matching places for that item
google.maps.event.addListener(searchBox, 'places_changed', function() {

  var places = searchBox.getPlaces();

  if (places.length === 0) {
    return;
  }
  for (var i = 0, marker; marker = markers[i]; i++) {
    marker.setMap(null);
  }

  // For each place, get the icon, place name, and location.
  markers = [];
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    markers[i] = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    markers.push(marker);

    bounds.extend(place.geometry.location);
  }

  map.fitBounds(bounds);
});
google.maps.event.addListener(map, 'bounds_changed', function() {
 var bounds = map.getBounds();
 searchBox.setBounds(bounds);
});

//////////////////////////
/// User Geolocation   ///
//////////////////////////

// Try HTML5 geolocation
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = new google.maps.LatLng(position.coords.latitude,
                                     position.coords.longitude);

    map.setCenter(pos);

    window.user = new google.maps.Marker({
      map:map,
      draggable:true,
      animation: google.maps.Animation.DROP,
      position: pos,
      icon: '../images/person-icon.png'
    });
    google.maps.event.addListener(user, 'click', userClickHandler);

    getRestaurants();

  }, function() {
    handleNoGeolocation(true);
  });
} else {
  // Browser doesn't support Geolocation
  handleNoGeolocation(false);
}

function handleNoGeolocation(errorFlag) {
  $(document).trigger('loadedYelpData');

  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content,
    icon: '../images/person-icon.png'
  };
}

var userClickHandler = function() {
  if (window.user.getAnimation() != null) {
    window.user.setAnimation(null);
  } else {
    window.user.setAnimation(google.maps.Animation.BOUNCE);
  }
}

//////////////////////////////////////////
/// Restaurant marker initialization   ///
//////////////////////////////////////////

var getRestaurants = function() {
  //Global variable for the array of restaurant markers
  window.markers = [];
  var jsonData = {
    'userLat': window.user.position.G.toString() , 
    'userLong': window.user.position.K.toString()
  };
  $.ajax({
    type: "POST",
    url: '/yelpresults',
    dataType: "text",
    contentType: "application/json",
    data: JSON.stringify(jsonData)
  }).done(  function(restaurantData) {
    restaurantData = JSON.parse(restaurantData);


    var makeMarker = function(index) {
      var marker = new google.maps.Marker({
        map:map,
        position:new google.maps.LatLng(restaurantData[index].latitude, restaurantData[index].longitude), 
        animation: google.maps.Animation.DROP,
        icon: '../images/ball-marker.png'
      });

      // Attach restaurant data to marker object
      marker.data = restaurantData[index];

      // Push to globally accessible markers array
      window.markers.push(marker);


      // Add clickhandler
      google.maps.event.addListener(window.markers[index], 'click', markerClickHandler);    
    }

    // Add markers to the map and push to the array.
    for(var i = 0; i < restaurantData.length; i++) {

      makeMarker(i);
    }

    var element = document.getElementById("loadingWall");
    element.parentNode.removeChild(element);

  }.bind(this)); 

  var markerClickHandler = function(e) {
    for(var i = 0; i < window.markers.length; i++) {
      if(e.latLng === window.markers[i].getPosition()) {
        $(document).trigger('markerClick', [window.markers[i].data]);
      }
    }
  }
}
