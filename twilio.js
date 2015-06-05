var secret = require('./config/panda-config.js');

//// Mandrill 
var mandrill = require('mandrill-api');
mandrill_client = new mandrill.Mandrill(secret.mandrill.client_id);
  
// get input from user getting email or phone number
var userEmail ='aaaaa@gmail.com';
var phoneNumber ='+15105305338';
/////
 var message = {
            "html": "<span>The best restaurant</span>",
            "subject": "The best restaurant",
            "from_email": userEmail,
            "from_name": "Foodhyped.com",
            "to": [{
                    "email": userEmail,
                    "name": 'The Foodie',
                    "type": "to"
                },
               ],
            "headers": {
                "Reply-To": ""
            },
            "important": true,
        };
  var async = false;

  /// send email // uncomment to send an email

      // mandrill_client.messages.send({"message": message, "async": async}, function(result) {
      //       console.log(result);
      //   }, function(e) {
      //       // Mandrill returns the error as an object with name and message keys
      //       console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      //       // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
      //   });


/// twilio
var twilio = require('twilio');
// var accountSid = 'AC4e1a3a645f88e2e71443aa73e65d5387';
// var authToken = 'bf7090acb41226c922c4423b04011db2';
var client = require('twilio')(secret.twilio.accountSid, secret.twilio.authToken);
 console.log(secret.twilio.accountSid, secret.twilio.authToken)
client.messages.create({
    body: "Your blue eyes keep me thinking about you, coming back to hana anytime soon?? ",
    to: phoneNumber,
    from: "+12568260192"
}, function(error, message) {
    if (error) {
        console.log(error.message);
    }
});