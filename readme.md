
### Setup Local Environment
Clone repo to your computer:
```sh
$ git clone https://github.com/kenning/foodhyped.git
```
Navigate to the foodHyped folder on your computer

### Install all the required dependencies from the package.json:
```sh
$ npm install
```
### Start the project by typing: 
```sh
$ grunt s
```
Grunt will build the project and start running the server
In your browser of choice navigate to http://localhost:3000/

###To stop the server type:
```sh 
$ ctrl-c
```
### Twilio usage
For using twilio, we recommend signing up at https://www.twilio.com/api to receive the client-id and authorization key. Twilio offers a free account and allows for sending sms messages to verified phone numbers for free. 

### API keys
The API keys are not uploaded to the GitHub. We recommend signing up at web addresses : https://instagram.com/developer/, https://dev.twitter.com/overview/documentation, https://developers.google.com/maps/signup and https://www.yelp.com/developers/documentation. API keys can be obtained free of charge.
Be cautious while contacting the APIs as they have daily limits.

If you need any help, please send us an email: pilferingpandas@gmail.com


# Twitter usage
Use npm twitter package
Make sure to store keys in a file that is added to gitignore file and then reference via object reference
Separate query into an object using the data that comes back from the Yelp api as the query criteria - this info must be stored in a comma separated object
Escape certain characters using .replace for the url 
Declare a client variable = new Twitter(INSERT_REFERENCE_TO_KEYS)
client.get is the request method
return the data you want in an object that is passed into a callback

### Google Maps API
Look at documentation, relatively straightforward

### MongoDB 
Used mongoose npm package to set up database structure and schema
Use mongoLab to create a location for the database that is referenced in the code

### Front-End Framework
React 

As it is set up now, all the API’s must respond or else that restaurant will not be considered for pin placement.

TODO: google places url returns null.  good luck with that suckas. 

Note: the favicon is awesome.



