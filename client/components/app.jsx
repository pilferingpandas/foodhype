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
      selectedMarkerData:data
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
  handleTwilioClick: function(){


    var theDiv = $('<div id="twilioForm"><form method="post" action="">Enter phone number, dude...<br><input type="text" name="phoneNumber" id="phoneNumber"><input type="submit"></div>').hide().fadeIn(1500);
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
          console.log('response',data);
          $("#twilioForm").fadeOut(1000, function() {
            $(this).remove();
          });
        },
        error: function(err) {
          console.error(err);
        }
      })
    });


    console.log('clicked twilio and awesome, tubular');
  },
  render: function() {
    if(this.props.data.display === false) {return(<div></div>);}
    console.log(this.props.data);
    var instagramPictureUrl = this.props.data.instagramPictureUrl ||
      'http://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg';
    console.log(instagramPictureUrl);
    return (
      <div id="window">
        <div id="windowTitle">{this.props.data.name}</div>
        <img id="windowPicture" src={instagramPictureUrl}></img>
        <div>Its at {this.props.data.address} </div>
        <div id="windowScore">{this.props.data.score}</div>
        <a href={this.props.data.yelpUrl}><button className="linkButton" id="yelp"></button></a>
        <a href={this.props.data.twitterUrl}><button className="linkButton" id="twitter"></button></a>
        <a href={this.props.data.instagramUrl}><button className="linkButton" id="instagram"></button></a>
        <a href={this.props.data.googlePlacesUrl}><button className="linkButton" id="googlePlaces"></button></a>
        <a onClick={this.handleTwilioClick}><button className="linkButton" id="twilio"></button></a>
      </div>
    )
  }
});

// var LinkButton = React.createClass({
//   render: function() {
//     if(!this.props.url) {
//       return (<span></span>)
//     } else {
//       return(
//         <a href={this.props.url}><button className="linkButton" id={this.props.id}></button></a>
//       )
//     }
//   }
// });

//<LinkButton url={this.props.data.yelpUrl} id={"yelp"} />


// Renders the whole application
React.render(
  <AppView />,
  document.getElementById('AppView')
);
