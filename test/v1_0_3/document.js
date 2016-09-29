/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */
(function (process, request, should, chai, isEmail, helper) {
    'use strict';

    var expect = chai.expect;

    var MAIL_TO = 'mailto:';

    var request = request(helper.getEndpoint());
    var oauth;
    if (global.OAUTH) {
        var OAuth = require('oauth');

        oauth = new OAuth.OAuth(
            "",
            "",
            global.OAUTH.consumer_key,
            global.OAUTH.consumer_secret,
            '1.0',
            null,
            'HMAC-SHA1'
        );
    }

    //extend the super-test-as-promised with a function to write the oauth headers
    function extendRequestWithOauth(pre)
    {
        //the sign functions
        pre.sign = function(oa, token, secret) {
            var additionalData = {}; //TODO: deal with body params that need to be encoded into the hash (when the data is a form....)
            additionalData = JSON.parse(JSON.stringify(additionalData));
            additionalData['oauth_verifier'] = global.OAUTH.verifier; //Not sure why the lib does not do is, is required. Jam the verifier in
            var params = oa._prepareParameters(
                token, secret, pre.method, pre.url, additionalData // XXX: what if there's query and body? merge?
            );

            //Never is Echo, I think?
            var header = oa._isEcho ? 'X-Verify-Credentials-Authorization' : 'Authorization';
            var signature = oa._buildAuthorizationHeaders(params);
            //Set the auth header
            pre.set('Authorization', signature);
        }
    }
    /**
     * Sends an HTTP request using supertest
     * @param {string} type ex. GET, POST, PUT, DELETE and HEAD
     * @param {string} url url to send request too
     * @param {json} params query params to append onto url. Params get urlencoded
     * @param body
     * @param {number} expect the result of the request
     * @returns {*} promise
     */
    function sendRequest(type, url, params, body, expect) {
        var reqUrl = params ? (url + '?' + helper.getUrlEncoding(params)) : url;

        var headers = helper.addAllHeaders({});
        var pre = request[type](reqUrl);
        //Add the .sign funciton to the request
        extendRequestWithOauth(pre);
        if (body) {
            pre.send(body);
        }
        pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);
        if (process.env.BASIC_AUTH_ENABLED === 'true') {
            pre.set('Authorization', headers['Authorization']);
        }
        //If we're doing oauth, set it up!
        try {
            if (global.OAUTH) {
                pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
            }
        } catch (e) {
            console.log(e);
        }
        return pre.expect(expect);
    }

    before("Before all tests are run", function (done) {
        console.log("Setting up\naccounting for any time differential between test suite and lrs");
        helper.setTimeMargin(done);
    });

    describe('Document API Requirements', function () {

        it('An LRS will accept a POST request to the State API (Communication.md#2.2.table2.row1.a)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
        });

        it('An LRS will accept a POST request to the Activity Profile API (Communication.md#2.2.table2.row2.a)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
        });

        it('An LRS will accept a POST request to the Agent Profile API (Communication.md#2.2.table2.row3.a)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
        });

        describe('An LRS\'s Activity Profile API rejects a PUT request without "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
          var document = helper.buildDocument(),
              invalidTypes = [1, true, { key: 'value'}];
          invalidTypes.forEach(function (type) {
              it('Should reject PUT with "profileId" with type ' + type, function () {
                  var parameters = helper.buildActivityProfile();
                  parameters.agent = type;
                  return sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
              });
          });
        });

        describe('An LRS\'s Activity Profile API rejects a POST request without "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
          var document = helper.buildDocument(),
              invalidTypes = [1, true, { key: 'value'}];
          invalidTypes.forEach(function (type) {
              it('Should reject POST with "profileId" with type ' + type, function () {
                  var parameters = helper.buildActivityProfile();
                  parameters.agent = type;
                  return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
              });
          });
        });

        describe('An LRS\'s Activity Profile API rejects a GET request without "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
          var document = helper.buildDocument(),
              invalidTypes = [1, true, { key: 'value'}];
          invalidTypes.forEach(function (type) {
              it('Should reject GET with "profileId" with type ' + type, function () {
                  var parameters = helper.buildActivityProfile();
                  parameters.agent = type;
                  return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, document, 400);
              });
          });
        });

        it('An LRS\'s Activity Profile API rejects a PUT request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, Communication.md#2.3.s3.table1.row2)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            parameters.agent = 'not JSON brah';
            return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
        });

        describe('An LRS\'s Activity Profile API rejects a GET request with "agent" as a paremeter if it is not in JSON format with error code 400 Bad Request (multiplicity, Communication.md#2.7.s3.table1.row1, Communication.md#2.7.s4.table1.row1)', function () {
          var document = helper.buildDocument(),
              invalidTypes = [1, true, 'not Agent', { key: 'value'}];
          invalidTypes.forEach(function (type) {
              it('Should reject PUT with "agent" with type ' + type, function () {
                  var parameters = helper.buildActivityProfile();
                  parameters.agent = type;
                  return sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
              });
          });
        });

        it('An LRS\'s Agent API rejects a GET request with "agent" as a parameter if it is a valid (in structure) Agent with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c, 7.6.table4.row1.c)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            parameters.agent = {
                "objectType": "Agent"
            };
            return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
        });

        it('An LRS\'s Agent API upon processing a successful GET request returns a Person Object if the "agent" parameter can be found in the LRS and code 200 OK (7.6c, 7.6d)', function () {
          var templates = [
              {statement: '{{statements.default}}'}
          ];
          var data = createFromTemplate(templates);
          var statement = data.statement;

          return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
              .then(function () {
                var parameters = {
                    agent: statement.actor
                }
                  return sendRequest('get', helper.getEndpointAgents(), parameters, undefined, 200)
                      .then(function (res) {
                          expect(res.body.objectType).to.eql("Person");
                          expect(res.body).to.be.an('object');
                      });
              });
        });

        it('An LRS will reject a Cross Origin Request or new Request which contains any extra information with error code 400 Bad Request **Implicit**', function () {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data.statement.test = "test";
            //console.log(data);
            var statement = data.statement;
            var sID = helper.generateUUID();
            var headers = helper.addAllHeaders({});
            var auth = headers['Authorization']
            var parameters = {
                method: 'PUT'
            }
            var body = 'statementId='+sID+'&content='+JSON.stringify(statement)+'&Content-Type=application/json&X-Experience-API-Version=1.0.2&Authorization='+auth
            return sendRequest('post', helper.getEndpointStatements(), parameters, body, 400);
        });


        it('An LRS will treat the content of the form parameter named "content" as a UTF-8 String (7.8.c)', function () {

               var templates = [
                 {statement: '{{statements.unicode}}'}
               ];

               var data = createFromTemplate(templates);
               var statement = data.statement;
               var id = helper.generateUUID();
               statement.id  = id;
               var formBody = helper.buildFormBody(statement);

               var parameters = {method: 'post'};
               var parameters2 = {activityId: data.statement.object.id}

              return sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 200)
              .then(function(){
                   return sendRequest('get', helper.getEndpointActivities(), parameters2, undefined, 200)
                   .then(function(res){
                      var unicodeConformant = true;
                       var languages = res.body.definition.name;
                       for (var key in languages){
                         if (languages[key] !== statement.object.definition.name[key])
                           unicodeConformant = false;
                       }
                       expect(unicodeConformant).to.be.true;
                   })
               })
        });

        describe('An LRS must support HTTP/1.1 entity tags (ETags) to implement optimistic concurrency control when handling APIs where PUT may overwrite existing data (State, Agent Profile, and Activity Profile, Communication#3.1)', function () {

            it('When responding to a GET request to State resource, include an ETag HTTP header in the response', function () {
                var parameters = helper.buildState(),
                    document = helper.buildDocument();

                return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function(res) {
                        expect(res.headers).to.have.property('etag');
                    })
                });
            });

            it('When responding to a GET request to Agent Profile resource, include an ETag HTTP header in the response', function () {
                var parameters = helper.buildAgentProfile(),
                    document = helper.buildDocument();

                return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function(res) {
                        expect(res.headers).to.have.property('etag');
                    })
                });
            });

            it('When responding to a GET request to Activities Profile resource, include an ETag HTTP header in the response', function () {
                var parameters = helper.buildActivityProfile(),
                    document = helper.buildDocument();

                return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                    .then(function(res) {
                        expect(res.headers).to.have.property('etag');
                    })
                });
            });

            it('When returning an ETag header, the value should be calculated as a SHA1 hexadecimal value', function () {
                var parameters = helper.buildState(),
                    document = helper.buildDocument();

                return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        expect(res.headers.etag).to.be.ok;
                        expect(res.headers.etag).to.match(/\b[0-9a-f]{40}\b/);
                    });
                });
            });

            it('When responding to a GET Request the Etag header must be enclosed in quotes', function () {
                var parameters = helper.buildAgentProfile(),
                    document = helper.buildDocument();

                return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        expect(res.headers.etag).to.be.ok;
                        var str = res.headers.etag;
                        //test for weak etags
                        if (str[0] !== '"') {
                            expect(str[0]).to.equal('W');
                            expect(str[1]).to.equal('/');
                            str = str.substring(2)
                        }
                        expect(str[0]).to.equal('"');
                        expect(str[41]).to.equal('"');
                    });
                });
            });

            it('When responding to a PUT request, must handle the If-Match header as described in RFC 2616, HTTP/1.1 if it contains an ETag', function () {
                var parameters = helper.buildAgentProfile(),
                    document = helper.buildDocument();

                return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function (res) {
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 200).then(function (res) {
                        var etag = res.headers.etag;

                        var reqUrl = parameters ? (helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters)) : helper.getEndpointAgentsProfile();
                        var data = {'If-Match': etag};
                        var headers = helper.addAllHeaders(data);
                        var pre = request['put'](reqUrl);
                        extendRequestWithOauth(pre);
                        pre.send(document);
                        pre.set('If-Match', headers['If-Match']);
                        pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);
                        if (process.env.BASIC_AUTH_ENABLED === 'true') {
                            pre.set('Authorization', headers['Authorization']);
                        }
                        //If we're doing oauth, set it up!
                        try {
                            if (global.OAUTH) {
                                pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
                            }
                        } catch (e) {
                            console.log(e);
                        }
                        return pre.expect(204)
                        .then(function (res) {
                        }); //put
                    }); // get
                }); // post
            });

            it('When responding to a PUT request, handle the If-None-Match header as described in RFC 2616, HTTP/1.1 if it contains “*”', function () {
                var parameters = helper.buildActivityProfile(),
                    document = helper.buildDocument();

                var reqUrl = helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters);
                var data = {'If-None-Match': "*"};
                var headers = helper.addAllHeaders(data);
                var pre = request['put'](reqUrl);
                extendRequestWithOauth(pre);
                pre.send(document);
                pre.set('If-None-Match', headers['If-None-Match']);
                pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);
                if (process.env.BASIC_AUTH_ENABLED === 'true') {
                    pre.set('Authorization', headers['Authorization']);
                }
                //If we're doing oauth, set it up!
                try {
                    if (global.OAUTH) {
                        pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
                    }
                } catch (e) {
                    console.log(e);
                }
                return pre.expect(204)
            });

            describe('If Header precondition in PUT Requests for RFC2616 fail', function () {
                var etag;
                var parameters = helper.buildState(),
                    document = helper.buildDocument();

                before('post the document and get the etag', function() {

                    return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                    .then(function (res) {
                        return sendRequest('get', helper.getEndpointActivitiesState(), parameters, document, 200).then(function (res) {
                            etag = res.headers.etag;
                        });
                    });
                });

                it('Return HTTP 412 (Precondition Failed)', function () {
                    var badTag = '"1111111111111111111111111111111111111111"';

                    var reqUrl = helper.getEndpointActivitiesState() + '?' + helper.getUrlEncoding(parameters);
                    var data = {'If-Match': badTag};

                    var headers = helper.addAllHeaders(data);
                    var pre = request['put'](reqUrl);
                    extendRequestWithOauth(pre);

                    pre.send(document);
                    pre.set('If-Match', headers['If-Match']);
                    pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);

                    if (process.env.BASIC_AUTH_ENABLED === 'true') {
                        pre.set('Authorization', headers['Authorization']);
                    }
                    //If we're doing oauth, set it up!
                    try {
                        if (global.OAUTH) {
                            pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    return pre.expect(412);
                });

                it('Do not modify the resource', function () {
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, document, 200).then(function (res) {
                        var result = res.body;
                        expect(result).to.eql(document);
                    });
                });
            });

            describe('If put request is received without either header for a resource that already exists', function () {
                var etag;
                var parameters = helper.buildActivityProfile();
                var document = helper.buildDocument();

                before('post the document and get the etag', function () {
                    return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                    .then(function(res) {
                        return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, document, 200)
                        .then(function (res) {
                            etag = res.headers.etag;
                        });
                    });
                });

                it('Return 409 conflict', function () {
                    return sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 409);
                });

                it('Return plaintext body explaining the situation', function () {
                    return sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 409)
                    .then(function (res) {
                        expect(res).to.have.property('text');
                        expect(res.text).to.have.length.above(0);
                    });
                });

                it('Do not modify the resource', function () {
                    return sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 409)
                    .then(function (res) {
                        return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, document, 200)
                        .then(function (res) {
                            var result = res.body;
                            expect(res.body).to.eql(document);
                        });
                    });
                });
            });

        });


    });

    function createFromTemplate(templates) {
        // convert template mapping to JSON objects
        var converted = helper.convertTemplate(templates);
        // this handles if no override
        var mockObject = helper.createTestObject(converted);
        return mockObject;
    }
}(process, require('supertest-as-promised'), require('should'), require('chai'), require('isemail'), require('./../helper')));
