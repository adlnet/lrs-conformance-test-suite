/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('State Resource Requirements (Communication 2.3)', () => {

    it('An LRS\'s State Resource accepts PUT requests (Communication 2.3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

    it('An LRS\'s State Resource accepts POST requests (Communication 2.3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

    it('An LRS\'s State Resource accepts GET requests (Communication 2.3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    });
            });
    });

    it('An LRS\'s State Resource accepts DELETE requests (Communication 2.3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
            });
    });

    it('An LRS\'s State Resource upon processing a successful PUT request returns code 204 No Content (Communication 2.3.s3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

    it('An LRS\'s State Resource upon processing a successful POST request returns code 204 No Content (Communication 2.3.s3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

    it('An LRS\'s State Resource upon processing a successful GET request with a valid "stateId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (Communication 2.3.s3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    });
            });
    });

    it('An LRS\'s State Resource upon processing a successful DELETE request with a valid "stateId" as a parameter deletes the document satisfying the requirements of the DELETE and returns code 204 No Content (Communication 2.3.s3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
            });
    });

    it('An LRS\'s State Resource rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row1)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.activityId;
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

    describe('An LRS\'s State Resource rejects a PUT request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.3.s3.table1.row1)', function () {
        var invalidTypes = [{ key: 'value'}, 1, true, undefined];
        invalidTypes.forEach(function (type) {
            it('Should State Resource reject a PUT request with activityId type ' + type, function () {
                var parameters = helper.buildState(),
                    document = helper.buildDocument();
                parameters.activityId = type;
                return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s State Resource rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row1)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.activityId;
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

    describe('An LRS\'s State Resource rejects a POST request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.3.s3.table1.row1)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}, undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject PUT State with stateId type : ' + type, function () {
                var parameters = helper.buildState();
                parameters.activityId = type;
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s State Resource rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row1)', function () {
        var parameters = helper.buildState();
        delete parameters.activityId;
        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    });

    describe('An LRS\'s State Resource rejects a GET request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.3.s3.table1.row1)', function () {
        var invalidTypes = [1, true, { key: 'value'}, undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "activityId" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.activityId = type;
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

    it('An LRS\'s State Resource rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row1)', function () {
        var parameters = helper.buildState();
        delete parameters.activityId;
        return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    });

    describe('An LRS\'s State Resource rejects a DELETE request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.3.s3.table1.row1)', function () {
        var invalidTypes = [1, true, { key: 'value'}, undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "activityId" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.activityId = type;
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

    //+* In 1.0.3, the IRI requires a scheme, but does not in 1.0.2, thus we only test type String in this version**
    it('An LRS\'s State Resource rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row2)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

    it('An LRS\'s State Resource rejects a PUT request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, Communication 2.3.s3.table1.row2)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        parameters.agent = 'not JSON';
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

    it('An LRS\'s State Resource rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row2)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

    describe('An LRS\'s State Resource rejects a POST request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, Communication 2.3.s3.table1.row2)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, 'not JSON', undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject POST State with agent type : ' + type, function () {
                var parameters = helper.buildState();
                parameters.agent = type;
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s State Resource rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row2)', function () {
        var parameters = helper.buildState();
        delete parameters.agent;
        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    });

    describe('An LRS\'s State Resource rejects a GET request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, Communication 2.3.s3.table1.row2)', function () {
        var invalidTypes = [1, true, 'not JSON', undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "agent" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.agent = type;
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

    it('An LRS\'s State Resource rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row2)', function () {
        var parameters = helper.buildState();
        delete parameters.agent;
        return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    });

    describe('An LRS\'s State Resource rejects a DELETE request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, Communication 2.3.s3.table1.row2)', function () {
        var invalidTypes = [1, true, 'not JSON', undefined];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "agent" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.activityId = type;
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

    it('An LRS\'s State Resource can process a PUT request with "registration" as a parameter (multiplicity, Communication 2.3.s3.table1.row3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        parameters.registration = helper.generateUUID();
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

    describe('An LRS\'s State Resource rejects a PUT request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request(format, Communication 2.3.s3.table1.row3)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, 'not UUID'];
        invalidTypes.forEach(function (type) {
            it('Should reject PUT with "registration" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.registration = type;
                return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s State Resource can process a POST request with "registration" as a parameter (multiplicity, Communication 2.3.s3.table1.row3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        parameters.registration = helper.generateUUID();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

    describe('An LRS\'s State Resource rejects a POST request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, Communication 2.3.s3.table1.row3)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, 'not UUID'];
        invalidTypes.forEach(function (type) {
            it('Should reject POST with "registration" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.registration = type;
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s State Resource can process a GET request with "registration" as a parameter (multiplicity, Communication 2.3.s3.table1.row3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        parameters.registration = helper.generateUUID();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    });
            });
    });

    describe('An LRS\'s State Resource rejects a GET request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, Communication 2.3.s3.table1.row3)', function () {
        var invalidTypes = [1, true, 'not UUID'];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "registration" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.registration = type;
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

    it('An LRS\'s State Resource can process a DELETE request with "registration" as a parameter (multiplicity, Communication 2.3.s3.table1.row3)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        parameters.registration = helper.generateUUID();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
            });
    });

    describe('An LRS\'s State Resource rejects a DELETE request with "registration" as a parameter if it is not a UUID with error code 400 Bad Request (format, Communication 2.3.s3.table1.row3)', function () {
        var invalidTypes = [1, true, 'not UUID'];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "registration" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.registration = type;
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
            });
        });
    });

    it('An LRS\'s State Resource rejects a PUT request without "stateId" as a parameter with error code 400 Bad Request(multiplicity, Communication 2.3.s3.table1.row4)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.stateId;
        return helper.sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

    it('An LRS\'s State Resource rejects a POST request without "stateId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.3.s3.table1.row4)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        delete parameters.stateId;
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
    });

    it('An LRS\'s State Resource can process a GET request with "stateId" as a parameter (multiplicity, Communication 2.3.s3.table1.row4)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    })
            });
    });

    it('An LRS\'s State Resource can process a GET request with "since" as a parameter (multiplicity, Communication 2.3.s4.table1.row4)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                parameters.since = new Date(Date.now() - 60 * 1000 - helper.getTimeMargin()).toISOString(); // Date 1 minute ago
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    });
            });
    });

    it('An LRS\'s State Resource rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, Communication 2.3.s4.table1.row4)', function () {
        var parameters = helper.buildState();
        parameters.since = 'not a timestamp';
        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    });

    it('An LRS\'s State Resource can process a DELETE request with "stateId" as a parameter (multiplicity, Communication 2.3.s3.table1.row4)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204);
            });
    });

// No 'since' property with DELETE in the State Resource
    // describe('An LRS\'s State Resource rejects a DELETE request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, Communication.md#2.3.s3.table1.row4)', function () {
    //     var invalidTypes = [1, true];
    //     invalidTypes.forEach(function (type) {
    //         it('Should reject DELETE with "since" with type ' + type, function () {
    //             var parameters = helper.buildState();
    //             parameters.since = type;
    //             return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 400);
    //         });
    //     });
    // });

    //+* NOTE:  **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**
    it('An LRS\'s State Resource upon processing a successful GET request without "stateId" as a parameter returns an array of ids of state data documents satisfying the requirements of the GET and code 200 OK (Communication 2.3.s4)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                delete parameters.stateId;
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.be.an('array');
                    });
            });
    });

    it('An LRS\'s returned array of ids from a successful GET request to the State Resource all refer to documents stored after the TimeStamp in the "since" parameter of the GET request (Communication 2.3.s4.table1.row4)', function () {
        var document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), helper.buildState(), document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), helper.buildState(), document, 204)
                    .then(function () {
                        var parameters = helper.buildState();
                        delete parameters.stateId;
                        parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.be.an('array');
                                expect(body).to.have.length.above(1);
                            });
                    });
            });
    });

    //+* NOTE:  **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**
    it('An LRS\'s State Resource upon processing a successful DELETE request without "stateId" as a parameter deletes documents satisfying the requirements of the DELETE and code 204 No Content (Communication 2.3.s5)', function () {
        var parameters = helper.buildState();
        parameters.activityId = parameters.activityId + helper.generateUUID();

        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, helper.buildDocument(), 204)
            .then(function () {
                delete parameters.stateId;
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), helper.buildState(), helper.buildDocument(), 204)
                .then(function () {
                    return helper.sendRequest('delete', helper.getEndpointActivitiesState(), parameters, undefined, 204)
                        .then(function () {
                            return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                                .then(function (res) {
                                    var body = res.body;
                                    expect(body).to.be.an('array');
                                    expect(body).to.have.length(0);
                                });
                        });
                });
            });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
