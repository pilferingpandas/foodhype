module.exports = {
  mongo: {
    username: 'pilferingpandas',
    password: 'pandaexpress17'
  },

  twitter: {
    consumer_key:  'QBoqbthWyZm0ECFIDEbcvEED1',
    consumer_secret: 'QNIa14odQNcC8ZWqas0Dl2cT3IlMf3fRF4Su3vIcJFcaQPGApB',
    access_token_key: '3301316320-yA5jxwO35iGKIrv24RMyNHtLzhNrk1pikidysfu',
    access_token_secret: 'sli8mOm6nkLZZ227v6IEDJUV2ll6z5Ur5rGux5rn4kda3'
  },

  googleMap: {
    map: 'AIzaSyACXw8rIX5S419ykXzx29euTHeR7OWdTpw'
  },

  instagram: {
    client_id: 'e1f35dad784e4841b9ef4dcc57c101c6',
    client_secret: '7b5cca058319407ab2f7252da5e915d8'
  },

  yelp: {
    consumer_key: 'in-QXeX3yzQN9cSO4mxMhQ',
    consumer_secret: '4-6VJVjLkZpbkB-VmFGM2GRcZ4s',
    token: 'jMGGHNK3JKf8WPHJcQ1tNernkme2HiLu',
    token_secret:  'oSTagCO3T9V13hwvSwJquEqkXaQ',
    ssl: true
  },

  algorithm: function(data){
   var result = data.yelpData.rating * data.yelpData.rating * 2 +
                data.yelpData.reviewCount / 50 + 
                data.twitterData.numTweets * 8 + 
                data.instagramData.numPics * 4;
                // + data.googlePlacesData.score * data.googlePlacesData.numReviews * 5;

   return Math.floor(result);
  },

  twilio : {
    accountSid : 'AC4e1a3a645f88e2e71443aa73e65d5387',
    authToken : 'bf7090acb41226c922c4423b04011db2'
  },
  mandrill : {
    client_id : 'xc1gIFhvZCYJfiAQXFqppg'
  },
}