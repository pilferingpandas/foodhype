var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/client'));
app.use(favicon(__dirname + '/client/favicon/favicon.ico'));
app.use(bodyParser.json());

var port = 3000;
app.listen(port);

console.log('Express server started on port %s', port);
