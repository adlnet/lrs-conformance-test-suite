/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * Created by vijay.budhram on 7/9/14.
 * Riptide Software
 */
(function (process, request, should, helper, qs) {
    "use strict";

    var LRS_ENDPOINT = process.env.LRS_ENDPOINT || 'http://asdf.elmnts-test.com:8001/lrs';
    var request = request(LRS_ENDPOINT);

    function sendRequest(type, url, params, body, expect) {
        var reqUrl = params ? (url + '?' + qs.stringify(params)) : url;
        var pre = request[type](reqUrl)
            .set('X-Experience-API-Version', '1.0.1');
        if (body) {
            pre.send(body);
        }
        return pre.expect(expect);
    }

    function buildActivity() {
        return 'http://www.example.com/activityId/hashset';
    }

    function buildState() {
        return {
            activityId: 'http://www.example.com/activityId/hashset',
            agent: {
                "objectType": "Agent",
                "account": {
                    "homePage": "http://www.example.com/agentId/1",
                    "name": "Rick James"
                }
            },
            stateId: helper.generateUUID()
        }
    }

    function buildActivityProfile() {
        return {
            activityId: 'http://www.example.com/activityId/hashset',
            profileId: helper.generateUUID()
        };
    }

    function buildAgentProfile() {
        return {
            activityId: 'http://www.example.com/activityId/hashset',
            agent: {
                "objectType": "Agent",
                "account": {
                    "homePage": "http://www.example.com/agentId/1",
                    "name": "Rick James"
                }
            },
            profileId: helper.generateUUID()
        };
    }

    function buildAgent() {
        return {
            "agent": {
                "name": "Rick James",
                "objectType": "Agent",
                "account": {
                    "homePage": "http://www.example.com/agentId/1",
                    "name": "Rick James"
                }
            }
        };
    }

    function buildDocument() {
        var document = {
            name: helper.generateUUID(),
            location: {
                name: helper.generateUUID()
            }
        };
        document[helper.generateUUID()] = helper.generateUUID();
        return document;
    }

    // Quick and dirty deep clone
    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    describe('Miscellaneous Requirements', function () {
        it('An LRS has a State API with endpoint "base IRI"+"/activities/state" (7.3.table1.row1.a ,7.3.table1.row1.c)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204);
        });

        it('An LRS has an Activities API with endpoint "base IRI" + /activities" (7.5) **Implicit** (in that it is not named this by the spec)', function (done) {
            // TODO Why this is connecting to statements DAL
            var parameters = {
                activityId: 'http://www.example.com/activityId/hashset'
            };

            request
                .get('/activities?' + qs.stringify(parameters))
                .set('X-Experience-API-Version', '1.0.1')
                .expect(200, function (err, res) {
                    done()
                });
        });

        it('An LRS has an Activity Profile API with endpoint "base IRI"+"/activities/profile" (7.3.table1.row2.a, 7.3.table1.row2.c)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('post', '/activities/profile', parameters, document, 204);
        });

        it('An LRS has an Agents API with endpoint "base IRI" + /agents" (7.6) **Implicit** (in that it is not named this by the spec)', function (done) {
            // TODO Talk to Fred about Agents
            var parameters = {
                objectType: 'Person'
            };

            request
                .get('/agents?' + qs.stringify(parameters))
                .set('X-Experience-API-Version', '1.0.1')
                .send({})
                .expect(200, function (err, res) {
                    done();
                });
        });

        it('An LRS has an Agent Profile API with endpoint "base IRI"+"/agents/profile" (7.3.table1.row3.a, 7.3.table1.row3.c)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('post', '/agents/profile', parameters, document, 204);
        });

        it('An LRS has an About API with endpoint "base IRI"+"/about" (7.7.a)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200);
        });

        it('An LRS will accept a POST request to the State API (7.3.table1.row1.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204);
        });

        it('An LRS will accept a POST request to the Activity Profile API (7.3.table1.row2.b)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('post', '/activities/profile', parameters, document, 204);
        });

        it('An LRS will accept a POST request to the Agent Profile API (7.3.table1.row3.b)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('post', '/agents/profile', parameters, document, 204);
        });

        describe('An LRS cannot reject a POST request to the State API based on the contents of the name/value pairs of the document (7.3.b) **Implicit**', function (done) {
            var parameters = buildState(),
                documents = [buildDocument(), 1, true, undefined];
            documents.forEach(function (document) {
                it('Should accept POST to State with document ' + document, function () {
                    return sendRequest('post', '/activities/state', parameters, document, 204);
                });
            });
        });

        describe('An LRS cannot reject a POST request to the Activity Profile API based on the contents of the name/value pairs of the document (7.3.b) **Implicit**', function () {
            var parameters = buildActivityProfile(),
                documents = [buildDocument(), 1, true, undefined];
            documents.forEach(function (document) {
                it('Should accept POST to Activity profile with document ' + document, function () {
                    return sendRequest('post', '/activities/profile', parameters, document, 204);
                });
            });
        });

        describe('An LRS cannot reject a POST request to the Agent Profile API based on the contents of the name/value pairs of the document (7.3.b) **Implicit**', function () {
            var parameters = buildAgentProfile(),
                documents = [{}, 1, true, undefined];
            documents.forEach(function (document) {
                it('Should accept POST to Agent profile with document ' + document, function () {
                    return sendRequest('post', '/agents/profile', parameters, document, 204);
                });
            });
        });

        it('An LRS\'s State API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (7.3.f)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/activities/state', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.eql(document);
                        });
                });
        });

        it('An LRS\'s State API, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (7.3.e)', function () {
            var parameters = buildState(),
                document = buildDocument(),
                anotherDocument = 'abc';
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('post', '/activities/state', parameters, anotherDocument, 400);
                });
        });

        // TODO
        // A Document Merge is defined by the merging of an existing document at an endpoint with a document received in a POST request. (7.3)

        // TODO
        // A Document Merge de-serializes all Objects represented by each document before making other changes. (7.3.d)

        // TODO
        // A Document Merge overwrites any duplicate Objects from the previous document with the new document. (7.3.d)

        // TODO
        // A Document Merge only performs overwrites at one level deep, although the entire object is replaced. (7.3.d)

        // TODO
        // A Document Merge re-serializes all Objects to finalize a single document (7.3.d)

        it('An LRS\'s State API performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (7.3.d)', function () {
            var parameters = buildState(),
                document = {
                    car: 'Honda'
                },
                anotherDocument = {
                    type: 'Civic'
                };
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('post', '/activities/state', parameters, anotherDocument, 204)
                        .then(function () {
                            return sendRequest('get', '/activities/state', parameters, undefined, 200)
                                .then(function (res) {
                                    res.body.should.eql({
                                        car: 'Honda',
                                        type: 'Civic'
                                    })
                                });
                        });
                });
        });

        it('An LRS\'s Activity Profile API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (7.3.f)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('post', '/activities/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/activities/profile', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.eql(document);
                        })
                });
        });

        it('An LRS\'s Activity Profile API, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (7.3.e)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument(),
                anotherDocument = 'abc';
            return sendRequest('post', '/activities/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('post', '/activities/profile', parameters, anotherDocument, 400);
                });
        });

        it('An LRS\'s Activity Profile API performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (7.3.d)', function () {
            var parameters = buildActivityProfile(),
                document = {
                    car: 'Honda'
                },
                anotherDocument = {
                    type: 'Civic'
                };
            return sendRequest('post', '/activities/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('post', '/activities/profile', parameters, anotherDocument, 204)
                        .then(function () {
                            return sendRequest('get', '/activities/profile', parameters, undefined, 200)
                                .then(function (res) {
                                    res.body.should.eql({
                                        car: 'Honda',
                                        type: 'Civic'
                                    })
                                });
                        });
                });
        });

        it('An LRS\'s Agent Profile API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (7.3.f)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('post', '/agents/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/agents/profile', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.eql(document);
                        })
                });
        });

        it('An LRS\'s Agent Profile API, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (7.3.e)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument(),
                anotherDocument = 'abc';
            return sendRequest('post', '/agents/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('post', '/agents/profile', parameters, anotherDocument, 400);
                });
        });

        it('An LRS\'s Agent Profile API performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (7.3.d)', function () {
            var parameters = buildAgentProfile(),
                document = {
                    car: 'Honda'
                },
                anotherDocument = {
                    type: 'Civic'
                };
            return sendRequest('post', '/agents/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('post', '/agents/profile', parameters, anotherDocument, 204)
                        .then(function () {
                            return sendRequest('get', '/agents/profile', parameters, undefined, 200)
                                .then(function (res) {
                                    res.body.should.eql({
                                        car: 'Honda',
                                        type: 'Civic'
                                    })
                                });
                        });
                });
        });

        it('An LRS\'s State API accepts PUT requests (7.4)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('put', '/activities/state', parameters, document, 204);
        });

        it('An LRS\'s State API rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            delete parameters.activityId;
            return sendRequest('put', '/activities/state', parameters, document, 400);
        });

        describe('An LRS\'s State API rejects a PUT request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var invalidTypes = [{}, 1, true, undefined];
            invalidTypes.forEach(function (type) {
                it('Should State API reject a PUT request with activityId type ' + type, function () {
                    var parameters = buildState(),
                        document = buildDocument();
                    delete parameters.activityId;
                    return sendRequest('put', '/activities/state', parameters, document, 400);
                });
            });
        });

        //+* In 1.0.3, the IRI requires a scheme, but does not in 1.0.2, thus we only test type String in this version**
        it('An LRS\'s State API rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            delete parameters.agent;
            return sendRequest('put', '/activities/state', parameters, document, 400);
        });

        it('An LRS\'s State API rejects a PUT request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)', function () {
            var parameters = buildState(),
                document = buildDocument();
            parameters.agent = 'not JSON brah';
            return sendRequest('put', '/activities/state', parameters, document, 400);
        });

        it('An LRS\'s State API can process a PUT request with "registration" as a parameter  (multiplicity, 7.4.table1.row3.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            parameters.registration = helper.generateUUID();
            return sendRequest('put', '/activities/state', parameters, document, 204);
        });

        describe('An LRS\'s State API rejects a PUT request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request(format, 7.4.table1.row3.a)', function () {
            var parameters = buildState(),
                document = buildDocument(),
                invalidTypes = [1, true, 'not UUID'];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT with "registration" with type ' + type, function () {
                    parameters.registration = type;
                    return sendRequest('put', '/activities/state', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s State API rejects a PUT request without "stateId" as a parameter with error code 400 Bad Request(multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            delete parameters.stateId;
            return sendRequest('put', '/activities/state', parameters, document, 400);
        });

        describe('An LRS\'s State API rejects a PUT request  with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request(format, 7.4.table1.row1.a)', function () {
            var parameters = buildState(),
                document = buildDocument(),
                invalidTypes = [1, true, {}, undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT State with stateId type : ' + type, function () {
                    parameters.stateId = type;
                    return sendRequest('put', '/activities/state', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s State API upon processing a successful PUT request returns code 204 No Content (7.4.a)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('put', '/activities/state', parameters, document, 204);
        });

        it('An LRS\'s State API accepts POST requests (7.4)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204);
        });

        it('An LRS\'s State API rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            delete parameters.activityId;
            return sendRequest('post', '/activities/state', parameters, document, 400);
        });

        describe('An LRS\'s State API rejects a POST request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var parameters = buildState(),
                document = buildDocument(),
                invalidTypes = [1, true, {}, undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT State with stateId type : ' + type, function () {
                    parameters.activityId = type;
                    return sendRequest('post', '/activities/state', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s State API rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            delete parameters.agent;
            return sendRequest('post', '/activities/state', parameters, document, 400);
        });

        describe('An LRS\'s State API rejects a POST request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)', function () {
            var parameters = buildState(),
                document = buildDocument(),
                invalidTypes = [1, true, 'not JSON', undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject POST State with agent type : ' + type, function () {
                    parameters.agent = type;
                    return sendRequest('post', '/activities/state', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s State API can process a POST request with "registration" as a parameter (multiplicity, 7.4.table1.row3.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            parameters.registration = helper.generateUUID();
            return sendRequest('post', '/activities/state', parameters, document, 204);
        });

        describe('An LRS\'s State API rejects a POST request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, 7.4.table1.row3.a)', function () {
            var parameters = buildState(),
                document = buildDocument(),
                invalidTypes = [1, true, 'not UUID'];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT with "registration" with type ' + type, function () {
                    parameters.registration = type;
                    return sendRequest('post', '/activities/state', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s State API rejects a POST request without "stateId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            delete parameters.stateId;
            return sendRequest('post', '/activities/state', parameters, document, 400);
        });

        describe('An LRS\'s State API rejects a POST request  with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var parameters = buildState(),
                document = buildDocument(),
                invalidTypes = [1, true, {}, undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject POST with "stateId" with type ' + type, function () {
                    parameters.stateId = type;
                    return sendRequest('post', '/activities/state', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s State API upon processing a successful POST request returns code 204 No Content (7.4.a)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204);
        });

        it('An LRS\'s State API accepts GET requests (7.4)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/activities/state', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.eql(document);
                        });
                });
        });

        it('An LRS\'s State API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = buildState();
            delete parameters.activityId;
            return sendRequest('get', '/activities/state', parameters, undefined, 400);
        });

        describe('An LRS\'s State API rejects a GET request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var parameters = buildState(),
                invalidTypes = [1, true, {}, undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "activityId" with type ' + type, function () {
                    parameters.activityId = type;
                    return sendRequest('get', '/activities/state', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)', function () {
            var parameters = buildState();
            delete parameters.agent;
            return sendRequest('get', '/activities/state', parameters, undefined, 400);
        });

        describe('An LRS\'s State API rejects a GET request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)', function () {
            var parameters = buildState(),
                invalidTypes = [1, true, 'not JSON bruh', undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "agent" with type ' + type, function () {
                    parameters.agent = type;
                    return sendRequest('get', '/activities/state', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API can process a GET request with "registration" as a parameter (multiplicity, 7.4.table1.row3.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            parameters.registration = helper.generateUUID();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/activities/state', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.eql(document);
                        });
                });
        });

        describe('An LRS\'s State API rejects a GET request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, 7.4.table1.row3.a)', function () {
            var parameters = buildState(),
                invalidTypes = [1, true, 'not UUID bruh'];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "registration" with type ' + type, function () {
                    parameters.registration = type;
                    return sendRequest('get', '/activities/state', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API can process a GET request with "stateId" as a parameter (multiplicity, 7.4.table1.row3.b, 7.4.table2.row3.b) (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/activities/state', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.eql(document);
                        })
                });
        });

        describe('An LRS\'s State API rejects a GET request  with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var parameters = buildState(),
                invalidTypes = [1, true, {}, undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "stateId" with type ' + type, function () {
                    parameters.stateId = type;
                    return sendRequest('get', '/activities/state', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API can process a GET request with "since" as a parameter (multiplicity, 7.4.table2.row4.b, 7.4.table2.row3.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            parameters.since = new Date(Date.now() - 60 * 1000); // Date 1 minute ago
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/activities/state', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.eql(document);
                        });
                });
        });

        it('An LRS\'s State API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.4.table2.row4.a)', function () {
            var parameters = buildState();
            parameters.since = 'not a timestamp dog';
            return sendRequest('get', '/activities/state', parameters, undefined, 400);
        });

        it('An LRS\'s State API upon processing a successful GET request with a valid "stateId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (7.4.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/activities/state', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.eql(document);
                        });
                });
        });

        //+* NOTE:  **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**
        it('An LRS\'s State API upon processing a successful GET request without "stateId" as a parameter returns an array of ids of state data documents satisfying the requirements of the GET and code 200 OK (7.4.c)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    delete parameters.stateId;
                    return sendRequest('get', '/activities/state', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.be.instanceOf(Array);
                        });
                });
        });

        it('An LRS\'s returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request (7.4.table2.row4)', function () {
            var parameters = buildState(),
                document = buildDocument(),
                anotherDocument = buildDocument();
            var anotherParameters = clone(parameters);
            anotherParameters.stateId = helper.generateUUID();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('post', '/activities/state', anotherParameters, anotherDocument, 204)
                        .then(function () {
                            delete parameters.stateId;
                            parameters.since = new Date(Date.now() - 1000);
                            return sendRequest('get', '/activities/state', parameters, undefined, 200)
                                .then(function (res) {
                                    res.body.should.be.instanceOf(Array);
                                    res.body.length.should.equal(2);
                                });
                        });
                });
        });

        it('An LRS\'s State API accepts DELETE requests (7.4)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', '/activities/state', parameters, undefined, 204);
                });
        });

        it('An LRS\'s State API rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = buildState();
            delete parameters.activityId;
            return sendRequest('delete', '/activities/state', parameters, undefined, 400);
        });

        describe('An LRS\'s State API rejects a DELETE request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var parameters = buildState(),
                invalidTypes = [1, true, {}, undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "activityId" with type ' + type, function () {
                    parameters.activityId = type;
                    return sendRequest('delete', '/activities/state', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.4.table1.row2.b)', function () {
            var parameters = buildState();
            delete parameters.agent;
            return sendRequest('delete', '/activities/state', parameters, undefined, 400);
        });

        describe('An LRS\'s State API rejects a DELETE request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table1.row2.a)', function () {
            var parameters = buildState(),
                invalidTypes = [1, true, 'not JSON son', undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "agent" with type ' + type, function () {
                    parameters.activityId = type;
                    return sendRequest('delete', '/activities/state', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API can process a DELETE request with "registration" as a parameter (multiplicity, 7.4.table1.row3.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            parameters.registration = helper.generateUUID();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', '/activities/state', parameters, undefined, 204);
                });
        });

        describe('An LRS\'s State API rejects a DELETE request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, 7.4.table1.row3.a)', function () {
            var parameters = buildState(),
                invalidTypes = [1, true, 'not UUID son'];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "registration" with type ' + type, function () {
                    parameters.registration = type;
                    return sendRequest('delete', '/activities/state', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API can process a DELETE request with "stateId" as a parameter (multiplicity, 7.4.table1.row3.b, 7.4.table2.row3.b) (multiplicity, 7.4.table1.row1.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', '/activities/state', parameters, undefined, 204);
                });
        });

        describe('An LRS\'s State API rejects a DELETE request  with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
            var parameters = buildState(),
                invalidTypes = [1, true, {}, undefined];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "stateId" with type ' + type, function () {
                    parameters.stateId = type;
                    return sendRequest('delete', '/activities/state', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API can process a DELETE request with "since" as a parameter (multiplicity, 7.4.table2.row4.b, 7.4.table2.row3.b)  **Is this valid??**', function () {
            var parameters = buildState(),
                document = buildDocument();
            parameters.since = new Date();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', '/activities/state', parameters, undefined, 204);
                });
        });

        describe('An LRS\'s State API rejects a DELETE request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.4.table2.row4.a)  **And this would follow...**', function (done) {
            var parameters = buildState(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "since" with type ' + type, function () {
                    parameters.since = type;
                    return sendRequest('delete', '/activities/state', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s State API upon processing a successful DELETE request with a valid "stateId" as a parameter deletes the document satisfying the requirements of the DELETE and returns code 204 No Content (7.4.b)', function () {
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', '/activities/state', parameters, undefined, 204);
                });
        });

        //+* NOTE:  **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**
        it('An LRS\'s State API upon processing a successful DELETE request without "stateId" as a parameter deletes documents satisfying the requirements of the DELETE and code 200 OK (7.4.d)', function () {
            // TODO Spec doesn't state this should be 200
            var parameters = buildState(),
                document = buildDocument();
            return sendRequest('post', '/activities/state', parameters, document, 204)
                .then(function () {
                    delete parameters.stateId;
                    return sendRequest('delete', '/activities/state', parameters, undefined, 200);
                });
        });

        it('An LRS\'s Activities API accepts GET requests (7.5)', function (done) {
            var parameters = buildActivity(),
                document = buildDocument();
            return sendRequest('get', '/activities', parameters, document, 400)
                .then(function (res) {
                    // TODO Why Statement DAL?
                    done(new Error('Implement Test'));
                });
        });

        it('An LRS\'s Activities API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table1.row1.b)', function () {
            var parameters = buildActivity(),
                document = buildDocument();
            delete parameters.activityId;
            return sendRequest('get', '/activities', parameters, document, 400);
        });

        it('An LRS\'s Activities API rejects a GET request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table1.row1.a)', function () {
            var parameters = buildActivity(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "since" with type ' + type, function () {
                    parameters.since = type;
                    return sendRequest('get', '/activities', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s Activities API upon processing a successful GET request returns the complete Activity Object (7.5)', function () {
            var parameters = buildActivity(),
                document = buildDocument();
            return sendRequest('get', '/activities', parameters, document, 200);
        });

        it('An LRS\'s Activity Profile API accepts PUT requests (7.5)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('put', '/activities/profile', parameters, document, 204);
        });

        it('An LRS\'s Activity Profile API rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            delete parameters.activityId;
            return sendRequest('put', '/activities/profile', parameters, document, 400);
        });

        describe('An LRS\'s Activity Profile API API rejects a PUT request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT with "activityId" with type ' + type, function () {
                    parameters.activityId = type;
                    return sendRequest('put', '/activities/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            delete parameters.profileId;
            return sendRequest('put', '/activities/profile', parameters, document, 400);
        });

        describe('An LRS\'s Activity Profile API rejects a PUT request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT with "profileId" with type ' + type, function () {
                    parameters.profileId = type;
                    return sendRequest('put', '/activities/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API upon processing a successful PUT request returns code 204 No Content (7.5.b)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('put', '/activities/profile', parameters, document, 204);
        });

        it('An LRS\'s Activity Profile API accepts POST requests (7.5)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('post', '/activities/profile', parameters, document, 204);
        });

        it('An LRS\'s Activity Profile API rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            delete parameters.activityId;
            return sendRequest('post', '/activities/profile', parameters, document, 400);
        });

        describe('An LRS\'s Activity Profile API rejects a POST request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject POST with "activityId" with type ' + type, function () {
                    parameters.activityId = type;
                    return sendRequest('post', '/activities/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            delete parameters.profileId;
            return sendRequest('post', '/activities/profile', parameters, document, 400);
        });

        describe('An LRS\'s Activity Profile API rejects a POST request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject POST with "profileId" with type ' + type, function () {
                    parameters.profileId = type;
                    return sendRequest('post', '/activities/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API upon processing a successful POST request returns code 204 No Content (7.5.b)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('post', '/activities/profile', parameters, document, 204);
        });

        it('An LRS\'s Activity Profile API accepts DELETE requests (7.5)', function () {
            var parameters = buildActivityProfile();
            return sendRequest('delete', '/activities/profile', parameters, undefined, 204);
        });

        it('An LRS\'s Activity Profile API rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = buildActivityProfile();
            delete parameters.activityId;
            return sendRequest('delete', '/activities/profile', parameters, undefined, 400);
        });

        describe('An LRS\'s Activity Profile API rejects a DELETE request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
            var parameters = buildActivityProfile(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "activityId" with type ' + type, function () {
                    parameters.activityId = type;
                    return sendRequest('delete', '/activities/profile', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = buildActivityProfile();
            delete parameters.profileId;
            return sendRequest('delete', '/activities/profile', parameters, undefined, 400);
        });

        describe('An LRS\'s Activity Profile API rejects a DELETE request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)', function () {
            var parameters = buildActivityProfile(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "profileId" with type ' + type, function () {
                    parameters.profileId = type;
                    return sendRequest('delete', '/activities/profile', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (7.5.b)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('delete', '/activities/profile', parameters, document, 204);
        });

        it('An LRS\'s Activity Profile API accepts GET requests (7.5)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('post', '/activities/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/activities/profile', parameters, undefined, 200);
                });
        });

        it('An LRS\'s Activity Profile API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, 7.5.table2.row1.c)', function () {
            var parameters = buildActivityProfile();
            delete parameters.activityId;
            return sendRequest('get', '/activities/profile', parameters, undefined, 400);
        });

        describe('An LRS\'s Activity Profile API rejects a GET request  with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row1.a)', function () {
            var parameters = buildActivityProfile(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "activityId" with type ' + type, function () {
                    parameters.activityId = type;
                    return sendRequest('get', '/activities/profile', parameters, undefined, 400);
                });
            });
        });

        describe('An LRS\'s Activity Profile API rejects a GET request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table2.row2.a)', function () {
            var parameters = buildActivityProfile(),
                invalidTypes = [1, true, 'not JSON'];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "agent" with type ' + type, function () {
                    parameters.agent = type;
                    return sendRequest('get', '/activities/profile', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API can process a GET request with "since" as a parameter (multiplicity, 7.5.table3.row2.c, 7.5.table3.row2.b)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            parameters.since = new Date(Date.now() - 1000);
            return sendRequest('post', '/activities/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/activities/profile', parameters, undefined, 200);
                });
        });

        describe('An LRS\'s Activity Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.5.table3.row2.a)', function () {
            var parameters = buildActivityProfile(),
                invalidTypes = [1, true, 'not Timestamp bruh'];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "since" with type ' + type, function () {
                    parameters.since = type;
                    return sendRequest('get', '/activities/profile', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s Activity Profile API upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (7.5.c)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('post', '/activities/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/activities/profile', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.eql(document);
                        })
                });
        });

        it('An LRS\'s Activity Profile API upon processing a successful GET request without "profileId" as a parameter returns an array of ids of activity profile documents satisfying the requirements of the GET and code 200 OK (7.5.d)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('post', '/activities/profile', parameters, document, 204)
                .then(function () {
                    delete parameters.profileId;
                    return sendRequest('get', '/activities/profile', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.be.instanceOf(Array);
                            res.body.length.should.be.greaterThan(1);
                        });
                });
        });

        it('An LRS\'s returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (7.5.table3.row2)', function () {
            var parameters = buildActivityProfile(),
                document = buildDocument();
            return sendRequest('post', '/activities/profile', parameters, document, 204)
                .then(function () {
                    delete parameters.profileId;
                    parameters.since = new Date(Date.now() - 1000); // Date 1 second ago
                    return sendRequest('get', '/activities/profile', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.be.instanceOf(Array);
                            res.body.length.should.be.greaterThan(1);
                        });
                });
        });

        it('An LRS\'s Agents API accepts GET requests (7.6)', function (done) {
            // TODO Fix this test
            var parameters = buildAgent();
            //return sendRequest('get', '/agents', parameters, undefined, 200)
            //    .then(function (res) {
            //        res.body;
            //    });
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Agents API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table2.row1.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Agents API rejects a GET request  with "agent" as a parameter if it is a valid (in structure) Agent with error code 400 Bad Request (format, 7.6.table2.row1.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Agents API upon processing a successful GET request returns a Person Object if the "agent" parameter  can be found in the LRS and code 200 OK (7.6.c, 7.6.d)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Agents API upon processing a successful GET request returns a Person Object based on matched data from the "agent" parameter and code 200 OK (7.6.d)', function (done) {
            done(new Error('Implement Test'));
        });


        it('An LRS\'s Agent Profile API accepts PUT requests (7.6)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('put', '/agents/profile', parameters, document, 204);
        });

        it('An LRS\'s Agent Profile API rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            delete parameters.agent;
            return sendRequest('put', '/agents/profile', parameters, document, 400);
        });

        describe('An LRS\'s Agent Profile API rejects a PUT request  with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, 7.6.table3.row1.a)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, 'not Agent bruh', {}];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT with "agent" with type ' + type, function () {
                    parameters.agent = type;
                    return sendRequest('put', '/agents/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row2.c)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            delete parameters.profileId;
            return sendRequest('put', '/agents/profile', parameters, document, 400);
        });

        describe('An LRS\'s Agent Profile API rejects a PUT request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.6.table3.row2.a)', function () {
            var parameters = buildAgentProfile(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject PUT with "profileId" with type ' + type, function () {
                    parameters.profileId = type;
                    return sendRequest('put', '/agents/profile', parameters, undefined, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API upon processing a successful PUT request returns code 204 No Content (7.6.e)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('put', '/agents/profile', parameters, document, 204);
        });

        it('An LRS\'s Agent Profile API accepts POST requests (7.6)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('post', '/agents/profile', parameters, document, 204);
        });

        it('An LRS\'s Agent Profile API rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            delete parameters.agent;
            return sendRequest('post', '/agents/profile', parameters, document, 400);
        });

        it('An LRS\'s Agent Profile API rejects a POST request  with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, 7.6.table3.row1.a)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject POST with "agent" with type ' + type, function () {
                    parameters.agent = type;
                    return sendRequest('post', '/agents/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row2.c)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            delete parameters.profileId;
            return sendRequest('post', '/agents/profile', parameters, document, 400);
        });

        describe('An LRS\'s Agent Profile API rejects a POST request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.6.table3.row2.a)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject POST with "profileId" with type ' + type, function () {
                    parameters.profileId = type;
                    return sendRequest('post', '/agents/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API upon processing a successful POST request returns code 204 No Content (7.6.e)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('post', '/agents/profile', parameters, document, 204);
        });

        it('An LRS\'s Agent Profile API accepts DELETE requests (7.6)', function () {
            var parameters = buildAgentProfile();
            return sendRequest('delete', '/agents/profile', parameters, undefined, 204);
        });

        it('An LRS\'s Agent Profile API rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c)', function () {
            var parameters = buildAgentProfile();
            delete parameters.agent;
            return sendRequest('delete', '/agents/profile', parameters, undefined, 400);
        });

        describe('An LRS\'s Agent Profile API rejects a DELETE request  with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, 7.6.table3.row1.a)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "agent" with type ' + type, function () {
                    parameters.agent = type;
                    return sendRequest('delete', '/agents/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row2.c)', function () {
            var parameters = buildAgentProfile();
            delete parameters.profileId;
            return sendRequest('delete', '/agents/profile', parameters, undefined, 400);
        });

        describe('An LRS\'s Agent Profile API rejects a DELETE request  with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.6.table3.row2.a)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, {}];
            invalidTypes.forEach(function (type) {
                it('Should reject DELETE with "profileId" with type ' + type, function () {
                    parameters.agent = type;
                    return sendRequest('delete', '/agents/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (7.6.e)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('post', '/agents/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('delete', '/agents/profile', parameters, undefined, 204);
                });
        });

        it('An LRS\'s Agent Profile API accepts GET requests (7.6)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('post', '/agents/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/agents/profile', parameters, undefined, 200);
                });
        });

        it('An LRS\'s Agent Profile API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, 7.6.table3.row1.c, 7.6.table4.row1.c)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            delete parameters.agent;
            return sendRequest('get', '/agents/profile', parameters, document, 400);
        });

        describe('An LRS\'s Agent Profile API rejects a GET request with "agent" as a parameter if it is not an Actor Object with error code 400 Bad Request (format, 7.6.table3.row1.c, 7.6.table4.row1.c)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, {"not_actor": "yup"}, 'not Actor'];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "agent" with type ' + type, function () {
                    parameters.agent = type;
                    return sendRequest('get', '/agents/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API can process a GET request with "since" as a parameter (Multiplicity, 7.6.table4.row2.a, 7.5.table4.row2.c)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            parameters.since = new Date();
            return sendRequest('post', '/agents/profile', parameters, document, 204)
                .then(function () {
                    parameters.since = new Date(Date.now() - 1000);
                    return sendRequest('get', '/agents/profile', parameters, undefined, 200);
                });
        });

        describe('An LRS\'s Agent Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, 7.6.table4.row2.a)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument(),
                invalidTypes = [1, true, {}, 'not timestamp'];
            invalidTypes.forEach(function (type) {
                it('Should reject GET with "since" with type ' + type, function () {
                    parameters.agent = type;
                    return sendRequest('get', '/agents/profile', parameters, document, 400);
                });
            });
        });

        it('An LRS\'s Agent Profile API upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (7.6, 7.6.f)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('post', '/agents/profile', parameters, document, 204)
                .then(function () {
                    return sendRequest('get', '/agents/profile', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.eql(document);
                        })
                });
        });

        it('An LRS\'s Agent Profile API upon processing a successful GET request without "profileId" as a parameter returns an array of ids of agent profile documents satisfying the requirements of the GET and code 200 OK (7.6, 7.6.g)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('post', '/agents/profile', parameters, document, 204)
                .then(function () {
                    delete parameters.profileId;
                    return sendRequest('get', '/agents/profile', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.be.instanceOf(Array);
                            res.body.length.should.be.greaterThan(1);
                        })
                });
        });

        it('An LRS\'s returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (7.6.table4.row2, 7.6.g)', function () {
            var parameters = buildAgentProfile(),
                document = buildDocument();
            return sendRequest('post', '/agents/profile', parameters, document, 204)
                .then(function () {
                    parameters.since = new Date(Date.now() - 1000);
                    delete parameters.profileId;
                    return sendRequest('get', '/agents/profile', parameters, undefined, 200)
                        .then(function (res) {
                            res.body.should.be.instanceOf(Array);
                            res.body.length.should.be.greaterThan(1);
                        })
                });
        });

        it('An LRS\'s About API accepts GET requests (7.7.b)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200);
        });

        it('An LRS\'s About API upon processing a successful GET request returns a version property and code 200 OK (multiplicity, 7.7.table1.row1.c, 7.7.c)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200)
                .then(function (res) {
                    res.body.version.should.be.instanceOf(Array);
                });
        });

        it('An LRS\'s About API\'s version property is an array of strings (format, 7.7.table1.row1.a)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200)
                .then(function (res) {
                    res.body.version.should.be.instanceOf(Array);
                });
        });

        it('An LRS\'s About API\'s version property contains at least one string of "1.0.1" (7.7.d)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200)
                .then(function (res) {
                    res.body.version.should.be.instanceOf(Array);
                    res.body.version.length.should.be.greaterThan(0);
                });
        });

        it('An LRS\'s About API\'s version property can only have values of ".9", ".95", "1.0", "1.0.0", or ""1.0." + X" with (7.7.d.a)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200)
                .then(function (res) {
                    res.body.version.should.be.instanceOf(Array);
                    res.body.version.length.should.be.greaterThan(0);
                    var validVersions = ['.9','.95','1.0','1.0.0','1.0.1'];
                    res.body.version.forEach(function(item){
                        validVersions.should.containEql(item);
                    })
                });
        });

        it('An LRS\'s About API upon processing a successful GET request can return an Extension with code 200 OK (multiplicity, 7.7.table1.row2.c, 7.7.c)', function () {
            return sendRequest('get', '/about', undefined, undefined, 200)
                .then(function (res) {
                    res.body.extensions.should.be.instanceOf(Object);
                });
        });

        it('Any LRS API that accepts a POST request can accept a POST request with a single query string parameter named "method" on that request (7.8.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Cross Origin Request is defined as this POST request as described in the previous requirement (definition)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS must parse the body of a Cross Origin Request and construct a new Request from it with the type of Request being the same as the value of the "method" parameter (7.8.a, 7.8.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS will map form parameters from the body of the Cross Origin Request to the similarly named HTTP Headers in the new Request (7.8.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects a new Request in the same way for violating rules of this document as it would a normal Request **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS will reject any request sending content which does not have a form parameter with the name of "content" (7.8.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS will treat the content of the form parameter named "content" as a UTF-8 String (7.8.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS will reject a new Request with a form parameter named "content" if "content" is found to be binary data  with error code 400 Bad Request (7.8.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS will reject a new Request which attempts to send attachment data with error code 400 Bad Request (7.8.d)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS will reject a Cross Origin Request or new Request which contains any extra information with error code 400 Bad Request **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS accepts HEAD requests (7.10.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS responds to a HEAD request in the same way as a GET request, but without the message-body (7.10.a, 7.10.a.a) **This means run ALL GET tests with HEAD**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS accepts HEAD requests without Content-Length headers (7.10.a.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS accepts GET requests without Content-Length headers **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });
    });
}(process, require('supertest-as-promised'), require('should'), require('./../helper'), require('qs')));
