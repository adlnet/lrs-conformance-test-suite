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

    templatingSelection.createTemplate('statements.js');

    //testing all templating tests, will be removed as we go
    templatingSelection.createTemplate('activities.js');
    templatingSelection.createTemplate('actors.js');
    templatingSelection.createTemplate('agents.js');
    templatingSelection.createTemplate('attachments.js');
    templatingSelection.createTemplate('authorities.js');
    templatingSelection.createTemplate('contexts.js');
    templatingSelection.createTemplate('extensions.js');
    templatingSelection.createTemplate('groups.js');
    templatingSelection.createTemplate('languages.js');
    templatingSelection.createTemplate('objects.js');
    templatingSelection.createTemplate('results.js');
    templatingSelection.createTemplate('statementrefs.js');
    templatingSelection.createTemplate('substatements.js');
    templatingSelection.createTemplate('uuids.js');
    templatingSelection.createTemplate('verbs.js');

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
