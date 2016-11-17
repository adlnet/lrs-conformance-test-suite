/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    //Communication 2.0
/**  Matchup with Conformance Requirements Document
 * XAPI-00139 - below
 * XAPI-00140 - not found yet - An LRS implements all of the Statement, State, Agent, and Activity Profile sub-APIs
 * XAPI-00141 - not found yet - An LRS's returned array of ids from a successful GET request all refer to documents stored after the TimeStamp in the "since" parameter of the GET request if such a parameter was present (7.5.table3.row2)
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

    describe('An LRS\'s Statement Resource accepts PUT requests (Communication 2.1.1.s1)', function () {
        it('should persist statement using "PUT"', function (done) {
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

    describe('An LRS\'s Statement Resource accepts PUT requests only if the "statementId" parameter is a String (Type, Communication 2.1.1.s1.table1.row1)', function () {
        it('should fail statement using "statementId" parameter as boolean', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = true;

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail statement using "statementId" parameter as object', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = {key: 'should fail'};

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
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
            .end()
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(modified)
            .end()
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
        });

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
            .end()
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(modified)
            .end()
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
        });
    });

    describe('An LRS\'s Statement Resource rejects with error code 409 Conflict any Statement with the "statementID" parameter equal to a Statement in the LRS already **Implicit** (Communication 2.1.1.s2.b2)', function () {
        it('should return 409 or 204 when statement ID already exists on POST', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200)
            .end()
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(helper.addAllHeaders({}))
            .json(data)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else if (res.statusCode === 409 || res.statusCode === 204) {
                    done();
                } else {
                    done(new Error('Missing: no update status code using POST'))
                }
            });
        });

        it('should return 409 or 204 when statement ID already exists on PUT', function (done) {
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
            .expect(204)
            .end()
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else if (res.statusCode === 409 || res.statusCode === 204) {
                    done();
                } else {
                    done(new Error('Missing: no update status code using PUT'))
                }
            });
        });
    });

    //Communication 2.1.2 POST Statements
/**  Matchup with Conformance Requirements Document
 * XAPI-00146 - below
 * XAPI-00147 - below
 * XAPI-00148 - below
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

/**  XAPI-00148, Communication 2.1.2 POST Statements
 * An LRS accepts a valid POST request containing a GET request returning 200 OK and the StatementResult Object.
 */
    it('A GET request is defined as either a GET request or a POST request containing a GET request (Communication 2.1.2.s2.b3, XAPI-00148)', function (done) {
        request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements() + "?method=GET")
            .headers(helper.addAllHeaders({}))
            .form({limit: 1})
            .expect(200).end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var results = helper.parse(res.body, done);
                    expect(results).to.have.property('statements');
                    expect(results).to.have.property('more');
                    done();
                }
            });
    });

/**  XAPI-00182, Communication 2.2 Documents Resources
 * An LRS makes no modifications to stored data for any rejected request.
 */
    it ('An LRS makes no modifications to stored data for any rejected request (Multiple, including Communication 2.1.2.s2.b4, XAPI-00182)', function(done){
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
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders({}))
        .json([correct, incorrect])
        .expect(400)
        .end()
        .get(helper.getEndpointStatements() + '?statementId=' + correct.id)
        .wait(helper.genDelay(stmtTime, '?statementId=' + correct.id, correct.id))
        .headers(helper.addAllHeaders({}))
        .expect(404, done);
    });

    //Communication 2.1.3 GET Statements
/**  Matchup with Conformance Requirements Document
 * XAPI-00149 - below
 * XAPI-00150 - below
 * XAPI-00151 - below
 * XAPI-00152 - below
 * XAPI-00153 - below
 * XAPI-00154 - below
 * XAPI-00155 - below
 * XAPI-00156 - below
 * XAPI-00157 - below
 * XAPI-00158 - below
 * XAPI-00159 - below
 * XAPI-00160 - below
 * XAPI-00161 - not found yet - An LRS's Statement API not return attachment data and only return application/json if the "attachment" parameter set to "false".  Something similar is in XAPI-00154 as a sub-test - will that suffice?
 * XAPI-00162 - below
 * XAPI-00163 - below
 * XAPI-00164 - not found yet - The Statements within the "statements" property will correspond to the filtering criterion sent in with the GET request
 * XAPI-00165 - not found yet - An LRS's Statement API, upon receiving a GET request, MUST have a "Content-Type" header.
 * XAPI-00166 - below
 * XAPI-00167 - below
 * XAPI-00168 - below
 * XAPI-00169 - below
 * XAPI-00170 - below
 * XAPI-00171 - below
 * XAPI-00172 - not found yet - If the "Accept-Language" header is present as part of the GET request to the Statement API and the "format" parameter is set to "canonical", the LRS MUST apply this data to choose the matching language in the response.  Make sure that all the format tests are covered!
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
                    expect(results).to.have.property('more');
                    done();
                }
            });
        });

    });

    it('An LRS\'s Statement Resource, upon processing a successful GET request, will return a single "statements" property (Multiplicity, Format, Communication 2.1.3.s1)', function (done){

        var query = helper.getUrlEncoding(
            {limit:1}
        );

        request(helper.getEndpointAndAuth())
        .get(helper.getEndpointStatements() + '?' + query)
        .headers(helper.addAllHeaders({}))
        .expect(200)
        .end(function (err, res) {
            if (err) {
                done(err);
            }
            else {
                var results = helper.parse(res.body, done);
                expect(results.statements).to.exist;
                done();
            }
        });
    });

    it('An LRS\'s Statement Resource, upon processing a successful GET request, will return a single "more" property (Multiplicity, Format, Communication 2.1.3.s1)', function (done){

        var query = helper.getUrlEncoding(
            {limit:1}
        );

        request(helper.getEndpointAndAuth())
        .get(helper.getEndpointStatements() + '?' + query)
        .headers(helper.addAllHeaders({}))
        .expect(200)
        .end(function (err, res) {
            if (err) {
                done(err);
            }
            else {
                var results = helper.parse(res.body, done);
                expect(results.more).to.exist;
                done();
            }
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
                .end()
                .get(helper.getEndpointStatements() + query)
                .wait(helper.genDelay(stmtTime, query, data.id))
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
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
            
            ;
             request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(null, null, statementID))
            .headers(helper.addAllHeaders({"Accept-Language":"en-GB"}))
            .expect(200,  function(err,res)
                {
                    if(err) console.log(err);
                    
                    var statement = JSON.parse(res.body);
                    console.log(require("util").inspect(statement,{depth:7}));
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
            
            ;
             request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .wait(helper.genDelay(null, null, statementID))
            .headers(helper.addAllHeaders({"Accept-Language":"en-GB"}))
            .expect(200,  function(err,res)
                {
                    if(err) console.log(err);
                    
                    var statement = JSON.parse(res.body);
                    console.log(require("util").inspect(statement,{depth:7}));
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
    describe('An LRS\'s Statement Resource can process a GET request with "format" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row12, XAPI-00168, XAPI-00169, XAPI-00170, XAPI-00171)', function () {
        it('should process using GET with "format"', function (done) {
            var query = helper.getUrlEncoding({format: 'ids'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

/**  XAPI-00167, Communication 2.1.3 GET Statements
 * An LRS's Statement API can process a GET request with "attachments" as a parameter. The Statement API MUST return 200 OK, StatementResult Object and use the multipart response format and include all attachments if the attachment parameter is set to true
 */
    describe('An LRS\'s Statement Resource can process a GET request with "attachments" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row13, XAPI-00167)', function () {
        it('should process using GET with "attachments"', function (done) {
            var query = helper.getUrlEncoding({attachments: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

/**  XAPI-00165, Communication 2.1.3 GET Statements
 * An LRS's Statement API, upon receiving a GET request, 
MUST have a "Content-Type" header
 */
    describe('An LRSs Statement API, upon receiving a GET request, MUST have a "Content-Type" header(**Implicit**, Communication 2.1.3.s1.table1.row14, XAPI-00165)', function () {
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
                {statement: '{{statements.voided}}'}
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

/**  XAPI-00152, Communication 2.1.3 GET Statements
 * An LRS's "X-Experience-API-Consistent-Through" header's value is not before (temporal) any of the "stored" values of any of the returned Statements.
 */
    describe('An LRS\'s "X-Experience-API-Consistent-Through" header\'s value is not before (temporal) any of the "stored" values of any of the returned Statements (Communication 2.1.3.s2.b5, XAPI-00152).', function () {
        it('should return "X-Experience-API-Consistent-Through" when using GET for statements', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
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
                    var results = helper.parse(res.body, done);
                    expect(results).to.have.property('statements');
                    var statements = results.statements;
                    for (var i = 0; i < statements.length; i++) {
                        var statement = statements[i];
                        expect(statement).to.have.property('stored');
                        var stored =  moment(statement.stored, moment.ISO_8601);
                        expect(stored.isValid()).to.be.true;
                        expect(stored.isBefore(through) || stored.isSame(through)).to.be.true;
                    }
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
            .get(helper.getEndpointStatements())
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
    describe('An LRSs Statement API not return attachment data and only return application/json if the "attachment" parameter set to "false" (Communication 2.1.3.s1.b1, XAPI-00161)', function () {        
        var statementId = null;
        var stmtTime = null;
        before("store statement",function(done){
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});
            
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment)
                .expect(200,function(err,res)
                {
                    if(err)
                        done(err)
                    else
                    {
                        var body = JSON.parse(res.body);

                        statementId = body[0];
                        console.log("Statement ID is", statementId)
                        done();
                    }
                });
        })      
        it('should NOT return the attachment if "attachments" is missing', function (done) {
            console.log('should NOT return the attachment if "attachments" is missing');
            var query = '?statementId=' + statementId;
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + query)
            .wait(helper.genDelay(stmtTime, '?statementId=' + statementId, statementId))
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {

                    
                    expect(res.headers["content-type"]).to.equal('application/json');
                    done();
                }
            });
        });    
        it('should NOT return the attachment if "attachments" is false', function (done) {
            
            var query = '?statementId=' + statementId + "&attachments=false";
         

            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + query)
            .wait(helper.genDelay(stmtTime, '?statementId=' + statementId, statementId))
            .headers(helper.addAllHeaders())
            .expect(200)
            .end(function(err, res){
                if (err) {
                    done(err);
                } else {

             done();
                    expect(res.headers["content-type"]).to.equal('application/json');
                   
                }
            });
        });
        it('should return the attachment when "attachment" is true', function (done) {
            
            var query = '?statementId=' + statementId + "&attachments=true";
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + query)
            .wait(helper.genDelay(stmtTime, '?statementId=' + statementId, statementId))
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {

                    
                    //how delicate is this parsing? There is a newline as body[1], the statement as body[0]. Should we search all
                    //parts of the body? 
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
 * very similar to XAPI-00162
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
        var voidingTime, untilVoidingTime;
        var stmtTime;

        before('persist voided statement', function (done) {
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
            var voidingTemplates = [
                {statement: '{{statements.object_statementref}}'},
                {verb: '{{verbs.voided}}'}
            ];
            var voiding = helper.createFromTemplate(voidingTemplates);
            voiding = voiding.statement;
            voiding.id = voidingId;
            voiding.object.id = voidedId;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(voiding)
                .expect(200)
                .end(function (err, res){
                    if (err){
                        done(err);
                    } else {
                        voidingTime = new Date(Date.now() - helper.getTimeMargin() - 10000).toISOString();
                        untilVoidingTime = new Date(Date.now() + helper.getTimeMargin()).toISOString();
                        done();
                    }
                });
        });

        before('persist object with statement references', function (done) {
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
            .headers(helper.addAllHeaders({}))
            .json(statementRef)
            .expect(200, done)
        });

        // reworded the test to be more generic, shouldn't have to stay in here
        it('should only return statements stored after designated "since" timestamp when using "since" parameter', function (done) {
            // Need to use statementRefId verb b/c initial voided statement comes before voidingTime
            var query = helper.getUrlEncoding({
                verb: verb,
                since: voidingTime
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
                    expect(JSON.stringify(results.statements)).to.contain(statementRefId);
                    done();
                }
            });
        });

        // reworded the test to be more generic, shouldn't have to stay in here
        it('should only return statements stored at or before designated "before" timestamp when using "until" parameter', function (done) {
            var query = helper.getUrlEncoding({
                verb: "http://adlnet.gov/expapi/verbs/voided",
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
                        expect(JSON.stringify(results.statements)).to.contain(voidingId);
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
                    done();
                }
            });
        });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
