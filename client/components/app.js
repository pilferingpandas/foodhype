// The order of this file matters!
  // 1. All React components are created
  // 2. The AppView is rendered
  // 3. The Google Map is rendered 

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
      selectedMarkerData:{
        name: data.name,
        display: true,
        location: data.address[0]
      }
    });
    this.render();
  },
  getInitialState: function() {
    // Fakey data
    return {
      selectedMarkerData: {
        display: false,
        // name: "The Melt"
        // picture:'http://aht.seriouseats.com/images/2012/04/20120427-bk-japan-ringo-burger-product-shot.jpg',
        // location: "115 New Montgomery St,\nSan Francisco, CA 94105",
        // rating: 56,
        // yelpUrl: 'http://www.yelp.com/biz/the-melt-new-montgomery-san-francisco',
        // twitterUrl: 'https://twitter.com/search?q=%22the%20melt%22%20%3A%29&geocode=37.7880000,-122.3998380,15km',
        // tripadvisorUrl: 'http://www.tripadvisor.com/Restaurant_Review-g60713-d4834219-Reviews-The_Melt-San_Francisco_California.html'
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

        React.createElement(WindowView, {data: this.state.selectedMarkerData}), 
        
        "// ", React.createElement("div", {id: "map-canvas"})
      )
    )
  }
});

// Creates a View for the browser window
var WindowView = React.createClass({displayName: "WindowView",
  render: function() {
    if(this.props.data.display === false) {return(React.createElement("div", null));}
    return (
      React.createElement("div", {id: "window"}, 
        React.createElement("div", {id: "windowTitle"}, this.props.data.name), 
        React.createElement("img", {id: "windowPicture", src: this.props.data.picture}), 
        React.createElement("div", null, "Its at ", this.props.data.location, " "), 
        React.createElement("div", {id: "windowScore"}, this.props.data.rating), 
        React.createElement("a", {href: this.props.data.yelpUrl}, React.createElement("button", {className: "linkButton", id: "yelp"})), 
        React.createElement("a", {href: this.props.data.yelpUrl}, React.createElement("button", {className: "linkButton", id: "twitter"})), 
        React.createElement("a", {href: this.props.data.yelpUrl}, React.createElement("button", {className: "linkButton", id: "tripadvisor"}))
      )
    )
  }
});


// Renders the whole application
React.render(
  React.createElement(AppView, null),
  document.getElementById('AppView')
);
