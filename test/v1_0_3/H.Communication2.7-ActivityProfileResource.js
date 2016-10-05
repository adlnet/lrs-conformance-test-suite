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

describe('Activity Profile Resource Requirements (Communication 2.7)', () => {

    it('An LRS\'s Activity Profile API accepts PUT requests (Communication 2.7)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

    it('An LRS\'s Activity Profile API accepts POST requests (Communication 2.7)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

    it('An LRS\'s Activity Profile API accepts DELETE requests (Communication 2.7)', function () {
        var parameters = helper.buildActivityProfile();
        return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 204);
    });

    it('An LRS\'s Activity Profile API accepts GET requests (Communication 2.7)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200);
            });
    });

    it('An LRS\'s Activity Profile API upon processing a successful PUT request returns code 204 No Content (Communication 2.7.s2)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

    it('An LRS\'s Activity Profile API upon processing a successful POST request returns code 204 No Content (Communication 2.7.s2)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

    it('An LRS\'s Activity Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (Communication 2.7.s2)', function () {
        var parameters = helper.buildActivityProfile();
        return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, '', 204);
    });

    it('An LRS\'s Activity Profile API upon processing a successful GET request with a valid "profileId" as a parameter returns the document satisfying the requirements of the GET and code 200 OK (Communication 2.7.s3)', function () {
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

    it('An LRS\'s Activity Profile API rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.activityId;
        return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
    });

    //likely to be changed or removed
    describe('An LRS\'s Activity Profile API API rejects a PUT request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row1)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject PUT with "activityId" with type ' + type, function () {
                var parameters = helper.buildActivityProfile();
                parameters.activityId = type;
                return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s Activity Profile API rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.activityId;
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
    });

    //likely to be changed or removed
    describe('An LRS\'s Activity Profile API rejects a POST request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row1)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject POST with "activityId" with type ' + type, function () {
                var parameters = helper.buildActivityProfile();
                parameters.activityId = type;
                return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
            });
        });
    });

    it('An LRS\'s Activity Profile API rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1)', function () {
        var parameters = helper.buildActivityProfile();
        delete parameters.activityId;
        return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
    });

    //likely to be changed or removed
    describe('An LRS\'s Activity Profile API rejects a DELETE request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row1)', function () {
        var invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "activityId" with type ' + type, function () {
                var parameters = helper.buildActivityProfile();
                parameters.activityId = type;
                return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
            });
        });
    });

    it('An LRS\'s Activity Profile API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1, Communication 2.7.s4.table1.row1)', function () {
        var parameters = helper.buildActivityProfile();
        delete parameters.activityId;
        return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
    });

    //Type "String" tests likely to be reworded or removed
    describe('An LRS\'s Activity Profile API rejects a PUT request without "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row2)', function () {
      var document = helper.buildDocument(),
          invalidTypes = [1, true, { key: 'value'}];
      invalidTypes.forEach(function (type) {
          it('Should reject PUT with "profileId" with type ' + type, function () {
              var parameters = helper.buildActivityProfile();
              parameters.agent = type;
              return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
          });
      });
    });

    //Type "String" tests likely to be reworded or removed
    describe('An LRS\'s Activity Profile API rejects a POST request without "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row2)', function () {
      var document = helper.buildDocument(),
          invalidTypes = [1, true, { key: 'value'}];
      invalidTypes.forEach(function (type) {
          it('Should reject POST with "profileId" with type ' + type, function () {
              var parameters = helper.buildActivityProfile();
              parameters.agent = type;
              return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
          });
      });
    });

    //Type "String" tests likely to be reworded or removed
    describe('An LRS\'s Activity Profile API rejects a GET request without "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row2)', function () {
      var document = helper.buildDocument(),
          invalidTypes = [1, true, { key: 'value'}];
      invalidTypes.forEach(function (type) {
          it('Should reject GET with "profileId" with type ' + type, function () {
              var parameters = helper.buildActivityProfile();
              parameters.agent = type;
              return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, document, 400);
          });
      });
    });

    describe('An LRS\'s Activity Profile API rejects a GET request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row1, Communication 2.7.s4.table1.row1)', function () {
        var invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "activityId" with type ' + type, function () {
                var parameters = helper.buildActivityProfile();
                parameters.activityId = type;
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
            });
        });
    });

    it('An LRS\'s Activity Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row2)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;
        return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
    });

    it('An LRS\'s Activity Profile API rejects a POST request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row2)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
    });

    it('An LRS\'s Activity Profile API rejects a DELETE request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row2)', function () {
        var parameters = helper.buildActivityProfile();
        delete parameters.profileId;
        return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
    });

    it('An LRS\'s Activity Profile API upon processing a successful GET request without "profileId" as a parameter returns an array of ids of activity profile documents satisfying the requirements of the GET and code 200 OK (Communication 2.7.s4)', function () {
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

    it('An LRS\'s Activity Profile API can process a GET request with "since" as a parameter (multiplicity, Communication 2.7.s4.table1.row2)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200);
            });
    });

    describe('An LRS\'s Activity Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, Communication 2.7.s4.table1.row2)', function () {
        var invalidTypes = [1, true, 'not Timestamp'];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "since" with type ' + type, function () {
                var parameters = helper.buildActivityProfile();
                parameters.since = type;
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
            });
        });
    });

    it('An LRS\'s returned array of ids from a successful GET request to the Activity Profile Resource all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (Communication 2.7.s4.table1.row2)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        parameters.activityId = parameters.activityId + helper.generateUUID();

        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                delete parameters.profileId;
                parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString(); // Date 1 second ago
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.be.an('array');
                        expect(body).to.be.length.above(0);
                    });
            });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
