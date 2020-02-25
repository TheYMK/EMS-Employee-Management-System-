//===========================================================
//                BASIC CONFIGURATIONS
//===========================================================
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer'),
	session = require('express-session');

//===========================================================
//                DATABASE CONFIGURATIONS
//===========================================================
mongoose.connect('mongodb://localhost:27017/ems_db', { useNewUrlParser: true, useUnifiedTopology: true });

//===========================================================
//                SERVER CONFIGURATIONS
//===========================================================
app.listen(3000, function() {
	console.log('EMS server is listening for requests...');
});
