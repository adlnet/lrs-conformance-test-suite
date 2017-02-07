/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
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

/**  Matchup with Conformance Requirements Document
 * XAPI-00001 - in formatting.js
 * XAPI-00002 - below
 * XAPI-00003 - in formatting.js
 * XAPI-00004 - in formatting.js
 * XAPI-00005 - in formatting.js
 * XAPI-00006 - in formatting.js
 * XAPI-00007 - in formatting.js
 * XAPI-00008 - in formatting.js
 * XAPI-00009 - in formatting.js
 * XAPI-00010 - in formatting.js
 * XAPI-00011 - below
 * XAPI-00012 - below
 * XAPI-00013 - in formatting.js
 * XAPI-00014 - below and in verify.js
 * XAPI-00015 - in Communication 1.4 - should stay in Comm 1.4 Encoding
 */

    templatingSelection.createTemplate('formatting.js');

/**  XAPI-00002, Data 2.2 Formatting Requirements
 * An LRS stores 32-bit floating point numbers with at least the precision of IEEE 754
 */
    describe('An LRS stores 32-bit floating point numbers with at least the precision of IEEE 754 (Data 2.2.s4.b3, XAPI-00002)', function() {
        this.timeout(0);

        it('should pass and keep precision', function(done) {

            var templates = [
                {statement: '{{statements.result}}'},
                {result: '{{results.default}}'},
            ],
                data = helper.createFromTemplate(templates).statement,
                id = helper.generateUUID(),
                query = '?statementId=' + id,
                min = 0.12123434,
                raw = 12.125,
                max = 45.45,
                stmtTime = Date.now();

            data.id = id;
            data.result.score.min = min;
            data.result.score.raw = raw;
            data.result.score.max = max;
            data.result.score.scaled = min;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    request(helper.getEndpointAndAuth())
                    .get(helper.getEndpointStatements() + query)
                    .wait(helper.genDelay(stmtTime, query, id))
                    .headers(helper.addAllHeaders({}))
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            done(err);
                        } else {
                            var score = helper.parse(res.body).result.score;
                            expect(score.min).to.eql(min);
                            expect(score.raw).to.eql(raw);
                            expect(score.max).to.eql(max);
                            expect(score.scaled).to.eql(min);
                            done();
                        }
                    });
                }
            })
        });
    });

/**  XAPI-00012
 * The LRS rejects with error code 400 Bad Request parameter values which do not validate to the same standards required for values of the same types in Statements.
 */
    describe('The LRS rejects with error code 400 Bad Request parameter values which do not validate to the same standards required for values of the same types in Statements (Data 2.2.s4.b4, XAPI-00012)', function (done) {
        it('should reject when statementId value is invalid', function () {
            var query = helper.getUrlEncoding({statementId: 'wrong'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should reject when statementId value is invalid', function () {
            var query = helper.getUrlEncoding({voidedStatementId: 'wrong'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should reject when statementId value is invalid', function () {
            var query = helper.getUrlEncoding({agent: 'wrong'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should reject when statementId value is invalid', function () {
            var query = helper.getUrlEncoding({verb: 'not.a.valid.iri.com/verb'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should reject when statementId value is invalid', function () {
            var query = helper.getUrlEncoding({activity: 'not.a.valid.iri.com/activity'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should reject when statementId value is invalid', function () {
            var query = helper.getUrlEncoding({registration: 'wrong'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });
    });


/**  XAPI-00014, Data 2.2 Formatting Requirements
 * All Objects are well-created JSON Objects (Nature of Binding)
 */
    describe('All Objects are well-created JSON Objects (Nature of binding, Data 2.1, XAPI-00014) **Implicit**', function () {

        templatingSelection.createTemplate('verify.js');

        it('An LRS rejects a not well-created JSON Object', function(done) {
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

/**  XAPI-00011, Data 2.2 Formatting Requirements
 * An LRS rejects with error code 400 Bad Request a Statement containing IRL or IRI values without a scheme.
 */
    describe('An LRS rejects with error code 400 Bad Request a Statement containing IRL or IRI values without a scheme. (Data 2.2.s4.b1.b8, XAPI-00011)', function(done)
    {
        // verb id
        it('should fail with bad verb id scheme', function () {
            var templates = [
            {
                statement: '{{statements.default}}'
            }];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.verb.id = data.verb.id.replace("http://","")   // remove the scheme portion of the IRI
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });

        // openid
        it('should fail with bad verb openid scheme', function () {
            var templates = [
            {
                statement: '{{statements.actor}}'
            }];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.actor.openid = "open.id.com/testUser";
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });

        // account homePage
        it('should fail with bad account homePage', function () {
            var templates = [
            {
                statement: '{{statements.actor}}'
            }];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.actor.account = {"homePage": "homePage.com/testUser", "name": "123456"};
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });

        // object id
        it('should fail with bad object id', function () {
            var templates = [
            {
                statement: '{{statements.default}}'
            }];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.object.id = data.object.id.replace("http://","")   // remove the scheme portion of the IRI
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });

        // object type
        it('should fail with bad object type', function () {
            var templates = [
            {
                statement: '{{statements.default}}'
            },
            {
                object: '{{activities.default}}'
            }
            ];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.object.definition.type = data.object.definition.type.replace("http://","")   // remove the scheme portion of the IRI
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });

        // object moreInfo
        it('should fail with bad object moreInfo', function () {
            var templates = [
            {
                statement: '{{statements.default}}'
            },
            {
                object: '{{activities.default}}'
            }
            ];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.object.definition.moreInfo = data.object.definition.moreInfo.replace("http://","")   // remove the scheme portion of the IRI
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });

        // attachment usageType
        it('should fail with attachment bad usageType', function () {
            var templates = [
            {
                statement: '{{statements.attachment}}'
            },
            {
                attachments: [{
                    'usageType': 'http://example.com/attachment-usage/test',
                    'display': {'en-US': 'A test attachment'},
                    'description': {'en-US': 'A test attachment (description)'},
                    'contentType': 'text/plain; charset=ascii',
                    'length': 27,
                    'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
                    'fileUrl': 'http://over.there.com/file.txt'
                    }]
            }
            ];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.attachments[0].usageType = data.attachments[0].usageType.replace("http://","")   // remove the scheme portion of the IRI
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });

        // attachment fileUrl
        it('should fail with bad attachment fileUrl', function () {
            var templates = [
            {
                statement: '{{statements.attachment}}'
            },
            {
                attachments: [{
                    'usageType': 'http://example.com/attachment-usage/test',
                    'display': {'en-US': 'A test attachment'},
                    'description': {'en-US': 'A test attachment (description)'},
                    'contentType': 'text/plain; charset=ascii',
                    'length': 27,
                    'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
                    'fileUrl': 'http://over.there.com/file.txt'
                    }]
            }
            ];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.attachments[0].fileUrl = data.attachments[0].fileUrl.replace("http://","")   // remove the scheme portion of the IRI
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });

        // object definition extension
        it('should fail with bad object definition extension', function () {
            var templates = [
            {
                statement: '{{statements.default}}'
            },
            {
                object: '{{activities.default}}'
            }
            ];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.object.definition.extensions = {"not.valid.com/extension": 1234}
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });

        // context extension
        it('should fail with bad context extension', function () {
            var templates = [
            {
                statement: '{{statements.default}}'
            },
            {
                context: '{{contexts.default}}'
            }
            ];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.context.extensions["example.com/extension/wrong"] = 1234
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });

        // result extension
        it('should fail with bad result extension', function () {
            var templates = [
            {
                statement: '{{statements.default}}'
            },
            {
                result: '{{results.default}}'
            }
            ];
            var data = helper.createFromTemplate(templates).statement;
            data.id = helper.generateUUID();
            data.result.extensions["example.com/extension/wrong"] = 1234
            var headers = helper.addAllHeaders(
            {});

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(400, done);
        });
    });
});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
