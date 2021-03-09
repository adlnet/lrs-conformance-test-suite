/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Activity Profile Resource Requirements (Communication 2.7)', () => {

/**  Matchup with
 * XAPI-00285 - below
 * XAPI-00286 - below
 * XAPI-00287 - below
 * XAPI-00288 - below
 * XAPI-00289 - below
 * XAPI-00290 - below
 * XAPI-00291 - below
 * XAPI-00292 - below
 * XAPI-00293 - below
 * XAPI-00294 - below
 * XAPI-00295 - below
 * XAPI-00296 - below
 * XAPI-00297 - below
 * XAPI-00298 - below
 * XAPI-00299 - below
 * XAPI-00300 - below
 * XAPI-00301 - below
 * XAPI-00302 - below
 * XAPI-00303 - below
 * XAPI-00304 - 'agent' is not a valid parameter in the Activity Profile Resource
 * XAPI-00305 - in Parameters folder
 * XAPI-00306 - in Parameters folder
 * XAPI-00307 - in Parameters folder
 * XAPI-00308 - below
 * XAPI-00309 - below
 * XAPI-00310 - below
 * XAPI-00311 - below
 * XAPI-00312 - below
 * XAPI-00313 - below
 * XAPI-00314 - below
 */

/**  XAPI-00311, Communication 2.7 Activity Profile Resource
* An LRS has an Activity Profile API with endpoint "base IRI"+"/activities/profile"
*/
    it('An LRS has an Activity Profile Resource with endpoint "base IRI"+"/activities/profile" (Communication 2.2.s3.table1.row2, XAPI-00311)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();

        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

/**  XAPI-00287, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API upon processing a successful PUT request returns code 204 No Content
 */
/**  XAPI-00293, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API accepts PUT requests
 */
    describe('An LRS\'s Activity Profile Resource accepts PUT requests (Communication 2.7, XAPI-00287, XAPI-00293)', function () {
        it('passes with 204 no content', function (done) {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointActivitiesProfile() + "?" + helper.getUrlEncoding(parameters))
            .headers(helper.addAllHeaders({"If-None-Match": "*"}))
            .json(document)
            .expect(204, done);
        });

        it('fails without ETag header', function (done) {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointActivitiesProfile() + "?" + helper.getUrlEncoding(parameters))
            .headers(helper.addAllHeaders())
            .json(document)
            .expect(400, done);
        });
    }); // describe

/**  XAPI-00286, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API upon processing a successful POST request returns code 204 No Content
 */
/**  XAPI-00292, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API accepts POST requests
 */
/**  XAPI-00312, Communication 2.7 Activity Profile Resource
 * An LRS will accept a POST request to the Activity Profile API
 */
    it('An LRS\'s Activity Profile Resource accepts POST requests (Communication 2.7, XAPI-00286, XAPI-00292, XAPI-00312)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

/**  XAPI-00285, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content
 */
/**  XAPI-00291, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API accepts DELETE requests
 */
    it('An LRS\'s Activity Profile Resource accepts DELETE requests (Communication 2.7, XAPI-00285, XAPI-00291)', function () {
        var parameters = helper.buildActivityProfile();
        return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 204);
    });

/**  XAPI-00290, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API accepts GET requests
 */
    it('An LRS\'s Activity Profile Resource accepts GET requests (Communication 2.7, XAPI-00290)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200);
            });
    });


/**  XAPI-00288, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK
 */
    it('An LRS\'s Activity Profile Resource upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (Communication 2.7.s3, XAPI-00288)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    })
            });
    });

/**  XAPI-00299, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1, XAPI-00299)', function (done) {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.activityId;

        request(helper.getEndpointAndAuth())
        .put(helper.getEndpointActivitiesProfile() + "?" + helper.getUrlEncoding(parameters))
        .headers(helper.addAllHeaders({'If-None-Match': '*'}))
        .json(document)
        .expect(400, done);
    });

/**  XAPI-00298, Communication 2.7 Activity Profile Resources
 * An LRS's Activity Profile API rejects a POST request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1, XAPI-00298)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.activityId;
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
    });

/**  XAPI-00297, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1, XAPI-00297)', function () {
        var parameters = helper.buildActivityProfile();
        delete parameters.activityId;
        return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
    });

/**  XAPI-00296, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1, Communication 2.7.s4.table1.row1, XAPI-00296)', function () {
        var parameters = helper.buildActivityProfile();
        delete parameters.activityId;
        return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
    });

/**  XAPI-00302, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row2, XAPI-00302)', function (done) {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;

        request(helper.getEndpointAndAuth())
        .put(helper.getEndpointActivitiesProfile() + "?" + helper.getUrlEncoding(parameters))
        .headers(helper.addAllHeaders({'If-None-Match': '*'}))
        .json(document)
        .expect(400, done);
    });

/**  XAPI-00301, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row2, XAPI-00301)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
    });

/**  XAPI-00300, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row2, XAPI-00300)', function () {
        var parameters = helper.buildActivityProfile();
        delete parameters.profileId;
        return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
    });

/**  XAPI-00289, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API upon processing a successful GET request without "profileId" as a parameter returns an array of ids of activity profile documents satisfying the requirements of the GET and code 200 OK
 */
    it('An LRS\'s Activity Profile Resource upon processing a successful GET request without "profileId" as a parameter returns an array of ids of activity profile documents satisfying the requirements of the GET and code 200 OK (Communication 2.7.s4, XAPI-00289)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        parameters.activityId = parameters.activityId + helper.generateUUID();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                delete parameters.profileId;
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.be.an('array');
                        expect(body).to.be.length.above(0);
                    });
            });
    });

/**  XAPI-00303, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API can process a GET request with "since" as a parameter. Returning 200 OK and all matching profiles after the date/time of the “since” parameter.
 */
    it('An LRS\'s Activity Profile Resource can process a GET request with "since" as a parameter (multiplicity, Communication 2.7.s4.table1.row2, XAPI-00303)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                delete parameters.profileId;
                parameters.since = new Date(Date.now() - 60 * 1000 - helper.getTimeMargin()).toISOString(); //Date one minute ago

                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200);
            });
    });

/**  XAPI-00295, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request
 */
    describe('An LRS\'s Activity Profile Resource rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, Communication 2.7.s4.table1.row2, XAPI-00295)', function () {
        it('Should reject GET with "since" with invalid value', function () {
            var parameters = helper.buildActivityProfile();
            parameters.since = true;
            delete parameters.profileId;

            return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
        });
    });

/**  XAPI-00294, Communication 2.7 Activity Profile Resource
 * The Activity Profile API's returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present
 */
    it('An LRS\'s returned array of ids from a successful GET request to the Activity Profile Resource all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (Communication 2.7.s4.table1.row2, XAPI-00294)', function () {
        var parameters = helper.buildActivityProfile(),
            profile1 = parameters.profileId;
            document = helper.buildDocument();
        parameters.activityId = parameters.activityId + helper.generateUUID();
        var since = new Date(Date.now() - 60 * 1000 - helper.getTimeMargin()).toISOString();

        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                delete parameters.profileId;
                parameters.since = since;
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.be.an('array');
                        expect(body).to.be.length.above(0);
                        expect(body).to.contain(profile1);
                    });
            });
    });

/**  XAPI-00310, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document. Returning 204 No Content
 */
    it('An LRS\'s Activity Profile Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (Communication 2.2.s7, XAPI-00310)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    })
            });
    });

/**  XAPI-00308, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API performs a Document Merge if a activityId is found and both it and the document in the POST request have type "application/json" If the merge is successful, the LRS MUST respond with HTTP status code 204 No Content.
 * activityId??
 */
    it('An LRS\'s Activity Profile Resource performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3, XAPI-00308)', function () {
        var parameters = helper.buildActivityProfile(),
            document = {
                car: 'Honda'
            },
            anotherDocument = {
                type: 'Civic'
            };
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
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

/**  XAPI-00309, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API, rejects a POST request if the document is found and either document's type is not "application/json" with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (Communication 2.2.s8.b1, XAPI-00309)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument(),
            anotherDocument = 'abc';
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, anotherDocument, 400);
            });
    });

/**  XAPI-00313, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API, rejects a POST request if the document is found and either doucment is not a valid JSON Object
 */
    describe('An LRS\'s Activity Profile Resource, rejects a POST request if the document is found and either document is not a valid JSON Object (Communication 2.7.s3.table1.row3, Communication 2.2.s8.b1, XAPI-00313)', function () {
// case 1 - bad post
        it('If the document being posted to the Activity Profile Resource does not have a Content-Type of application/json and the existing document does, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.', function (done) {
            var document = helper.buildActivityProfile();
            var parameters = helper.buildActivityProfile();

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters))
            .headers(helper.addAllHeaders({}))
            .json(document)
            .expect(204, function (err,res) {
                if (err) {
                    done(err);
                } else {
                    var document2 = 'abcdefg';
                    var header2 = {'content-type': 'application/octet-stream'};

                    request(helper.getEndpointAndAuth())
                    .post(helper.getEndpointActivitiesProfile()+ '?' + helper.getUrlEncoding(parameters))
                    .headers(helper.addAllHeaders(header2))
                    .body(document2)
                    .expect(400, function (err,res) {
                        if (err) {
                            done(err);
                        } else {
                            request(helper.getEndpointAndAuth())
                            .get(helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters))
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
// case 2 - bad existion
        it("If the existing document does not have a Content-Type of application/json but the document being posted to the Activity Profile Resource does the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.", function (done) {
            var parameters = helper.buildActivityProfile();
            var attachment = "/ asdf / undefined";
            var header = {'content-type': 'application/octet-stream', 'If-None-Match': '*'};

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointActivitiesProfile()+ '?' + helper.getUrlEncoding(parameters) )
            .headers(helper.addAllHeaders(header))
            .body(attachment)
            .expect(204, function(err,res) {
                if (err) {
                    done(err);
                } else {
                    var attachment2 = helper.buildDocument();

                    request(helper.getEndpointAndAuth())
                    .post(helper.getEndpointActivitiesProfile()+ '?' + helper.getUrlEncoding(parameters) )
                    .headers(helper.addAllHeaders({}))
                    .json(attachment2)
                    .expect(400, function(err,res) {
                        if (err) {
                            done(err);
                        } else {
                            request(helper.getEndpointAndAuth())
                            .get(helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters))
                            .headers(helper.addAllHeaders({}))
                            .expect(200, function (err, res) {
                                if (err) {
                                    done(err)
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
        it("If the document being posted to the Activity Profile Resource has a content type of Content-Type of application/json but cannot be parsed as a JSON Object, the LRS MUST respond with HTTP status code 400 Bad Request, and MUST NOT update the target document as a result of the request.", function (done) {
            var parameters = helper.buildActivityProfile();
            var document = helper.buildDocument()

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters))
            .headers(helper.addAllHeaders({}))
            .json(document)
            .expect(204, function(err,res) {
                if (err) {
                    done(err);
                } else {
                    var header = {'content-type': 'application/json'};
                    var attachment = JSON.stringify(helper.buildActivityProfile()) + '{';

                    request(helper.getEndpointAndAuth())
                    .post(helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters))
                    .headers(helper.addAllHeaders(header))
                    .body(attachment)
                    .expect(400, function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            request(helper.getEndpointAndAuth())
                            .get(helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters))
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

/**  XAPI-00314, Communication 2.7 Activity Profile Resource
 * An LRS's must reject, with 400 Bad Request, a POST request to the Activity Profile API which contains name/value pairs with invalid JSON and the Content-Type header is "application/json"
 */
    it('An LRS\'s must reject, with 400 Bad Request, a POST request to the Activity Profile Resource which contains name/value pairs with invalid JSON and the Content-Type header is "application/json" (Communication 2.7.s4.table1.row2, XAPI-00314)', function (done) {

        var document = JSON.stringify(helper.buildDocument()) + '[';
        var parameters = helper.buildActivityProfile();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters))
        .headers(helper.addAllHeaders({'Content-Type': 'application/json'}))
        .body(document)
        .expect(400, done);
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
