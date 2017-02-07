/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('About Resource Requirements (Communication 2.8)', function () {

/**  Matchup with Conformance Requirements Document
 * XAPI-00315 - below
 * XAPI-00316 - below
 * XAPI-00317 - below
 * XAPI-00318 - below
 * XAPI-00319 - below
 * XAPI-00320 - bad test - extesion property is optional in spec
 * XAPI-00321 - below
 */

/**  XAPI-00315, Communication 2.8 About Resource
 * An LRS has an About API with endpoint "base IRI"+"/about"
 */
    it('An LRS has an About Resource with endpoint "base IRI"+"/about" (Communication 2.8, XAPI-00315)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200);
    });

/**  XAPI-00319, Communication 2.8 About Resource
 * An LRS's About Resource accepts GET requests. Upon processing a successful GET request returns a version property and code 200 OK
 */
    it('An LRS\'s About Resource upon processing a successful GET request returns a version property and code 200 OK (multiplicity, Communication 2.8.s4, XAPI-00319)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200)
            .then(function (res) {
                var about = res.body;
                expect(about).to.have.property('version');
            });
    });

/**  XAPI-00318, Communication 2.8 About Resource
 * An LRS's About API's version property is an array of strings
 */
    it('An LRS\'s About Resource\'s version property is an array of strings (format, Communication 2.8.s4.table1.row1, XAPI-00318)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200)
            .then(function (res) {
                var about = res.body;
                expect(about).to.have.property('version').to.be.an('array');
            });
    });

/**  XAPI-00317, Communication 2.8 About Resource
 * An LRS's About API's version property contains at least one string of "1.0.x"
 */
    it('An LRS\'s About Resource\'s version property contains at least one string of "1.0.3" (Communication 2.8.s5.b1.b1, XAPI-00317)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200)
            .then(function (res) {
                var about = res.body;
                expect(about).to.have.property('version').to.be.an('array');

                var foundVersion = false
                about.version.forEach(function (item) {
                    if (item === '1.0.3') {
                        foundVersion = true;
                    }
                })
                expect(foundVersion).to.be.true;
            });
    });

/**  XAPI-00316, Communication 2.8 About Resource
 * An LRS's About API's version property can only have values of "0.9", "0.95", "1.0.0", or “1.0.x” with
 */
    it('An LRS\'s About Resource\'s version property can only have values of "0.9", "0.95", "1.0.0", or ""1.0." + X" with (Communication 2.8.s5.b1.b1, XAPI-00316)', function () {
        return helper.sendRequest('get', '/about', undefined, undefined, 200)
            .then(function (res) {
                var about = res.body;
                expect(about).to.have.property('version').to.be.an('array');
                var validVersions = ['0.9', '0.95', '1.0.0', '1.0.1', '1.0.2', '1.0.3'];
                about.version.forEach(function (item) {
                    expect(validVersions).to.include(item);
                })
            });
    });

/**  XAPI-00321, Communication 2.8 About Resource
 * An LRS rejects with error code 400 Bad Request, a Request which does not use a "X-Experience-API-Version" header name to any API except the About API
 */
    describe('An LRS rejects with error code 400 Bad Request, a Request which does not use a "X-Experience-API-Version" header name to any Resource except the About Resource (multiplicity, Communication 2.8.s4.table1.row2, XAPI-00321)', function () {

        it ('using Statement Endpoint', function(done){
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .headers(helper.addBasicAuthenicationHeader({}))
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else if (res.statusCode === 400) {
                    // if the status code is a 400, we expect that the request was handled and rejected by a 1.0.x compliant lrs and test for that version in the result headers or that the the request was forwarded to a 0.9x lrs and rejected
                    expect(res.statusCode).to.eql(400);
                    expect(res.headers['x-experience-api-version']).to.exist;
                    expect(res.headers['x-experience-api-version']).to.match(/^1\.0\.\d+$|^0?\.9\d*?$/);
                    done();
                } else if (res.statusCode === 200) {
                    // if the status code is a 200, we expect that the request was rerouted to a 0.9x compliant lrs and test for that version in the result headers
                    expect(res.statusCode).to.eql(200);
                    expect(res.headers['x-experience-api-version']).to.exist;
                    expect(res.headers['x-experience-api-version']).to.match(/^0?\.9\d*?$/);
                    done();
                } else {
                    // at this point there was some error and we pass along the message
                    var str = 'Received: status code - ' + res.statusCode + ' from LRS of version ';
                    if (res.headers['x-experience-api-version']) {
                        str += res.headers['x-experience-api-version'];
                    } else {
                        str += 'missing';
                    }
                    str += '.\nExpected: either 400 with LRS version 1.0.x, or 200 with LRS version 0.9x.';
                    done(new Error(str));
                }
            });
        });

        /*
        it ('using About Endpoint', function(done){
            request(helper.getEndpointAndAuth())
              .get(helper.getEndpointAbout())
              .headers(helper.addBasicAuthenicationHeader({}))
              .expect(200, done)
        });
        */

        it ('using Activities Endpoint', function(done){
            request(helper.getEndpointAndAuth())
              .get(helper.getEndpointActivities())
              .headers(helper.addBasicAuthenicationHeader({}))
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  } else if (res.statusCode === 400) {
                      // if the status code is a 400, we expect that the request was handled and rejected by a 1.0.x compliant lrs and test for that version in the result headers or that the the request was forwarded to a 0.9x lrs and rejected
                      expect(res.statusCode).to.eql(400);
                      expect(res.headers['x-experience-api-version']).to.exist;
                      expect(res.headers['x-experience-api-version']).to.match(/^1\.0\.\d+$|^0?\.9\d*?$/);
                      done();
                  } else if (res.statusCode === 200) {
                      // if the status code is a 200, we expect that the request was rerouted to a 0.9x compliant lrs and test for that version in the result headers
                      expect(res.statusCode).to.eql(200);
                      expect(res.headers['x-experience-api-version']).to.exist;
                      expect(res.headers['x-experience-api-version']).to.match(/^0?\.9\d*?$/);
                      done();
                  } else {
                      // at this point there was some error and we pass along the message
                      var str = 'Received: status code - ' + res.statusCode + ' from LRS of version ';
                      if (res.headers['x-experience-api-version']) {
                          str += res.headers['x-experience-api-version'];
                      } else {
                          str += 'missing';
                      }
                      str += '.\nExpected: either 400 with LRS version 1.0.x, or 200 with LRS version 0.9x.';
                      done(new Error(str));
                  }
              });
        });

        it ('using Activities Profile Endpoint', function(done){
            request(helper.getEndpointAndAuth())
              .get(helper.getEndpointActivitiesProfile())
              .headers(helper.addBasicAuthenicationHeader({}))
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  } else if (res.statusCode === 400) {
                      // if the status code is a 400, we expect that the request was handled and rejected by a 1.0.x compliant lrs and test for that version in the result headers or that the the request was forwarded to a 0.9x lrs and rejected
                      expect(res.statusCode).to.eql(400);
                      expect(res.headers['x-experience-api-version']).to.exist;
                      expect(res.headers['x-experience-api-version']).to.match(/^1\.0\.\d+$|^0?\.9\d*?$/);
                      done();
                  } else if (res.statusCode === 200) {
                      // if the status code is a 200, we expect that the request was rerouted to a 0.9x compliant lrs and test for that version in the result headers
                      expect(res.statusCode).to.eql(200);
                      expect(res.headers['x-experience-api-version']).to.exist;
                      expect(res.headers['x-experience-api-version']).to.match(/^0?\.9\d*?$/);
                      done();
                  } else {
                      // at this point there was some error and we pass along the message
                      var str = 'Received: status code - ' + res.statusCode + ' from LRS of version ';
                      if (res.headers['x-experience-api-version']) {
                          str += res.headers['x-experience-api-version'];
                      } else {
                          str += 'missing';
                      }
                      str += '.\nExpected: either 400 with LRS version 1.0.x, or 200 with LRS version 0.9x.';
                      done(new Error(str));
                  }
              });
        });

        it ('using Activities State Endpoint', function(done){
            request(helper.getEndpointAndAuth())
              .get(helper.getEndpointActivitiesState())
              .headers(helper.addBasicAuthenicationHeader({}))
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  } else if (res.statusCode === 400) {
                      // if the status code is a 400, we expect that the request was handled and rejected by a 1.0.x compliant lrs and test for that version in the result headers or that the the request was forwarded to a 0.9x lrs and rejected
                      expect(res.statusCode).to.eql(400);
                      expect(res.headers['x-experience-api-version']).to.exist;
                      expect(res.headers['x-experience-api-version']).to.match(/^1\.0\.\d+$|^0?\.9\d*?$/);
                      done();
                  } else if (res.statusCode === 200) {
                      // if the status code is a 200, we expect that the request was rerouted to a 0.9x compliant lrs and test for that version in the result headers
                      expect(res.statusCode).to.eql(200);
                      expect(res.headers['x-experience-api-version']).to.exist;
                      expect(res.headers['x-experience-api-version']).to.match(/^0?\.9\d*?$/);
                      done();
                  } else {
                      // at this point there was some error and we pass along the message
                      var str = 'Received: status code - ' + res.statusCode + ' from LRS of version ';
                      if (res.headers['x-experience-api-version']) {
                          str += res.headers['x-experience-api-version'];
                      } else {
                          str += 'missing';
                      }
                      str += '.\nExpected: either 400 with LRS version 1.0.x, or 200 with LRS version 0.9x.';
                      done(new Error(str));
                  }
              });
        });

        it ('using Agents Endpoint', function(done){
            request(helper.getEndpointAndAuth())
              .get(helper.getEndpointAgents())
              .headers(helper.addBasicAuthenicationHeader({}))
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  } else if (res.statusCode === 400) {
                      // if the status code is a 400, we expect that the request was handled and rejected by a 1.0.x compliant lrs and test for that version in the result headers or that the the request was forwarded to a 0.9x lrs and rejected
                      expect(res.statusCode).to.eql(400);
                      expect(res.headers['x-experience-api-version']).to.exist;
                      expect(res.headers['x-experience-api-version']).to.match(/^1\.0\.\d+$|^0?\.9\d*?$/);
                      done();
                  } else if (res.statusCode === 200) {
                      // if the status code is a 200, we expect that the request was rerouted to a 0.9x compliant lrs and test for that version in the result headers
                      expect(res.statusCode).to.eql(200);
                      expect(res.headers['x-experience-api-version']).to.exist;
                      expect(res.headers['x-experience-api-version']).to.match(/^0?\.9\d*?$/);
                      done();
                  } else {
                      // at this point there was some error and we pass along the message
                      var str = 'Received: status code - ' + res.statusCode + ' from LRS of version ';
                      if (res.headers['x-experience-api-version']) {
                          str += res.headers['x-experience-api-version'];
                      } else {
                          str += 'missing';
                      }
                      str += '.\nExpected: either 400 with LRS version 1.0.x, or 200 with LRS version 0.9x.';
                      done(new Error(str));
                  }
              });
        });

        it ('using Agents Profile Endpoint', function(done){
            request(helper.getEndpointAndAuth())
              .get(helper.getEndpointAgentsProfile())
              .headers(helper.addBasicAuthenicationHeader({}))
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  } else if (res.statusCode === 400) {
                      // if the status code is a 400, we expect that the request was handled and rejected by a 1.0.x compliant lrs and test for that version in the result headers or that the the request was forwarded to a 0.9x lrs and rejected
                      expect(res.statusCode).to.eql(400);
                      expect(res.headers['x-experience-api-version']).to.exist;
                      expect(res.headers['x-experience-api-version']).to.match(/^1\.0\.\d+$|^0?\.9\d*?$/);
                      done();
                  } else if (res.statusCode === 200) {
                      // if the status code is a 200, we expect that the request was rerouted to a 0.9x compliant lrs and test for that version in the result headers
                      expect(res.statusCode).to.eql(200);
                      expect(res.headers['x-experience-api-version']).to.exist;
                      expect(res.headers['x-experience-api-version']).to.match(/^0?\.9\d*?$/);
                      done();
                  } else {
                      // at this point there was some error and we pass along the message
                      var str = 'Received: status code - ' + res.statusCode + ' from LRS of version ';
                      if (res.headers['x-experience-api-version']) {
                          str += res.headers['x-experience-api-version'];
                      } else {
                          str += 'missing';
                      }
                      str += '.\nExpected: either 400 with LRS version 1.0.x, or 200 with LRS version 0.9x.';
                      done(new Error(str));
                  }
              });
        });

    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
