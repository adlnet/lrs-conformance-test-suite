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

describe('Encoding Requirements (Communication 1.4)', () => {

    it('All Strings are encoded and interpreted as UTF-8 (Communication 1.4.s1.b1)', function (done) {
        this.timeout(0);
        var verbTemplate = 'http://adlnet.gov/expapi/test/unicode/target/';
        var verb = verbTemplate + helper.generateUUID();
        var unicodeTemplates = [
        {statement: '{{statements.unicode}}'}
        ];

        var unicode = helper.createFromTemplate(unicodeTemplates);
        unicode = unicode.statement;
        unicode.verb.id = verb;

        var query = helper.getUrlEncoding({
        verb: verb
        });
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders({}))
        .json(unicode)
        .expect(200)
        .end()
        .get(helper.getEndpointStatements() + '?' + query)
        .wait(helper.genDelay(stmtTime, query, null))
        .headers(helper.addAllHeaders({}))
        .expect(200)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                var results = helper.parse(res.body, done);
                var languages = results.statements[0].verb.display;
                var unicodeConformant = true;
                for (var key in languages){
                if (languages[key] !== unicode.verb.display[key])
                    unicodeConformant = false;
                }
                expect(unicodeConformant).to.be.true;
                done();
            }
        });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
