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

describe('Statement Resource Requirements (Communication 2.1)', () => {

    describe('An LRS has a Statement Resource with endpoint "base IRI"+"/statements" (Communication 2.1)', function () {
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

    describe('An LRS\'s Statement Resource upon processing a successful PUT request returns code 204 No Content (Communication 2.1.1.s1)', function () {
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

    describe('An LRS\'s Statement Resource accepts PUT requests only if it contains a "statementId" parameter (Multiplicity, Communication 2.1.1.s1.table1.row1)', function () {
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

    describe('An LRS cannot modify a Statement, state, or Object in the event it receives a Statement with statementID equal to a Statement in the LRS already. (Communication 2.1.1.s2.b2)', function () {
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

    describe('An LRS\'s Statement Resource accepts POST requests (Communication 2.1.2.s1)', function () {
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

    describe('An LRS\'s Statement Resource upon processing a successful POST request returns code 200 OK and all Statement UUIDs within the POST **Implicit** (Communication 2.1.2.s1)', function () {
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

    it('A GET request is defined as either a GET request or a POST request containing a GET request (Communication 2.1.2.s2.b3)', function (done) {
        request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
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

    it ('An LRS makes no modifications to stored data for any rejected request (Multiple, including Communication 2.1.2.s2.b4)', function(done){
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

    describe('LRS\'s Statement Resource accepts GET requests (Communication 2.1.3.s1)', function () {
        it('should return using GET', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

    describe('An LRS\'s Statement Resource upon processing a successful GET request with a "statementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (Communication 2.1.3.s1)', function () {
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

    describe('An LRS\'s Statement Resource upon processing a successful GET request with a "voidedStatementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (Communication 2.1.3.s1)', function () {
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

    describe('An LRS\'s Statement Resource upon processing a successful GET request with neither a "statementId" nor a "voidedStatementId" parameter, returns code 200 OK and a StatementResult Object.  (Communication 2.1.3.s1)', function () {
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

    describe('An LRS\'s Statement Resource can process a GET request with "statementId" as a parameter (Communication 2.1.3.s1.table1.row1)', function () {
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

    describe('An LRS\'s Statement Resource can process a GET request with "voidedStatementId" as a parameter  (Communication 2.1.3.s1.table1.row2)', function () {
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

    describe('An LRS\'s Statement Resource can process a GET request with "agent" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row3)', function () {
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

    describe('An LRS\'s Statement Resource can process a GET request with "verb" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row4)', function () {
        it('should process using GET with "verb"', function (done) {
            var query = helper.getUrlEncoding({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement Resource can process a GET request with "activity" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row5)', function () {
        it('should process using GET with "activity"', function (done) {
            var query = helper.getUrlEncoding({activity: 'http://www.example.com/meetings/occurances/12345'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

    describe('An LRS\'s Statement Resource can process a GET request with "registration" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row6)', function () {
        it('should process using GET with "registration"', function (done) {
            var query = helper.getUrlEncoding({registration: helper.generateUUID()});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

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

    describe('An LRS\'s Statement Resource can process a GET request with "related_agents" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row8)', function () {
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

    describe('An LRS\'s Statement Resource can process a GET request with "since" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row9)', function () {
        it('should process using GET with "since"', function (done) {
            var query = helper.getUrlEncoding({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

    describe('An LRS\'s Statement Resource can process a GET request with "until" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row10)', function () {
        it('should process using GET with "until"', function (done) {
            var query = helper.getUrlEncoding({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements() + '?' + query)
            .headers(helper.addAllHeaders({}))
            .expect(200, done);
        });
    });

    describe('An LRS\'s Statement Resource can process a GET request with "limit" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row11)', function () {
        it('should process using GET with "limit"', function (done) {
            var query = helper.getUrlEncoding({limit: 1});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement Resource can process a GET request with "format" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row12)', function () {
        it('should process using GET with "format"', function (done) {
            var query = helper.getUrlEncoding({format: 'ids'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement Resource can process a GET request with "attachments" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row13)', function () {
        it('should process using GET with "attachments"', function (done) {
            var query = helper.getUrlEncoding({attachments: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement Resource can process a GET request with "ascending" as a parameter  (**Implicit**, Communication 2.1.3.s1.table1.row14)', function () {
        it('should process using GET with "ascending"', function (done) {
            var query = helper.getUrlEncoding({ascending: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement Resource rejects with error code 400 a GET request with both "statementId" and anything other than "attachments" or "format" as parameters (Communication 2.1.3.s2.b2)', function () {
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

    describe('An LRS\'s Statement Resource rejects with error code 400 a GET request with both "voidedStatementId" and anything other than "attachments" or "format" as parameters (Communication 2.1.3.s2.b2)', function () {
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

    describe('The LRS will NOT reject a GET request which returns an empty "statements" property (**Implicit**, Communication 2.1.3.s2.b4)', function () {
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

    describe('An LRS\'s "X-Experience-API-Consistent-Through" header\'s value is not before (temporal) any of the "stored" values of any of the returned Statements (Communication 2.1.3.s2.b5).', function () {
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

    describe('An LRS\'s Statement Resource upon processing a GET request, returns a header with name "X-Experience-API-Consistent-Through" regardless of the code returned. (Communication 2.1.3.s2.b5)', function () {
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

    describe('An LRS\'s Statement Resource, upon processing a successful GET request, can only return a Voided Statement if that Statement is specified in the voidedStatementId parameter of that request (Communication 2.1.4.s1.b1)', function () {
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

    describe('An LRS\'s Statement Resource, upon processing a successful GET request wishing to return a Voided Statement still returns Statements which target it (Communication 2.1.4.s1.b2)', function () {
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
