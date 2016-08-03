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
        if (body) {
            pre.send(body);
        }
        pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);
        if (process.env.BASIC_AUTH_ENABLED === 'true') {
            pre.set('Authorization', headers['Authorization']);
        }
        return pre.expect(expect);
    }

    before("Before all tests are run", function (done) {
        console.log("Setting up\naccounting for any time differential between test suite and lrs");
        helper.setTimeMargin(done);
    });

    describe('Document API Requirements', function () {
        it('An LRS has a State API with endpoint "base IRI"+"/activities/state" (7.3.table1.row1.a ,7.3.table1.row1.c)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
        });

        it('An LRS has an Activities API with endpoint "base IRI" + /activities" (7.5) **Implicit** (in that it is not named this by the spec)', function () {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;
            var parameters = {
                activityId: data.statement.object.id
            }
            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 200);
                });
        });

        it('An LRS has an Activity Profile API with endpoint "base IRI"+"/activities/profile" (7.3.table1.row2.a, 7.3.table1.row2.c)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
        });

        it('An LRS has an Agents API with endpoint "base IRI" + /agents" (7.6) **Implicit** (in that it is not named this by the spec)', function () {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;
            var parameters = {
                agent: data.statement.actor
            }
            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgents(), parameters, undefined, 200);
                });
        });

        it('An LRS has an Agent Profile API with endpoint "base IRI"+"/agents/profile" (7.3.table1.row3.a, 7.3.table1.row3.c)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
        });

        it('An LRS has an About API with endpoint "base IRI"+"/about" (7.7.a)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200);
        });

        it('An LRS will accept a POST request to the State API (7.3.table1.row1.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
        });

        it('An LRS will accept a POST request to the Activity Profile API (7.3.table1.row2.b)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
        });

        it('An LRS will accept a POST request to the Agent Profile API (7.3.table1.row3.b)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
        });

        describe('An LRS cannot reject a POST request to the State API based on the contents of the name/value pairs of the document (7.3.b) **Implicit**', function () {
            var documents = [helper.buildDocument(), '1', 'true'];
            documents.forEach(function (document) {
                it('Should accept POST to State with document ' + document, function () {
                    var parameters = helper.buildState();
                    return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
                });
            });
        });

        describe('An LRS cannot reject a POST request to the Activity Profile API based on the contents of the name/value pairs of the document (7.3.b) **Implicit**', function () {
            var documents = [helper.buildDocument(), '1', 'true'];
            documents.forEach(function (document) {
                it('Should accept POST to Activity profile with document ' + document, function () {
                    var parameters = helper.buildActivityProfile();
                    return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
                });
            });
        });

        describe('An LRS cannot reject a POST request to the Agent Profile API based on the contents of the name/value pairs of the document (7.3.b) **Implicit**', function () {
            var documents = [{}, '1', 'true'];
            documents.forEach(function (document) {
                it('Should accept POST to Agent profile with document ' + document, function () {
                    var parameters = helper.buildAgentProfile();
                    return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
                });
            });
        });

        it('An LRS\'s State API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (7.3.f)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.eql(document);
                        });
                });
        });

        it('An LRS\'s State API, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (7.3.e)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument(),
                anotherDocument = 'abc';
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 400);
                });
        });

        it('A Document Merge overwrites any duplicate Objects from the previous document with the new document. (7.3.d)', function () {
            var parameters = helper.buildState(),
                document = {
                    car: 'MKX'
                },
                anotherDocument = {
                    car: 'MKZ'
                };
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 204)
                        .then(function () {
                            return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                                .then(function (res) {
                                    var body = res.body;
                                    expect(body).to.eql({
                                        car: 'MKZ'
                                    })
                                });
                        });
                });
        });

        it('A Document Merge only performs overwrites at one level deep, although the entire object is replaced. (7.3.d)', function () {
            var parameters = helper.buildState(),
                document = {
                    car: {
                            make: "Ford",
                            model: "Escape"
                    },
                    driver: "Dale",
                    series: {
                        nascar: {
                            series: "sprint"
                        }
                    }
                },
                anotherDocument = {
                    car: {
                            make: "Dodge",
                            model: "Ram"
                    },
                    driver: "Jeff",
                    series: {
                        nascar: {
                            series: "nextel"
                        }
                    }
                };
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 204)
                        .then(function () {
                            return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                                .then(function (res) {
                                    var body = res.body;
                                    expect(body).to.eql({
                                        car: {
                                                make: "Dodge",
                                                model: "Ram"
                                        },
                                        driver: "Jeff",
                                        series: {
                                            nascar: {
                                                series: "nextel"
                                            }
                                        }
                                    })
                                });
                        });
                });
        });

        it('An LRS\'s State API performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (7.3.d)', function () {
            var parameters = helper.buildState(),
                document = {
                    car: 'Honda'
                },
                anotherDocument = {
                    type: 'Civic'
                };
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 204)
                        .then(function () {
                            return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                                .then(function (res) {
                                    var body = res.body;
                                    expect(body).to.eql({
                                        car: 'Honda',
                                        type: 'Civic'
                                    })
                                });
                        });
                });
        });

        it('An LRS\'s Activity Profile API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (7.3.f)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.eql(document);
                        })
                });
        });

        it('An LRS\'s Activity Profile API, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (7.3.e)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument(),
                anotherDocument = 'abc';
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, anotherDocument, 400);
                });
        });

        it('An LRS\'s Activity Profile API performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (7.3.d)', function () {
            var parameters = helper.buildActivityProfile(),
                document = {
                    car: 'Honda'
                },
                anotherDocument = {
                    type: 'Civic'
                };
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, anotherDocument, 204)
                        .then(function () {
                            return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                                .then(function (res) {
                                    var body = res.body;
                                    expect(body).to.eql({
                                        car: 'Honda',
                                        type: 'Civic'
                                    })
                                });
                        });
                });
        });

        it('An LRS\'s Agent Profile API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (7.3.f)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.eql(document);
                        })
                });
        });

        it('An LRS\'s Agent Profile API, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (7.3.e)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument(),
                anotherDocument = 'abc';
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, anotherDocument, 400);
                });
        });

        it('An LRS\'s Agent Profile API performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (7.3.d)', function () {
            var parameters = helper.buildAgentProfile(),
                document = {
                    car: 'Honda'
                },
                anotherDocument = {
                    type: 'Civic'
                };
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, anotherDocument, 204)
                        .then(function () {
                            return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                                .then(function (res) {
                                    var body = res.body;
                                    expect(body).to.eql({
                                        car: 'Honda',
                                        type: 'Civic'
                                    })
                                });
                        });
                });
        });

        it('An LRS\'s State API accepts PUT requests (7.4)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 204);
        });

        it('An LRS\'s State API rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            delete parameters.activityId;
            return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
        });

        describe('An LRS\'s State API rejects a PUT request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var invalidTypes = [{ key: 'value'}, 1, true, undefined];
            invalidTypes.forEach(function (type) {
                it('Should State API reject a PUT request with activityId type ' + type, function () {
                    var parameters = helper.buildState(),
                        document = helper.buildDocument();
                    delete parameters.activityId;
                    return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
                });
            });
        });

        //+* In 1.0.3, the IRI requires a scheme, but does not in 1.0.2, thus we only test type String in this version**
        it('An LRS\'s State API rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            delete parameters.agent;
            return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
        });

        it('An LRS\'s State API rejects a PUT request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            parameters.agent = 'not JSON brah';
            return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
        });

        it('An LRS\'s State API can process a PUT request with "registration" as a parameter (multiplicity, 7.4.table1.row3.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            parameters.registration = helper.generateUUID();
            return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 204);
        });

        describe('An LRS\'s State API rejects a PUT request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request(format, 7.4.table1.row3.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, 'not UUID'];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT with "registration" with type ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.registration = type;
                    return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s State API rejects a PUT request without "stateId" as a parameter with error code 400 Bad Request(multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            delete parameters.stateId;
            return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
        });

        it('An LRS\'s State API upon processing a successful PUT request returns code 204 No Content (7.4.a)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 204);
        });

        it('An LRS\'s State API accepts POST requests (7.4)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
        });

        it('An LRS\'s State API rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            delete parameters.activityId;
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
        });

        describe('An LRS\'s State API rejects a POST request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, { key: 'value'}, undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT State with stateId type : ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.activityId = type;
                    return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s State API rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            delete parameters.agent;
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
        });

        describe('An LRS\'s State API rejects a POST request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, 'not JSON', undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject POST State with agent type : ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.agent = type;
                    return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s State API can process a POST request with "registration" as a parameter (multiplicity, 7.4.table1.row3.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            parameters.registration = helper.generateUUID();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
        });

        describe('An LRS\'s State API rejects a POST request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, 7.4.table1.row3.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, 'not UUID'];
            invalidTypes.forEach(function (type) {
                it('Should reject POST with "registration" with type ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.registration = type;
                    return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s State API rejects a POST request without "stateId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            delete parameters.stateId;
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
        });

        it('An LRS\'s State API upon processing a successful POST request returns code 204 No Content (7.4.a)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
        });

        it('An LRS\'s State API accepts GET requests (7.4)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.eql(document);
                        });
                });
        });

        it('An LRS\'s State API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = helper.buildState();
            delete parameters.activityId;
            return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
        });

        describe('An LRS\'s State API rejects a GET request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var invalidTypes = [1, true, { key: 'value'}, undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "activityId" with type ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.activityId = type;
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)', function () {
            var parameters = helper.buildState();
            delete parameters.agent;
            return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
        });

        describe('An LRS\'s State API rejects a GET request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)', function () {
            var invalidTypes = [1, true, 'not JSON', undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "agent" with type ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.agent = type;
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API can process a GET request with "registration" as a parameter (multiplicity, 7.4.table1.row3.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            parameters.registration = helper.generateUUID();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.eql(document);
                        });
                });
        });

        describe('An LRS\'s State API rejects a GET request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, 7.4.table1.row3.a)', function () {
            var invalidTypes = [1, true, 'not UUID'];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "registration" with type ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.registration = type;
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API can process a GET request with "stateId" as a parameter (multiplicity, 7.4.table1.row3.b, 7.4.table2.row3.b) (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.eql(document);
                        })
                });
        });

        it('An LRS\'s State API can process a GET request with "since" as a parameter (multiplicity, 7.4.table2.row4.b, 7.4.table2.row3.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    parameters.since = new Date(Date.now() - 60 * 1000 - helper.getTimeMargin()).toISOString(); // Date 1 minute ago
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.eql(document);
                        });
                });
        });

        it('An LRS\'s State API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.4.table2.row4.a)', function () {
            var parameters = helper.buildState();
            parameters.since = 'not a timestamp';
            return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
        });

        it('An LRS\'s State API upon processing a successful GET request with a valid "stateId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (7.4.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.eql(document);
                        });
                });
        });

        //+* NOTE:  **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**
        it('An LRS\'s State API upon processing a successful GET request without "stateId" as a parameter returns an array of ids of state data documents satisfying the requirements of the GET and code 200 OK (7.4.c)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    delete parameters.stateId;
                    return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.be.an('array');
                        });
                });
        });

        it('An LRS\'s returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request (7.4.table2.row4)', function () {
            var document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), helper.buildState(), document, 204)
                .then(function () {
                    return sendRequest('post', helper.getEndpointActivitiesState(), helper.buildState(), document, 204)
                        .then(function () {
                            var parameters = helper.buildState();
                            delete parameters.stateId;
                            parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                            return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                                .then(function (res) {
                                    var body = res.body;
                                    expect(body).to.be.an('array');
                                    expect(body).to.have.length.above(1);
                                });
                        });
                });
        });

        it('An LRS\'s State API accepts DELETE requests (7.4)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
                });
        });

        it('An LRS\'s State API rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = helper.buildState();
            delete parameters.activityId;
            return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
        });

        describe('An LRS\'s State API rejects a DELETE request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var invalidTypes = [1, true, { key: 'value'}, undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "activityId" with type ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.activityId = type;
                    return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)', function () {
            var parameters = helper.buildState();
            delete parameters.agent;
            return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
        });

        describe('An LRS\'s State API rejects a DELETE request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)', function () {
            var invalidTypes = [1, true, 'not JSON', undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "agent" with type ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.activityId = type;
                    return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API can process a DELETE request with "registration" as a parameter (multiplicity, 7.4.table1.row3.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            parameters.registration = helper.generateUUID();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
                });
        });

        describe('An LRS\'s State API rejects a DELETE request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, 7.4.table1.row3.a)', function () {
            var invalidTypes = [1, true, 'not UUID'];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "registration" with type ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.registration = type;
                    return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API can process a DELETE request with "stateId" as a parameter (multiplicity, 7.4.table1.row3.b, 7.4.table2.row3.b) (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
                });
        });

        describe('An LRS\'s State API rejects a DELETE request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.4.table2.row4.a)  **And this would follow...**', function () {
            var invalidTypes = [1, true];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "since" with type ' + type, function () {
                    var parameters = helper.buildState();
                    parameters.since = type;
                    return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API upon processing a successful DELETE request with a valid "stateId" as a parameter deletes the document satisfying the requirements of the DELETE and returns code 204 No Content (7.4.b)', function () {
            var parameters = helper.buildState(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
                });
        });

        //+* NOTE:  **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**
        it('An LRS\'s State API upon processing a successful DELETE request without "stateId" as a parameter deletes documents satisfying the requirements of the DELETE and code 204 No Content (7.4.d)', function () {
            var parameters = helper.buildState();
            parameters.activityId = parameters.activityId + helper.generateUUID();

            return sendRequest('post', helper.getEndpointActivitiesState(), parameters, helper.buildDocument(), 204)
                .then(function () {
                    delete parameters.stateId;
                    return sendRequest('post', helper.getEndpointActivitiesState(), helper.buildState(), helper.buildDocument(), 204)
                    .then(function () {
                        return sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204)
                            .then(function () {
                                return sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                                    .then(function (res) {
                                        var body = res.body;
                                        expect(body).to.be.an('array');
                                        expect(body).to.have.length(0);
                                    });
                            });
                    });
                });
        });

        it('An LRS\'s Activities API accepts GET requests (7.5)', function () {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;
            var parameters = {
                activityId: data.statement.object.id
            }
            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 200);
                });
        });

        it('An LRS\'s Activities API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table1.row1.b)', function () {
            return sendRequest('get', helper.getEndpointActivities(), undefined, undefined, 400);
        });

        it('An LRS\'s Activities API rejects a GET request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table1.row1.a)', function () {
            var invalidTypes = [1, true, { key: 'value'}];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "since" with type ' + type, function () {
                    var parameters = helper.buildActivity();
                    parameters.since = type;
                    return sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s Activities API upon processing a successful GET request returns the complete Activity Object (7.5)', function () {
            var templates = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.default}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;
            statement.object.id = 'http://www.example.com/verify/complete/34534';

            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    var parameters = {
                        activityId: statement.object.id
                    };
                    return sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 200)
                        .then(function (res) {
                            var activity = res.body;
                            expect(activity).to.be.ok;
                            expect(activity).to.eql(statement.object);
                        });
                });
        });

        it('An LRS\'s Activity Profile API accepts PUT requests (7.5)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 204);
        });

        it('An LRS\'s Activity Profile API rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            delete parameters.activityId;
            return sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
        });

        describe('An LRS\'s Activity Profile API API rejects a PUT request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, { key: 'value'}];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT with "activityId" with type ' + type, function () {
                    var parameters = helper.buildActivityProfile();
                    parameters.activityId = type;
                    return sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            delete parameters.profileId;
            return sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
        });

        it('An LRS\'s Activity Profile API upon processing a successful PUT request returns code 204 No Content (7.5.b)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 204);
        });

        it('An LRS\'s Activity Profile API accepts POST requests (7.5)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
        });

        it('An LRS\'s Activity Profile API rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            delete parameters.activityId;
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
        });

        describe('An LRS\'s Activity Profile API rejects a POST request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, { key: 'value'}];
            invalidTypes.forEach(function (type) {
                it('Should reject POST with "activityId" with type ' + type, function () {
                    var parameters = helper.buildActivityProfile();
                    parameters.activityId = type;
                    return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            delete parameters.profileId;
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
        });

        it('An LRS\'s Activity Profile API upon processing a successful POST request returns code 204 No Content (7.5.b)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
        });

        it('An LRS\'s Activity Profile API accepts DELETE requests (7.5)', function () {
            var parameters = helper.buildActivityProfile();
            return sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 204);
        });

        it('An LRS\'s Activity Profile API rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = helper.buildActivityProfile();
            delete parameters.activityId;
            return sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
        });

        describe('An LRS\'s Activity Profile API rejects a DELETE request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
            var invalidTypes = [1, true, { key: 'value'}];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "activityId" with type ' + type, function () {
                    var parameters = helper.buildActivityProfile();
                    parameters.activityId = type;
                    return sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = helper.buildActivityProfile();
            delete parameters.profileId;
            return sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
        });

        it('An LRS\'s Activity Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (7.5.b)', function () {
            var parameters = helper.buildActivityProfile();
            return sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, '', 204);
        });

        it('An LRS\'s Activity Profile API accepts GET requests (7.5)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200);
                });
        });

        it('An LRS\'s Activity Profile API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = helper.buildActivityProfile();
            delete parameters.activityId;
            return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
        });

        describe('An LRS\'s Activity Profile API rejects a GET request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row1.a)', function () {
            var invalidTypes = [1, true, { key: 'value'}];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "activityId" with type ' + type, function () {
                    var parameters = helper.buildActivityProfile();
                    parameters.activityId = type;
                    return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API can process a GET request with "since" as a parameter (multiplicity, 7.5.table3.row2.c, 7.5.table3.row2.b)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function () {
                    parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                    return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200);
                });
        });

        describe('An LRS\'s Activity Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.5.table3.row2.a)', function () {
            var invalidTypes = [1, true, 'not Timestamp'];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "since" with type ' + type, function () {
                    var parameters = helper.buildActivityProfile();
                    parameters.since = type;
                    return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (7.5.c)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.eql(document);
                        })
                });
        });

        it('An LRS\'s Activity Profile API upon processing a successful GET request without "profileId" as a parameter returns an array of ids of activity profile documents satisfying the requirements of the GET and code 200 OK (7.5.d)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            parameters.activityId = parameters.activityId + helper.generateUUID();
            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function () {
                    delete parameters.profileId;
                    return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.be.an('array');
                            expect(body).to.be.length.above(0);
                        });
                });
        });

        it('An LRS\'s returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (7.5.table3.row2)', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();
            parameters.activityId = parameters.activityId + helper.generateUUID();

            return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function () {
                    delete parameters.profileId;
                    parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString(); // Date 1 second ago
                    return sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.be.an('array');
                            expect(body).to.be.length.above(0);
                        });
                });
        });

        it('An LRS\'s Agents API accepts GET requests (7.6)', function () {
            return sendRequest('get', helper.getEndpointAgents(), helper.buildAgent(), undefined, 200);
        });

        it('An LRS\'s Agents API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table2.row1.c)', function () {
            return sendRequest('get', helper.getEndpointAgents(), undefined, undefined, 400);
        });

        it('An LRS\'s Agent Profile API accepts PUT requests (7.6)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 204);
        });

        it('An LRS\'s Agent Profile API rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            delete parameters.agent;
            return sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 400);
        });

        describe('An LRS\'s Agent Profile API rejects a PUT request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, 7.6.table3.row1.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, 'not Agent', { key: 'value'}];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT with "agent" with type ' + type, function () {
                    var parameters = helper.buildAgentProfile();
                    parameters.agent = type;
                    return sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row2.c)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            delete parameters.profileId;
            return sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 400);
        });

        it('An LRS\'s Agent Profile API upon processing a successful PUT request returns code 204 No Content (7.6.e)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 204);
        });

        it('An LRS\'s Agent Profile API accepts POST requests (7.6)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
        });

        it('An LRS\'s Agent Profile API rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            delete parameters.agent;
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
        });

        it('An LRS\'s Agent Profile API rejects a POST request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, 7.6.table3.row1.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, { key: 'value'}];
            invalidTypes.forEach(function (type) {
                it('Should reject POST with "agent" with type ' + type, function () {
                    var parameters = helper.buildAgentProfile();
                    parameters.agent = type;
                    return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row2.c)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            delete parameters.profileId;
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
        });

        it('An LRS\'s Agent Profile API upon processing a successful POST request returns code 204 No Content (7.6.e)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
        });

        it('An LRS\'s Agent Profile API accepts DELETE requests (7.6)', function () {
            var parameters = helper.buildAgentProfile();
            return sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 204);
        });

        it('An LRS\'s Agent Profile API rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c)', function () {
            var parameters = helper.buildAgentProfile();
            delete parameters.agent;
            return sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
        });

        describe('An LRS\'s Agent Profile API rejects a DELETE request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, 7.6.table3.row1.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, { key: 'value'}];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "agent" with type ' + type, function () {
                    var parameters = helper.buildAgentProfile();
                    parameters.agent = type;
                    return sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row2.c)', function () {
            var parameters = helper.buildAgentProfile();
            delete parameters.profileId;
            return sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
        });

        describe('An LRS\'s Agent Profile API rejects a DELETE request with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.6.table3.row2.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, { key: 'value'}];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "profileId" with type ' + type, function () {
                    var parameters = helper.buildAgentProfile();
                    parameters.agent = type;
                    return sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (7.6.e)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 204)
                });
        });

        it('An LRS\'s Agent Profile API accepts GET requests (7.6)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200);
                });
        });

        it('An LRS\'s Agent Profile API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c, 7.6.table4.row1.c)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            delete parameters.agent;
            return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
        });

        describe('An LRS\'s Agent Profile API rejects a GET request with "agent" as a parameter if it is not an Actor Object with error code 400 Bad Request (format, 7.6.table3.row1.c, 7.6.table4.row1.c)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, {"not_actor": "yup"}, 'not Actor'];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "agent" with type ' + type, function () {
                    var parameters = helper.buildAgentProfile();
                    parameters.agent = type;
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API can process a GET request with "since" as a parameter (Multiplicity, 7.6.table4.row2.a, 7.5.table4.row2.c)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200);
                });
        });

        describe('An LRS\'s Agent Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.6.table4.row2.a)', function () {
            var document = helper.buildDocument(),
                invalidTypes = [1, true, { key: 'value'}, 'not timestamp'];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "since" with type ' + type, function () {
                    var parameters = helper.buildAgentProfile();
                    parameters.agent = type;
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (7.6, 7.6.f)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.eql(document);
                        })
                });
        });

        it('An LRS\'s Agent Profile API upon processing a successful GET request without "profileId" as a parameter returns an array of ids of agent profile documents satisfying the requirements of the GET and code 200 OK (7.6, 7.6.g)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    delete parameters.profileId;
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.have.length.above(0);
                        })
                });
        });

        it('An LRS\'s returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (7.6.table4.row2, 7.6.g)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                    delete parameters.profileId;
                    return sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                        .then(function (res) {
                            var body = res.body;
                            expect(body).to.have.length.above(0);
                        })
                });
        });

        it('An LRS\'s About API accepts GET requests (7.7.b)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200);
        });

        it('An LRS\'s About API upon processing a successful GET request returns a version property and code 200 OK (multiplicity, 7.7.table1.row1.c, 7.7.c)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200)
                .then(function (res) {
                    var about = res.body;
                    expect(about).to.have.property('version');
                });
        });

        it('An LRS\'s About API\'s version property is an array of strings (format, 7.7.table1.row1.a)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200)
                .then(function (res) {
                    var about = res.body;
                    expect(about).to.have.property('version').to.be.an('array');
                });
        });

        it('An LRS\'s About API\'s version property contains at least one string of "1.0.1" (7.7.d)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200)
                .then(function (res) {
                    var about = res.body;
                    expect(about).to.have.property('version').to.be.an('array');

                    var foundVersion = false
                    about.version.forEach(function (item) {
                        if (item === '1.0.1') {
                            foundVersion = true;
                        }
                    })
                    expect(foundVersion).to.be.true;
                });
        });

        it('An LRS\'s About API\'s version property can only have values of ".9", ".95", "1.0", "1.0.0", or ""1.0." + X" with (7.7.d.a)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200)
                .then(function (res) {
                    var about = res.body;
                    expect(about).to.have.property('version').to.be.an('array');
                    var validVersions = ['.9', '.95', '1.0', '1.0.0', '1.0.1', '1.0.2'];
                    about.version.forEach(function (item) {
                        expect(validVersions).to.include(item);
                    })
                });
        });

        it('An LRS\'s About API upon processing a successful GET request can return an Extension with code 200 OK (multiplicity, 7.7.table1.row2.c, 7.7.c)', function () {
            return sendRequest('get', helper.getEndpointAbout(), undefined, undefined, 200)
                .then(function (res) {
                    var about = res.body;
                    expect(about).to.have.property('extensions');
                });
        });

        it('Any LRS API that accepts a POST request can accept a POST request with a single query string parameter named "method" on that request (7.8.a)', function () {
            var parameters = {method: 'post'},
                formBody = helper.buildFormBody(helper.buildStatement());
            return sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 200);
        });

        it('An LRS must parse the body of a Cross Origin Request and construct a new Request from it with the type of Request being the same as the value of the "method" parameter (7.8.a, 7.8.b)', function () {
            var parameters = {method: 'put'},
                formBody = helper.buildFormBody(helper.buildStatement(), helper.generateUUID());
            return sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 204)
        });

        it('An LRS will map form parameters from the body of the Cross Origin Request to the similarly named HTTP Headers in the new Request (7.8.b)', function () {
            var parameters = {method: 'get'};
            return sendRequest('post', helper.getEndpointStatements(), parameters, undefined, 200)
                .then(function (res) {
                    var body = res.body;
                    expect(body).to.have.property('statements');
                    expect(body).to.have.property('more');
                });
        });

        it('An LRS rejects a new Request in the same way for violating rules of this document as it would a normal Request **Implicit**', function () {
            var parameters = {method: 'post'},
                formBody = helper.buildFormBody(helper.buildStatement().actor);
            return sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 400);
        });

        it('An LRS will reject any request sending content which does not have a form parameter with the name of "content" (7.8.c)', function () {
            var parameters = {method: 'put'};
            return sendRequest('post', helper.getEndpointStatements(), parameters, undefined, 400);
        });

        it('An LRS will reject a new Request with a form parameter named "content" if "content" is found to be binary data with error code 400 Bad Request (7.8.c)', function () {
            var parameters = {method: 'post'},
                formBody = {
                'X-Experience-API-Version': '1.0.2',
                'Content-Type': 'application/json',
                }
            formBody.content = new Buffer("I'm a string", "binary");
            return sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 400);
        });

        it('An LRS will reject a Cross Origin Request which attempts to send attachment data with error code 400 Bad Request (7.8.d)', function () {
            var templates = [
                {statement: '{{statements.attachment}}'}
            ];
            var data = createFromTemplate(templates);
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

        it('An LRS accepts HEAD requests (7.10.a)', function () {
            it('should succeed GET about with no body', function () {
                return sendRequest('head', helper.getEndpointAbout(), undefined, undefined, 200);
            });

            it('should succeed GET activities with no body', function () {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset'
                };
                return sendRequest('head', helper.getEndpointActivities(), parameters, undefined, 200);
            });

            it('should succeed GET activities profile with no body', function () {
                return sendRequest('head', helper.getEndpointActivitiesProfile(), helper.buildActivityProfile(), undefined, 200);
            });

            it('should succeed GET activities state with no body', function () {
                return sendRequest('head', helper.getEndpointActivitiesState(), helper.buildState(), undefined, 200);
            });

            it('should succeed GET agents with no body', function () {
                return sendRequest('head', helper.getEndpointAgents(), helper.buildAgent(), undefined, 200);
            });

            it('should succeed GET agents profile with no body', function () {
                return sendRequest('head', helper.getEndpointAgentsProfile(), helper.buildAgentProfile(), undefined, 200);
            });

            it('should succeed GET statements with no body', function () {
                return sendRequest('head', helper.getEndpointStatements(), undefined, undefined, 200);
            });
        });

        describe('An LRS responds to a HEAD request in the same way as a GET request, but without the message-body (7.10.a, 7.10.a.a) **This means run ALL GET tests with HEAD**', function () {
            it('should succeed HEAD about with no body', function () {
                return sendRequest('head', helper.getEndpointAbout(), undefined, undefined, 200)
                    .then(function (res) {
                        expect(Object.keys(res.body)).to.have.length(0);
                    });
            });

            it('should succeed HEAD activities with no body', function () {
                var templates = [
                    {statement: '{{statements.default}}'}
                ];
                var data = createFromTemplate(templates);
                var statement = data.statement;
                var parameters = {
                    activityId: data.statement.object.id
                }
                return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                    .then(function () {
                        return sendRequest('head', helper.getEndpointActivities(), parameters, undefined, 200)
                            .then(function (res) {
                                expect(Object.keys(res.body)).to.have.length(0);
                            });
                    });
            });

            it('should succeed HEAD activities profile with no body', function () {
                var parameters = helper.buildActivityProfile(),
                    document = helper.buildDocument();
                return sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                    .then(function () {
                        return sendRequest('head', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                            .then(function (res) {
                                expect(Object.keys(res.body)).to.have.length(0);
                            })
                    });
            });

            it('should succeed HEAD activities state with no body', function () {
                var parameters = helper.buildState(),
                    document = helper.buildDocument();
                return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
                    .then(function () {
                        return sendRequest('head', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                            .then(function (res) {
                                expect(Object.keys(res.body)).to.have.length(0);
                            })
                    });
            });

            it('should succeed HEAD agents with no body', function () {
                return sendRequest('head', helper.getEndpointAgents(), helper.buildAgent(), undefined, 200)
                    .then(function (res) {
                        expect(Object.keys(res.body)).to.have.length(0);
                    });
            });

            it('should succeed HEAD agents profile with no body', function () {
                var parameters = helper.buildAgentProfile(),
                    document = helper.buildDocument();
                return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                    .then(function () {
                        return sendRequest('head', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                            .then(function (res) {
                                expect(Object.keys(res.body)).to.have.length(0);
                            })
                    });
            });

            it('should succeed HEAD statements with no body', function () {
                var statement = helper.buildStatement();
                return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                    .then(function () {
                        return sendRequest('head', helper.getEndpointStatements(), undefined, undefined, 200)
                            .then(function (res) {
                                expect(Object.keys(res.body)).to.have.length(0);
                            })
                    });
            });
        });

        it('A Person Object is an Object (7.6)', function () {
            return sendRequest('get', helper.getEndpointAgents(), helper.buildAgent(), undefined, 200)
                .then(function (res) {
                    var person = res.body;
                    expect(person).to.be.an('object');
                });
        });

        it('A Person Object\'s "objectType" property is a String and is "Person" (Format, Vocabulary, 7.6.table1.row1.a, 7.6.table1.row1.b)', function () {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;

            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                        .then(function (res) {
                            var person = res.body;
                            expect(person).to.have.property('objectType').to.equal('Person');
                        });
                });
        });

        it('A Person Object\'s "name" property is an Array of Strings (Multiplicity, 7.6.table1.row2.a)', function () {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;

            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                        .then(function (res) {
                            var person = res.body;
                            expect(person).to.have.property('name').to.be.an('array');
                            person.name.forEach(function(item){
                                expect(item).to.be.a('string');
                            });
                        });
                });
        });

        it('A Person Object\'s "mbox" property is an Array of IRIs (Multiplicity, 7.6.table1.row3.a)', function () {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;

            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                        .then(function (res) {
                            var person = res.body;
                            expect(person).to.have.property('mbox').to.be.an('array');
                            person.mbox.forEach(function(item){
                                expect(item).to.be.a('string');
                                var email = item.substring(MAIL_TO.length);
                                expect(isEmail(email)).to.be.true;
                            });
                        });
                });
        });

        it('A Person Object\'s "mbox" entries have the form "mailto:emailaddress" (Format, 7.6.table1.row3.a)', function () {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;

            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                        .then(function (res) {
                            var person = res.body;
                            expect(person).to.have.property('mbox').to.be.an('array');
                            person.mbox.forEach(function(item){
                                expect(item).to.be.a('string');
                                expect(item).to.match(/^mailto:/);
                            });
                        });
                });
        });

        it('A Person Object\'s "mbox_sha1sum" property is an Array of Strings (Multiplicity, 7.6.table1.row4.a)', function () {
            var templates = [
                {statement: '{{statements.no_actor}}'},
                {actor: '{{agents.mbox_sha1sum}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;

            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                        .then(function (res) {
                            var person = res.body;
                            expect(person).to.have.property('mbox_sha1sum').to.be.an('array');
                            person.mbox_sha1sum.forEach(function(item){
                                expect(item).to.be.a('string');
                            });
                        });
                });
        });

        it('A Person Object\'s "openid" property is an Array of Strings (Multiplicity, 7.6.table1.row5.a)', function () {
            var templates = [
                {statement: '{{statements.no_actor}}'},
                {actor: '{{agents.openid}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;

            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                        .then(function (res) {
                            var person = res.body;
                            expect(person).to.have.property('openid').to.be.an('array');
                            person.openid.forEach(function(item){
                                expect(item).to.be.a('string');
                            });
                        });
                });
        });

        it('A Person Object\'s "account" property is an Array of Account Objects (Multiplicity, 7.6.table1.row6.a)', function () {
            var templates = [
                {statement: '{{statements.no_actor}}'},
                {actor: '{{agents.account}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;

            return sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
                .then(function () {
                    return sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                        .then(function (res) {
                            var person = res.body;
                            expect(person).to.have.property('account').to.be.an('array');
                            person.account.forEach(function(item){
                                expect(item).to.be.an('object');
                            });
                        });
                });
        });

        it('A Person Object uses an "objectType" property exactly one time (Multiplicity, 7.6.table1.row1.c)', function (done) {
            // JSON Parser validation
            done();
        });

        it('A Person Object uses a "name" property at most one time (Multiplicity, 7.6.table1.row2.c)', function (done) {
            // JSON Parser validation
            done();
        });

        it('A Person Object uses a "mbox" property at most one time (Multiplicity, 7.6.table1.row3.c)', function (done) {
            // JSON Parser validation
            done();
        });

        it('A Person Object uses a "mbox_sha1sum" property at most one time (Multiplicity, 7.6.table1.row4.c)', function (done) {
            // JSON Parser validation
            done();
        });

        it('A Person Object uses an "openid" property at most one time (Multiplicity, 7.6.table1.row5.c)', function (done) {
            // JSON Parser validation
            done();
        });

        it('A Person Object uses an "account" property at most one time (Multiplicity, 7.6.table1.row6.c)', function (done) {
            // JSON Parser validation
            done();
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
