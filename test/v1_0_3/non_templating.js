/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    function genDelay(time, query, id)
    {
        var delay = function(val)
        {
            var p = new comb.Promise();
            var endP = helper.getEndpointStatements();
            if (query) {
                endP += query;
            }
            var delta, finish;
//            console.log('\n\nAllowing for consistency', helper.getEndpointAndAuth(), helper.getEndpointStatements(), query, time, id);
            function doRequest()
            {
                var result;
                request(helper.getEndpointAndAuth())
                .get(endP)
                .headers(helper.addAllHeaders({}))
                .end(function(err, res)
                {
//                    console.log(err, res.statusCode, res.statusMessage, typeof res.body, res.body.length);

                    if (err) {
                    //if there was an error, we quit and go home
//                        console.log('Error', err);
                        p.reject();
                    } else {
                        try {
                        //we parse the result into either a single statment or a statements object
                            result = parse(res.body);
                        } catch (e) {
//                            console.log('res.body did not parse');
                            result = {};
                        }
                        if (id && result.id && (result.id === id)) {
                        //if we find a single statment and the id we are looking for, then we're good we can continue with the testing
//                            console.log("Single Statement matched");
                            p.resolve();
                        } else if (id && result.statements && stmtFound(result.statements, id)) {
                        //if we find a block of statments and the id we are looking for, then we're good and we can continue with the testing
//                            console.log('Statement Object matched');
                            p.resolve();
                        } else if ((new Date(res.headers['x-experience-api-consistent-through'])).valueOf() + helper.getTimeMargin() >= time) {
                        //if the desired statement has not been found, we check the con-thru header to find if the lrs is up to date and we should move on
//                            console.log('X-Experience-API-Consistent-Through header GOOD - continue test', (new Date(res.headers['x-experience-api-consistent-through'])).valueOf() + helper.getTimeMargin(), time);
                            p.resolve();
                        } else {
                        //otherwise we give the lrs a second to catch up and try again
                            if (!delta) {
                                // first time only - we use the provided headers to calculate a maximum wait time
//                                console.log(res.headers);
                                delta = new Date(res.headers.date).valueOf() - new Date(res.headers['x-experience-api-consistent-through']).valueOf();
                                finish = Date.now() + 10 * delta;
//                                console.log('Setting the max wait time', delta, finish);
                            }
//                            console.log('waiting up to', delta * 10, 'ms\tcompare these', Date.now(), finish);
                            if (Date.now() >= finish) {
//                                console.log('Exceeded the maximum time limit - continue test');
                                p.resolve()
                            }
//                            console.log('No match No con-thru - wait and check again', (new Date(res.headers['x-experience-api-consistent-through'])).valueOf() + helper.getTimeMargin(), time);
                            setTimeout(doRequest, 1000);
                        }
                    }
                });
            }
            doRequest();
            return p;
        }
        return delay();

        function stmtFound (arr, id) {
//            console.log('Searching through Statement Object for', id);
            var found = false;
            arr.forEach (function (s) {
                if (s.id === id) {
//                    console.log('Found', s.id, id);
                    found = true;
                }
            });
            //if (!found) console.log(id, 'Not found - please continue');
            return found;
        }
    }

    var comb = require('comb');
    var expect = chai.expect;

    if(global.OAUTH)
        request = helper.OAuthRequest(request);

    describe('An LRS populates the "authority" property if it is not provided in the Statement, based on header information with the Agent corresponding to the user (contained within the header) (Implicit, 4.1.9.b, 4.1.9.c) ', function () {

        it('should populate authority ', function (done) {

            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
                .headers(helper.addAllHeaders({}))
                .wait(genDelay(stmtTime, query, data.id))
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = parse(res.body, done);
                        expect(statement).to.have.property('authority');
                        done();
                    }
                });
        });
    });

    describe('A Voiding Statement cannot Target another Voiding Statement (4.3)', function () {
        var voidedId, voidingId;

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
            var data = createFromTemplate(templates);
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
                        //console.log('Void -ed vs -ing', voidedId, voidingId);
                        done();
                    }
                });
        });

        it('should fail when "StatementRef" points to a voided statement', function (done) {
            var templates = [
                {statement: '{{statements.object_statementref}}'},
                {verb: '{{verbs.voided}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.object.id = voidedId;
            //console.log('stmt3', data);
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

        it('should fail when "StatementRef" points to a voiding statement', function (done) {
            var templates = [
                {statement: '{{statements.object_statementref}}'},
                {verb: '{{verbs.voided}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.object.id = voidingId;
            //console.log('stmt4', data);
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
    });

    describe('An LRS returns a ContextActivity in an array, even if only a single ContextActivity is returned (4.1.6.2.c, 4.1.6.2.d)', function () {
        var types = ['parent', 'grouping', 'category', 'other'];
        this.timeout(0);

        types.forEach(function (type) {
            it('should return array for statement context "' + type + '"  when single ContextActivity is passed', function (done) {
                var templates = [
                    {statement: '{{statements.context}}'},
                    {context: '{{contexts.' + type + '}}'}
                ];
                var data = createFromTemplate(templates);
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
                    .wait(genDelay(stmtTime, query, data.id))
                    .headers(helper.addAllHeaders({}))
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            var statement = parse(res.body, done);
                            expect(statement).to.have.property('context').to.have.property('contextActivities');
                            expect(statement.context.contextActivities).to.have.property(type);
                            expect(statement.context.contextActivities[type]).to.be.an('array');
                            done();
                        }
                    });
            });
        });

        types.forEach(function (type) {
            it('should return array for statement substatement context "' + type + '"  when single ContextActivity is passed', function (done) {
                var templates = [
                    {statement: '{{statements.object_substatement}}'},
                    {object: '{{substatements.context}}'},
                    {context: '{{contexts.' + type + '}}'}
                ];
                var data = createFromTemplate(templates);
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
                    .wait(genDelay(stmtTime, query, data.id))
                    .headers(helper.addAllHeaders({}))
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            var statement = parse(res.body, done);
                            expect(statement).to.have.property('object').to.have.property('context').to.have.property('contextActivities');
                            expect(statement.object.context.contextActivities).to.have.property(type);
                            expect(statement.object.context.contextActivities[type]).to.be.an('array');
                            done();
                        }
                    });
            });
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a Request which uses Attachments and does not have a "Content-Type" header with value "application/json" or "multipart/mixed" (Format, 4.1.11.a, 4.1.11.b)', function () {
        var data;
        var attachment;

        before('create attachment templates', function () {
            var templates = [
                {statement: '{{statements.attachment}}'},
                {
                    attachments: [
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "text/plain; charset=ascii",
                            "length": 27,
                            "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                            "fileUrl": "http://over.there.com/file.txt"
                        }
                    ]
                }
            ];
            data = createFromTemplate(templates);
            data = data.statement;

            attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_image_multipart_attachment_valid.part', {encoding: 'binary'});
        });

        it('should succeed when attachment uses "fileUrl" and request content-type is "application/json"', function (done) {
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data).expect(200, done);
        });

        it('should fail when attachment uses "fileUrl" and request content-type is "multipart/form-data"', function (done) {
            var header = {'Content-Type': 'multipart/form-data; boundary=-------314159265358979323846'};

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(JSON.stringify(data)).expect(400, done);
        });

        it('should succeed when attachment is raw data and request content-type is "multipart/mixed"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(200, done);
        });

        it('should fail when attachment is raw data and request content-type is "multipart/form-data"', function (done) {
            var header = {'Content-Type': 'multipart/form-data; boundary=-------314159265358979323846'};

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content-Type" header with value "application/json", and has a discrepancy in the number of Attachments vs. the number of fileURL members (4.1.11.a)', function () {
        it('should fail when passing statement attachments and missing attachment"s binary', function (done) {
            var templates = [
                {statement: '{{statements.attachment}}'},
                {
                    attachments: [
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "text/plain; charset=ascii",
                            "length": 27,
                            "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                            "fileUrl": "http://over.there.com/file.txt"
                        },
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "text/plain; charset=ascii",
                            "length": 27,
                            "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a"
                        }
                    ]
                }
            ];
            var data = createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "Content-Type" with value "multipart/mixed" (RFC 1341)', function () {
        it('should fail when attachment is raw data and first part content type is not "application/json"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_first_part_content_type.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "boundary" (4.1.11.b, RFC 1341)', function () {
        it('should fail if boundary not provided in body', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_first_part_no_boundary.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('A Boundary is defined as the value of the body header named "boundary" (Definition, 4.1.11.b, RFC 1341)', function () {
        it('should fail if boundary not provided in header', function (done) {
            var header = {'Content-Type': 'multipart/mixed;'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a Boundary before each "Content-Type" header (4.1.11.b, RFC 1341)', function () {
        it('should fail if boundary not provided in body', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_first_part_no_boundary.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not the first document part with a "Content-Type" header with a value of "application/json" (RFC 1341, 4.1.11.b.a)', function () {
        it('should fail when attachment is raw data and first part content type is not "application/json"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_first_part_content_type.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have all of the Statements in the first document part (RFC 1341, 4.1.11.b.a)', function () {
        it('should fail when statements separated into multiple parts', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_statement_parts.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "X-Experience-API-Hash" with a value of one of those found in a "sha2" property of a Statement in the first part of this document (4.1.11.b.c, 4.1.11.b.d)', function () {
        it('should fail when attachments missing header "X-Experience-API-Hash"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_no_x_experience_api_hash.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });

        it('should fail when attachments header "X-Experience-API-Hash" does not match "sha2"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_no_match_sha2.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a Request which does not use a "X-Experience-API-Version" header name to any API except the About API (Format, 6.2.a, 6.2.f, 7.7.f)', function () {
        it('should pass when GET without header "X-Experience-API-Version"', function (done) {
          var headers = helper.addAllHeaders();
          delete headers['X-Experience-API-Version'];
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointAbout())
                .headers(headers)
                .expect(200, done);
        });

        it('should fail when statement GET without header "X-Experience-API-Version"', function (done) {
          var headers = helper.addAllHeaders();
          delete headers['X-Experience-API-Version'];
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?statementId=' + helper.generateUUID())
                .headers(headers)
                .expect(400, done);
        });

        it('should fail when statement POST without header "X-Experience-API-Version"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            var headers = helper.addAllHeaders();
            delete headers['X-Experience-API-Version'];

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(headers)
                .json(data).expect(400, done);
        });

        it('should fail when statement PUT without header "X-Experience-API-Version"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;

            var headers = helper.addAllHeaders();
            delete headers['X-Experience-API-Version'];

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + helper.generateUUID())
                .headers(headers)
                .json(data).expect(400, done);
        });
    });

    describe('An LRS MUST set the X-Experience-API-Version header to the latest patch version (Communication 3.3.b2)', function () {
        it('should respond with header "version" set to "1.0.3"', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, query, data.id))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .expect('x-experience-api-version', '1.0.3', done);
        });
    });

    describe('An LRS will not modify Statements based on a "version" before "1.0.1" (6.2.l)', function () {
        it('should not convert newer version format to prior version format', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, query, data.id))
                .headers(helper.addAllHeaders({}))
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = parse(res.body, done);
                        expect(helper.isEqual(data.actor, statement.actor)).to.be.true;
                        expect(helper.isEqual(data.object, statement.object)).to.be.true;
                        expect(helper.isEqual(data.verb, statement.verb)).to.be.true;
                        done();
                    }
                });
        });
    });

    describe('An LRS rejects with error code 400 Bad Request any request to an API which uses a parameter with differing case (7.0.b)', function () {
        it('should fail on PUT statement when not using "statementId"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
            var data = createFromTemplate(templates);

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

    describe('An LRS rejects with error code 405 Method Not Allowed to any request to an API which uses a method not in this specification **Implicit ONLY in that HTML normally does this behavior**', function () {
        it('should fail with statement "DELETE"', function (done) {
            var query = helper.getUrlEncoding({statementId: helper.generateUUID()});
            requestPromise(helper.getEndpoint())
                .delete(helper.getEndpointStatements() + '?' + query)
                .set('X-Experience-API-Version', '1.0.1')
                .expect(405, done);
        });

        it('should fail with activities "DELETE"', function (done) {
            var query = helper.getUrlEncoding({activityId: 'http://www.example.com/meetings/occurances/34534'});
            requestPromise(helper.getEndpoint())
                .delete(helper.getEndpointActivities() + '?' + query)
                .set('X-Experience-API-Version', '1.0.1')
                .expect(405, done);
        });

        it('should fail with activities "POST"', function (done) {
            var query = helper.getUrlEncoding({activityId: 'http://www.example.com/meetings/occurances/34534'});
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointActivities() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(405, done);
        });

        it('should fail with activities "PUT"', function (done) {
            var query = helper.getUrlEncoding({activityId: 'http://www.example.com/meetings/occurances/34534'});
            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointActivities() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(405, done);
        });

        it('should fail with agents "DELETE"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            requestPromise(helper.getEndpoint())
                .delete(helper.getEndpointAgents() + '?' + query)
                .set('X-Experience-API-Version', '1.0.1')
                .expect(405, done);
        });

        it('should fail with agents "POST"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointAgents() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(405, done);
        });

        it('should fail with agents "PUT"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointAgents() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(405, done);
        });
    });

    describe('An LRS does not process any batch of Statements in which one or more Statements is rejected and if necessary, restores the LRS to the state in which it was before the batch began processing (7.0.c, **Implicit**)', function () {
        it('should not persist any statements on a single failure', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var correct = createFromTemplate(templates);
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
                .end()
                .get(helper.getEndpointStatements() + query)
                .wait(genDelay(stmtTime, query, correct.id))
                .headers(helper.addAllHeaders({}))
                .expect(404, done);
        });
    });

    describe('An LRS has a Statement API with endpoint "base IRI"+"/statements" (7.2)', function () {
        it('should allow "/statements" POST', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
            var data = createFromTemplate(templates);
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

    describe('An LRS\'s Statement API accepts PUT requests (7.2.1)', function () {
        it('should persist statement using "PUT"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(204, done);
        });
    });

    describe('An LRS\'s Statement API accepts PUT requests only if it contains a "statementId" parameter (Multiplicity, 7.2.1.table1.a)', function () {
        it('should persist statement using "statementId" parameter', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
        });
    });

    describe('An LRS\'s Statement API accepts PUT requests only if the "statementId" parameter is a String (Type, 7.2.1.table1.b)', function () {
        it('should fail statement using "statementId" parameter as boolean', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = {key: 'should fail'};

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done);
        });
    });

    describe('An LRS cannot modify a Statement, state, or Object in the event it receives a Statement with statementID equal to a Statement in the LRS already. (7.2.1.a, 7.2.2.b)', function () {
        this.timeout(0);
        it('should not update statement with matching "statementId" on POST', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
                .put(helper.getEndpointStatements() + query)
                .headers(helper.addAllHeaders({}))
                .json(modified)
                .end()
                .get(helper.getEndpointStatements() + query)
                .wait(genDelay(stmtTime, query, data.id))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = parse(res.body, done);
                        expect(statement.verb.id).to.equal(data.verb.id);
                        done();
                    }
                });
        });

        it('should not update statement with matching "statementId" on PUT', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            var query = '?statementId=' + data.id;
            var modified = extend(true, {}, data);
            modified.verb.id = 'different value';
            var stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + query)
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(204)
                .end()
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(modified)
                .end()
                .get(helper.getEndpointStatements() + query)
                .wait(genDelay(stmtTime, query, data.id))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = parse(res.body, done);
                        expect(statement.verb.id).to.equal(data.verb.id);
                        done();
                    }
                });
        });
    });

    describe('An LRS\'s Statement API upon processing a successful PUT request returns code 204 No Content (7.2.1)', function () {
        it('should persist statement and return status 204', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(204, done);
        });
    });

    describe('An LRS\'s Statement API rejects with error code 409 Conflict any Statement with the "statementID" parameter equal to a Statement in the LRS already **Implicit** (7.2.1.b, 7.2.2.b)', function () {
        it('should return 409 or 204 when statement ID already exists on POST', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
            var data = createFromTemplate(templates);
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

    describe('An LRS\'s Statement API accepts POST requests (7.2.2)', function () {
        it('should persist statement using "POST"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('The LRS will NOT reject a GET request which returns an empty "statements" property (**Implicit**, 4.2.table1.row1.b)', function () {
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
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array').to.be.length(0);
                        done();
                    }
                });
        });
    });

    describe('An LRS\'s Statement API upon processing a successful POST request returns code 200 OK and all Statement UUIDs within the POST **Implicit** (7.2.2)', function () {
        it('should persist statement using "POST" and return array of IDs', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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

    describe('A "more" property is an IRL (Format, 4.2.table1.row2.a)', function () {
        it('should return "more" property as an IRL', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            var statement = data.statement;
            var stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json([statement, statement])
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?limit=1')
                .wait(genDelay(stmtTime, '?limit=1', undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('more');
                        Joi.assert(result.more, Joi.string().regex(/(\/[\w\.\-]+)+\/?/));
                        done();
                    }
                });
        });
    });

    describe('The "more" property is an empty string if the entire results of the original GET request have been returned (4.2.table1.row2.b)', function () {
        it('should return empty "more" property when all statements returned', function (done) {
            var query = helper.getUrlEncoding({verb: 'http://adlnet.gov/expapi/non/existent/344588672021038'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('more').to.be.truthy;
                        expect(result.more).to.equal('')
                        done();
                    }
                });
        });
    });

    describe('If not empty, the "more" property\'s IRL refers to a specific container object corresponding to the next page of results from the orignal GET request (4.2.table1.row1.b)', function () {
        it('should return "more" which refers to next page of results', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?limit=1')
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('more');
                        Joi.assert(result.more, Joi.string().regex(/(\/[\w\.\-]+)+\/?/));
                        done();
                    }
                });
        });
    });

    describe('A Voided Statement is defined as a Statement that is not a Voiding Statement and is the Target of a Voiding Statement within the LRS (4.2.c)', function () {
        var voidedId = helper.generateUUID();
        var stmtTime;

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(templates);
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
            var voiding = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = parse(res.body, done);
                        expect(statement.id).to.equal(voidedId);
                        done();
                    }
                });
        });
    });

    describe('An LRS\'s Statement API, upon processing a successful GET request, can only return a Voided Statement if that Statement is specified in the voidedStatementId parameter of that request (7.2.4.a)', function () {
        var voidedId = helper.generateUUID();
        var stmtTime;

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(templates);
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
            var voiding = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(404, done);

        });
    });

    describe('LRS\'s Statement API accepts GET requests (7.2.3)', function () {
        it('should return using GET', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "statementId" as a parameter (7.2.3)', function () {
        it('should process using GET with "statementId"', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, '?' + query, data.id))
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "voidedStatementId" as a parameter  (7.2.3)', function () {
        var voidedId = helper.generateUUID();
        var stmtTime;

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(templates);
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
            var voiding = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API rejects with error code 400 a GET request with both "statementId" and anything other than "attachments" or "format" as parameters (7.2.3.a, 7.2.3.b)', function () {
        var id;
        var stmtTime;
        this.timeout(0);

        before('persist statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
            var data = createFromTemplate(templates);
            data.statementId = id;

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
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
                .wait(genDelay(stmtTime, '?' + query, id))
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "agent" as a parameter  **Implicit**', function () {
        it('should process using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "verb" as a parameter  **Implicit**', function () {
        it('should process using GET with "verb"', function (done) {
            var query = helper.getUrlEncoding({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "activity" as a parameter  **Implicit**', function () {
        it('should process using GET with "activity"', function (done) {
            var query = helper.getUrlEncoding({activity: 'http://www.example.com/meetings/occurances/12345'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "registration" as a parameter  **Implicit**', function () {
        it('should process using GET with "registration"', function (done) {
            var query = helper.getUrlEncoding({registration: helper.generateUUID()});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "related_activities" as a parameter  **Implicit**', function () {
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
            var data = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "related_agents" as a parameter  **Implicit**', function () {
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
            var data = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "since" as a parameter  **Implicit**', function () {
        it('should process using GET with "since"', function (done) {
            var query = helper.getUrlEncoding({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "until" as a parameter  **Implicit**', function () {
        it('should process using GET with "until"', function (done) {
            var query = helper.getUrlEncoding({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "limit" as a parameter  **Implicit**', function () {
        it('should process using GET with "limit"', function (done) {
            var query = helper.getUrlEncoding({limit: 1});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "format" as a parameter  **Implicit**', function () {
        it('should process using GET with "format"', function (done) {
            var query = helper.getUrlEncoding({format: 'ids'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "attachments" as a parameter  **Implicit**', function () {
        it('should process using GET with "attachments"', function (done) {
            var query = helper.getUrlEncoding({attachments: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "ascending" as a parameter  **Implicit**', function () {
        it('should process using GET with "ascending"', function (done) {
            var query = helper.getUrlEncoding({ascending: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API rejects with error code 400 a GET request with both "voidedStatementId" and anything other than "attachments" or "format" as parameters (7.2.3.a, 7.2.3.b)', function () {
        var voidedId = helper.generateUUID();
        var stmtTime;
        this.timeout(0);

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(templates);
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
            var voiding = createFromTemplate(templates);
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
            var data = createFromTemplate(templates);
            data.statementId = voidedId;
            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API upon processing a successful GET request with a "statementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (7.2.3)', function () {
        var id, stmtTime;

        before('persist statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, '?statementId=' + id, id))
                .headers(helper.addAllHeaders({}))
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = parse(res.body, done);
                        expect(statement.id).to.equal(id);
                        done();
                    }
                });
        });
    });

    describe('An LRS\'s Statement API upon processing a successful GET request with a "voidedStatementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (7.2.3)', function () {
        var voidedId = helper.generateUUID();
        var stmtTime;

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(templates);
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
            var voiding = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, '?' + query, voidedId))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = parse(res.body, done);
                        expect(statement.id).to.equal(voidedId);
                        done();
                    }
                });
        });
    });

    describe('An LRS\'s Statement API upon processing a successful GET request with neither a "statementId" nor a "voidedStatementId" parameter, returns code 200 OK and a StatementResult Object.  (7.2.3)', function () {
        var statement, substatement, stmtTime;
        this.timeout(0);
        stmtTime = Date.now();

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
            var data = createFromTemplate(templates);
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
            var data = createFromTemplate(templates);
            substatement = data.statement;
            substatement.object.context.contextActivities.category.id = 'http://www.example.com/test/array/statements/sub';

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(substatement)
                .expect(200, done);
        });

        it('should return StatementResult using GET without "statementId" or "voidedStatementId"', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements())
                .wait(genDelay(stmtTime, undefined, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult using GET with "verb"', function (done) {
            var query = helper.getUrlEncoding({verb: statement.verb.id});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult using GET with "activity"', function (done) {
            var query = helper.getUrlEncoding({activity: statement.object.id});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult using GET with "registration"', function (done) {
            var query = helper.getUrlEncoding({registration: statement.context.registration});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult using GET with "since"', function (done) {
            var query = helper.getUrlEncoding({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult using GET with "until"', function (done) {
            var query = helper.getUrlEncoding({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult using GET with "limit"', function (done) {
            var query = helper.getUrlEncoding({limit: 1});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult using GET with "ascending"', function (done) {
            var query = helper.getUrlEncoding({ascending: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult using GET with "format"', function (done) {
            var query = helper.getUrlEncoding({format: 'ids'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var results = parse(res.body, done);
                        expect(results).to.have.property('statements');
                        done();
                    }
                });
        });

        it('should return multipart response format StatementResult using GET with "attachments" parameter as true', function (done) {
            var query = helper.getUrlEncoding({attachments: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                        var results = parse(parsed[0].body, done);
                        expect(results).to.have.property('statements');
                        done();
                    }
                });
        });

        it('should not return multipart response format using GET with "attachments" parameter as false', function (done) {
            var query = helper.getUrlEncoding({attachments: false});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var results = parse(res.body);
                        expect(results).to.have.property('statements');
                        expect(results).to.have.property('more');
                        done();
                    }
                });
        });

    });

    describe('An LRS\'s "X-Experience-API-Consistent-Through" header\'s value is not before (temporal) any of the "stored" values of any of the returned Statements (7.2.3.c).', function () {
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

                        var results = parse(res.body, done);
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

    describe('An LRS\'s Statement API upon processing a GET request, returns a header with name "X-Experience-API-Consistent-Through" regardless of the code returned. (7.2.3.c)', function () {
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
            var data = createFromTemplate(templates);

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

    describe('An LRS\'s "X-Experience-API-Consistent-Through" header is an ISO 8601 combined date and time (Type, 7.2.3.c).', function () {
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
            var data = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, undefined, undefined))
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
            var data = createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
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

    describe('A "statements" property is an Array of Statements (Type, 4.2.table1.row1.a)', function () {
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
            var data = createFromTemplate(templates);
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
            var data = createFromTemplate(templates);
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
                .wait(genDelay(stmtTime, undefined, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = helper.getUrlEncoding(data);
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "verb"', function (done) {
            var query = helper.getUrlEncoding({verb: statement.verb.id});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "activity"', function (done) {
            var query = helper.getUrlEncoding({activity: statement.object.id});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "registration"', function (done) {
            var query = helper.getUrlEncoding({registration: statement.context.registration});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
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
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "since"', function (done) {
            var query = helper.getUrlEncoding({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "until"', function (done) {
            var query = helper.getUrlEncoding({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "limit"', function (done) {
            var query = helper.getUrlEncoding({limit: 1});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "ascending"', function (done) {
            var query = helper.getUrlEncoding({ascending: true});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "format"', function (done) {
            var query = helper.getUrlEncoding({format: 'ids'});
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var result = parse(res.body, done);
                        expect(result).to.have.property('statements').to.be.an('array');
                        done();
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "attachments"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});
            var query = helper.getUrlEncoding({attachments: true});
            var stmtTime = Date.now();
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
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
                        var results = parse(parsed[0].body, done);
                        expect(results).to.have.property('statements');
                        done();
                    }
                });
        });
    });

    describe('An LRS\'s Statement API, upon processing a successful GET request wishing to return a Voided Statement still returns Statements which target it (Communication 2.1.4.s1.b2)', function () {
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
            var voided = createFromTemplate(voidedTemplates);
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
            var voiding = createFromTemplate(voidingTemplates);
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
            var statementRef = createFromTemplate(statementRefTemplates);
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

        it('should only return Object StatementRef when using "since"', function (done) {
            // Need to use statementRefId verb b/c initial voided statement comes before voidingTime
            var query = helper.getUrlEncoding({
                verb: verb,
                since: voidingTime
            });
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var results = parse(res.body, done);
                        expect(results).to.have.property('statements');
                        expect(JSON.stringify(results.statements)).to.contain(statementRefId);
                        done();
                    }
                });
        });

        it('should only return voiding statement when using "until"', function (done) {
            var query = helper.getUrlEncoding({
                verb: "http://adlnet.gov/expapi/verbs/voided",
                until: untilVoidingTime
            });
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var results = parse(res.body, done);
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

        it('should only return Object StatementRef when using "limit"', function (done) {
            var query = helper.getUrlEncoding({
                verb: verb,
                limit: 1
            });
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var results = parse(res.body, done);
                        expect(results).to.have.property('statements');
                        expect(results.statements).to.have.length(1);
                        expect(results.statements[0]).to.have.property('id').to.equal(statementRefId);
                        done();
                    }
                });
        });

        it('should return StatementRef and voiding statement when not using "since", "until", "limit"', function (done) {
            var query = helper.getUrlEncoding({
                verb: verb
            });
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, undefined))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var results = parse(res.body, done);
                        expect(results).to.have.property('statements');
                        expect(results.statements).to.have.length(2);
                        expect(results.statements[0]).to.have.property('id').to.equal(statementRefId);
                        expect(results.statements[1]).to.have.property('id').to.equal(voidingId);
                        done();
                    }
                });
        });
    });

    describe('Miscellaneous Requirements', function () {

        it('All Objects are well-created JSON Objects (Nature of binding) **Implicit**', function (done) {
          var verbTemplate = 'http://adlnet.gov/expapi/test/unicode/target/';
          var verb = verbTemplate + helper.generateUUID();
          var malformedTemplates = [
              {statement: '{{statements.default}}'}
          ];
          var malformed = createFromTemplate(malformedTemplates);
          malformed = malformed.statement;
          var string = "\"objectType\": \"Agent\"";
          malformed.actor.objectType = string;

          request(helper.getEndpointAndAuth())
              .post(helper.getEndpointStatements())
              .headers(helper.addAllHeaders({}))
              .json(malformed)
              .expect(400, done)
        });

        it('All Strings are encoded and interpreted as UTF-8 (6.1.a)', function (done) {
          this.timeout(0);
          var verbTemplate = 'http://adlnet.gov/expapi/test/unicode/target/';
          var verb = verbTemplate + helper.generateUUID();
          var unicodeTemplates = [
              {statement: '{{statements.unicode}}'}
          ];

          var unicode = createFromTemplate(unicodeTemplates);
          unicode = unicode.statement;
          unicode.verb.id = verb;

          var query = helper.getUrlEncoding({
              verb: verb
          });
          var stmtTime = Date.now();

          request(helper.getEndpointAndAuth())
              .post(helper.getEndpointStatements())
              .headers(helper.addAllHeaders({}))
              .json(unicode)
              .expect(200)
              .end()
              .get(helper.getEndpointStatements() + '?' + query)
              .wait(genDelay(stmtTime, query, null))
              .headers(helper.addAllHeaders({}))
              .expect(200)
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  } else {
                      var results = parse(res.body, done);
                      var languages = results.statements[0].verb.display;
                      var unicodeConformant = true;
                      for (var key in languages){
                        if (languages[key] !== unicode.verb.display[key])
                          unicodeConformant = false;
                      }
                      expect(unicodeConformant).to.be.true;
                      done();
                  }
              });
        });

        it('A "more" property\'s referenced container object follows the same rules as the original GET request, originating with a single "statements" property and a single "more" property (4.2.table1.row1.b)', function (done) {

          this.timeout(0);
          var verbTemplate = 'http://adlnet.gov/expapi/test/more/target/';
          var id1 = helper.generateUUID();
          var id2 = helper.generateUUID();
          var statementTemplates = [
              {statement: '{{statements.default}}'}
          ];

          var statement1 = createFromTemplate(statementTemplates);
          statement1 = statement1.statement;
          statement1.verb.id = verbTemplate + "one";
          statement1.id = id1;

          var statement2 = createFromTemplate(statementTemplates);
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
              .end()
              .get(helper.getEndpointStatements() + '?' + query)
              .wait(genDelay(stmtTime, query, id2))
              .headers(helper.addAllHeaders({}))
              .expect(200)
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  }
                  else {
                      var results = parse(res.body, done);
                          request('')
                          .get(liburl.resolve(res.request.href, results.more))
                          .headers(helper.addAllHeaders({}))
                          .expect(200)
                          .end(function (err, res) {
                              if (err) {
                                done(err);
                              }
                              else {
                              var results2 = parse(res.body, done);
                              var moreRequest = false;
                                  if (results2.statements && results2.more){
                                    moreRequest = true;
                                  }
                              expect(moreRequest).to.be.true;
                              done();
                              }
                          });
                  }
              });
        });

        it('An LRS\'s Statement API rejects with Error Code 400 Bad Request any DELETE request (7.2)', function (done) {
            // Using requirement: An LRS rejects with error code 405 Method Not Allowed to any request to an API which uses a method not in this specification **Implicit ONLY in that HTML normally does this behavior**
            var id = helper.generateUUID();
            var statementTemplates = [
                {statement: '{{statements.default}}'}
            ];

            var statement = createFromTemplate(statementTemplates);
            statement = statement.statement;
            statement.id = id;
            var query = helper.getUrlEncoding({statementId: id});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(statement)
                .expect(200)
                .end();

            requestPromise(helper.getEndpoint())
                .delete(helper.getEndpointStatements() + '?statementId=' + statement.id)
                .set('X-Experience-API-Version', '1.0.1')
                .expect(405)
                .end(function(err,res){
                  if (err){
                    done(err);
                  }
                  else{
                    done();
                  }
                });
        });

        it('A POST request is defined as a "pure" POST, as opposed to a GET taking on the form of a POST (7.2.2.e)', function (done) {
            // All of these "defined" aren't really tests, rather ways to disambiguate future tests.
            done();
        });

        it('An LRS rejects with error code 400 Bad Request, a GET Request which uses Attachments, has a "Content-Type" header with value "application/json", and has the "attachments" filter attribute set to "true" (4.1.11.a)', function (done) {
            // Not concerned with "Content-Type" when use a GET request NOT FINISHED

            this.timeout(0);
            var header = {'Content-Type': 'application/json; boundary=-------314159265358979323846'}
            var id = helper.generateUUID();
            var templates = [
                {statement: '{{statements.attachment}}'},
                {
                    attachments: [
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "application/json",
                            "length": 27,
                            "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                            "fileUrl": "http://over.there.com/file.txt",

                        }
                    ]
                }
            ];
            var attachment = createFromTemplate(templates);
            attachment = attachment.statement;
            attachment.id = id;

            var data = {
                statementId: id,
                attachments: true
            };
            var query = helper.getUrlEncoding(data);
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(attachment)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(genDelay(stmtTime, '?' + query, id))
                .headers(helper.addAllHeaders(header))
                .expect(200)
                .end(function(err, res){
                  if (err)
                    done(err)
                    else{
                      done();
                    }

                })
        });

        it('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "false" and the Content-Type field in the header set to anything but "application/json" (7.2.3.d, 7.2.3.e)', function (done) {
            // Not concerned with "Content-Type" when use a GET request NOT FINISHED
            this.timeout(0);
            var id = helper.generateUUID();
            //var header = {'Content-Type': 'text; boundary=-------314159265358979323846'}
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var templates = [
                {statement: '{{statements.attachment}}'},
                {
                    attachments: [
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "text",
                            "length": 27,
                            "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                            "fileUrl": "http://over.there.com/file.txt",

                        }
                    ]
                }
            ];
            var attachment = createFromTemplate(templates);
            attachment = attachment.statement;
            attachment.id = id;

            attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_image_multipart_attachment_valid.part', {encoding: 'binary'});

            var data = {
                attachments: false
            };
            var query = helper.getUrlEncoding(data);
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment)
                .expect(200)
                .end(function(err,res){
                  if (err){
                    done(err);
                  }
                  else{
                    var results = parse(res.body, done);
                    //console.log(results[0]);
                    var data = {
                        statementId: results[0],
                        attachments: false
                    };
                    var query = helper.getUrlEncoding(data);

                    request(helper.getEndpointAndAuth())
                    .get(helper.getEndpointStatements() + '?' + query)
                    .wait(genDelay(stmtTime, '?' + query, id))
                    .headers(helper.addAllHeaders(header))
                    .expect(200)
                    .end(function(err,res){
                      if (err){
                        //console.log(err);
                        done(err);
                      }
                      else{
                        //console.log(res.req._headers);
                        //console.log(res.headers);
                        done();
                      }
                    })
                  }
                })

        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "MIME-Version" with a value of "1.0" or greater (4.1.11.b, RFC 1341)', function (done) {
            // RFC 1341: MIME-Version header field is required at the top level of a message. It is not required for each body part of a multipart entity NOT FINISHED

            var id = helper.generateUUID();
            var templates = [
                {statement: '{{statements.attachment}}'},
                {
                    attachments: [
                        {
                            "usageType": "http://example.com/attachment-usage/test",
                            "display": {"en-US": "A test attachment"},
                            "description": {"en-US": "A test attachment (description)"},
                            "contentType": "multipart/mixed",
                            "length": 27,
                            "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                            "fileUrl": "http://over.there.com/file.txt"
                        }
                    ]
                }
            ];

            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846', "MIME-Version" : "test"};
            var attachment = createFromTemplate(templates);
            attachment = attachment.statement;
            attachment.id = id;

            var data = {
                statementId: id,
                attachments: false
            };
            var query = helper.getUrlEncoding(data);
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});


            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(200)
                .end(function(err,res){
                  if (err) {
                    //console.log(err);
                    done(err);
                  }
                  else{
                    //console.log(res.headers);
                    done();
                  }
            });
            //done();
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "Content-Transfer-Encoding" with a value of "binary" (4.1.11.b.c, 4.1.11.b.e)', function (done) {
          // each attachment part should have should have 'binary' as Content-Transfer-Encoding
          var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
          var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_no_content_transfer_encoding.part', {encoding: 'binary'});

          request(helper.getEndpointAndAuth())
              .post(helper.getEndpointStatements())
              .headers(helper.addAllHeaders(header))
              .body(attachment).expect(400)
              .end(function(err,res){
                if (err) {
                  done(err);
                }
                else{
                  done();
                }
          });
        });

        it ('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "true" if it does not follow the rest of the attachment rules (7.2.3.d)', function (done){
          //not finished. bad attachment is not found. need to figure other ways to break attachment rules. ambigious and could use clarification what is left to test

          var id = helper.generateUUID();
          var header = {'Content-Type': 'application/json; boundary=-------314159265358979323846'}
          var templates = [
              {statement: '{{statements.attachment}}'},
              {
                  attachments: [
                      {
                          "usageType": "http://example.com/attachment-usage/test",
                          "display": {"en-US": "A test attachment"},
                          "description": {"en-US": "A test attachment (description)"},
                          "contentType": "none",
                          "length": 1,
                          "sha2": "1",
                          "fileUrl": "http://over.there.com/file.txt",

                      }
                  ]
              }
          ];
          var attachment = createFromTemplate(templates);
          attachment = attachment.statement;
          attachment.id = id;

          var data = {
              attachments: true
          };
          var query = helper.getUrlEncoding(data);
          var stmtTime = Date.now();

          request(helper.getEndpointAndAuth())
              // .post(helper.getEndpointStatements())
              // .headers(helper.addAllHeaders({}))
              // .json(attachment)
              // .expect(200)
              // .end()
              .get(helper.getEndpointStatements() + '?' + query)
              //.wait(genDelay(stmtTime, '?' + query, id))
              .headers(helper.addAllHeaders(header))
              .expect(200)
              .end(function(err, res){
                  if (err){
                    //console.log(err);
                    done(err);
                  }
                  else{
                    //console.log(res.body);
                    done();
                  }
              })
        });

        it ('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "false" if it includes attachment raw data (7.2.3.d)', function (done){
          // doesn't reject a get request with attachment parameter set to false with attachment raw data NOT FINISHED
          this.timeout(0);
          var id = helper.generateUUID();
          var header = {'Content-Type': 'application/json; boundary=-------314159265358979323846'}
          var templates = [
              {statement: '{{statements.attachment}}'},
              {
                  attachments: [
                      {
                          "usageType": "http://example.com/attachment-usage/test",
                          "display": {"en-US": "A test attachment"},
                          "description": {"en-US": "A test attachment (description)"},
                          "contentType": "text",
                          "length": 27,
                          "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                          "fileUrl": "http://over.there.com/file.txt",

                      }
                  ]
              }
          ];
          var myStatement = createFromTemplate(templates);
         myStatement = myStatement.statement;
          var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_image_multipart_attachment_valid.part', {encoding: 'binary'});
          myStatement.id = id;
          //myStatement.attachments = attachment;
          //console.log(myStatement.id);

          var data = {
              attachments: true,
              statementId : id
          };
          var query = helper.getUrlEncoding(data);
          var stmtTime = Date.now();

          request(helper.getEndpointAndAuth())
              .post(helper.getEndpointStatements())
              .headers(helper.addAllHeaders({}))
              .json(myStatement)
              .expect(200)
              .end()
              .get(helper.getEndpointStatements() + '?' + query)
              //.wait(genDelay(stmtTime, '?' + query, id))
              .headers(helper.addAllHeaders(header))
              .expect(200)
              .end(function(err,res){
                if (err){
                  //console.log(err);
                  done(err);
                }
                else{
                  //console.log(res);
                  done();
                }
              });
          //done();
        });


        it ('An LRS sends a header response with "X-Experience-API-Version" as the name and "1.0.3" as the value (Format, 6.2.a, 6.2.b)', function (done){
          this.timeout(0);
          var id = helper.generateUUID();
          var statementTemplates = [
              {statement: '{{statements.default}}'}
          ];

          var statement = createFromTemplate(statementTemplates);
          statement = statement.statement;
          statement.id = id;
          var query = helper.getUrlEncoding({statementId: id});
          var stmtTime = Date.now();

          request(helper.getEndpointAndAuth())
              .post(helper.getEndpointStatements())
              .headers(helper.addAllHeaders({}))
              .json(statement)
              .expect(200)
              .end()
              .get(helper.getEndpointStatements() + '?' + query)
              .wait(genDelay(stmtTime, '?' + query, id))
              .headers(helper.addAllHeaders({}))
              .expect(200)
              .end(function(err,res){
                if (err){
                  done(err);
                }
                else{
                  expect(res.headers['x-experience-api-version']).to.equal("1.0.3");
                  done();
                }
              });
        });

        it ('An LRS rejects a Statement due to size if the Statement exceeds the size limit the LRS is configured to with error code 413 Request Entity Too Large (7.1)', function (done){
          //limit depends on LRS -- not implemented
          this.timeout(0);
          var id = helper.generateUUID();
          var statementTemplates = [
              {statement: '{{statements.default}}'}
          ];

          var statement = createFromTemplate(statementTemplates);
          statement = statement.statement;
          statement.id = id;
          var query = helper.getUrlEncoding({statementId: id});
          var stmtTime = Date.now();

          request(helper.getEndpointAndAuth())
              .post(helper.getEndpointStatements())
              .headers(helper.addAllHeaders({}))
              .json(statement)
              .expect(200)
              .end()
              .get(helper.getEndpointStatements() + '?' + query)
              .wait(genDelay(stmtTime, '?' + query, id))
              .headers(helper.addAllHeaders({}))
              .expect(200)
              .end(function(err,res){
                if (err){
                  done(err);
                }
                else{

                  done();
                }
              });
        });

        it('An LRS rejects a Statement due to network/server issues with an error code of 500 Internal Server Error (7.1)', function (done){
          //not implemented
          done();
        });

        it('An LRS\'s Statement API, upon receiving a Get request, had a field in the header with name "Content-Type" ***Assumed?***', function (done){
          //Implicit, does not test --move to document
          done();
        });


        it('The Statements within the "statements" property will correspond to the filtering criterion sent in with the GET request **Implicit** (7.2.4.b)', function (done){
          //implicit what filtering criterion have not been tested yet?
          done();
        });

        it('A "statements" property which is too large for a single page will create a container for each additional page (4.2.table1.row1.b)', function (done){
            this.timeout(0);
          var statementTemplates = [
              {statement: '{{statements.default}}'}
          ];

          var statement1 = createFromTemplate(statementTemplates);
          statement1 = statement1.statement;

          var statement2 = createFromTemplate(statementTemplates);
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
              .end()
              .get(helper.getEndpointStatements() + '?' + query)
              .wait(genDelay(stmtTime, '?' + query, null))
              .headers(helper.addAllHeaders({}))
              .expect(200)
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  }
                  else {
                      var results = parse(res.body, done);
                      expect(results.statements).to.exist;
                      done();
                  }
              });
        });

        it('An LRS\'s Statement API, upon processing a successful GET request, will return a single "more" property (Multiplicity, Format, 4.2.table1.row2.c)', function (done){
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
                      var results = parse(res.body, done);
                      expect(results.more).to.exist;
                      done();
                  }
              });
        });

        it('A "more" property IRL is accessible for at least 24 hours after being returned (4.2.a)', function (done){
          //impractical to test in real-time
          done();
        });

        it('A Document Merge is defined by the merging of an existing document at an endpoint with a document received in a POST request. (7.3)', function (done){
          //definition. Already covered in document.js (Communication.md#2.2.s7.b1, Communication.md#2.2.s7.b2, Communication.md#2.2.s7.b3)
          done();
        });

        it('A Document Merge de-serializes all Objects represented by each document before making other changes. (7.3.d)', function (done){
          //definition. Already covered in document.js (Communication.md#2.2.s7.b1, Communication.md#2.2.s7.b2, Communication.md#2.2.s7.b3)
          done();
        });

        it('A Document Merge re-serializes all Objects to finalize a single document (7.3.d)', function (done){
          //definition. Already covered in document.js (Communication.md#2.2.s7.b1, Communication.md#2.2.s7.b2, Communication.md#2.2.s7.b3)
          done();
        });

        it('In 1.0.3, the IRI requires a scheme, but does not in 1.0.2, thus we only test type String in this version', function (done){
          //update test once version 1.0.3 is released
          done();
        });

        it('NOTE: **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**', function (done){
          //not a test
          done();
        });

        it('A Cross Origin Request is defined as this POST request as described in the previous requirement (definition)', function (done){
          //definition
          done();
        });

        it('An LRS accepts HEAD requests without Content-Length headers (7.10.a.b)', function (done) {

                request(helper.getEndpointAndAuth())
                    .head(helper.getEndpointStatements())
                    .headers(helper.addAllHeaders({}))
                    .expect(200, done);
        });

        it('An Extension\'s structure is that of "key"/"value" pairs (Format, 5.3)' ,function(done){

          var statementTemplates = [
            {statement: '{{statements.object_substatement}}'},
            {object: '{{substatements.context}}'},
            {context: '{{contexts.default}}'},
            {'extensions': {'http://example.com/ex': {key: 'valid'}}}
          ];

          var statement1 = createFromTemplate(statementTemplates);
          statement1 = statement1.statement;
          var id = helper.generateUUID();
          statement1.id = id


          var query = helper.getUrlEncoding(
            {statementId : id}
          );

          request(helper.getEndpointAndAuth())
              .post(helper.getEndpointStatements())
              .headers(helper.addAllHeaders({}))
              .json(statement1)
              .expect(200)
              .end()
              .get(helper.getEndpointStatements() + '?' + query)
              .headers(helper.addAllHeaders({}))
              .expect(200)
              .end(function (err, res) {
                  if (err) {
                      done(err);
                  }
                  else {
                      var results = parse(res.body, done);
                      expect(results.object.context.extensions["http://example.com/ex"].key).to.equal('valid');
                      done();
                  }
              });
        });




        describe('An LRS doesn\'t make any adjustments to incoming Statements that are not specifically mentioned in this section (4.1.12.d, Varies)', function (){
            var returnedID, data, stmtTime;

            before('persist statement', function (done) {
                var templates = [
                    {statement: '{{statements.default}}'}
                ];
                data = createFromTemplate(templates);
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
                    .wait(genDelay(stmtTime, '?statementId=' + returnedID, returnedID))
                    .headers(helper.addAllHeaders({}))
                    .expect(200).end(function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            var results = parse(res.body, done);
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

        it('An LRS rejects with error code 400 Bad Request, a Request whose "authority" is a Group and consists of non-O-Auth Agents (4.1.9.a)', function (done) {
            var templates = [
                {statement: '{{statements.default}}'},
                {authority: {"objectType": "Group", "name": "xAPI Group", "mbox": "mailto:xapigroup@example.com",
                "member":[{"name":"agentA","mbox":"mailto:agentA@example.com"},{"name":"agentB","mbox":"mailto:agentB@example.com"}]}}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400, done)
        });
        if(!global.OAUTH)
        {
            //This test appears to only make sense in the case of http basic Auth. Should we have additional tests for bad OAUTH, which is more complicated?
            it('An LRS rejects a Statement of bad authorization (either authentication needed or failed credentials) with error code 401 Unauthorized (7.1)', function (done) {
                request(helper.getEndpointAndAuth())
                    .get(helper.getEndpointStatements())
                    .headers(helper.addAllHeaders({}, true))
                    .expect(401, done);
            });
        }

        it('An LRS rejects with error code 400 Bad Request any request to an API which uses a parameter not recognized by the LRS (7.0.a)', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?foo=bar')
                .headers(helper.addAllHeaders({}))
                .expect(400, done)

//The xAPI specification stipulates the error code, but not a particular "response"
                // .end(function (err, res) {
                //     if (err) {
                //         done(err);
                //     } else {
                //         expect(res.body).to.equal('The get statements request contained unexpected parameters: foo');
                //         done();
                //     }
                // });
        });

        it('A GET request is defined as either a GET request or a POST request containing a GET request (7.2.3, 7.2.2.e)', function (done) {
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .form({limit: 1})
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var results = parse(res.body, done);
                        expect(results).to.have.property('statements');
                        expect(results).to.have.property('more');
                        done();
                    }
                });
        });


    it ('An LRS makes no modifications to stored data for any rejected request (Multiple, including 7.3.e)', function (done){
      this.timeout(0);
      var templates = [
          {statement: '{{statements.default}}'}
      ];
      var correct = createFromTemplate(templates);
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
          .wait(genDelay(stmtTime, '/statmentId=' + correct.id, correct.id))
          .headers(helper.addAllHeaders({}))
          .expect(404, done);
  });

      it ('An LRS generates the "id" property of a Statement if none is provided (Modify, 4.1.1.a)', function (done){
        this.timeout(0);
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        data = createFromTemplate(templates);
        data = data.statement;
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200)
            .end()
            .get(helper.getEndpointStatements() + '?limit=1')
            .wait(genDelay(stmtTime, null, null))
            .headers(helper.addAllHeaders({}))
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var results = parse(res.body, done);
                    expect(results.statements[0].id).to.not.be.undefined;
                    done();
                }
            });
      });

    });

    function createFromTemplate(templates) {
        // convert template mapping to JSON objects
        var converted = helper.convertTemplate(templates);
        // this handles if no override
        var mockObject = helper.createTestObject(converted);
        return mockObject;
    }

    function parse(string, done) {
        var parsed;
        try {
            parsed = JSON.parse(string);
        } catch (error) {
            done(error);
        }
        return parsed;
    }

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
