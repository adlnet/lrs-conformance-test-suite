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

describe('Miscellaneous Requirements', () => {

/**  XAPI-00014  2.2 Formatting Requirements
 * All Objects are well-created JSON Objects (Nature of Binding)
 */
    it('All Objects are well-created JSON Objects (Nature of binding) **Implicit**', function (done) {
      var verbTemplate = 'http://adlnet.gov/expapi/test/unicode/target/';
      var verb = verbTemplate + helper.generateUUID();
      var malformedTemplates = [
          {statement: '{{statements.default}}'}
      ];
      var malformed = helper.createFromTemplate(malformedTemplates);
      malformed = malformed.statement;
      var string = "\"objectType\": \"Agent\"";
      malformed.actor.objectType = string;

      request(helper.getEndpointAndAuth())
          .post(helper.getEndpointStatements())
          .headers(helper.addAllHeaders({}))
          .json(malformed)
          .expect(400, done)
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
