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
	});
});