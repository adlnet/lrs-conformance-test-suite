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

describe('Special Data Types and Rules (Data 4.0)', () => {

    //Data 4.1
/**  Matchup with Conformance Requirements Document
 * XAPI-00118 - in extensions.js
 * XAPI-00119 - in extensions.js - make tests for PUT and other emptys
 * XAPI-00120 - in extensions.js - make tests for 400 condition
 */
    templatingSelection.createTemplate("extensions.js");

    //Data 4.2
/**  Matchup with Conformance Requirements Document
 * XAPI-00121 - in languages.js
 */
    templatingSelection.createTemplate("languages.js");

/**  Matchup with Conformance Requirements Document
 * XAPI-00122 - not found yet - A Timestamp MUST preserve precision to at least milliseconds (3 decimal points beyond seconds). The LRS accepts a statement with a valid timestamp which has more than 3 decimal points beyond seconds and when recalled it returns at least 3 decimals points beyond seconds.
 * See test in Data2.4.8-StoredProperty
 * XAPI-00123 - in statements.js
 */

/**  Matchup with Conformance Requirements Document
 * XAPI-00124 - in results.js
 */

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
