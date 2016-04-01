'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('alexaWhereIsIt');
var WhereDataHelper = require('./WhereDataHelper');

app.launch(function(req, res){
	var prompt = 'For delay information, tell me an Airport code.';
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

module.exports.app;