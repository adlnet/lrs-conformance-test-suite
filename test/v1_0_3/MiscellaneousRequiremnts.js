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

//Communication 4.0 Authentication
/**  Matchup with Conformance Requirements Document
 * XAPI-00334 - not found yet - An LRS rejects a Statement of bad authorization (either authentication needed or failed credentials) with error code 401 Unauthorized
 * XAPI-00335 - not found yet - An LRS must support HTTP Basic Authentication
 */

describe('Miscellaneous Requirements', () => {

    //no req for this test yet
    describe('An LRS doesn\'t make any adjustments to incoming Statements that are not specifically mentioned in this section (Data 2.3.1, Varies)', function (){
        var returnedID, data, stmtTime;

        before('persist statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            data = helper.createFromTemplate(templates);
            data = data.statement;
            stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data).expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        returnedID = res.body[0];
                        done();
                    }
                });
        });

        it('statement values should be the same', function (done) {
            this.timeout(0);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?statementId=' + returnedID)
                .wait(helper.genDelay(stmtTime, '?statementId=' + returnedID, returnedID))
                .headers(helper.addAllHeaders({}))
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var results = helper.parse(res.body, done);
                        delete results.id;
                        delete results.authority;
                        delete results.timestamp;
                        delete results.stored;
                        delete results.version;
                        expect(results).to.have.all.keys(Object.keys(data));
                        done();
                    }
                });
        });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
