const request = require('request');
const expect = require('chai').expect;

let URL ='https://imageation.herokuapp.com';

describe('Testing Imageation', function(){
	it('should give me a 200/OK response', function(done) {
		request(URL, function(error, apiResponse, apiBody){
			console.log(error);
			console.log(apiResponse);
			expect(apiResponse.statusCode).to.eq(200);
			done();
		});
	});
	it ('should have a sentence in the body', function(done) {
		request(URL, function(error, apiResponse, apiBody) {
			console.log(apiBody);
			expect(JSON.parse(apiBody).sentence).to.not.be.empty;
			done();
		});
	});
});
