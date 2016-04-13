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

app.intent('alexaWhereIsIt',{
	'slots': {
		'AIRPORTCODE': 'FAACODES'
	},
	'utterances': ['{|flight|airport} {|delay|status} {|info} {|for} {-|AIRPORTCODE}']
},
	function(req, res){
		//get the slot
		var airportCode = req.slot('AIRPORTCODE');
		var reprompt = 'Tell me an airport code to get delay information.';

		if (_.isEmpty(airportCode)){
			var prompt = 'I didn\'t hear an airport code. Tell me an airport code.';
			res.say(prompt).reprompt(reprompt).shouldEndSession(false);
			return true;
		}
		else
		{
			var whereHelper = new WhereDataHelper();
			whereHelper.requestAirportStatus(airportCode).then(function(airportStatus) {
				console.log(airportStatus);
				res.say(whereHelper.formatAirportStatus(airportStatus)).send();
			}).catch (function(err) {
				console.log(err.statusCode);
				var prompt = 'I didn\'t have data for an airport code of ' + airportCode;
				res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
			});
			return false;
		}
	}
);

module.exports = app;