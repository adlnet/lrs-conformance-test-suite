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
 * XAPI-00304 - *talk about this one* not found yet - An LRS's Activity Profile API rejects a GET request with "agent" as a parameter if it is not in JSON format with error code 400 Bad Request (format, 7.4.table2.row2.a)
 * XAPI-00305 - not found yet - An LRS's Activity Profile API rejects a DELETE request with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)
 * XAPI-00306 - below
 * XAPI-00307 - below
 * XAPI-00308 - in Communication2.2-Documentresources.js
 * XAPI-00309 - in Communication2.2-Documentresources.js
 * XAPI-00310 - in Communication2.2-Documentresources.js
 * XAPI-00311 - in Communication2.2-Documentresources.js
 * XAPI-00312 - in Communication2.2-Documentresources.js
 * XAPI-00313 - not found yet - An LRS's Activity Profile API, rejects a POST request if the document is found and either document is not a valid JSON Object
 * XAPI-00314 - not found yet - An LRS must reject, with 400 Bad Request, a POST request to the Activity Profile API which contains name/value pairs with invalid JSON and the Content-Type header is
"application/json
 */

/**  XAPI-00293, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API accepts PUT requests
 */
    it('An LRS\'s Activity Profile Resource accepts PUT requests (Communication 2.7, XAPI-00293)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

/**  XAPI-00292, Communication 2.7 Agent Profile Resource
 * An LRS's Activity Profile API accepts POST requests
 */
    it('An LRS\'s Activity Profile Resource accepts POST requests (Communication 2.7, XAPI-00292)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

/**  XAPI-00291, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API accepts DELETE requests
 */
    it('An LRS\'s Activity Profile Resource accepts DELETE requests (Communication 2.7, XAPI-00291)', function () {
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

/**  XAPI-00287, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API upon processing a successful PUT request returns code 204 No Content
 */
    it('An LRS\'s Activity Profile Resource upon processing a successful PUT request returns code 204 No Content (Communication 2.7.s2, XAPI-00287)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

/**  XAPI-00286, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API upon processing a successful POST request returns code 204 No Content
 */
    it('An LRS\'s Activity Profile Resource upon processing a successful POST request returns code 204 No Content (Communication 2.7.s2, XAPI-00286)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

/**  XAPI-00285, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content
 */
    it('An LRS\'s Activity Profile Resource upon processing a successful DELETE request deletes the associated profile and returns code 204 No Content (Communication 2.7.s2, XAPI-00285)', function () {
        var parameters = helper.buildActivityProfile();
        return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, '', 204);
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
    it('An LRS\'s Activity Profile Resource rejects a PUT request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1, XAPI-00299)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.activityId;
        return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
    });

    //likely to be changed or removed
    describe('An LRS\'s Activity Profile Resource rejects a PUT request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row1)', function () {
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

/**  XAPI-00298, Communication 2.7 Activity Profile Resources
 * An LRS's Activity Profile API rejects a POST request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a POST request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1, XAPI-00298)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.activityId;
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 400);
    });

    //likely to be changed or removed
    describe('An LRS\'s Activity Profile Resource rejects a POST request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row1)', function () {
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

/**  XAPI-00297, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a DELETE request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1, XAPI-00297)', function () {
        var parameters = helper.buildActivityProfile();
        delete parameters.activityId;
        return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
    });

    //likely to be changed or removed
    describe('An LRS\'s Activity Profile Resource rejects a DELETE request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row1)', function () {
        var invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject DELETE with "activityId" with type ' + type, function () {
                var parameters = helper.buildActivityProfile();
                parameters.activityId = type;
                return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
            });
        });
    });

/**  XAPI-00296, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row1, Communication 2.7.s4.table1.row1, XAPI-00296)', function () {
        var parameters = helper.buildActivityProfile();
        delete parameters.activityId;
        return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
    });

/**  XAPI-00307, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a PUT request with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)
 */
    //Type "String" tests likely to be reworded or removed
    describe('An LRS\'s Activity Profile Resource rejects a PUT request without "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row2, XAPI-00307)', function () {
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

/**  XAPI-00306, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API API rejects a POST request with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.5.table2.row2.a)
 */
    //Type "String" tests likely to be reworded or removed
    describe('An LRS\'s Activity Profile Resource rejects a POST request without "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row2, XAPI-00306)', function () {
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
    describe('An LRS\'s Activity Profile Resource rejects a GET request without "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row2)', function () {
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

    describe('An LRS\'s Activity Profile Resource rejects a GET request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s3.table1.row1, Communication 2.7.s4.table1.row1)', function () {
        var invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "activityId" with type ' + type, function () {
                var parameters = helper.buildActivityProfile();
                parameters.activityId = type;
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
            });
        });
    });

/**  XAPI-00302, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activity Profile Resource rejects a PUT request without "profileId" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.7.s3.table1.row2, XAPI-00302)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        delete parameters.profileId;
        return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document, 400);
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
                parameters.since = new Date(Date.now() - 1000 - helper.getTimeMargin()).toISOString();
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200);
            });
    });

/**  XAPI-00295, Communication 2.7 Activity Profile Resource
 * An LRS's Activity Profile API rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request
 */
    describe('An LRS\'s Activity Profile Resource rejects a GET request with "since" as a parameter if it is not a "TimeStamp", with error code 400 Bad Request (format, Communication 2.7.s4.table1.row2, XAPI-00295)', function () {
        var invalidTypes = [1, true, 'not Timestamp'];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "since" with type ' + type, function () {
                var parameters = helper.buildActivityProfile();
                parameters.since = type;
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 400);
            });
        });
    });

/**  XAPI-00294, Communication 2.7 Activity Profile Resource
 * The Activity Profile API's returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present
 */
    it('An LRS\'s returned array of ids from a successful GET request to the Activity Profile Resource all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (Communication 2.7.s4.table1.row2, XAPI-00294)', function () {
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

    /**  XAPI-00305, Communication 2.7 Activity Profile Resource
     * An LRS's Activity Profile API rejects a DELETE request with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request
     */
        describe('An LRS\'s Activity Profile Resource rejects a DELETE request with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.7.s4.table1.row2, XAPI-00305)', function () {
          var document = helper.buildDocument(),
              invalidTypes = [1, true, { key: 'value'}];
          invalidTypes.forEach(function (type) {
              it('Should reject DELETE with "activityId" with type ' + type, function () {
                  var parameters = helper.buildActivityProfile();
                  parameters.profileId = type;
                  return helper.sendRequest('delete', helper.getEndpointActivitiesProfile(), parameters, document, 400);
              });
          });
        });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
