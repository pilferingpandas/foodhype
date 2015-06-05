// The order of this file matters!
  // 1. All React components are created
  // 2. The AppView is rendered
  // 3. The Google Map is rendered 

//////////////////////////
/// React Views        ///
//////////////////////////

// Creates a View for the whole app, with only two things in it: a single WindowView, and the map canvas
var AppView = React.createClass({
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
