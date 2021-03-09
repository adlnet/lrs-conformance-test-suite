/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, crypto) {
    // "use strict";

    //Communication 2.0
/**  Matchup with Conformance Requirements Document
 * XAPI-00139 - below
 * XAPI-00140 - generic and covered by other files - An LRS implements all of the Statement, State, Agent, and Activity Profile sub-APIs
 * XAPI-00141 - covered by XAPI-00195, XAPI-00275, XAPI-00294
 */

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Statement Resource Requirements (Communication 2.1)', () => {

/**  XAPI-00139, Communication 2.0 Resources
 * An LRS has a Statement API with endpoint "base IRI"+"/statements"
 */
    describe('An LRS has a Statement Resource with endpoint "base IRI"+"/statements" (Communication 2.1, XAPI-00139)', function () {
        it('should allow "/statements" POST', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
        });

        it('should allow "/statements" PUT', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(204, done);
        });

        it('should allow "/statements" GET', function (done) {
            var query = helper.getUrlEncoding({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    //Communication 2.1.1 PUT Statements
/**  Matchup with Conformance Requirements Document
 * XAPI-00142 - below
 * XAPI-00143 - below
 * XAPI-00144 - below
 * XAPI-00145 - below
 */


/**  XAPI-00143, Communication 2.1.1 PUT Statements
 * An LRS's Statement API upon processing a valid PUT request successfully returns code 204 No Content
 */
    describe('An LRS\'s Statement Resource upon processing a successful PUT request returns code 204 No Content (Communication 2.1.1.s1, XAPI-00143)', function () {
        it('should persist statement and return status 204', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(204, done);
        });
    });

/** XAPI-00144, Communication 2.1.1 PUT Statements
 * An LRS's Statement API accepts PUT requests only if it contains a "statementId" parameter, returning 204 No Content
 */
/**  XAPI-00145, Communication 2.1.1 PUT Statements
 * An LRS's Statement API rejects a PUT request which does not have a "statementId" parameter, returning 400 Bad Request
 */
    describe('An LRS\'s Statement Resource accepts PUT requests only if it contains a "statementId" parameter (Multiplicity, Communication 2.1.1.s1.table1.row1, XAPI-00144, XAPI-00145)', function () {
        it('should persist statement using "statementId" parameter', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(204, done);
        });

        it('should fail without using "statementId" parameter', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
        });
    });

/**  XAPI-00142, Communication 2.1.1 PUT Statements
 * An LRS cannot modify a Statement in the event it receives a Statement with statementID equal to a Statement in the LRS already.  To test: Send one statement with a particular statement ID. Send a second statement with the same statement ID but everything else different. Retrieve the statement before the second statement and after and both retrieved statements MUST match.
 */
    describe('An LRS cannot modify a Statement, state, or Object in the event it receives a Statement with statementID equal to a Statement in the LRS already. (Communication 2.1.1.s2.b2, XAPI-00142)', function () {
        this.timeout(0);
        it('should not update statement with matching "statementId" on PUT', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            var query = '?statementId=' + data.id;

            var modified = extend(true, {}, data);
            modified.verb.id = 'different value';
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(204)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    request(helper.getEndpointAndAuth())
                    .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                    .headers(helper.addAllHeaders({}))
                    .json(modified)
                    .end(function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            request(helper.getEndpointAndAuth())
                            .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                            .wait(helper.genDelay(stmtTime, query, data.id))
                            .headers(helper.addAllHeaders({}))
                            .expect(200)
                            .end(function (err, res) {
                                if (err) {
                                    done(err);
                                } else {
                                    var statement = helper.parse(res.body, done);
                                    expect(statement.verb.id).to.equal(data.verb.id);
                                    done();
                                }
                            });
                        }
                    });
                }
            });
        });

        it('should not update statement with matching "statementId" on POST', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            var query = '?statementId=' + data.id;
            var modified = extend(true, {}, data);
            modified.verb.id = 'different value';
            var stmtTime = Date.now();

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
                    .post(helper.getEndpointStatements())
                    .headers(helper.addAllHeaders({}))
                    .json(modified)
                    .end(function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            request(helper.getEndpointAndAuth())
                            .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                            .wait(helper.genDelay(stmtTime, query, data.id))
                            .headers(helper.addAllHeaders({}))
                            .expect(200)
                            .end(function (err, res) {
                                if (err) {
                                    done(err);
                                } else {
                                    var statement = helper.parse(res.body, done);
                                    expect(statement.verb.id).to.equal(data.verb.id);
                                    done();
                                }
                            });
                        }
                    });
                }
            });
        });
    });

    //Communication 2.1.2 POST Statements
/**  Matchup with Conformance Requirements Document
 * XAPI-00146 - below
 * XAPI-00147 - below
 * XAPI-00148 - in H.Communication1.3-AlternateRequestSyntax.js
 */

/**  XAPI-00147, Communication 2.1.2 POST Statements
 * An LRS's Statement API accepts POST requests
 */
    describe('An LRS\'s Statement Resource accepts POST requests (Communication 2.1.2.s1, XAPI-00147)', function () {
        it('should persist statement using "POST"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
        });
    });

/**  XAPI-00146, Communication 2.1.2 POST Statements
 * An LRS's Statement API upon processing a successful POST request returns code 200 OK and all Statement UUIDs within the POST
 */
    describe('An LRS\'s Statement Resource upon processing a successful POST request returns code 200 OK and all Statement UUIDs within the POST **Implicit** (Communication 2.1.2.s1, XAPI-00146)', function () {
        it('should persist statement using "POST" and return array of IDs', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID()

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        expect(res.body).to.be.an('array').to.have.length.above(0);
                        done();
                    }
                });
        });
    });

    //Communication 2.1.3 GET Statements
/**  Matchup with Conformance Requirements Document
 * XAPI-00149 - below
 * XAPI-00150 - below
 * XAPI-00151 - below
 * XAPI-00152 - removed per spec call 2/8/17
 * XAPI-00153 - below
 * XAPI-00154 - below
 * XAPI-00155 - below
 * XAPI-00156 - below
 * XAPI-00157 - below
 * XAPI-00158 - below
 * XAPI-00159 - below
 * XAPI-00160 - below
 * XAPI-00161 - below
 * XAPI-00162 - below
 * XAPI-00163 - below
 * XAPI-00164 - below
 * XAPI-00165 - below
 * XAPI-00166 - below
 * XAPI-00167 - below
 * XAPI-00168 - below
 * XAPI-00169 - below
 * XAPI-00170 - below
 * XAPI-00171 - below
 * XAPI-00172 - below
 * XAPI-00173 - below
 * XAPI-00174 - below
 * XAPI-00175 - below
 * XAPI-00176 - below
 * XAPI-00177 - below
 * XAPI-00178 - below
 * XAPI-00179 - below
 * XAPI-00180 - below
 * XAPI-00181 - below
 */

/**  XAPI-00159, Communication 2.1.3 GET Statements
 * An LRS's Statement API accepts GET requests
 */
    describe('LRS\'s Statement Resource accepts GET requests (Communication 2.1.3.s1, XAPI-00159)', function () {
        it('should return using GET', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

/**  XAPI-00156, Communication 2.1.3 GET Statements
 * An LRS's Statement API upon processing a successful GET request with a "statementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".
 */
    describe('An LRS\'s Statement Resource upon processing a successful GET request with a "statementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (Communication 2.1.3.s1, XAPI-00156)', function () {
        var id, stmtTime;

        before('persist statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            id = data.id;

            stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
        });

        it('should retrieve statement using "statementId"', function (done) {
            this.timeout(0);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?statementId=' + id)
            .wait(helper.genDelay(stmtTime, '?statementId=' + id, id))
            .headers(helper.addAllHeaders({}))
            .expect(200).end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var statement = helper.parse(res.body, done);
                    expect(statement.id).to.equal(id);
                    done();
                }
            });
        });
    });

/**  XAPI-00155, Communication 2.1.3 GET Statements
 * An LRS's Statement API upon processing a successful GET request with a
"voidedStatementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".
 */
    describe('An LRS\'s Statement Resource upon processing a successful GET request with a "voidedStatementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (Communication 2.1.3.s1, XAPI-00155)', function () {
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
                {statement: '{{statements.voiding}}'}
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

/**  XAPI-00154, Communication 2.1.3 GET Statements
 * An LRS's Statement API upon processing a successful GET request with neither a "statementId" nor a "voidedStatementId" parameter, returns code 200 OK and a
StatementResult Object.
 */
    describe('An LRS\'s Statement Resource upon processing a successful GET request with neither a "statementId" nor a "voidedStatementId" parameter, returns code 200 OK and a StatementResult Object.  (Communication 2.1.3.s1, XAPI-00154)', function () {
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

        it('should return StatementResult using GET without "statementId" or "voidedStatementId"', function (done) {
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

        it('should return StatementResult using GET with "agent"', function (done) {
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

        it('should return StatementResult using GET with "verb"', function (done) {
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

        it('should return StatementResult using GET with "activity"', function (done) {
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

        it('should return StatementResult using GET with "registration"', function (done) {
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

        it('should return StatementResult using GET with "related_activities"', function (done) {
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

        it('should return StatementResult using GET with "related_agents"', function (done) {
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

        it('should return StatementResult using GET with "since"', function (done) {
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

        it('should return StatementResult using GET with "until"', function (done) {
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

        it('should return StatementResult using GET with "limit"', function (done) {
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

        it('should return StatementResult using GET with "ascending"', function (done) {
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

        it('should return StatementResult using GET with "format"', function (done) {
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
                    var results = helper.parse(res.body, done);
                    expect(results).to.have.property('statements');
                    done();
                }
            });
        });

        it('should return multipart response format StatementResult using GET with "attachments" parameter as true', function (done) {
            var query = helper.getUrlEncoding({attachments: true});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.headers).to.have.property('content-type');
                    var boundary = multipartParser.getBoundary(res.headers['content-type']);
                    expect(boundary).to.be.ok;
                    var parsed = multipartParser.parseMultipart(boundary, res.body);
                    expect(parsed).to.be.ok;
                    var results = helper.parse(parsed[0].body, done);
                    expect(results).to.have.property('statements');
                    done();
                }
            });
        });

        it('should not return multipart response format using GET with "attachments" parameter as false', function (done) {
            var query = helper.getUrlEncoding({attachments: false});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var results = helper.parse(res.body);
                    expect(results).to.have.property('statements');
                    done();
                }
            });
        });

    });

/**  XAPI-00158, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "statementId" as a parameter
 */
    describe('An LRS\'s Statement Resource can process a GET request with "statementId" as a parameter (Communication 2.1.3.s1.table1.row1, XAPI-00158)', function () {
        it('should process using GET with "statementId"', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            var query = '?statementId=' + data.id;
            var stmtTime = Date.now();

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
                    .wait(helper.genDelay(stmtTime, query, data.id))
                    .headers(helper.addAllHeaders({}))
                    .expect(200, done);
                }
            });
        });
    });

/**  XAPI-00157, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "voidedStatementId" as a parameter
 */
    describe('An LRS\'s Statement Resource can process a GET request with "voidedStatementId" as a parameter  (Communication 2.1.3.s1.table1.row2, XAPI-00157)', function () {
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
                {statement: '{{statements.voiding}}'}
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

        it('should process using GET with "voidedStatementId"', function (done) {
            this.timeout(0);
            var query = helper.getUrlEncoding({voidedStatementId: voidedId});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

/**  XAPI-00181, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "agent" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with exact match agent result if the agent parameter is set with a valid Agent IFI
 */
    describe('An LRS\'s Statement Resource can process a GET request with "agent" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row3, XAPI-00181)', function () {
        it('should process using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = helper.createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

/**  XAPI-00180, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "verb" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with exact match verb results if the verb parameter is set with a valid Verb IRI
 */
    describe('An LRS\'s Statement Resource can process a GET request with "verb" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row4, XAPI-00180)', function () {
        it('should process using GET with "verb"', function (done) {
            var query = helper.getUrlEncoding({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

/**  XAPI-00179, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "activity" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with exact match activity results if the activity parameter is set with a valid activity IRI
 */
    describe('An LRS\'s Statement Resource can process a GET request with "activity" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row5, XAPI-00179)', function () {
        it('should process using GET with "activity"', function (done) {
            var query = helper.getUrlEncoding({activity: 'http://www.example.com/meetings/occurances/12345'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

/**  XAPI-00178, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "registration" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with exact match registration results if the registration parameter is set with a valid registration UUID
 */
    describe('An LRS\'s Statement Resource can process a GET request with "registration" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row6, XAPI-00178)', function () {
        it('should process using GET with "registration"', function (done) {
            var query = helper.getUrlEncoding({registration: helper.generateUUID()});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

/**  XAPI-00177, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "related_activities" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with exact match activity results if the activity parameter is set with a valid Verb IRI unless the related_activities parameter is set to true. If set to true it MUST return 200 OK, StatementResult Object with activity ID matches in the Statement Object, and Context Objects and SubStatement Objects.
 */
    describe('An LRS\'s Statement Resource can process a GET request with "related_activities" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row7)', function () {
        var statement, stmtTime;

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
            stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(statement)
                .expect(200, done);
        });

        it('should process using GET with "related_activities"', function (done) {
            this.timeout(0);
            var query = helper.getUrlEncoding({
                activity: statement.context.contextActivities.category.id,
                related_activities: true
            });
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

/**  XAPI-00176. Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "related_agents" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with exact match agent results if the agent parameter is set with a valid Agent or Identified Group JSON Object unless the related_agents parameter is set to true. If set to true it MUST return 200 OK, StatementResult Object with agent matches in the Actor, Object, authority, instructor, team, or any of these properties in a contained SubStatement
 */
    describe('An LRS\'s Statement Resource can process a GET request with "related_agents" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row8, XAPI-00176)', function () {
        var statement, stmtTime;

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
            stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(statement)
            .expect(200, done);
        });

        it('should process using GET with "related_agents"', function (done) {
            this.timeout(0);

            var query = helper.getUrlEncoding({
                agent: statement.context.instructor,
                related_agents: true
            });
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

/**  XAPI-00175, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "since" as a parameter. The Statement API MUST return 200 OK, StatementResult Object containing all statements which have a stored timestamp after the since parameter timestamp in the query.
 */
    describe('An LRS\'s Statement Resource can process a GET request with "since" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row9, XAPI-00175)', function () {
        it('should process using GET with "since"', function (done) {
            var query = helper.getUrlEncoding({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

/**  XAPI-00174, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "until" as a parameter. The Statement API MUST return 200 OK, StatementResult Object containing all statements which have a stored timestamp at or before the specified until parameter timestamp.
 */
    describe('An LRS\'s Statement Resource can process a GET request with "until" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row10, XAPI-00174)', function () {
        it('should process using GET with "until"', function (done) {
            var query = helper.getUrlEncoding({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

/**  XAPI-00173, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "limit" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with only the number of results set by the integer in the limit parameter. If the limit parameter is not present, the limit is defaulted to 0 which returns all results up to the server limit.
 */
    describe('An LRS\'s Statement Resource can process a GET request with "limit" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row11, XAPI-00173)', function () {
        it('should process using GET with "limit"', function (done) {
            var query = helper.getUrlEncoding({limit: 1});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

/**  XAPI-00172, Communication 2.1.3 GET Statements
 * If the "Accept-Language" header is present as part of the GET request to the Statement API and the "format" parameter is set to "canonical", the LRS MUST apply this data to choose the matching language in the response.
 */
    describe('If the "Accept-Language" header is present as part of the GET request to the Statement API and the "format" parameter is set to "canonical", the LRS MUST apply this data to choose the matching language in the response. (Communication 2.1.3.s1.table1.row11, XAPI-00172)',function()
    {
        var statement;
        var statementID;
        var stmtTime;
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

            stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(statement)
            .expect(200, function(err,res)
                {
                    statementID = res.body[0];
                    done(err);
                });
        });

        it('should apply this data to choose the matching language in the response', function (done) {
            this.timeout(0);
            var query = helper.getUrlEncoding({
                statementId:statementID,
                format: "canonical"
            });

            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(null, null, statementID))
            .headers(helper.addAllHeaders({"Accept-Language":"en-GB"}))
            .expect(200,  function(err,res)
                {
                    if(err) console.log(err);

                    var statement = JSON.parse(res.body);
                    // console.log(require("util").inspect(statement,{depth:7}));
                    expect(statement.verb.display).not.to.have.property("en-US");
                    expect(statement.context.contextActivities.category[0].definition.description).not.to.have.property("en-US");
                    expect(statement.context.contextActivities.category[0].definition.name).not.to.have.property("en-US");
                    done(err);
                });
        });

        it('should NOT apply this data to choose the matching language in the response when format is not set ', function (done) {
            this.timeout(0);
            var query = helper.getUrlEncoding({
                statementId:statementID,
            });

            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(null, null, statementID))
            .headers(helper.addAllHeaders({"Accept-Language":"en-GB"}))
            .expect(200,  function(err,res)
                {
                    if(err) console.log(err);

                    var statement = JSON.parse(res.body);
                    // console.log(require("util").inspect(statement,{depth:7}));
                    expect(statement.verb.display).to.have.property("en-US");
                    expect(statement.context.contextActivities.category[0].definition.description).to.have.property("en-US");
                    expect(statement.context.contextActivities.category[0].definition.name).to.have.property("en-US");

                    expect(statement.verb.display).to.have.property("en-GB");
                    expect(statement.context.contextActivities.category[0].definition.description).to.have.property("en-GB");
                    expect(statement.context.contextActivities.category[0].definition.name).to.have.property("en-GB");
                    done(err);
                });
        });

    })

/**  XAPI-00168, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "format" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with results in the requested format or in “exact” if the “format” parameter is absent.
 */
/**  XAPI-00169, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "format" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with results in the requested format. If “canonical”, return Activity Objects and Verbs populated with the canonical definition of the Activity Objects and Display of the Verbs as determined by the LRS, returning only one language.
 */
/**  XAPI-00170, Communication 2.1.3 GET Statements
* An LRS's Statement API can process a GET request with "format" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with results in the requested format. If “exact”, return Agent, Activity, Verb and Group Objects populated exactly as they were when the Statement was received.
*/
/**  XAPI-00171, Communication 2.1.3 GET Statements
* An LRS's Statement API can process a GET request with "format" as a parameter. The Statement API MUST return 200 OK, StatementResult Object with results in the requested format. If “ids”, only include identifiers for Agent, Activity, Verb, Group Objects, and members of Anonymous groups.
*/
    describe('An LRS\'s Statement Resource can process a GET request with "format" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row12)', function () {
        this.timeout(0);
        var agent, activity, group, verb1, verb2, id, stmtTime;
        before('setting up the statement to test against', function(done) {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{statements.unicode}}'},
                {actor: '{{groups.default}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;
            agent = data.actor;
            agent.mbox = 'mailto:agent'+helper.generateUUID()+'@adlnet.gov';
            verb1 = data.verb;
            group = data.object.actor;
            group.mbox = 'mailto:group'+helper.generateUUID()+'@adlnet.gov';
            verb2 = data.object.verb;
            data.object.object.id = 'http://www.example.com/unicode/' +helper.generateUUID();
            activity = data.object.object;
            stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    id = res.body[0];
                    done();
                }
            })
        });
        // XAPI-00168
        it('should process using GET with "format" absent (XAPI-00168)', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements())
                .wait(helper.genDelay(stmtTime, '?statementId='+id, id))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = helper.parse(res.body);
                        var stmts = result.statements;
                        expect(stmts).to.be.an('array');
                        stmts.forEach(function(stmt) {
                            if (stmt.id === id) {
                                expect(stmt.actor).to.eql(agent);
                                expect(stmt.verb).to.eql(verb1);
                                expect(stmt.object.actor).to.eql(group);
                                expect(stmt.object.object).to.eql(activity);
                                expect(stmt.object.verb).to.eql(verb2);
                            }
                        });
                        done();
                    }
                });
        });
        // XAPI-00169
        it('should process using GET with "format" canonical (XAPI-00169)', function (done) {
            var query = helper.getUrlEncoding({format: 'canonical'});

            // Build a better actor
            var canonicalActor = {};
            canonicalActor.mbox = agent.mbox;
            canonicalActor.objectType = agent.objectType;
            canonicalActor.name = agent.name;

            // Build a better verb
            var mainVerb = {};
            mainVerb.id = verb1.id;
            mainVerb.display = {};
            mainVerb.display["en-GB"] = verb1.display["en-GB"];

            // Build a better substatement verb
            var subVerb = {};
            subVerb.id = verb2.id;
            subVerb.display = {};
            subVerb.display["en-GB"] = verb2.display["en-GB"];

            // Build a better activity
            var canonicalSubActivity = {};
            canonicalSubActivity.objectType = activity.objectType;
            canonicalSubActivity.id = activity.id;
            canonicalSubActivity.definition = {};
            canonicalSubActivity.definition.name = {}
            canonicalSubActivity.definition.name["en-GB"] = activity.definition.name["en-GB"];
            canonicalSubActivity.definition.description = {};
            canonicalSubActivity.definition.description["en-GB"] = activity.definition.description["en-GB"];
            canonicalSubActivity.definition.type = activity.definition.type;
            canonicalSubActivity.definition.moreInfo = activity.definition.moreInfo;
            canonicalSubActivity.definition.interactionType = activity.definition.interactionType;
            canonicalSubActivity.definition.correctResponsesPattern = activity.definition.correctResponsesPattern;
            canonicalSubActivity.definition.extensions = activity.definition.extensions;

            // Build a better group
            var canonicalGroup = {};
            canonicalGroup.mbox = group.mbox;
            canonicalGroup.objectType = group.objectType;
            canonicalGroup.name = group.name;

            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({"Accept-Language":"en-GB"}))
                .wait(helper.genDelay(stmtTime, '?statementId='+id, id))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = helper.parse(res.body);
                        var stmts = result.statements;
                        expect(stmts).to.be.an('array');
                        stmts.forEach(function(stmt) {
                            if (stmt.id === id) {
                                expect(stmt.actor).to.eql(canonicalActor);
                                expect(stmt.verb).to.eql(mainVerb);
                                expect(stmt.object.verb).to.eql(subVerb);
                                expect(stmt.object.object).to.eql(canonicalSubActivity);
                                expect(stmt.object.actor).to.eql(canonicalGroup);
                            }
                        });
                        done();
                    }
                });
        });
        // XAPI-00170
        it('should process using GET with "format" exact (XAPI-00170)', function (done) {
            var query = helper.getUrlEncoding({format: 'exact'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?statementId='+id, id))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = helper.parse(res.body);
                        var stmts = result.statements;
                        expect(stmts).to.be.an('array');
                        stmts.forEach(function(stmt) {
                            if (stmt.id === id) {
                                expect(stmt.actor).to.eql(agent);
                                expect(stmt.verb).to.eql(verb1);
                                expect(stmt.object.actor).to.eql(group);
                                expect(stmt.object.verb).to.eql(verb2);
                                expect(stmt.object.object).to.eql(activity);
                            }
                        });
                        done();
                    }
                });
        });
        // XAPI-00171
        it('should process using GET with "format" ids (XAPI-00171)', function (done) {
            var query = helper.getUrlEncoding({format: 'ids'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?statementId='+id, id))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = helper.parse(res.body);
                        var stmts = result.statements;
                        expect(stmts).to.be.an('array');
                        stmts.forEach(function(stmt) {
                            if (stmt.id === id) {
                                expect(Object.keys(stmt.actor).length).to.be.within(1, 2);
                                expect(Object.keys(stmt.object.actor).length).to.eql(2);
                                expect(Object.keys(stmt.object.object).length).to.eql(1);
                                /*  Removed since spec 1.0.3 is SHOULD*
                                expect(Object.keys(stmt.verb).length).to.eql(1);
                                expect(Object.keys(stmt.object.verb).length).to.eql(1);
                                */
                                expect(stmt.actor.mbox).to.eql(agent.mbox);
                                if (stmt.actor.objectType) {
                                    expect(stmt.actor.objectType).to.eql(agent.objectType);
                                }
                                expect(stmt.verb.id).to.eql(verb1.id);
                                expect(stmt.object.actor.mbox).to.eql(group.mbox);
                                expect(stmt.object.actor.objectType).to.eql(group.objectType);
                                expect(stmt.object.object.id).to.eql(activity.id);
                                expect(stmt.object.verb.id).to.eql(verb2.id);
                            }
                        });
                        done();
                    }
                });
        });
    });

/**  XAPI-00167, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "attachments" as a parameter. The Statement API MUST return 200 OK, StatementResult Object and use the multipart response format and include all attachments if the attachment parameter is set to true
 */
    describe('An LRS\'s Statement Resource can process a GET request with "attachments" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row13, XAPI-00167)', function () {

        var stmtTime, stmtId;

        before('set up statement with two attachments for test', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var templates = [
                {statement: '{{statements.attachment}}'},
                {
                    attachments: [
                        {
                            "usageType":"http://example.com/attachment-usage/test",
                            "display":{"en-US":"A test attachment"},
                            "contentType":"text/plain",
                            "length":0,
                            "sha2":"",
                            "description":{"en-US":"A test attachment (description)"}
                        },
                        {
                            "usageType":"http://example.com/attachment-usage/test",
                            "display":{"en-US":"A test attachment"},
                            "contentType":"text/plain",
                            "length":0,
                            "sha2":"",
                            "description":{"en-US":"A test attachment (description)"}
                        }
                    ]
                }
            ];
            data = helper.createFromTemplate(templates);
            data = data.statement;

            txtAtt1 = fs.readFileSync('test/v1_0_3/templates/attachments/simple_text1.txt');
            var t1stats = fs.statSync('test/v1_0_3/templates/attachments/simple_text1.txt');
            t1attSize = t1stats.size;
            t1attHash = crypto.createHash('SHA256').update(txtAtt1).digest('hex');

            txtAtt2 = fs.readFileSync('test/v1_0_3/templates/attachments/simple_text2.txt');
            var t2stats = fs.statSync('test/v1_0_3/templates/attachments/simple_text2.txt');
            t2attSize = t2stats.size;
            t2attHash = crypto.createHash('SHA256').update(txtAtt2).digest('hex');

            data.attachments[0].length = t1attSize;
            data.attachments[0].sha2 = t1attHash;
            data.attachments[1].length = t2attSize;
            data.attachments[1].sha2 = t2attHash;

            var dashes = '--';
            var crlf = '\r\n';
            var boundary = '-------314159265358979323846'

            var msg = dashes + boundary + crlf;
            msg += 'Content-Type: application/json' + crlf + crlf;
            msg += JSON.stringify(data) + crlf;
            msg += dashes + boundary + crlf;
            msg += 'Content-Type: text/plain' + crlf;
            msg += 'Content-Transfer-Encoding: binary' + crlf;
            msg += 'X-Experience-API-Hash: ' + data.attachments[0].sha2 + crlf + crlf;
            msg += txtAtt1 + crlf;
            msg += dashes + boundary + crlf;
            msg += 'Content-Type: text/plain' + crlf;
            msg += 'Content-Transfer-Encoding: binary' + crlf;
            msg += 'X-Experience-API-Hash: ' + data.attachments[1].sha2 + crlf + crlf;
            msg += txtAtt2 + crlf;
            msg += dashes + boundary + dashes + crlf;

            stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders(header))
            .body(msg)
            .expect(200, function (err, res) {
                if (err) {
                    done(err);
                } else {
                    stmtId = helper.parse(res.body, done)[0];
                    done();
                }
            });
        });

        it('should process using GET with "attachments"', function (done) {
            this.timeout(0);
            var query = helper.getUrlEncoding({attachments: true, statementId: stmtId});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, stmtId))
            .headers(helper.addAllHeaders({}))
            .expect(200, function (err, res) {
                if (err) {
                    done(err);
                } else {
                    expect(res.headers['content-type']).to.include('multipart/mixed');
                    // Find the boundary
                    var b = res.headers['content-type'].split(';');
                    var boundary;
                    var quotes = b[1].match(/"/g);
                    if (quotes) {
                        boundary = b[1].trim().match(/"([^"]+)"/)[1];
                    } else {
                        var temp = b[1].trim();
                        boundary = temp.substring(temp.indexOf('=') + 1);
                    }
                    // Verify we have the statement we asked for
                    // Use boundary to get the first part of response, excluding "--"
                    var x = res.body.split(boundary);
                    var c = x[1].substring(x[1].indexOf('{'), x[1].lastIndexOf('}') + 1);
                    var result = helper.parse(c, done);
                    expect(result).to.have.property('id');
                    expect(result.id).to.equal(stmtId);
                    // Create an array of global matches of the pattern, the length of which is equal to the number of times that pattern appears in the given string
                    var regex1 = new RegExp(t1attHash, 'g');
                    var regex2 = new RegExp(t2attHash, 'g');
                    var match1 = (res.body.match(regex1) || []).length;
                    var match2 = (res.body.match(regex2) || []).length;
                    // Compare that number to 2 the number of times it is expected for a given has to appear in the response, once in the attachments property, and once along with the attachment
                    expect(match1).to.eql(2);
                    expect(match2).to.eql(2);
                    done();
                }
            });
        });
    });

/**  XAPI-00165, Communication 2.1.3 GET Statements
 * An LRS's Statement API, upon receiving a GET request,
MUST have a "Content-Type" header
 */
    describe('An LRSs Statement Resource, upon receiving a GET request, MUST have a "Content-Type" header(**Implicit**, Communication 2.1.3.s1.table1.row14, XAPI-00165)', function () {
        it('should contain the content-type header', function (done) {
            var query = helper.getUrlEncoding({ascending: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, function(err,res)
                    {
                        expect(res.headers).to.have.property("content-type");
                        done();

                    });
        });
    });


/**  XAPI-00166, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "ascending" as a parameter The Statement API MUST return 200 OK, StatementResult Object with results in ascending order of stored time if the ascending parameter is set to true.
 */
    describe('An LRS\'s Statement Resource can process a GET request with "ascending" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row14, XAPI-00166)', function () {
        it('should process using GET with "ascending"', function (done) {
            var query = helper.getUrlEncoding({ascending: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

/**  XAPI-00151, Communication 2.1.3 GET Statements
 * An LRS's Statement API rejects a GET request with both "statementId" and anything other than "attachments" or "format" as parameters with error code 400 Bad Request.
 */
    describe('An LRS\'s Statement Resource rejects with error code 400 a GET request with both "statementId" and anything other than "attachments" or "format" as parameters (Communication 2.1.3.s2.b2, XAPI-00151)', function () {
        var id;
        var stmtTime;
        this.timeout(0);

        before('persist statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            id = data.id;
            stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200, done);
        });

        it('should fail when using "statementId" with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data.statementId = id;

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, id))
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail when using "statementId" with "verb"', function (done) {
            var data = {
                statementId: id,
                verb: 'http://adlnet.gov/expapi/non/existent'
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, id))
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail when using "statementId" with "activity"', function (done) {
            var data = {
                statementId: id,
                activity: 'http://www.example.com/meetings/occurances/12345'
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, id))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should fail when using "statementId" with "registration"', function (done) {
            var data = {
                statementId: id,
                registration: helper.generateUUID()
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, id))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should fail when using "statementId" with "related_activities"', function (done) {
            var data = {
                statementId: id,
                related_activities: true
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, id))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should fail when using "statementId" with "related_agents"', function (done) {
            var data = {
                statementId: id,
                related_agents: true
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, id))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should fail when using "statementId" with "since"', function (done) {
            var data = {
                statementId: id,
                since: '2012-06-01T19:09:13.245Z'
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, id))
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail when using "statementId" with "until"', function (done) {
            var data = {
                statementId: id,
                until: '2012-06-01T19:09:13.245Z'
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, id))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should fail when using "statementId" with "limit"', function (done) {
            var data = {
                statementId: id,
                limit: 1
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, id))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should fail when using "statementId" with "ascending"', function (done) {
            var data = {
                statementId: id,
                ascending: true
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, id))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should pass when using "statementId" with "format"', function (done) {
            var data = {
                statementId: id,
                format: 'ids'
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, id))
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });

        it('should pass when using "statementId" with "attachments"', function (done) {
            var data = {
                statementId: id,
                attachments: true
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, id))
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

/**  XAPI-00150, Communication 2.1.3 GET Statements
 * An LRS's Statement API rejects a GET request with both "voidedStatementId" and anything other than "attachments" or "format" as parameters with error code 400 Bad Request.
 */
    describe('An LRS\'s Statement Resource rejects with error code 400 a GET request with both "voidedStatementId" and anything other than "attachments" or "format" as parameters (Communication 2.1.3.s2.b2, XAPI-00150)', function () {
        var voidedId = helper.generateUUID();
        var stmtTime;
        this.timeout(0);

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
                {statement: '{{statements.voiding}}'}
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

        it('should fail when using "voidedStatementId" with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data.statementId = voidedId;

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "verb"', function (done) {
            var data = {
                statementId: voidedId,
                verb: 'http://adlnet.gov/expapi/non/existent'
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "activity"', function (done) {
            var data = {
                statementId: voidedId,
                activity: 'http://www.example.com/meetings/occurances/12345'
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "registration"', function (done) {
            var data = {
                statementId: voidedId,
                registration: helper.generateUUID()
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "related_activities"', function (done) {
            var data = {
                statementId: voidedId,
                related_activities: true
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "related_agents"', function (done) {
            var data = {
                statementId: voidedId,
                related_agents: true
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "since"', function (done) {
            var data = {
                statementId: voidedId,
                since: '2012-06-01T19:09:13.245Z'
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "until"', function (done) {
            var data = {
                statementId: voidedId,
                until: '2012-06-01T19:09:13.245Z'
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "limit"', function (done) {
            var data = {
                statementId: voidedId,
                limit: 1
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "ascending"', function (done) {
            var data = {
                statementId: voidedId,
                ascending: true
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
            .headers(helper.addAllHeaders({}))
            .expect(400, done);
        });

        it('should pass when using "voidedStatementId" with "format"', function (done) {
            var data = {
                voidedStatementId: voidedId,
                format: 'ids'
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });

        it('should pass when using "voidedStatementId" with "attachments"', function (done) {
            var data = {
                voidedStatementId: voidedId,
                attachments: true
            };

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

/**  XAPI-00149, Communication 2.1.3 GET Statements
 * The LRS will NOT reject a GET request which returns an empty "statements" property. Send a GET request which will not return any results and check that a 200 Ok and an empty StatementResult Object is returned.
 */
    describe('The LRS will NOT reject a GET request which returns an empty "statements" property (**Implicit**, Communication 2.1.3.s2.b4, XAPI-00149)', function () {
        it('should return empty array list', function (done) {
            var query = helper.getUrlEncoding({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err)
                } else {
                    var result = helper.parse(res.body, done);
                    expect(result).to.have.property('statements').to.be.an('array').to.be.length(0);
                    done();
                }
            });
        });
    });

/**  XAPI-00153, Communication 2.1.3 GET Statements
 * An LRS's Statement API upon processing a GET request, returns a header with name "X-Experience-API-Consistent-Through" regardless of the code returned.
 */
    describe('An LRS\'s Statement Resource upon processing a GET request, returns a header with name "X-Experience-API-Consistent-Through" regardless of the code returned. (Communication 2.1.3.s2.b5, XAPI-00153)', function () {
        it('should return "X-Experience-API-Consistent-Through" using GET', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" misusing GET (status code 400)', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?LIMIT=1')
            .headers(helper.addAllHeaders({}))
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = helper.createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "verb"', function (done) {
            var query = helper.getUrlEncoding({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "activity"', function (done) {
            var query = helper.getUrlEncoding({activity: 'http://www.example.com/meetings/occurances/12345'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "registration"', function (done) {
            var query = helper.getUrlEncoding({registration: helper.generateUUID()});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "related_activities"', function (done) {
            var query = helper.getUrlEncoding({related_activities: true});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "related_agents"', function (done) {
            var query = helper.getUrlEncoding({related_agents: true});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "since"', function (done) {
            var query = helper.getUrlEncoding({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "until"', function (done) {
            var query = helper.getUrlEncoding({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "limit"', function (done) {
            var query = helper.getUrlEncoding({limit: 1});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "ascending"', function (done) {
            var query = helper.getUrlEncoding({ascending: true});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "format"', function (done) {
            var query = helper.getUrlEncoding({format: 'ids'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "attachments"', function (done) {
            var query = helper.getUrlEncoding({attachments: true});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var through = res.headers['x-experience-api-consistent-through'];
                    expect(through).to.be.ok;
                    done();
                }
            });
        });
    });

/**  XAPI-00160, Communication 2.1.3 GET Statements
 * An LRS's "X-Experience-API-Consistent-Through" header is an ISO 8601 combined date and time
 */
    describe('An LRS\'s "X-Experience-API-Consistent-Through" header is an ISO 8601 combined date and time (Type, Communication 2.1.3.s2.b5).', function () {
        var statement, stmtTime;
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

            stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(statement)
            .expect(200, done);
        });

        it('should return valid "X-Experience-API-Consistent-Through" using GET', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .wait(helper.genDelay(stmtTime, undefined, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "agent"', function (done) {
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
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "verb"', function (done) {
            var query = helper.getUrlEncoding({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "activity"', function (done) {
            var query = helper.getUrlEncoding({activity: 'http://www.example.com/meetings/occurances/12345'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "registration"', function (done) {
            var query = helper.getUrlEncoding({registration: helper.generateUUID()});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "related_activities"', function (done) {
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
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "related_agents"', function (done) {
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
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "since"', function (done) {
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
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "until"', function (done) {
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
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "limit"', function (done) {
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
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "ascending"', function (done) {
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
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "format"', function (done) {
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
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "attachments"', function (done) {
            var query = helper.getUrlEncoding({attachments: true});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(stmtTime, '?' + query, undefined))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var value = res.headers['x-experience-api-consistent-through'];
                    expect(value).to.be.ok;
                    var through = moment(value, moment.ISO_8601);
                    expect(through).to.be.ok;
                    expect(through.isValid()).to.be.true;
                    done();
                }
            });
        });
    });

/**  XAPI-00161, Communication 2.1.3 GET Statements
 * An LRS's Statement API not return attachment data and only return application/json if the "attachment" parameter set to "false"
 */
    describe('An LRSs Statement Resource does not return attachment data and only returns application/json if the "attachment" parameter set to "false" (Communication 2.1.3.s1.b1, XAPI-00161)', function () {
        this.timeout(0);
        var statementId = null;
        var stmtTime = null;

        before("store statement",function(done){
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var templates = [
                {statement: '{{statements.attachment}}'},
                {
                    attachments: [
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "text/plain",
                            "length": 0,
                            "sha2": "",
                            "fileUrl": "http://over.there.com/file.txt"
                        }
                    ]
                }
            ];
            data = helper.createFromTemplate(templates);
            data = data.statement;

            txtAtt1 = fs.readFileSync('test/v1_0_3/templates/attachments/simple_text1.txt');
            var t1stats = fs.statSync('test/v1_0_3/templates/attachments/simple_text1.txt');
            t1attSize = t1stats.size;
            t1attHash = crypto.createHash('SHA256').update(txtAtt1).digest('hex');

            data.attachments[0].length = t1attSize;
            data.attachments[0].sha2 = t1attHash;

            var dashes = '--';
            var crlf = '\r\n';
            var boundary = '-------314159265358979323846'

            var msg = dashes + boundary + crlf;
            msg += 'Content-Type: application/json' + crlf + crlf;
            msg += JSON.stringify(data) + crlf;
            msg += dashes + boundary + crlf;
            msg += 'Content-Type: text/plain' + crlf;
            msg += 'Content-Transfer-Encoding: binary' + crlf;
            msg += 'X-Experience-API-Hash: ' + data.attachments[0].sha2 + crlf + crlf;
            msg += txtAtt1 + crlf;
            msg += dashes + boundary + dashes + crlf;
            stmtTime = Date.now() ;
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(msg)
                .expect(200,function(err,res)
                {
                    if(err)
                        done(err)
                    else
                    {
                        var body = JSON.parse(res.body);

                        statementId = body[0];
                        // console.log("Statement ID is", statementId)
                        done();
                    }
                });
        });

        it('should NOT return the attachment if "attachments" is missing', function (done) {
            var query = '?statementId=' + statementId;
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + query)
            .wait(helper.genDelay(stmtTime, query, statementId))
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    expect(res.headers["content-type"]).to.match(/^application\/json/);
                    done();
                }
            });
        });

        it('should NOT return the attachment if "attachments" is false', function (done) {
            var query = '?statementId=' + statementId + "&attachments=false";

            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + query)
            .wait(helper.genDelay(stmtTime, query, statementId))
            .headers(helper.addAllHeaders())
            .expect(200)
            .end(function(err, res){
                if (err) {
                    done(err);
                } else {
                    expect(res.headers["content-type"]).to.match(/^application\/json/);
                    done();
                }
            });
        });

        it('should return the attachment when "attachment" is true', function (done) {
            var query = '?statementId=' + statementId + "&attachments=true";
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + query)
            .wait(helper.genDelay(stmtTime, query, statementId))
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    var ContentType = res.headers["content-type"];
                    var type = ContentType.split(";")[0];
                    expect(type).to.equal("multipart/mixed");
                    var boundary = ContentType.split(";")[1].replace(" boundary=","");

                    var body = res.body.split("--"+boundary);
                    var idx = -1;
                    for(var i in body)
                    {
                        idx = Math.max(body[i].indexOf("here is a simple attachment"),idx);
                    }
                    expect(idx).to.not.eql(-1);
                    done();
                }
            });

        });

    });

/**  XAPI-00163, Communication 2.1.3 GET Statements
 * An LRS's Statement API, upon processing a successful GET request, can only return a Voided Statement if that Statement is specified in the voidedStatementId parameter of that request
 */
    describe('An LRS\'s Statement Resource, upon processing a successful GET request, can only return a Voided Statement if that Statement is specified in the voidedStatementId parameter of that request (Communication 2.1.4.s1.b1, XAPI-00163)', function () {
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
                {statement: '{{statements.voiding}}'}
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

        it('should not return a voided statement if using GET "statementId"', function (done) {
            this.timeout(0);
            var query = helper.getUrlEncoding({statementId: voidedId});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(404, done);
        });
    });

/**  XAPI-00162, Communication 2.1.3 GET Statements
 * An LRS's Statement API processes a successful GET request using a parameter (such as stored time) which includes a voided statement and unvoided statements targeting the voided statement. The API must return 200 Ok and the statement result object, containing statements which target a voided statement, but not the voided statement itself.
 */
    describe('An LRS\'s Statement Resource, upon processing a successful GET request wishing to return a Voided Statement still returns Statements which target it (Communication 2.1.4.s1.b2, XAPI-00162)', function () {
        this.timeout(0);
        var verbTemplate = 'http://adlnet.gov/expapi/test/voided/target/';
        var verb = verbTemplate + helper.generateUUID();
        var voidedId = helper.generateUUID();
        var voidingId = helper.generateUUID();
        var statementRefId = helper.generateUUID();
        var sinceVoidingTime, untilVoidingTime;
        var stmtTime, prevStmtTime;

        before('persist voided statement', function (done) {
            // console.log(new Date(Date.now() - helper.getTimeMargin()).toISOString() + ' Ed Before');
            sinceVoidingTime = new Date(Date.now() - helper.getTimeMargin() - 4000).toISOString();
            var voidedTemplates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = helper.createFromTemplate(voidedTemplates);
            voided = voided.statement;
            voided.id = voidedId;
            voided.verb.id = verb;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(voided)
            .expect(200, done);
        });

        before('persist voiding statement', function (done) {
            // console.log(new Date(Date.now() - helper.getTimeMargin()).toISOString() + ' Ing Before');
            var voidingTemplates = [
                {statement: '{{statements.voiding}}'}
            ];
            var voiding = helper.createFromTemplate(voidingTemplates);
            voiding = voiding.statement;
            voiding.id = voidingId;
            voiding.object.id = voidedId;

            prevStmtTime = Date.now();
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .wait(helper.genDelay(sinceVoidingTime, '?statementId='+voidedId, voidedId))
                .headers(helper.addAllHeaders({}))
                .json(voiding)
                .expect(200, done);
        });

        before('persist object with statement references', function (done) {
            // console.log(new Date(Date.now() - helper.getTimeMargin()).toISOString() + ' Ref Before');
            var statementRefTemplates = [
                {statement: '{{statements.object_statementref}}'}
            ];
            var statementRef = helper.createFromTemplate(statementRefTemplates);
            statementRef = statementRef.statement;
            statementRef.id = statementRefId;
            statementRef.object.id = voidedId;
            statementRef.verb.id = verb;

            stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .wait(helper.genDelay(prevStmtTime, '?statementId='+voidingId, voidingId))
            .headers(helper.addAllHeaders({}))
            .json(statementRef)
            .expect(200, done);
        });

        before('ensure all stmts are recorded in the lrs', function (done) {
            // console.log(new Date(Date.now() - helper.getTimeMargin()).toISOString() + ' Final Before');
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .wait(helper.genDelay(stmtTime, '?statementId='+statementRefId, statementRefId))
            .headers(helper.addAllHeaders({}))
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    done(err);
                } else {
                    untilVoidingTime = new Date(Date.now() - helper.getTimeMargin() + 4000).toISOString();
                    done();
                }
            });
        });

        // reworded the test to be more generic, shouldn't have to stay in here
        it('should only return statements stored after designated "since" timestamp when using "since" parameter', function (done) {
            // Need to use statementRefId verb b/c initial voided statement comes before voidingTime
            // console.log(new Date(Date.now() - helper.getTimeMargin()).toISOString() + ' Since');
            var query = helper.getUrlEncoding({
                verb: verb,
                since: sinceVoidingTime
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
                    var results = helper.parse(res.body, done);
                    expect(results).to.have.property('statements');
                    // console.log(results.statements.length);
                    var ids = [];
                    results.statements.forEach(function(stmt) {
                        ids.push(stmt.id)
                    });
                    // console.log(ids);
                    expect(ids).to.contain(statementRefId);
                    expect(ids).to.contain(voidingId);
                    expect(ids).to.not.contain(voidedId);
                    done();
                }
            });
        });

        // reworded the test to be more generic, shouldn't have to stay in here
        it('should only return statements stored at or before designated "before" timestamp when using "until" parameter', function (done) {
            var query = helper.getUrlEncoding({
                verb: verb,
                until: untilVoidingTime
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
                    try {
                        var results = helper.parse(res.body, done);
                        expect(results).to.have.property('statements');
                        var ids = [];
                        results.statements.forEach(function(stmt) {
                            ids.push(stmt.id)
                        });
                        expect(ids).to.contain(statementRefId);
                        expect(ids).to.contain(voidingId);
                        expect(ids).to.not.contain(voidedId);
                        done();
                    } catch (e) {
                        if (e.message.length > 400) {
                            e.message = "expected results to have property 'statements' containing " + voidingId;
                        }
                        done(e);
                    }
                }
            });
        });

        // reworded the test to be more generic, shouldn't have to stay in here
        it('should return the number of statements listed in "limit" parameter', function (done) {
            // console.log(new Date(Date.now() - helper.getTimeMargin()).toISOString() + ' Limit');
            var query = helper.getUrlEncoding({
                verb: verb,
                limit: 1
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
                    var results = helper.parse(res.body, done);
                    expect(results).to.have.property('statements');
                    expect(results.statements).to.have.length(1);
                    expect(results.statements[0]).to.have.property('id').to.equal(statementRefId);
                    done();
                }
            });
        });

        // i think this can be removed
        it('should return StatementRef and voiding statement when not using "since", "until", "limit"', function (done) {
            // console.log(new Date(Date.now() - helper.getTimeMargin()).toISOString() + ' None');
            var query = helper.getUrlEncoding({
                verb: verb
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
                    var results = helper.parse(res.body, done);
                    expect(results).to.have.property('statements');
                    expect(results.statements).to.have.length(2);
                    expect(results.statements[0]).to.have.property('id').to.equal(statementRefId);
                    expect(results.statements[1]).to.have.property('id').to.equal(voidingId);
                    // var pt = new Date(prevStmtTime - helper.getTimeMargin()).toISOString();
                    // var st = new Date(stmtTime - helper.getTimeMargin()).toISOString();
                    // console.log(sinceVoidingTime +'\n'+ pt +'\n'+ st +'\n'+ untilVoidingTime);
                    done();
                }
            });
        });
    });

/**  XAPI-00164, Communication 2.1.3 GET Statements
 * The Statements within the "statements" property will correspond to the filtering criterion sent in with the GET request
 */
    describe('The Statements within the "statements" property will correspond to the filtering criterion sent in with the GET request (Communication 2.1.3.s1, XAPI-00164)', function () {
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

        it('should return StatementResult with statements as array using GET with "agent"', function (done) {
            var templates = [
                {agent: statement.actor}
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
                    expect(result).to.have.property('statements').to.be.an('array').to.all.have.deep.property('actor.mbox',statement.actor.mbox);
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
                    expect(result).to.have.property('statements').to.be.an('array').to.all.have.deep.property('verb.id',statement.verb.id);
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
                    expect(result).to.have.property('statements').to.be.an('array').to.all.have.deep.property('object.id',statement.object.id)
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
                    expect(result).to.have.property('statements').to.be.an('array').to.all.have.deep.property('context.registration',statement.context.registration);
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
                    expect(result).to.have.property('statements').to.be.an('array').to.satisfy(function(statements)
                    {
                        for(var i in statements)
                        {
                           if(!helper.deepSearchObject(statements[i], statement.context.contextActivities.category.id))
                           return false
                        }
                        return true;
                    });
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
                    expect(result).to.have.property('statements').to.be.an('array').to.satisfy(function(statements)
                    {
                        for(var i in statements)
                        {
                           if(!helper.deepSearchObject(statements[i], statement.context.instructor.mbox))
                           return false;
                        }
                        return true;
                    });
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
                    expect(result).to.have.property('statements').to.be.an('array').to.satisfy(function(statements)
                    {
                        for(var i in statements)
                        {
                           if((new Date(statements[i].stored) < new Date('2012-06-01T19:09:13.245Z')))
                           return false;
                        }
                        return true;
                    });
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
                    expect(result).to.have.property('statements').to.be.an('array').to.satisfy(function(statements)
                    {
                        for(var i in statements)
                        {
                           if((new Date(statements[i].stored) > new Date('2012-06-01T19:09:13.245Z')))
                           return false;
                        }
                        return true;
                    });
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
                    expect(result).to.have.property('statements').to.be.an('array').to.have.length(1);
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
                    expect(result).to.have.property('statements').to.be.an('array').to.satisfy(function(statements)
                    {
                        for(var i =0; i < statements.length-1; i++)
                        {
                            var s1 = statements[i].stored;
                            var s2 = statements[i+1].stored;

                           if((new Date(s1) > new Date(s2)))
                           return false;
                        }
                        return true;
                    });
                    done();
                }
            });
        });

        //I think there is another test that covers the formatting requirements
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
            var templates = [
                {statement: '{{statements.attachment}}'},
                {
                    attachments: [
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "text/plain",
                            "length": 0,
                            "sha2": "",
                            "fileUrl": "http://over.there.com/file.txt"
                        }
                    ]
                }
            ];
            data = helper.createFromTemplate(templates);
            data = data.statement;

            txtAtt1 = fs.readFileSync('test/v1_0_3/templates/attachments/simple_text1.txt');
            var t1stats = fs.statSync('test/v1_0_3/templates/attachments/simple_text1.txt');
            t1attSize = t1stats.size;
            t1attHash = crypto.createHash('SHA256').update(txtAtt1).digest('hex');

            data.attachments[0].length = t1attSize;
            data.attachments[0].sha2 = t1attHash;

            var dashes = '--';
            var crlf = '\r\n';
            var boundary = '-------314159265358979323846'

            var msg = dashes + boundary + crlf;
            msg += 'Content-Type: application/json' + crlf + crlf;
            msg += JSON.stringify(data) + crlf;
            msg += dashes + boundary + crlf;
            msg += 'Content-Type: text/plain' + crlf;
            msg += 'Content-Transfer-Encoding: binary' + crlf;
            msg += 'X-Experience-API-Hash: ' + data.attachments[0].sha2 + crlf + crlf;
            msg += txtAtt1 + crlf;
            msg += dashes + boundary + dashes + crlf;


            var query = helper.getUrlEncoding({attachments: true});
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders(header))
            .body(msg)
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

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('crypto')));
