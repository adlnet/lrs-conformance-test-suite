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

/**  Matchup with Conformance Requirements Document
 * XAPI-00031 - in agents.js

 * 2.4.2.1 Actor is Agent - may have more in agents.js
 * XAPI-00032 - in actors.js
 * XAPI-00033 - in actors.js
 * XAPI-00034 - in actors.js

 * 2.4.2.2 Actor is Group
 * XAPI-00035 - in groups.js
 * XAPI-00036 - in groups.js
 * XAPI-00037 - in groups.js - multiple suites

 * 2.4.2.3 Inverse Function Identifier
 * XAPI-00038 - in actors.js - two suites
 * XAPI-00039 - in actors.js
 * XAPI-00040 - in actors.js
 * XAPI-00041 - in actors.js

 * 2.4.2.4 Account Object
 * XAPI-00042 - in actors.js
 * XAPI-00043 - in actors.js - two suites
 */

describe('Actor Property Requirements (Data 2.4.2)', () => {

    //Data 2.4.2
    templatingSelection.createTemplate("actors.js");
    //Data 2.4.2.1
    templatingSelection.createTemplate("agents.js");
    //Data 2.4.2.2
    templatingSelection.createTemplate("groups.js");

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
