/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, validator) {
    // "use strict";

    chai.use(require('chai-things'));
    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Retrieval of Statements (Data 2.5)', function () {

/**  Matchup with Conformance Requirements Document
 * XAPI-00108 - below
 * XAPI-00109 - below
 * XAPI-00110 - below
 * XAPI-00111 - below
 * XAPI-00112 - duplicate of XAPI-00149 Communication 2.1.3 Statements GET
 * XAPI-00113 - below
 * XAPI-00114 - below
 */

/**  XAPI-00113, Data 2.5 Retrieval of Statements
 * An LRS's Statement API, upon processing a successful GET request, will return a single "statements" property and a single "more" property. A single "more" property must be present if there are additional results available.
 */
    describe('An LRS\'s Statement API, upon processing a successful GET request, will return a single "statements" property and a single "more" property. (Data 2.5.s2.table1, XAPI-00113)', function () {

        before('guarantee two statements in LRS', function(done) {
            var template = [
                {statement: '{{statements.default}}'}
            ],
                s1 = helper.createFromTemplate(template).statement,
                s2 = helper.createFromTemplate(template).statement,
                stmts = [s1, s2];
            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(stmts)
            .expect(200, done);
        });

        it('will return single statements property and may return', function(done) {
            this.timeout(0);
            var query = '?limit=1';
            var stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + query)
            .wait(helper.genDelay(stmtTime, query, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var result = helper.parse(res.body, done);
                    expect(result).to.have.property('statements');
                    expect(result).to.have.property('more');
                    done();
                }
            });
        });

    });

/**  XAPI-00110, Data 2.5 Retrieval of Statements
 * A "statements" property is an Array of Statements. Make a GET request which will return at least one statement and confirm the “statements” property is a valid Array of Statements.
 */
    describe('A "statements" property is an Array of Statements (Type, Data 2.5.s2.table1.row1, XAPI-00110)', function () {
        var statement, substatement, stmtTime;
        this.timeout(0);

        before('persist statement', function (done) {
            var templates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.category}}'},
                {instructor: {
                    "objectType": "Agent",
                    "name": "xAPI mbox",
                    "mbox": "mailto:pri@adlnet.gov"
                }}
            ];
            var data = helper.createFromTemplate(templates);
            statement = data.statement;

            //randomize data to prevent old results from breaking assertion logic
            statement.context.contextActivities.category.id += helper.generateUUID();
            statement.verb.id += helper.generateUUID();
            statement.actor.mbox =  "mailto:" + helper.generateUUID() + "@adlnet.gov";
            statement.context.registration =  helper.generateUUID();
            statement.context.instructor.mbox = "mailto:" +  helper.generateUUID() + "@adlnet.gov";
            statement.object.id +=  helper.generateUUID();

            statement.context.contextActivities.category.id = 'http://www.example.com/test/array/statements/pri';

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(statement)
            .expect(200, done);
        });

        before('persist substatement', function (done) {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.category}}'},
                {instructor: {
                    "objectType": "Agent",
                    "name": "xAPI mbox",
                    "mbox": "mailto:sub@adlnet.gov"
                }}
            ];
            var data = helper.createFromTemplate(templates);
            substatement = data.statement;

            //randomize data to prevent old results from breaking assertion logic
            substatement.verb.id += helper.generateUUID();
            substatement.actor.mbox =  "mailto:" + helper.generateUUID() + "@adlnet.gov";

            substatement.object.verb.id += helper.generateUUID();
            substatement.object.actor.mbox =  "mailto:" + helper.generateUUID() + "@adlnet.gov";
            substatement.object.object.id +=   helper.generateUUID();




            substatement.object.context.contextActivities.category.id = 'http://www.example.com/test/array/statements/sub';
            stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(substatement)
            .expect(200, done);
        });

        it('should return StatementResult with statements as array using GET without "statementId" or "voidedStatementId"', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .wait(helper.genDelay(stmtTime, undefined, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var result = helper.parse(res.body, done);
                    expect(result).to.have.property('statements').to.be.an('array');
                    done();
                }
            });
        });

    });

/**  XAPI-00114, Data 2.5 Retrieval of Statements
 * A "statements" property result which is paginated will create a container for each additional page.
 */
    it('A "statements" property which is too large for a single page will create a container for each additional page (Data 2.5.s2.table1.row1, XAPI-00114)', function (done){
        this.timeout(0);
        var statementTemplates = [
            {statement: '{{statements.default}}'}
        ];

        var statement1 = helper.createFromTemplate(statementTemplates);
        statement1 = statement1.statement;

        var statement2 = helper.createFromTemplate(statementTemplates);
        statement2 = statement2.statement;

        var query = helper.getUrlEncoding(
        {limit:1}
        );
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders({}))
        .json([statement1, statement2])
        .expect(200)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, null))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    else {
                        var results = helper.parse(res.body, done);
                        expect(results.statements).to.exist;
                        expect(results.more).to.exist;
                        done();
                    }
                });
            }
        });
    });

/**  XAPI-00109, Data 2.5 Retrieval of Statements
 * The "more" property is absent or an empty string (no whitespace) if the entire results of the original GET request have been returned. To test make a GET request which will return a known number of statements and check to make sure the LRS either returns an empty string or the more property is absent.
 */
    describe('The "more" property is absent or an empty string (no whitespace) if the entire results of the original GET request have been returned. (Data 2.5.s2.table1.row2, XAPI-00109)', function () {
        it('should return empty "more" property or no "more" property when all statements returned', function (done) {
            var query = helper.getUrlEncoding({verb: 'http://adlnet.gov/expapi/non/existent/344588672021038'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = helper.parse(res.body, done);
                        var passed = false;

                        if (result.more === '' || !result.more)
                            passed = true;

                        expect(passed).to.be.true;
                        done();
                    }
                });
        });
    });

/**  XAPI-00108, Data 2.5 Retrieval of Statements
 * If not empty, the "more" property's IRL refers to a specific container object corresponding to the next page of results from the original GET request. To test make a GET request which will return a known number of statements and confirm the LRS returns a “more” property which has an IRL with a container of the remaining statements and that the IRL is valid.
 */
    describe('If not empty, the "more" property\'s IRL refers to a specific container object corresponding to the next page of results from the orignal GET request (Data 2.5.s2.table1.row2, XAPI-00108)', function () {
        it('should return "more" which refers to next page of results', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?limit=1')
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = helper.parse(res.body, done);
                        expect(result).to.have.property('more');
                        expect(validator.isURL(result.more, {
                            protocols: [],
                            require_tld: false,
                            require_protocol: false,
                            require_host: false,
                            require_valid_protocol: false,
                            allow_underscores: true,
                            host_whitelist: false,
                            host_blacklist: false,
                            allow_trailing_dot: false,
                            allow_protocol_relative_urls: true })).to.be.truthy;
                        request('')
                        .get(liburl.resolve(res.request.href, result.more))
                        .headers(helper.addAllHeaders({}))
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                done(err);
                            }
                            else {
                                var results2 = helper.parse(res.body, done);
                                expect(results2.statements).to.exist;
                                expect(results2.more).to.exist;
                                done();
                            }
                        });
                    }
                });
        });
    });

/**  XAPI-00111, Data 2.5 Retrieval of Statements
 * A "more" property's referenced container object follows the same rules as the original GET request, originating with a single "statements" property and a single "more" property.
 */
    it('A "more" property\'s referenced container object follows the same rules as the original GET request, originating with a single "statements" property and a single "more" property (Data 2.5.s2.table1.row2, XAPI-00111)', function (done) {

        this.timeout(0);
        var verbTemplate = 'http://adlnet.gov/expapi/test/more/target/';
        var id1 = helper.generateUUID();
        var id2 = helper.generateUUID();
        var statementTemplates = [
            {statement: '{{statements.default}}'}
        ];

        var statement1 = helper.createFromTemplate(statementTemplates);
        statement1 = statement1.statement;
        statement1.verb.id = verbTemplate + "one";
        statement1.id = id1;

        var statement2 = helper.createFromTemplate(statementTemplates);
        statement2 = statement2.statement;
        statement2.verb.id = verbTemplate + "two";
        statement2.id = id2;
        var query = helper.getUrlEncoding(
            {limit:1}
        );
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders({}))
        .json([statement1, statement2])
        .expect(200)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, "?" + query, id2))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    }
                    else {
                        var results = helper.parse(res.body, done);
                        request('')
                        .get(liburl.resolve(res.request.href, results.more))
                        .headers(helper.addAllHeaders({}))
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                done(err);
                            }
                            else {
                                var results2 = helper.parse(res.body, done);
                                expect(results2.statements).to.exist;
                                done();
                            }
                        });
                    }
                });
            }
        });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('validator')));
