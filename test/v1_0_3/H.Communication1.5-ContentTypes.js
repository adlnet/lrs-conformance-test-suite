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

describe('Content Type Requirements (Communication 1.5)', () => {

    //Communication 1.5.1
/**  Matchup with Conformance Requirements Document
 * XAPI-00127 - in Data 2.4.11
 * XAPI-00128 - in Data 2.4.11, covered in same suite as XAPI-00129, double check
 * XAPI-00129 - in Data 2.4.11
 */

    //Communication 1.5.2
/**
 * XAPI-00130 - in Data 2.4.11
 * XAPI-00131 - in Data 2.4.11
 * XAPI-00132 - in Data 2.4.11
 * XAPI-00133 - in Data 2.4.11
 * XAPI-00134 - in Data 2.4.11
 * XAPI-00135 - in Data 2.4.11
 * XAPI-00136 - in Data 2.4.11
 * XAPI-00137 - not found yet - An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "MIME-Version" with a value of "1.0" or greater
 * XAPI-00138 - in Data 2.4.11
 */

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
