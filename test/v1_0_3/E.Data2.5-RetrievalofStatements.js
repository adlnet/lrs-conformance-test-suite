/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, validator) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Retrieval of Statements (Data 2.5)', () => {

/**  Matchup with Conformance Requirements Document
 * XAPI-00108 - below
 * XAPI-00109 - below
 * XAPI-00110 - below
 * XAPI-00111 - below
 * XAPI-00112 - duplicate of XAPI-00149 Communication 2.1.3 Statements GET
 * XAPI-00113 - below
 * XAPI-00114 - below
 */

    it('The Statements within the "statements" property will correspond to the filtering criterion sent in with the GET request **Implicit** (Data 2.5.s1, Communication 2.1.3.s1)', function (done){
        //tests most of the filtering criteria, can add additional tests for missing criteria if necessary
        this.timeout(0);
        var statementTemplates = [
            {statement: '{{statements.default}}'},
            {context: '{{contexts.default}}'}
        ];
        var id = helper.generateUUID();
        var statement = helper.createFromTemplate(statementTemplates);
        statement = statement.statement;
        statement.id = id;

        var data = {
            limit: 1,
            agent: statement.actor,
            verb: statement.verb.id,
            activity: statement.object.id,
            registration: statement.context.registration,
            related_activities: true,
            since: '2012-06-01T19:09:13.245Z',
            format: 'ids',
            attachments: false
        };

        var query = helper.getUrlEncoding(data);
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders({}))
        .json(statement)
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
                        expect(results.statements[0].id).to.equal(id);
                        done();
                    }
                });
            }
        });
    });

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
                    //in this case we can be sure there will be a more property because we know that there is more than one statement to be returned, so the more property is required
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

        it('should return StatementResult with statements as array using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = helper.createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "verb"', function (done) {
            var query = helper.getUrlEncoding({verb: statement.verb.id});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "activity"', function (done) {
            var query = helper.getUrlEncoding({activity: statement.object.id});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "registration"', function (done) {
            var query = helper.getUrlEncoding({registration: statement.context.registration});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "related_activities"', function (done) {
            var query = helper.getUrlEncoding({
                activity: statement.context.contextActivities.category.id,
                related_activities: true
            });
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "related_agents"', function (done) {
            var query = helper.getUrlEncoding({
                agent: statement.context.instructor,
                related_agents: true
            });
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "since"', function (done) {
            var query = helper.getUrlEncoding({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "until"', function (done) {
            var query = helper.getUrlEncoding({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "limit"', function (done) {
            var query = helper.getUrlEncoding({limit: 1});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "ascending"', function (done) {
            var query = helper.getUrlEncoding({ascending: true});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "format"', function (done) {
            var query = helper.getUrlEncoding({format: 'ids'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
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

        it('should return StatementResult with statements as array using GET with "attachments"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});
            var query = helper.getUrlEncoding({attachments: true});
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders(header))
            .body(attachment)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    request(helper.getEndpointAndAuth())
                    .get(helper.getEndpointStatements() + '?' + query)
                    .wait(helper.genDelay(stmtTime, '?' + query, undefined))
                    .headers(helper.addAllHeaders({}))
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            var boundary = multipartParser.getBoundary(res.headers['content-type']);
                            expect(boundary).to.be.ok;
                            var parsed = multipartParser.parseMultipart(boundary, res.body);
                            expect(parsed).to.be.ok;
                            var results = helper.parse(parsed[0].body, done);
                            expect(results).to.have.property('statements');
                            done();
                        }
                    });
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
                        //because of the 2 statements and the limit 1, we know there will be additional statements and the more link is required
                        expect(results.more).to.exist;
                        done();
                    }
                });
            }
        });
    });

    describe('A "more" property is an IRL (Format, Data 2.5.s2.table1.row2)', function () {
        it('should return "more" property as an IRL', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            var statement = data.statement;
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json([statement, statement])
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    request(helper.getEndpointAndAuth())
                    .get(helper.getEndpointStatements() + '?limit=1')
                    .wait(helper.genDelay(stmtTime, '?limit=1', undefined))
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
                            done();
                        }
                    });
                }
            });
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
                        expect(result.more).to.be.oneOf([undefined, '']);
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
/*
    So this is what I am looking for, the spec is wishy washy so if there is something more, there must be a more, and if there is nothing more, then you can just not have a more property or you can have a more property which is simply an empty string, and both of those options are valid.  Seems dumb to me, but that is our spec, and I'm sure there is some discussion on some issue somewhere where this became the all important way for this to be done.  And so now this is what I have got to test which really pisses me off at this point.

    So instead of:
        expect(results2.more).to.exist;

    we need to have:
        if (results2.more)

    Nope, really whether there is a more property or not in no way affects this part of the test.  As long as we can get more statements - we good.

*/
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
                                // expect(results2.statements && results2.more).to.exist;
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
