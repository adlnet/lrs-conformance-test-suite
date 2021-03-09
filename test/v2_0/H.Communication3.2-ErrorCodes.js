/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Error Codes Requirements (Communication 3.2)', () => {

/**  Matchup with Conformance Requirements Document
 * XAPI-00323 - not found yet - An LRS can only reject Statements using the error codes in this specification - what are we to test here??
 * XAPI-00324 - below
 * XAPI-00325 - below
 * XAPI-00326 - below
 * XAPI-00327 - not found yet - An LRS rejects a Statement of insufficient permissions (credentials are valid, but not adequate) with error code 403 Forbidden
 * XAPI-00328 - below
 * XAPI-00329 - not found yet - An LRS rejects a Statement due to network/server issues with an error code of 500 Internal Server Error
 */

/**  XAPI-00324, Communication 3.2 Error Codes
 * An LRS rejects with error code 400 Bad Request any request to an API which uses a parameter not recognized by the LRS
 */
    it('An LRS rejects with error code 400 Bad Request any request to an Resource which uses a parameter not recognized by the LRS (Communication 3.2.s2.b1, XAPI-00324)', function (done) {
        request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?foo=bar')
            .headers(helper.addAllHeaders({}))
            .expect(400, done)
    });

/**  XAPI-00325, Communication 3.2 Error Codes
 * An LRS rejects with error code 400 Bad Request any request to an API which uses a parameter with differing case
 */
    describe('An LRS rejects with error code 400 Bad Request any request to an Resource which uses a parameter with differing case (Communication 3.2.s3.b8, XAPI-00325)', function () {

        it('should fail on PUT statement when not using "statementId"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            var query = helper.getUrlEncoding({StatementId: data.id});
            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail on GET statement when not using "statementId"', function (done) {
            var query = helper.getUrlEncoding({StatementId: helper.generateUUID()});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "voidedStatementId"', function (done) {
            var query = helper.getUrlEncoding({VoidedStatementId: helper.generateUUID()});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "agent"', function (done) {
            var templates = [
                {Agent: '{{agents.default}}'}
            ];
            var data = helper.createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "verb"', function (done) {
            var query = helper.getUrlEncoding({Verb: 'http://adlnet.gov/expapi/verbs/attended'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "activity"', function (done) {
            var query = helper.getUrlEncoding({Activity: 'http://www.example.com/meetings/occurances/34534'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "registration"', function (done) {
            var query = helper.getUrlEncoding({Registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "related_activities"', function (done) {
            var query = helper.getUrlEncoding({Related_Activities: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "related_agents"', function (done) {
            var query = helper.getUrlEncoding({Related_Agents: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "since"', function (done) {
            var query = helper.getUrlEncoding({Since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "until"', function (done) {
            var query = helper.getUrlEncoding({Until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "limit"', function (done) {
            var query = helper.getUrlEncoding({Limit: 10});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "format"', function (done) {
            var query = helper.getUrlEncoding({Format: 'ids'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "attachments"', function (done) {
            var query = helper.getUrlEncoding({Attachments: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "ascending"', function (done) {
            var query = helper.getUrlEncoding({Ascending: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });
    });

/**  XAPI-00326, Communication 3.2 Error Codes
 * An LRS rejects with a 400 Bad Request any batch of Statements in which one or more Statements is rejected and if necessary, restores the LRS to the state in which it was before the batch began processing. The response may identify the first statementId which failed.
 */
    describe('An LRS does not process any batch of Statements in which one or more Statements is rejected and if necessary, restores the LRS to the state in which it was before the batch began processing (Communication 3.2.s3.b9, XAPI-00326, **Implicit**)', function () {

        it('should not persist any statements on a single failure', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var correct = helper.createFromTemplate(templates);
            correct = correct.statement;
            var incorrect = extend(true, {}, correct);

            correct.id = helper.generateUUID();
            incorrect.id = helper.generateUUID();

            incorrect.verb.id = 'should fail';
            var query = '?statementId=' + correct.id;
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json([correct, incorrect])
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    request(helper.getEndpointAndAuth())
                    .get(helper.getEndpointStatements() + '?statementId=' + correct.id)
                    .wait(helper.genDelay(stmtTime, query, correct.id))
                    .headers(helper.addAllHeaders({}))
                    .expect(404, done);
                }
            });
        });
    });


/**  XAPI-00328, Communication 3.2 Error Codes
 * An LRS rejects a Statement due to size if the Statement exceeds the size limit the LRS is configured to with error code 413 Request Entity Too Large.
 * Held out for now. No upper limit constraint.
 */
});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
