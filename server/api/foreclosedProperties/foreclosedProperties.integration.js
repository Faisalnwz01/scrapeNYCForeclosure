'use strict';

var app = require('../..');
var request = require('supertest');

describe('ForeclosedProperties API:', function () {

  describe('GET /api/foreclosedPropertiess', function () {
    var foreclosedPropertiess;

    beforeEach(function (done) {
      request(app).get('/api/foreclosedPropertiess').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        foreclosedPropertiess = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      foreclosedPropertiess.should.be.instanceOf(Array);
    });
  });
});
//# sourceMappingURL=foreclosedProperties.integration.js.map
