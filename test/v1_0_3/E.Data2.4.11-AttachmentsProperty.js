/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, templatingSelection) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Attachments Property Requirements (Data 2.4.11)', function() {

/**  Matchup with Conformance Requirements Document
 * XAPI-00102 - in attachments.js
 * XAPI-00103 - in attachments.js
 * XAPI-00104 - in attachments.js
 * XAPI-00105 - in attachments.js
 * XAPI-00106 - in attachments.js
 * XAPI-00107 - in attachments.js

 * Note XAPI-00025 - in attachments.js
 */

    templatingSelection.createTemplate('attachments.js');

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
