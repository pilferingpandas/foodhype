var keys = require('./panda-config.js');
var express = require('express');
var app = require('./server.js')
var instagram = require('instagram-node-lib');
var fs = require('fs');

instagram.set('client_id', keys.instagram.client_id);
instagram.set('client_secret', keys.instagram.client_secret);

 // get data with tags for sushirrito
 instagram.tags.recent({ name: 'sushirrito', 
    complete: function(data){

    //console.log(data);
    }
  });
