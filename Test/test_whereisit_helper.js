'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-As-Promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var WhereDataHelper = require('../WhereDataHelper')
chai.config.includeStack = true;

describe('WhereDataHelper', function(){
	var subject = new WhereDataHelper();
	var airport_code;

	describe('#getAirportStatus', function(){
		context('with a valid airport_code', function(){
			it('return matching airport_code', function(){
				airport_code = 'SFO';
				var value = subject.requestAirportStatus(airport_code).then(function(obj){
					return obj.IATA;
				});
				return expect(value).to.eventually.eq(airport_code);
			});
		});
		context('with an invalid airport code', function() {
			it('returns an error', function() {
				airport_code = 'PUNKYBREWSTER';
				return expect(subject.requestAirportStatus(airport_code)).to.be.rejectedWith(Error);
			});

		});

	describe('#formatAirportStatus', function() {
	    var status = {
	      'delay': 'true',
	      'name': 'Hartsfield-Jackson Atlanta International',
	      'ICAO': 'KATL',
	      'city': 'Atlanta',
	      'weather': {
	        'visibility': 5.00,
	        'weather': 'Light Snow',
	        'meta': {
	          'credit': 'NOAA\'s National Weather Service',
	          'updated': '3:54 PM Local',
	          'url': 'http://weather.gov/'
	        },
	        'temp': '36.0 F (2.2 C)',
	        'wind': 'Northeast at 9.2mph'
	      },
	      'status': {
	        'reason': 'AIRLINE REQUESTED DUE TO DE-ICING AT AIRPORT / DAL AND DAL SUBS ONLY',
	        'closureBegin': '',
	        'endTime': '',
	        'minDelay': '',
	        'avgDelay': '57 minutes',
	        'maxDelay': '',
	        'closureEnd': '',
	        'trend': '',
	        'type': 'Ground Delay'
	      }
	    };

	    context('with a status containing no delay', function() {
	      it('formats the status as expected', function() {
	        status.delay = 'false';
	        expect(subject.formatAirportStatus(status)).to.eq('There is currently no delay at Hartsfield-Jackson Atlanta International. The current weather conditions are Light Snow, 36.0 F (2.2 C) and Northeast at 9.2mph.');
	      });
	    });
	    
	    context('with a status containing a delay', function() {
	      it('formats the status as expected', function() {
	        status.delay = 'true';
	        expect(subject.formatAirportStatus(status)).to.eq(
	          'There is currently a delay for Hartsfield-Jackson Atlanta International. The average  delay time is 57 minutes. Delay is because of the following: 57 minutes. The current weather conditions are Light Snow, 36.0 F (2.2 C) and Northeast at 9.2mph.'
	        );
	      });
	    });
	  });

	});
});