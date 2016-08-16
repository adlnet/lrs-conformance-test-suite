/* Testing if I can make a quick set of dummy tests to explore the possibility o fadding test profiles.  This is copied and pasted from the non_templating file. */

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

    describe('These are tests with specific parameters that need to be met', function () {

      describe('An LRS\'s Agent Profile API rejects a PUT request with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.6.table3.row2.a)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject PUT with "profileId" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.profileId = type;
                return sendRequest('put', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
      });

      describe('An LRS\'s Agent Profile API rejects a POST request with "profileId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.6.table3.row2.a)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject POST with "profileId" with type ' + type, function () {
                var parameters = helper.buildAgentProfile();
                parameters.profileId = type;
                return sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 400);
            });
        });
      });

      describe('An LRS\'s State API rejects a PUT request with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject PUT with "stateId" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.stateId = type;
                return sendRequest('put', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
      });

      describe('An LRS\'s State API rejects a POST request with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject POST with "stateId" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.stateId = type;
                return sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 400);
            });
        });
      });

      describe('An LRS\'s State API rejects a GET request with "stateId" as a parameter if it is not type "String" with error code 400 Bad Request (format, 7.4.table1.row1.a)', function () {
        var document = helper.buildDocument(),
            invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "stateId" with type ' + type, function () {
                var parameters = helper.buildState();
                parameters.stateId = type;
                return sendRequest('get', helper.getEndpointActivitiesState(), parameters, document, 400);
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

    function parse(string, done) {
        var parsed;
        try {
            parsed = JSON.parse(string);
        } catch (error) {
            done(error);
        }
        return parsed;
    }

}(process, require('supertest-as-promised'), require('should'), require('chai'), require('isemail'), require('./../helper')));
