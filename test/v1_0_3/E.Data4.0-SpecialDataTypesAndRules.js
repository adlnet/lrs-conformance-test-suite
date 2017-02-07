/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, templatingSelection) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Special Data Types and Rules (Data 4.0)', function () {

    //Data 4.1
/**  Matchup with Conformance Requirements Document
 * XAPI-00118 - in extensions.js
 * XAPI-00119 - below and in extensions.js
 * XAPI-00120 - in extensions.js
 */
    templatingSelection.createTemplate("extensions.js");

/**  XAPI-00119, Data 4.1 Extensions
 * An Extension can be null, an empty string, objects with nothing in them. The LRS accepts with 200 if a PUT or 204 if a POST an otherwise valid statement which has any extension value including null, an empty string, or an empty object.
 * Tests for other emptys and PUT
 */
    describe('An Extension can be null, an empty string, objects with nothing in them when using PUT. (Format, Data 4.1, XAPI-00119)', function () {
        var NULL_VALUE = {'extensions': {'http://example.com/ex': null}},
            EMPTY_STRING_VALUE = {'extensions': {'http://example.com/ex': ''}},
            EMPTY_OBJECT_VALUE = {'extensions': {'http://example.com/ex': {}}},
            VALID_EXTENSION_EMPTY = {'extensions': {}};

        it('statement activity extensions can be empty object', function (done) {
            var template = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.no_extensions}}'},
                {definition: VALID_EXTENSION_EMPTY}
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement activity extension values can be empty string', function (done) {
            var template = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.no_extensions}}'},
                {definition: EMPTY_STRING_VALUE}
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement activity extension values can be null', function (done) {
            var template = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.no_extensions}}'},
                {definition: NULL_VALUE}
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement activity extensions can be empty object', function (done) {
            var template = [
                {statement: '{{statements.object_activity}}'},
                {object: '{{activities.no_extensions}}'},
                {definition: EMPTY_OBJECT_VALUE}
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement result extensions can be empty object', function (done) {
            var template = [
                {statement: '{{statements.result}}'},
                {result: '{{results.no_extensions}}'},
                VALID_EXTENSION_EMPTY
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement result extension values can be empty string', function (done) {
            var template = [
                {statement: '{{statements.result}}'},
                {result: '{{results.no_extensions}}'},
                EMPTY_STRING_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement result extension values can be null', function (done) {
            var template = [
                {statement: '{{statements.result}}'},
                {result: '{{results.no_extensions}}'},
                NULL_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement result extension values can be empty object', function (done) {
            var template = [
                {statement: '{{statements.result}}'},
                {result: '{{results.no_extensions}}'},
                EMPTY_OBJECT_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement context extensions can be empty object', function (done) {
            var template = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.no_extensions}}'},
                VALID_EXTENSION_EMPTY
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement context extension values can be empty string', function (done) {
            var template = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.no_extensions}}'},
                EMPTY_STRING_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement context extension values can be null', function (done) {
            var template = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.no_extensions}}'},
                NULL_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement context extension values can be empty object', function (done) {
            var template = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.no_extensions}}'},
                EMPTY_OBJECT_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement activity extensions can be empty object', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.no_extensions}}'},
                {definition: VALID_EXTENSION_EMPTY}
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement activity extension values can be empty string', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.no_extensions}}'},
                {definition: EMPTY_STRING_VALUE}
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement activity extension values can be null', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.no_extensions}}'},
                {definition: NULL_VALUE}
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement activity extension values can be empty object', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.no_extensions}}'},
                {definition: EMPTY_OBJECT_VALUE}
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement result extensions can be empty object', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.result}}'},
                {result: '{{results.no_extensions}}'},
                VALID_EXTENSION_EMPTY
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement result extension values can be empty string', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.result}}'},
                {result: '{{results.no_extensions}}'},
                EMPTY_STRING_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement result extension values can be null', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.activity}}'},
                {object: '{{activities.no_extensions}}'},
                {definition: NULL_VALUE}
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement result extension values can be empty object', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.result}}'},
                {result: '{{results.no_extensions}}'},
                EMPTY_OBJECT_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement context extensions can be empty object', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.no_extensions}}'},
                VALID_EXTENSION_EMPTY
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement context extension values can be empty string', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.no_extensions}}'},
                EMPTY_STRING_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement context extension values can be null', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.no_extensions}}'},
                NULL_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

        it('statement substatement context extension values can be empty object', function (done) {
            var template = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.no_extensions}}'},
                EMPTY_OBJECT_VALUE
            ],
                data = helper.createFromTemplate(template).statement;
            data.id = helper.generateUUID();
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204, done);
        });

    });

    //Data 4.2
/**  Matchup with Conformance Requirements Document
 * XAPI-00121 - in languages.js
 */
    templatingSelection.createTemplate("languages.js");

    //Data 4.5
/**  Matchup with Conformance Requirements Document
 * XAPI-00122 - below
 * XAPI-00123 - in timestamps.js
 */
    templatingSelection.createTemplate("timestamps.js");

/**  XAPI-00122, Data 4.5 ISO 8601 Timestamps
 * A Timestamp MUST preserve precision to at least milliseconds (3 decimal points beyond seconds). The LRS accepts a statement with a valid timestamp which has more than 3 decimal points beyond seconds and when recalled it returns at least 3 decimals points beyond seconds.
 */
    describe('A Timestamp MUST preserve precision to at least milliseconds, 3 decimal points beyond seconds. (Data 4.5.s1.b3, XAPI-00122)', function () {

        it('retrieve statements, test a timestamp property', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    var result = helper.parse(res.body);
                    var stmts = result.statements;
                    var milliChecker = (num) => {
                        expect(stmts[num]).to.have.property('timestamp');
                        //formatted iso 8601
                        var chkStored =  moment(stmts[num].timestamp, moment.ISO_8601);
                        expect(chkStored.isValid()).to.be.true;
                        expect(isNaN(chkStored._pf.parsedDateParts[6])).to.be.false;
                        //precision to milliseconds
                        if ((chkStored._pf.parsedDateParts[6] % 10) > 0) {
                            expect(chkStored._pf.parsedDateParts[6] % 10).to.be.above(0);
                            done();
                        } else {
                            if (++num < stmts.length) {
                                milliChecker(num);
                            } else {
                                expect(chkStored._pf.parsedDateParts[6] % 10).to.be.above(0);
                                done();
                            }
                        }
                    }; milliChecker(0);
                }
            });
        });

        it('retrieve statements, test a stored property', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    var result = helper.parse(res.body);
                    var stmts = result.statements;
                    var milliChecker = (num) => {
                        expect(stmts[num]).to.have.property('stored');
                        //formatted iso 8601
                        var chkStored =  moment(stmts[num].stored, moment.ISO_8601);
                        expect(chkStored.isValid()).to.be.true;
                        expect(isNaN(chkStored._pf.parsedDateParts[6])).to.be.false;
                        //precision to milliseconds
                        if ((chkStored._pf.parsedDateParts[6] % 10) > 0) {
                            expect(chkStored._pf.parsedDateParts[6] % 10).to.be.above(0);
                            done();
                        } else {
                            if (++num < stmts.length) {
                                milliChecker(num);
                            } else {
                                expect(chkStored._pf.parsedDateParts[6] % 10).to.be.above(0);
                                done();
                            }
                        }
                    }; milliChecker(0);
                }
            });
        });
    });

    //Data 4.6
/**  Matchup with Conformance Requirements Document
 * XAPI-00124 - in durations.js
 */
    templatingSelection.createTemplate("durations.js");

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
