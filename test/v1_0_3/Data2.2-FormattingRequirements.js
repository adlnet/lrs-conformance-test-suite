/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, templatingSelection) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

    before("Before all tests are run", function (done) {
        console.log("Setting up\nAccounting for time differential between test suite and lrs");
        helper.setTimeMargin(done);
    });

describe('Formatting Requirements (Data 2.2)', () => {

/**  Matchup with Conformance Requirements Document
 * XAPI-00001 - in statements.js
 * XAPI-00002 - in results.js
 * XAPI-00003 - in statements.js
 * XAPI-00004 - in statements.js
 * XAPI-00005 - in statements.js
 * XAPI-00006 - no match found yet
 * XAPI-00007 - no match found yet, somewhat of a catchall category
 * XAPI-00008 - in Communication 3.2
 * XAPI-00009 - in Communication 3.2? same tests as XAPI-00008
 * XAPI-00010 - no match found yet
 * XAPI-00011 - no match found yet - is this covered by multiple individual tests, if so should they be grouped together for this req?
 * XAPI-00012 - no match yet - broad catchall again - is this taken care of by many other tests throughout the suite?
 * XAPI-00013 - in context.js from Data 2.4.6
 * XAPI-00014 - in Miscellaneous Requirements
 * XAPI-00015 - in Communication 1.4
 */

    templatingSelection.createTemplate('statements.js');

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
