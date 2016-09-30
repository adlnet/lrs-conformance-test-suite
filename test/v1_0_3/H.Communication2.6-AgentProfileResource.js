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

describe('Agent Profile Resource Requirements (Communication 2.6)', () => {

    it('An LRS\'s Agent Profile API accepts PUT requests (Communication 2.6.s2)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

    it('An LRS\'s Agent Profile API accepts POST requests (Communication 2.6.s2)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

    it('An LRS\'s Agent Profile API accepts DELETE requests (Communication 2.6.s2)', function () {
        var parameters = helper.buildAgentProfile();
        return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 204);
    });

    it('An LRS\'s Agent Profile API accepts GET requests (Communication 2.6.s2)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200);
            });
    });

    it('An LRS\'s Agent Profile API upon processing a successful PUT request returns code 204 No Content (Communication 2.6.s3)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

    it('An LRS\'s Agent Profile API upon processing a successful POST request returns code 204 No Content (Communication 2.6.s3)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

    it('An LRS\'s Agent Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (Communication 2.6.s3)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 204)
            });
    });

    it('An LRS\'s Agent Profile API upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (Communication 2.6.s3)', function () {
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

    it('An LRS\'s Agent Profile API rejects a PUT request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row1)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

    describe('An LRS\'s Agent Profile API rejects a PUT request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, Communication 2.6.s3.table1.row1)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, 'not Agent', { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject PUT with "agent" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s Agent Profile API rejects a POST request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row1)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

    it('An LRS\'s Agent Profile API rejects a POST request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, Communication 2.6.s3.table1.row1)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject POST with "agent" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s Agent Profile API rejects a DELETE request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row1)', function () {
        var parameters = helper.buildAgentProfile();
        delete parameters.agent;
        return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
    });

    describe('An LRS\'s Agent Profile API rejects a DELETE request with "agent" as a parameter if it is not an Agent Object with error code 400 Bad Request (format, Communication 2.6.s3.table1.row1)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "agent" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s Agent Profile API rejects a GET request with "agent" as a parameter if it is a valid (in structure) Agent with error code 400 Bad Request (multiplicity, Communication 2.6.s4.table1.row1, Communication 2.6.s3.table1.row1)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        parameters.agent = {
            "objectType": "Agent"
        };
        return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

    it('An LRS\'s Agent Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row2)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;
        return helper.sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

    it('An LRS\'s Agent Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row2)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

    it('An LRS\'s Agent Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s3.table1.row2)', function () {
        var parameters = helper.buildAgentProfile();
        delete parameters.profileId;
        return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, undefined, 400);
    });

    // Type "String" - likely to be reworded or removed
    describe('An LRS\'s Agent Profile API rejects a DELETE request with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.6.s3.table1.row2)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "profileId" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('delete', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s Agent Profile API upon processing a successful GET request without "profileId" as a parameter returns an array of ids of agent profile documents satisfying the requirements of the GET and code 200 OK (Communication 2.6.s4)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                delete parameters.profileId;
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.have.length.above(0);
                    })
            });
    });

    it('An LRS\'s Agent Profile API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.6.s4.table1.row1)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        delete parameters.agent;
        return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
    });

    describe('An LRS\'s Agent Profile API rejects a GET request with "agent" as a parameter if it is not an Actor Object with error code 400 Bad Request (format, Communication 2.6.s4.table1.row1)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, {"not_actor": "yup"}, 'not Actor'];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "agent" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s Agent Profile API can process a GET request with "since" as a parameter (Multiplicity, Communication 2.6.s4.table1.row2)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200);
            });
    });

    describe('An LRS\'s Agent Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, Communication 2.6.s4.table1.row2)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}, 'not timestamp'];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "since" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.agent = type;
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s returned array of ids from a successful GET request to the Agent Profile Resource all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (Communication 2.6.s4.table1.row2)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                delete parameters.profileId;
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.be.an('array');
                        expect(body).to.have.length.above(0);
                    })
            });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
