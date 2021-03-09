/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Agent Profile Resource Requirements (Communication 2.6)', () => {

/**  Matchup with Conformance
 * XAPI-00255 - below
 * XAPI-00256 - below
 * XAPI-00257 - below
 * XAPI-00258 - below
 * XAPI-00259 - below
 * XAPI-00260 - below
 * XAPI-00261 - below
 * XAPI-00262 - below
 * XAPI-00263 - below
 * XAPI-00264 - below
 * XAPI-00265 - below
 * XAPI-00266 - below
 * XAPI-00267 - below
 * XAPI-00268 - below
 * XAPI-00269 - below
 * XAPI-00270 - below
 * XAPI-00271 - below
 * XAPI-00272 - below
 * XAPI-00273 - below
 * XAPI-00274 - below
 * XAPI-00275 - below
 * XAPI-00276 - in parameters folder
 * XAPI-00277 - in parameters folder
 * XAPI-00278 - below
 * XAPI-00279 - below
 * XAPI-00280 - below
 * XAPI-00281 - below
 * XAPI-00282 - below
 * XAPI-00283 - below
 * XAPI-00284 - below
 */

/**  XAPI-00282, Communication 2.6 Agent Profile Resource
* An LRS has an Agent Profile API with endpoint "base IRI"+"/agents/profile"
*/
    describe('An LRS has an Agent Profile Resource with endpoint "base IRI"+"/agents/profile" (Communication 2.2.s3.table2.row3.a, Communication 2.2.table2.row3.c, XAPI-00282)', function () {

/**  XAPI-00274, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API accepts valid GET requests with code 200 OK, Profile document
 */
        it('An LRS\'s Agent Profile Resource accepts GET requests (Communication 2.6.s2, XAPI-00274)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function () {
                    return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200);
                });
        });

/**  XAPI-00273, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API upon processing a successful PUT request returns code 204 No Content
 */
        it('An LRS\'s Agent Profile Resource upon processing a successful PUT request returns code 204 No Content (Communication 2.6.s3, XAPI-00273)', function (done) {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointAgentsProfile() + "?" + helper.getUrlEncoding(parameters))
            .headers(helper.addAllHeaders({"If-None-Match": "*"}))
            .json(document)
            .expect(204, done);
        });

        // Test without the header for rejection
        it('An LRS\'s Agent Profile Resource upon processing a PUT request without an ETag header returns an error code and message (Communication 2.6.s3, XAPI-00273)', function (done) {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointAgentsProfile() + "?" + helper.getUrlEncoding(parameters))
            .headers(helper.addAllHeaders({}))
            .json(document)
            .expect(400, done);
        });


/**  XAPI-00272, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API upon processing a successful POST request returns code 204 No Content
 */
/**  XAPI-00283, Communication 2.6 Agent Profile Resource
 * An LRS will accept a POST request to the Agent Profile API
 */
        it('An LRS\'s Agent Profile Resource upon processing a successful POST request returns code 204 No Content (Communication 2.6.s3, XAPI-00272, XAPI-00283)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
        });

/**  XAPI-00271, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content
 */
        it('An LRS\'s Agent Profile Resource upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (Communication 2.6.s3, XAPI-00271)', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();
            return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 204)
            });
        });
    }); // describe

/**  XAPI-00259, Communication 2.6 Agent Profile Resource
 * The Agent Profile API MUST return 200 OK - Profile Content when a GET request is received with a valid agent JSON Object.
 */
/**  XAPI-00269, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API upon processing a successful GET request with a valid Agent Object and valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK
 */
    it('An LRS\'s Agent Profile Resource upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (Communication 2.6.s3, XAPI-00259, XAPI-00269)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    })
            });
    });

/**  XAPI-00264, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a PUT request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row1, XAPI-00264)', function (done) {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.agent;

        request(helper.getEndpointAndAuth())
        .put(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
        .headers(helper.addAllHeaders({"If-None-Match": "*"}))
        .json(document)
        .expect(400, done);
    });

/**  XAPI-00257, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a PUT request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request
 */
    describe('An LRS\'s Agent Profile Resource rejects a PUT request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, Communication 2.6.s3.table1.row1, XAPI-00257)', function () {

        it('Should reject PUT with "agent" with invalid value', function (done) {
            var document = helper.buildDocument();
            var parameters = helper.buildAgentProfile();
            parameters.agent = true;

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
            .headers(helper.addAllHeaders({"If-None-Match": "*"}))
            .json(document)
            .expect(400, done);
        });
    });

/**  XAPI-00263, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a POST request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row1, XAPI-00263)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

/**  XAPI-00256, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a POST request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a POST request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, Communication 2.6.s3.table1.row1, XAPI-00256)', function () {

        it('Should reject POST with "agent" with invalid value', function () {
            var document = helper.buildDocument();
            var parameters = helper.buildAgentProfile();
            parameters.agent = true;
            return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
        });
    });

/**  XAPI-00262, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row1, XAPI-00262)', function () {
        var parameters = helper.buildAgentProfile();
        delete parameters.agent;
        return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
    });

/**  XAPI-00255, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a DELETE request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request
 */
    describe('An LRS\'s Agent Profile Resource rejects a DELETE request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, Communication 2.6.s3.table1.row1, XAPI-00255)', function () {

        it('Should reject DELETE with "agent" with invalid value', function () {
            var document = helper.buildDocument();
            var parameters = helper.buildAgentProfile();
            parameters.agent = true;
            return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, document, 400);
        });
    });

/**  XAPI-00258, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a GET request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request
 */
    describe('An LRS\'s Agent Profile Resource rejects a GET request with "agent" as a parameter if it is a valid, in structure, Agent with error code 400 Bad Request (multiplicity, Communication 2.6.s4.table1.row1, Communication 2.6.s3.table1.row1, XAPI-00258)', function () {
        it('Should reject GET with "agent" with invalid value', function () {
            var parameters = helper.buildAgentProfile();
            parameters.agent = true;
            return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
        });
    });

/** XAPI-00267, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row2, XAPI-00267)', function (done) {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;

        request(helper.getEndpointAndAuth())
        .put(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
        .headers(helper.addAllHeaders({"If-None-Match": "*"}))
        .json(document)
        .expect(400, done);
    });

/**  XAPI-00266, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row2, XAPI-00266)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

/**  XAPI-00265, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row2, XAPI-00265)', function () {
        var parameters = helper.buildAgentProfile();
        delete parameters.profileId;
        return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
    });

/**  XAPI-00270, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API upon processing a successful GET request with a valid Agent Object and without "profileId" as a parameter returns an array of ids of agent profile documents satisfying the requirements of the GET and code 200 OK
 */
    it('An LRS\'s Agent Profile Resource upon processing a successful GET request without "profileId" as a parameter returns an array of ids of agent profile documents satisfying the requirements of the GET and code 200 OK (Communication 2.6.s4, XAPI-00270)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                delete parameters.profileId;
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.have.length.above(0);
                    });
            });
    });

/**  XAPI-00261, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a GET request without "agent" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Agent Profile Resource rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s4.table1.row1, XAPI-00261)', function () {
        var parameters = helper.buildAgentProfile();
        delete parameters.agent;
        return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
    });

/**  XAPI-00268, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API can process a GET request with "since" as a parameter. Returning 200 OK and all matching profiles after the date/time of the “since” parameter
 */
    it('An LRS\'s Agent Profile Resource can process a GET request with "since" as a parameter (Multiplicity, Communication 2.6.s4.table1.row2, XAPI-00268)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                parameters.since = new Date(Date.now() - 60 * 1000 - helper.getTimeMargin()).toISOString(); //Date one minute ago
                delete parameters.profileId
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200);
            });
    });

/**  XAPI-00260, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request
 */
    describe('An LRS\'s Agent Profile Resource rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, Communication 2.6.s4.table1.row2, XAPI-00260)', function () {
        it('Should reject GET with "since" with invalid value', function () {
            var parameters = helper.buildAgentProfile();
            delete parameters.profileId
            parameters.since = true;
            return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
        });
    });

/**  XAPI-00275, Communication 2.6 Agent Profile Resource
 * The Agent Profile API's returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present
 */
    it('An LRS\'s returned array of ids from a successful GET request to the Agent Profile Resource all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (Communication 2.6.s4.table1.row2, XAPI-00275)', function () {
        var parameters = helper.buildAgentProfile(),
            profile1 = parameters.profileId;
            document = helper.buildDocument();
        var since = new Date(Date.now() - 60 * 1000 - helper.getTimeMargin()).toISOString();    //Date one minute ago

        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                parameters.since = since;
                delete parameters.profileId;
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.be.an('array');
                        expect(body).to.have.length.above(0);
                        expect(body).to.contain(profile1);
                    })
            });
    });

/**  XAPI-00279, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API performs a Document Merge if a profileId is found and both it and the document in the POST request have type "application/json" If the merge is successful, the LRS MUST respond with HTTP status code 204 No Content.
 * not quite, but is this close enough??
 */
    it('An LRS\'s Agent Profile Resource performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3, XAPI-00279)', function () {
        var parameters = helper.buildAgentProfile(),
            document = {
                car: 'Honda'
            },
            anotherDocument = {
                type: 'Civic'
            };
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
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

/**  XAPI-00280, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document.Returning 204 No Content
 */
    it('An LRS\'s Agent Profile Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (Communication 2.2.s7, XAPI-00280)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    })
            });
    });

/**  XAPI-00278, Communication 2.6 Agent Profile Resource
 * An LRS's Agent Profile API, rejects a POST request if the document is found and either document's type is not "application/json" with error code 400 Bad Request
 */
    describe('An LRSs Agent Profile Resource, rejects a POST request if the document is found and either documents type is not "application/json" with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row3, Communication 2.2.s8.b1, XAPI-00278)', function () {
// case 1 - bad post
        it("If the document being posted to the Agent Profile Resource does not have a Content-Type of application/json and the existing document does, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.", function (done) {
            var parameters = helper.buildAgentProfile();
            var document = helper.buildDocument();

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointAgentsProfile()+ '?' + helper.getUrlEncoding(parameters) )
            .headers(helper.addAllHeaders({}))
            .json(document)
            .expect(204, function (err,res) {
                if (err) {
                    done(err);
                } else {
                    var document2 = "abcdefg";
                    var header2 = {'content-type': 'application/octet-stream'};

                    request(helper.getEndpointAndAuth())
                    .post(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
                    .headers(helper.addAllHeaders(header2))
                    .body(document2)
                    .expect(400, function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            request(helper.getEndpointAndAuth())
                            .get(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
                            .headers(helper.addAllHeaders({}))
                            .expect(200, function (err, res) {
                                if (err) {
                                    done(err);
                                } else {
                                    var result = helper.parse(res.body);
                                    expect(result).to.eql(document);
                                    done(err);
                                }
                            });
                        }
                    });
                }
            });
        });
// case 2 - bad existing
        it("If the existing document does not have a Content-Type of application/json but the document being posted to the Agent Profile Resource does the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.", function (done) {
            var parameters = helper.buildAgentProfile();
            var attachment = "/ asdf / undefined";
            var header = {'content-type': 'application/octet-stream', 'If-None-Match': '*'};

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointAgentsProfile()+ '?' + helper.getUrlEncoding(parameters) )
            .headers(helper.addAllHeaders(header))
            .body(attachment)
            .expect(204,function(err,res) {
                if (err) {
                    done(err);
                } else {
                    var attachment2 = helper.buildDocument();

                    request(helper.getEndpointAndAuth())
                    .post(helper.getEndpointAgentsProfile()+ '?' + helper.getUrlEncoding(parameters) )
                    .headers(helper.addAllHeaders({}))
                    .json(attachment2)
                    .expect(400, function (err,res) {
                        if (err) {
                            done(err);
                        } else {
                            request(helper.getEndpointAndAuth())
                            .get(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
                            .headers(helper.addAllHeaders({}))
                            .expect(200, function (err, res) {
                                if (err) {
                                    done(err);
                                } else {
                                    expect(res.body).to.eql(attachment);
                                    done();
                                }
                            });
                        }
                    });
                }
            });
        });
// case 3 - bad json
        it("If the document being posted to the Agent Profile Resource has a content type of Content-Type of application/json but cannot be parsed as a JSON Object, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.", function (done) {
            var parameters = helper.buildAgentProfile();
            var document = helper.buildDocument()

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
            .headers(helper.addAllHeaders({}))
            .json(document)
            .expect(204, function(err,res) {
                if (err) {
                    done(err);
                } else {
                    var header = {'content-type': 'application/json'};
                    var attachment = JSON.stringify(helper.buildAgentProfile()) + '{';

                    request(helper.getEndpointAndAuth())
                    .post(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
                    .headers(helper.addAllHeaders(header))
                    .body(attachment)
                    .expect(400, function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            request(helper.getEndpointAndAuth())
                            .get(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
                            .headers(helper.addAllHeaders({}))
                            .expect(200, function (err, res) {
                                if (err) {
                                    done(err);
                                } else {
                                    var result = helper.parse(res.body);
                                    expect(result).to.eql(document);
                                    done();
                                }
                            });
                        }
                    });
                }
            });
        });
    });

/**  XAPI-00281, Communication 2.6 Agent Profile Resource
 * An LRS must reject with 400 Bad Request a POST request to the Activitiy Profile API which contains name/value pairs with invalid JSON and the Content-Type header is "application/json"
 */
    it("An LRS's Agent Profile Resource, rejects a POST request if the document is found and either document is not a valid JSON Object (Communication 2.6, XAPI-00281)", function (done) {
        var parameters = helper.buildAgentProfile();
        var document = helper.buildDocument();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
        .headers(helper.addAllHeaders({}))
        .json(document)
        .expect(204, function(err,res) {
            if (err) {
                done(err);
            } else {
                var document2 = 'abcdefg';
                var header2 = {'content-type': 'not/json'};

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
                .headers(helper.addAllHeaders(header2))
                .body(document2)
                .expect(400, function (err,res) {
                    if (err) {
                        done(err);
                    } else {
                        request(helper.getEndpointAndAuth())
                        .get(helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters))
                        .headers(helper.addAllHeaders({}))
                        .expect(200, function (err, res) {
                            if (err) {
                                done(err)
                            } else {
                                var result = helper.parse(res.body);
                                expect(result).to.eql(document);
                                done();
                            }
                        });
                    }
                });
            }
        });
    });

/**  XAPI-00284, Communication 2.6 Agent Profile Resource
 * An LRS must reject with 400 Bad Request a POST request to the Activitiy Profile API which contains name/value pairs with invalid JSON and the Content-Type header is "application/json"
 */
    it("An LRS must reject with 400 Bad Request a POST request to the Activitiy Profile Resource which contains name/value pairs with invalid JSON and the Content-Type header is 'application/json' (Communication 2.6, XAPI-00284)", function (done) {
            var parameters = {
               profileId: helper.generateUUID()
            }

            var agent = encodeURIComponent( JSON.stringify({
                    "objectType": "Agent",
                    "account": {
                        "homePage": "http://www.example.com/agentId/1",
                        "name": "Rick James"
                    }
                })
                ).replace('%3A','%22'); //break the encoding here.

            var attachment = JSON.stringify(helper.buildDocument());
            var header = {'content-type': 'application/json'};

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointAgentsProfile()+ '?' + helper.getUrlEncoding(parameters) +"&agent=" + agent)
                .headers(helper.addAllHeaders(header))
                .body(attachment)
                .expect(400, done);
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
