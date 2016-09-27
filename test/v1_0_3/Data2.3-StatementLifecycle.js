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

describe('Statement Lifecycle Requirements (Data 2.3)', () => {

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

    describe('A Voided Statement is defined as a Statement that is not a Voiding Statement and is the Target of a Voiding Statement within the LRS (Data 2.3.2.s2.b3)', function () {
        var voidedId = helper.generateUUID();
        var stmtTime;

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = helper.createFromTemplate(templates);
            voided = voided.statement;
            voided.id = voidedId;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(voided)
                .expect(200, done);
        });

        before('persist voiding statement', function (done) {
            var templates = [
                {statement: '{{statements.object_statementref}}'},
                {verb: '{{verbs.voided}}'}
            ];
            var voiding = helper.createFromTemplate(templates);
            voiding = voiding.statement;
            voiding.object.id = voidedId;
            stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(voiding)
                .expect(200, done);
        });

        it('should return a voided statement when using GET "voidedStatementId"', function (done) {
            this.timeout(0);
            var query = helper.getUrlEncoding({voidedStatementId: voidedId});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = helper.parse(res.body, done);
                        expect(statement.id).to.equal(voidedId);
                        done();
                    }
                });
        });
    });

    describe('A Voiding Statement cannot Target another Voiding Statement (Data 2.3.2.s2.b7)', function () {
        var voidedId, voidingId;

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data).expect(200).end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    voidedId = res.body[0];
                    done();
                }
            });
        });

        before('persist voiding statement', function (done) {
            var templates = [
                {statement: '{{statements.object_statementref}}'},
                {verb: '{{verbs.voided}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.object.id = voidedId;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data).expect(200).end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    voidingId = res.body[0];
                    done();
                }
            });
        });

        it('should fail when "StatementRef" points to a voiding statement', function (done) {
            var templates = [
                {statement: '{{statements.object_statementref}}'},
                {verb: '{{verbs.voided}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.object.id = voidedId;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data).expect(400).end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
        });

        it('should not void a voiding statement', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.object_statementref}}'},
                {verb: '{{verbs.voided}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.object.id = voidingId;
            var stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data).end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var query = '?statementId=' + voidingId;
                    request(helper.getEndpointAndAuth())
                    .get(helper.getEndpointStatements() + query)
                    .headers(helper.addAllHeaders({}))
                    .wait(helper.genDelay(stmtTime, query, voidingId))
                    .expect(200, done);
                }
            });
        });

    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
