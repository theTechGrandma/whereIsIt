'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://services.faa.gov/airport/status/';

function WhereDataHelper(){}
WhereDataHelper.prototype.requestAirportStatus = function(airport){
	
};

module.exports = WhereDataHelper;