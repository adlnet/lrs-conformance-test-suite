/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * Created by vijay.budhram on 7/9/14.
 * Riptide Software
 */
(function (module, fs, extend, moment, request, qs, should, helper, validUrl) {
    "use strict";

    describe('An LRS populates the "authority" property if it is not provided in the Statement, based on header information with the Agent corresponding to the user (contained within the header) (Implicit, 4.1.9.b, 4.1.9.c)', function () {
        it('should populate authority', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var statement = JSON.parse(res.body);
                            if (statement.authority) {
                                done();
                            } else {
                                done(new Error('Statement "authority" has not been set.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('A Voiding Statement cannot Target another Voiding Statement (4.3)', function () {
        var voidingId;

        before('persist voiding statement', function (done) {
            var templates = [
                {statement: '{{statements.object_statementref}}'},
                {verb: '{{verbs.voided}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
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
            var data = createFromTemplate(templates);
            data = data.statement;
            data.object.id = voidingId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data).expect(400, done);
        });
    });

    describe('An LRS returns a ContextActivity in an array, even if only a single ContextActivity is returned (4.1.6.2.c, 4.1.6.2.d)', function () {
        var types = ['parent', 'grouping', 'category', 'other'];

        types.forEach(function (type) {
            it('should return array for statement context "' + type + '"  when single ContextActivity is passed', function (done) {
                var templates = [
                    {statement: '{{statements.context}}'},
                    {context: '{{contexts.' + type + '}}'}
                ];
                var data = createFromTemplate(templates);
                data = data.statement;
                data.id = helper.generateUUID();

                request(helper.getEndpoint())
                    .post(helper.getEndpointStatements())
                    .headers(helper.addHeaderXapiVersion({}))
                    .json(data)
                    .expect(200)
                    .end()
                    .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                    .headers(helper.addHeaderXapiVersion({}))
                    .expect(200).end(function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            try {
                                var statement = JSON.parse(res.body);
                                var contextType = statement.context.contextActivities[type];
                                if (Array.isArray(contextType)) {
                                    done();
                                } else {
                                    done(new Error('Statement "' + type + '" not an array.'));
                                }
                            } catch (error) {
                                done(error);
                            }
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

                request(helper.getEndpoint())
                    .post(helper.getEndpointStatements())
                    .headers(helper.addHeaderXapiVersion({}))
                    .json(data)
                    .expect(200)
                    .end()
                    .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                    .headers(helper.addHeaderXapiVersion({}))
                    .expect(200).end(function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            try {
                                var statement = JSON.parse(res.body);
                                var contextType = statement.object.context.contextActivities[type];
                                if (Array.isArray(contextType)) {
                                    done();
                                } else {
                                    done(new Error('Statement substatement "' + type + '" not an array.'));
                                }
                            } catch (error) {
                                done(error);
                            }
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
            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data).expect(200, done);
        });

        it('should fail when attachment uses "fileUrl" and request content-type is "multipart/form-data"', function (done) {
            var header = {'Content-Type': 'multipart/form-data; boundary=-------314159265358979323846'};

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(JSON.stringify(data)).expect(400, done);
        });

        it('should succeed when attachment is raw data and request content-type is "multipart/mixed"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(200, done);
        });

        it('should fail when attachment is raw data and request content-type is "multipart/form-data"', function (done) {
            var header = {'Content-Type': 'multipart/form-data; boundary=-------314159265358979323846'};

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content-Type" header with value "application/json", and has a discrepancy in the number of Attachments vs. the number of fileURL members (4.1.11.a)', function () {
        it('should succeed when attachment uses "fileUrl" and request content-type is "application/json"', function (done) {
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

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data).expect(400, done);
        });
    });

    describe.skip('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "Content-Type" with value "multipart/mixed" (RFC 1341)', function () {
        it('should fail when attachment is raw data and first part content type is not "application/json"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_first_part_content_type.part', {encoding: 'binary'});

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });
    });

    describe.skip('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "boundary" (4.1.11.b, RFC 1341)', function () {
        it('should fail if boundary not provided in body', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_first_part_no_boundary.part', {encoding: 'binary'});

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('A Boundary is defined as the value of the body header named "boundary" (Definition, 4.1.11.b, RFC 1341)', function () {
        it('should fail if boundary not provided in header', function (done) {
            var header = {'Content-Type': 'multipart/mixed;'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a Boundary before each "Content-Type" header (4.1.11.b, RFC 1341)', function () {
        it('should fail if boundary not provided in body', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_first_part_no_boundary.part', {encoding: 'binary'});

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not the first document part with a "Content-Type" header with a value of "application/json" (RFC 1341, 4.1.11.b.a)', function () {
        it('should fail when attachment is raw data and first part content type is not "application/json"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_first_part_content_type.part', {encoding: 'binary'});

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have all of the Statements in the first document part (RFC 1341, 4.1.11.b.a)', function () {
        it('should fail when statements separated into multiple parts', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_statement_parts.part', {encoding: 'binary'});

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "Content-Transfer-Encoding" with a value of "binary" (4.1.11.b.c, 4.1.11.b.e)', function () {
        it('should fail when attachments Content-Transfer-Encoding missing', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_no_content_transfer_encoding.part', {encoding: 'binary'});

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });

        it('should fail when attachments Content-Transfer-Encoding not "binary"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_content_transfer_encoding.part', {encoding: 'binary'});

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "X-Experience-API-Hash" with a value of one of those found in a "sha2" property of a Statement in the first part of this document (4.1.11.b.c, 4.1.11.b.d)', function () {
        it('should fail when attachments missing header "X-Experience-API-Hash"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_no_x_experience_api_hash.part', {encoding: 'binary'});

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });

        it('should fail when attachments header "X-Experience-API-Hash" does not match "sha2"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_2/templates/attachments/basic_text_multipart_attachment_invalid_no_match_sha2.part', {encoding: 'binary'});

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('An LRS rejects with error code 400 Bad Request, a Request which does not use a "X-Experience-API-Version" header name to any API except the About API (Format, 6.2.a, 6.2.f, 7.7.f)', function () {
        it('should pass when GET without header "X-Experience-API-Version"', function (done) {
            request(helper.getEndpoint())
                .get(helper.getEndpointAbout())
                .expect(200, done);
        });

        it('should fail when statement GET without header "X-Experience-API-Version"', function (done) {
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?statementId=' + helper.generateUUID())
                .body(attachment).expect(400, done);
        });

        it('should fail when statement POST without header "X-Experience-API-Version"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .json(data).expect(400, done);
        });

        it('should fail when statement PUT without header "X-Experience-API-Version"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpoint())
                .put(helper.getEndpointStatements() + '?statementId=' + helper.generateUUID())
                .json(data).expect(400, done);
        });
    });

    describe('An LRS modifies the value of the header of any Statement not rejected by the previous three requirements to "1.0.1" (4.1.10.b)', function () {
        it('should set "version" to "1.0.1" when not provided by client', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var statement = JSON.parse(res.body);
                            if (statement.version === "1.0.1") {
                                done();
                            } else {
                                done(new Error('Statement "version" has not been set.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('An LRS will not modify Statements based on a "version" before "1.0.1" (6.2.l)', function () {
        it('should not convert newer version format to prior version format', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var statement = JSON.parse(res.body);
                            if (helper.isEqual(data.actor, statement.actor)
                                && helper.isEqual(data.object, statement.object)
                                && helper.isEqual(data.verb, statement.verb)) {
                                done();
                            } else {
                                done(new Error('Statement from LRS not same as statement sent.'));
                            }
                        } catch (error) {
                            done(error);
                        }
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

            var query = qs.stringify({StatementId: data.id});
            request(helper.getEndpoint())
                .put(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail on GET statement when not using "statementId"', function (done) {
            var query = qs.stringify({StatementId: helper.generateUUID()});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "voidedStatementId"', function (done) {
            var query = qs.stringify({VoidedStatementId: helper.generateUUID()});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "agent"', function (done) {
            var templates = [
                {Agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "verb"', function (done) {
            var query = qs.stringify({Verb: 'http://adlnet.gov/expapi/verbs/attended'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "activity"', function (done) {
            var query = qs.stringify({Activity: 'http://www.example.com/meetings/occurances/34534'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "registration"', function (done) {
            var query = qs.stringify({Registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "related_activities"', function (done) {
            var query = qs.stringify({Related_Activities: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "related_agents"', function (done) {
            var query = qs.stringify({Related_Agents: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "since"', function (done) {
            var query = qs.stringify({Since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "until"', function (done) {
            var query = qs.stringify({Until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "limit"', function (done) {
            var query = qs.stringify({Limit: 10});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "format"', function (done) {
            var query = qs.stringify({Format: 'ids'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "attachments"', function (done) {
            var query = qs.stringify({Attachments: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });

        it('should fail on GET statement when not using "ascending"', function (done) {
            var query = qs.stringify({Ascending: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(400, done);
        });
    });

    describe('An LRS rejects with error code 405 Method Not Allowed to any request to an API which uses a method not in this specification **Implicit ONLY in that HTML normally does this behavior**', function () {
        it('should fail with statement "DELETE"', function (done) {
            var query = qs.stringify({statementId: helper.generateUUID()});
            request(helper.getEndpoint())
                .delete(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(405, done);
        });

        it('should fail with activities "DELETE"', function (done) {
            var query = qs.stringify({activityId: 'http://www.example.com/meetings/occurances/34534'});
            request(helper.getEndpoint())
                .delete(helper.getEndpointActivitiesProfile() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(405, done);
        });

        it('should fail with activities "POST"', function (done) {
            var query = qs.stringify({activityId: 'http://www.example.com/meetings/occurances/34534'});
            request(helper.getEndpoint())
                .post(helper.getEndpointActivitiesProfile() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(405, done);
        });

        it('should fail with activities "PUT"', function (done) {
            var query = qs.stringify({activityId: 'http://www.example.com/meetings/occurances/34534'});
            request(helper.getEndpoint())
                .put(helper.getEndpointActivitiesProfile() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(405, done);
        });

        it('should fail with agents "DELETE"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .delete(helper.getEndpointAgents() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(405, done);
        });

        it('should fail with agents "POST"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .post(helper.getEndpointAgents() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(405, done);
        });

        it('should fail with agents "PUT"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .put(helper.getEndpointAgents() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(405, done);
        });
    });

    describe('An LRS does not process any batch of Statements in which one or more Statements is rejected and if necessary, restores the LRS to the state in which it was before the batch began processing (7.0.c, **Implicit**)', function () {
        it('should not persist any statements on a single failure', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var correct = createFromTemplate(templates);
            correct = correct.statement;
            var incorrect = extend(true, {}, correct);

            correct.id = helper.generateUUID();
            incorrect.id = helper.generateUUID();

            incorrect.verb.id = 'should fail';

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json([correct, incorrect])
                .expect(400)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + correct.id)
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(204, done);
        });

        it('should allow "/statements" GET', function (done) {
            var query = qs.stringify({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .put(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });
    });

    describe('An LRS cannot modify a Statement, state, or Object in the event it receives a Statement with statementID equal to a Statement in the LRS already. (7.2.1.a, 7.2.2.b)', function () {
        it('should not update statement with matching "statementId" on POST', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            var modified = extend(true, {}, data);
            modified.verb.id = 'different value';

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end()
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .json(modified)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var statement = JSON.parse(res.body);
                            if (statement.verb.id = data.verb.id) {
                                done();
                            } else {
                                done(new Error('Statement "verb" should not be updated.'));
                            }
                        } catch (error) {
                            done(error);
                        }
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

            var modified = extend(true, {}, data);
            modified.verb.id = 'different value';

            request(helper.getEndpoint())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(204)
                .end()
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(modified)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var statement = JSON.parse(res.body);
                            if (statement.verb.id = data.verb.id) {
                                done();
                            } else {
                                done(new Error('Statement "verb" should not be updated.'));
                            }
                        } catch (error) {
                            done(error);
                        }
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

            request(helper.getEndpoint())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end()
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else if (res.statusCode === 409 || res.statusCode === 204) {
                        done();
                    } else {
                        done(new Error('Missing no update status code using POST'))
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

            request(helper.getEndpoint())
                .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end()
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else if (res.statusCode === 409 || res.statusCode === 204) {
                        done();
                    } else {
                        done(new Error('Missing no update status code using POST'))
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

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('The LRS will NOT reject a GET request which returns an empty "statements" property (**Implicit**, 4.2.table1.row1.b)', function () {
        it('should return empty array list of The LRS will NOT reject a GET request which returns an empty "statements" property (**Implicit**, 4.2.table1.row1.b)', function (done) {
            var query = qs.stringify({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        try {
                            var ids = JSON.parse(res.body).statements;
                            if (Array.isArray(ids) && ids[0] === data.id) {
                                done();
                            } else {
                                done(new Error('Statement "GET" is not array of IDs.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('An LRS\'s Statement API upon processing a successful POST request returns code 204 No Content and all Statement UUIDs within the POST **Implicit** (7.2.2)', function () {
        it('should persist statement using "POST" and return array if IDs', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID()

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err)
                    } else {
                        try {
                            var ids = JSON.parse(res.body).statements;
                            if (Array.isArray(ids) && ids.length === 0) {
                                done();
                            } else {
                                done(new Error('Statement "GET" is not empty array.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('A "more" property is an IRL (Format, 4.2.table1.row2.a)', function () {
        it('should return "more" property as an IRL', function (done) {
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?limit=1')
                .headers(helper.addHeaderXapiVersion({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var more = JSON.parse(res.body).more;
                            if (more && validUrl.isUri(more)) {
                                done();
                            } else {
                                done(new Error('Statement GET "more" is missing or not IRL.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe.skip('The "more" property an empty string if the entire results of the original GET request have been returned (4.2.table1.row2.b) (Do we need to be specific about the "type" of empty string?)', function () {
        it('should return empty "more" property when all statements returned', function (done) {
            var query = qs.stringify({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var more = JSON.parse(res.body).more;
                            if (more === '') {
                                done();
                            } else {
                                done(new Error('Statement GET "more" is missing or not an empty string.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('If not empty, the "more" property\'s IRL refers to a specific container object corresponding to the next page of results from the orignal GET request (4.2.table1.row1.b)', function () {
        it('should return "more" which refers to next page of results', function (done) {
            it('should return "more" property as an IRL', function (done) {
                request(helper.getEndpoint())
                    .get(helper.getEndpointStatements() + '?limit=1')
                    .headers(helper.addHeaderXapiVersion({}))
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            done(err);
                        } else {
                            try {
                                var more = JSON.parse(res.body).more;
                                if (more && validUrl.isUri(more)) {
                                    done();
                                } else {
                                    done(new Error('Statement GET "more" is missing or not IRL.'));
                                }
                            } catch (error) {
                                done(error);
                            }
                        }
                    });
            });
        });
    });

    describe('A Voided Statement is defined as a Statement that is not a Voiding Statement and is the Target of a Voiding Statement within the LRS (4.2.c)', function () {
        var voidedId = helper.generateUUID();

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(templates);
            voided = voided.statement;
            voided.id = voidedId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(voiding)
                .expect(200, done);
        });

        it('should return a voided statement when using GET "voidedStatementId"', function (done) {
            var query = qs.stringify({voidedStatementId: voidedId});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var statement = JSON.parse(res.body);
                            if (statement.id === voidedId) {
                                done();
                            } else {
                                done(new Error('Statement "voidedStatementId" was not returned.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('An LRS\'s Statement API, upon processing a successful GET request, can only return a Voided Statement if that Statement is specified in the voidedStatementId parameter of that request (7.2.4.a)', function () {
        var voidedId = helper.generateUUID();

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(templates);
            voided = voided.statement;
            voided.id = voidedId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(voiding)
                .expect(200, done);
        });

        it('should not return a voided statement if using GET "statementId"', function (done) {
            var query = qs.stringify({statementId: voidedId});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var statement = JSON.parse(res.body);
                            if (statement.id) {
                                done(new Error('Statement "statementId" should not be returned.'));
                            } else {
                                done();
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });

        });
    });

    describe('LRS\'s Statement API accepts GET requests (7.2.3)', function () {
        it('should return using GET', function (done) {
            it('should return "more" property as an IRL', function (done) {
                request(helper.getEndpoint())
                    .get(helper.getEndpointStatements())
                    .headers(helper.addHeaderXapiVersion({}))
                    .expect(200, done);
            });
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "statementId" as a parameter (7.2.3)', function () {
        it('should process using GET with "statementId"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .headers(helper.addHeaderXapiVersion({}))
                .end(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "voidedStatementId" as a parameter  (7.2.3)', function () {
        var voidedId = helper.generateUUID();

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(templates);
            voided = voided.statement;
            voided.id = voidedId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(voiding)
                .expect(200, done);
        });

        it('should process using GET with "voidedStatementId"', function (done) {
            var query = qs.stringify({statementId: voidedId});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API rejects a GET request with both "statementId" and anything other than "attachments" or "format" as parameters (7.2.3.a, 7.2.3.b) with error code 400 Bad Request.', function () {
        var id;

        before('persist statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            id = data.id;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });

        it('should fail when using "statementId" with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);
            data.statementId = id;

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "statementId" with "verb"', function (done) {
            var data = {
                statementId: id,
                verb: 'http://adlnet.gov/expapi/non/existent'
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "statementId" with "activity"', function (done) {
            var data = {
                statementId: id,
                activity: 'http://www.example.com/meetings/occurances/12345'
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "statementId" with "registration"', function (done) {
            var data = {
                statementId: id,
                registration: helper.generateUUID()
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "statementId" with "related_activities"', function (done) {
            var data = {
                statementId: id,
                related_activities: true
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "statementId" with "related_agents"', function (done) {
            var data = {
                statementId: id,
                related_agents: true
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "statementId" with "since"', function (done) {
            var data = {
                statementId: id,
                since: '2012-06-01T19:09:13.245Z'
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "statementId" with "until"', function (done) {
            var data = {
                statementId: id,
                until: '2012-06-01T19:09:13.245Z'
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "statementId" with "limit"', function (done) {
            var data = {
                statementId: id,
                limit: 1
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "statementId" with "ascending"', function (done) {
            var data = {
                statementId: id,
                ascending: true
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should pass when using "statementId" with "format"', function (done) {
            var data = {
                statementId: id,
                format: 'ids'
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });

        it('should pass when using "statementId" with "attachments"', function (done) {
            var data = {
                statementId: id,
                attachments: true
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "agent" as a parameter  **Implicit**', function () {
        it('should process using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "verb" as a parameter  **Implicit**', function () {
        it('should process using GET with "verb"', function (done) {
            var query = qs.stringify({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "activity" as a parameter  **Implicit**', function () {
        it('should process using GET with "activity"', function (done) {
            var query = qs.stringify({activity: 'http://www.example.com/meetings/occurances/12345'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "registration" as a parameter  **Implicit**', function () {
        it('should process using GET with "registration"', function (done) {
            var query = qs.stringify({registration: helper.generateUUID()});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "related_activities" as a parameter  **Implicit**', function () {
        it('should process using GET with "related_activities"', function (done) {
            var query = qs.stringify({related_activities: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "related_agents" as a parameter  **Implicit**', function () {
        it('should process using GET with "related_agents"', function (done) {
            var query = qs.stringify({related_agents: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "since" as a parameter  **Implicit**', function () {
        it('should process using GET with "since"', function (done) {
            var query = qs.stringify({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "until" as a parameter  **Implicit**', function () {
        it('should process using GET with "until"', function (done) {
            var query = qs.stringify({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
            });
    });

    describe('An LRS\'s Statement API can process a GET request with "limit" as a parameter  **Implicit**', function () {
        it('should process using GET with "limit"', function (done) {
            var query = qs.stringify({limit: 1});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "format" as a parameter  **Implicit**', function () {
        it('should process using GET with "format"', function (done) {
            var query = qs.stringify({format: 'ids'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "attachments" as a parameter  **Implicit**', function () {
        it('should process using GET with "attachments"', function (done) {
            var query = qs.stringify({attachments: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API can process a GET request with "ascending" as a parameter  **Implicit**', function () {
        it('should process using GET with "ascending"', function (done) {
            var query = qs.stringify({ascending: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API rejects a GET request with both "voidedStatementId" and anything other than "attachments" or "format" as parameters (7.2.3.a, 7.2.3.b) with error code 400 Bad Request.', function () {
        var voidedId = helper.generateUUID();

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(templates);
            voided = voided.statement;
            voided.id = voidedId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(voiding)
                .expect(200, done);
        });

        it('should fail when using "voidedStatementId" with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);
            data.statementId = voidedId;

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "verb"', function (done) {
            var data = {
                statementId: voidedId,
                verb: 'http://adlnet.gov/expapi/non/existent'
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "activity"', function (done) {
            var data = {
                statementId: voidedId,
                activity: 'http://www.example.com/meetings/occurances/12345'
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "registration"', function (done) {
            var data = {
                statementId: voidedId,
                registration: helper.generateUUID()
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "related_activities"', function (done) {
            var data = {
                statementId: voidedId,
                related_activities: true
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "related_agents"', function (done) {
            var data = {
                statementId: voidedId,
                related_agents: true
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "since"', function (done) {
            var data = {
                statementId: voidedId,
                since: '2012-06-01T19:09:13.245Z'
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "until"', function (done) {
            var data = {
                statementId: voidedId,
                until: '2012-06-01T19:09:13.245Z'
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "limit"', function (done) {
            var data = {
                statementId: voidedId,
                limit: 1
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should fail when using "voidedStatementId" with "ascending"', function (done) {
            var data = {
                statementId: voidedId,
                ascending: true
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(400, done);
        });

        it('should pass when using "voidedStatementId" with "format"', function (done) {
            var data = {
                statementId: voidedId,
                format: 'ids'
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });

        it('should pass when using "voidedStatementId" with "attachments"', function (done) {
            var data = {
                statementId: voidedId,
                attachments: true
            };

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });
    });

    describe('An LRS\'s Statement API upon processing a successful GET request with a "statementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (7.2.3)', function () {
        var id;

        before('persist statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            id = data.id;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200, done);
        });

        it('should retrieve statement using "statementId"', function (done) {
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?statementId=' + id)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var statement = JSON.parse(res.body);
                            if (statement.id === id) {
                                done();
                            } else {
                                done(new Error('Statement "id" does not match requested statementId.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('An LRS\'s Statement API upon processing a successful GET request with a "voidedStatementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (7.2.3)', function () {
        var voidedId = helper.generateUUID();

        before('persist voided statement', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(templates);
            voided = voided.statement;
            voided.id = voidedId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
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

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(voiding)
                .expect(200, done);
        });

        it('should return a voided statement when using GET "voidedStatementId"', function (done) {
            var query = qs.stringify({voidedStatementId: voidedId});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var statement = JSON.parse(res.body);
                            if (statement.id === voidedId) {
                                done();
                            } else {
                                done(new Error('Statement "id" does not match requested voidedStatementId.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('An LRS\'s Statement API upon processing a successful GET request with neither a "statementId" nor a "voidedStatementId" parameter, returns code 200 OK and a StatementResult Object.  (7.2.3)', function () {
        it('should return StatementResult using GET without "statementId" or "voidedStatementId"', function (done) {
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "verb"', function (done) {
            var query = qs.stringify({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "activity"', function (done) {
            var query = qs.stringify({activity: 'http://www.example.com/meetings/occurances/12345'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "registration"', function (done) {
            var query = qs.stringify({registration: helper.generateUUID()});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "related_activities"', function (done) {
            var query = qs.stringify({related_activities: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "related_agents"', function (done) {
            var query = qs.stringify({related_agents: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "since"', function (done) {
            var query = qs.stringify({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "until"', function (done) {
            var query = qs.stringify({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "limit"', function (done) {
            var query = qs.stringify({limit: 1});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "ascending"', function (done) {
            var query = qs.stringify({ascending: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "format"', function (done) {
            var query = qs.stringify({format: 'ids'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult using GET with "attachments"', function (done) {
            var query = qs.stringify({attachments: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('An LRS\'s "X-Experience-API-Consistent-Through" header\'s value is not before (temporal) any of the "stored" values of any of the returned Statements (7.2.3.c).', function () {
        it('should return "X-Experience-API-Consistent-Through" when using GET for statements', function (done) {
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);

                                var statements = result.statements;
                                for (var i = 0; i < statements.length; i++) {
                                    var stored =  moment(statements[i].stored, moment.ISO_8601);
                                    if (!through.isValid() || !stored.isValid()) {
                                        done(new Error('Statement dates not valid.'));
                                    }
                                    if (through.isBefore(stored)) {
                                        done(new Error('Statement "stored" date is after "X-Experience-API-Consistent-Through.'));
                                    }
                                }
                                done();
                            } else {
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('An LRS\'s Statement API upon processing a GET request, returns a header with name "X-Experience-API-Consistent-Through" regardless of the code returned. (7.2.3.c)', function () {
        it('should return "X-Experience-API-Consistent-Through" using GET', function (done) {
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "verb"', function (done) {
            var query = qs.stringify({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "activity"', function (done) {
            var query = qs.stringify({activity: 'http://www.example.com/meetings/occurances/12345'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "registration"', function (done) {
            var query = qs.stringify({registration: helper.generateUUID()});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "related_activities"', function (done) {
            var query = qs.stringify({related_activities: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "related_agents"', function (done) {
            var query = qs.stringify({related_agents: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "since"', function (done) {
            var query = qs.stringify({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "until"', function (done) {
            var query = qs.stringify({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "limit"', function (done) {
            var query = qs.stringify({limit: 1});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "ascending"', function (done) {
            var query = qs.stringify({ascending: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "format"', function (done) {
            var query = qs.stringify({format: 'ids'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "attachments"', function (done) {
            var query = qs.stringify({attachments: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = res.headers['X-Experience-API-Consistent-Through'];
                            if (through) {
                                done();
                            } else {
                                done(new Error('Statement "X-Experience-API-Consistent-Through" not in header.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('An LRS\'s "X-Experience-API-Consistent-Through" header is an ISO 8601 combined date and time (Type, 7.2.3.c).', function () {
        it('should return valid "X-Experience-API-Consistent-Through" using GET', function (done) {
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "verb"', function (done) {
            var query = qs.stringify({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "activity"', function (done) {
            var query = qs.stringify({activity: 'http://www.example.com/meetings/occurances/12345'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "registration"', function (done) {
            var query = qs.stringify({registration: helper.generateUUID()});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "related_activities"', function (done) {
            var query = qs.stringify({related_activities: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "related_agents"', function (done) {
            var query = qs.stringify({related_agents: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "since"', function (done) {
            var query = qs.stringify({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "until"', function (done) {
            var query = qs.stringify({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "limit"', function (done) {
            var query = qs.stringify({limit: 1});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "ascending"', function (done) {
            var query = qs.stringify({ascending: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "format"', function (done) {
            var query = qs.stringify({format: 'ids'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return "X-Experience-API-Consistent-Through" using GET with "attachments"', function (done) {
            var query = qs.stringify({attachments: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var through = moment(res.headers['X-Experience-API-Consistent-Through'], moment.ISO_8601);
                            if (!through.isValid()) {
                                done();
                            } else {
                                done(new Error('Header "X-Experience-API-Consistent-Through" not valid.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('A "statements" property is an Array of Statements (Type, 4.2.table1.row1.a)', function () {
        it('should return StatementResult with statements as array using GET without "statementId" or "voidedStatementId"', function (done) {
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "agent"', function (done) {
            var templates = [
                {agent: '{{agents.default}}'}
            ];
            var data = createFromTemplate(templates);

            var query = qs.stringify(data);
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "verb"', function (done) {
            var query = qs.stringify({verb: 'http://adlnet.gov/expapi/non/existent'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "activity"', function (done) {
            var query = qs.stringify({activity: 'http://www.example.com/meetings/occurances/12345'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "registration"', function (done) {
            var query = qs.stringify({registration: helper.generateUUID()});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "related_activities"', function (done) {
            var query = qs.stringify({related_activities: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "related_agents"', function (done) {
            var query = qs.stringify({related_agents: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "since"', function (done) {
            var query = qs.stringify({since: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "until"', function (done) {
            var query = qs.stringify({until: '2012-06-01T19:09:13.245Z'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "limit"', function (done) {
            var query = qs.stringify({limit: 1});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "ascending"', function (done) {
            var query = qs.stringify({ascending: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "format"', function (done) {
            var query = qs.stringify({format: 'ids'});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementResult with statements as array using GET with "attachments"', function (done) {
            var query = qs.stringify({attachments: true});
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var result = JSON.parse(res.body);
                            if (result.statements && Array.isArray(result.statements)) {
                                done();
                            } else {
                                done(new Error('Statement "GET" does not return StatementResult.'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('An LRS\'s Statement API, upon processing a successful GET request wishing to return a Voided Statement still returns Statements which target it (7.2.4.b)', function () {
        var voidedId = helper.generateUUID();
        var statementRefId = helper.generateUUID();

        before('persist voided statement', function (done) {
            var voidedTemplates = [
                {statement: '{{statements.default}}'}
            ];
            var voided = createFromTemplate(voidedTemplates);
            voided = voided.statement;
            voided.id = voidedId;
            voidedId = voided.id;
            voided.verb.id = 'http://adlnet.gov/expapi/test/voided/target';

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
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
            voiding.object.id = voidedId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(voiding)
                .expect(200, done);
        });

        before('persist context with statement reference', function (done) {
            var contextTemplates = [
                {statement: '{{statements.context}}'},
                {context: '{{contexts.default}}'}
            ];
            var context = createFromTemplate(contextTemplates);
            context = context.statement;
            context.context.statement.id = voidedId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(context)
                .expect(200, done);
        });

        before('persist substatement context with statement references', function (done) {
            var substatementContextTemplates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.context}}'},
                {context: '{{contexts.default}}'}
            ];
            var substatementContext = createFromTemplate(substatementContextTemplates);
            substatementContext = substatementContext.statement;
            substatementContext.object.context.statement.id = voidedId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(substatementContext)
                .expect(200, done);
        });

        before('persist object with statement references', function (done) {
            var statementRefTemplates = [
                {statement: '{{statements.object_statementref}}'}
            ];
            var statementRef = createFromTemplate(statementRefTemplates);
            statementRef = statementRef.statement;
            statementRef.id = statementRefId;
            statementRef.object.id = voidedId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(statementRef)
                .expect(200, done);
        });

        before('persist substatement with statement references', function (done) {
            var subStatementStatementRefTemplates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{substatements.statementref}}'}
            ];
            var subStatementStatementRef = createFromTemplate(subStatementStatementRefTemplates);
            subStatementStatementRef = subStatementStatementRef.statement;
            subStatementStatementRef.object.object.id = voidedId;

            request(helper.getEndpoint())
                .post(helper.getEndpointStatements())
                .headers(helper.addHeaderXapiVersion({}))
                .json(subStatementStatementRef)
                .expect(200, done);
        });

        it('should not return StatementRef when using "since"', function (done) {
            var query = qs.stringify({
                verb: 'http://adlnet.gov/expapi/test/voided/target',
                since: '2010-01-01T19:09:13.245Z'
            });
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var results = JSON.parse(res.body).statements;
                            if (results.length === 0) {
                                done();
                            } else {
                                done(new Error('StatementRefs should not be returned when using "since".'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should not return StatementRef when using "until"', function (done) {
            var query = qs.stringify({
                verb: 'http://adlnet.gov/expapi/test/voided/target',
                until: '2050-01-01T19:09:13.245Z'
            });
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var results = JSON.parse(res.body).statements;
                            if (results.length === 0) {
                                done();
                            } else {
                                done(new Error('StatementRefs should not be returned when using "until".'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should not return StatementRef when using "limit"', function (done) {
            var query = qs.stringify({
                verb: 'http://adlnet.gov/expapi/test/voided/target',
                limit: 10
            });
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var results = JSON.parse(res.body).statements;
                            if (results.length === 0) {
                                done();
                            } else {
                                done(new Error('StatementRefs should not be returned when using "limit".'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });

        it('should return StatementRef when not using "since", "until", "limit"', function (done) {
            var query = qs.stringify({
                verb: 'http://adlnet.gov/expapi/test/voided/target'
            });
            request(helper.getEndpoint())
                .get(helper.getEndpointStatements() + '?' + query)
                .headers(helper.addHeaderXapiVersion({}))
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        try {
                            var results = JSON.parse(res.body).statements;
                            if (results.length > 0) {
                                var found = false;
                                for (var i = 0; i < results.length; i++) {
                                    var result = results[i];
                                    if (result.id === statementRefId) {
                                        found = true;
                                        break;
                                    }
                                }
                                if (found) {
                                    done();
                                } else {
                                    done(new Error('StatementRefs "id" was not found.'));
                                }
                            } else {
                                done(new Error('StatementRefs should be returned when not using "since", "until", "limit".'));
                            }
                        } catch (error) {
                            done(error);
                        }
                    }
                });
        });
    });

    describe('Miscellaneous Requirements', function () {
        it('All Objects are well-created JSON Objects (Nature of binding) **Implicit**', function (done) {
            // JSON parser validates this
            done();
        });

        it('All Strings are encoded and interpreted as UTF-8 (6.1.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Statement uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "actor" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "verb" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "object" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "result" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "context" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "timestamp" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "stored" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "authority" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "version" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "attachments" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Group uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Group uses the "member" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "actor" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent uses the "openid" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent uses the "account" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent uses the "mbox" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Anonymous Group uses the "member" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group uses the "mbox" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group uses the "open_id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group uses the "account" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group uses the "openid" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Account Object uses the "homePage" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Account Object property uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "verb" property uses the "id" property at most one time (Multiplicity, 4.1.3.table1.row1.aultiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Voiding Statement\'s Target is defined as the Statement corresponding to the "object" property\'s "id" property\'s IRI (4.3.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A "verb" property uses the "display" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "object" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "object" property uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "object" property uses the "definition" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity is defined by the "objectType" of an "object" with value "Activity" (4.1.4.1.table1.row1.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An Activity uses the "definition" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "description" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "type" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "moreInfo" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "interactionType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "correctResponsesPattern" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "choices" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "scale" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "source" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "target" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "steps" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Interaction Component uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Interaction Component uses the "description" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "extensions" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement Reference uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "score" Object uses a "scaled" property at most one time (Multiplicity, 4.1.5.1.table1.row1.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "score" Object uses a "raw" property at most one time (Multiplicity, 4.1.5.1.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "score" Object uses a "min" property at most one time (Multiplicity, 4.1.5.1.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "score" Object uses a "max" property at most one time (Multiplicity, 4.1.5.1.table1.row4.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "result" property uses a "success" property at most one time (Multiplicity, 4.1.5.table1.row2.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "result" property uses a "completion" property at most one time (Multiplicity, 4.1.5.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "result" property uses a "response" property at most one time (Multiplicity, 4.1.5.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "result" property uses a "duration" property at most one time (Multiplicity, 4.1.5.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "result" property uses an "extensions" property at most one time (Multiplicity, 4.1.5.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses a "registration" property at most one time (Multiplicity, 4.1.6.table1.row1.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses an "instructor" property at most one time (Multiplicity, 4.1.6.table1.row2.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses an "team" property at most one time (Multiplicity, 4.1.6.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses a "contextActivities" property at most one time (Multiplicity, 4.1.6.table1.row4.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses an "revision" property at most one time (Multiplicity, 4.1.6.table1.row5.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses an "platform" property at most one time (Multiplicity, 4.1.6.table1.row6.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses a "language" property at most one time (Multiplicity, 4.1.6.table1.row7.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses a "statement" property at most one time (Multiplicity, 4.1.6.table1.row8.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses an "extensions" property at most one time (Multiplicity, 4.1.6.table1.row9.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "usageType" property exactly one time (Multiplicity, 4.1.11.table1.row1.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "display" property exactly one time (Multiplicity, 4.1.11.table1.row2.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "description" property at most one time (Multiplicity, 4.1.11.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "contentType" property exactly one time (Multiplicity, 4.1.11.table1.row4.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "length" property exactly one time (Multiplicity, 4.1.11.table1.row5.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "sha2" property exactly one time (Multiplicity, 4.1.11.table1.row6.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "fileUrl" property at most one time (Multiplicity, 4.1.11.table1.row7.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An LRS\'s Statement API, upon processing a successful GET request, will return a single "statements" property (Multiplicity, Format, 4.2.table1.row1.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "more" property\'s referenced container object follows the same rules as the original GET request, originating with a single "statements" property and a single "more" property (4.2.table1.row1.b)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An LRS doesn\'t make any adjustments to incoming Statements that are not specifically mentioned in this section (4.1.12.d, Varies)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS stores 32-bit floating point numbers with at least the precision of IEEE 754 (4.1.12.d.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a Request whose "authority" is a Group and consists of non-O-Auth Agents (4.1.9.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 403 Forbidden a Request whose "authority" is a Agent or Group that is not authorized (4.1.9.b, 6.4.2)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a GET Request which uses Attachments, has a "Content-Type" header with value "application/json", and has the "attachments" filter attribute set to "true" (4.1.11.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "MIME-Version" with a value of "1.0" or greater (4.1.11.b, RFC 1341)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "true" if it does not follow the rest of the attachment rules (7.2.3.d)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "false" if it includes attachment raw data (7.2.3.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "false" and the Content-Type field in the header set to anything but "application/json" (7.2.3.d) (7.2.3.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS implements all of the Statement, State, Agent, and Activity Profile sub-APIs **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request any request to an API which uses a parameter not recognized by the LRS (7.0.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS can only reject Statements using the error codes in this specification **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS returns the correct corresponding error code when an error condition is met (7.0.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects a Statement of bad authorization (either authentication needed or failed credentials) with error code 401 Unauthorized (7.1)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects a Statement of insufficient permissions (credentials are valid, but not adequate) with error code 403 Forbidden (7.1)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects a Statement due to size if the Statement exceeds the size limit the LRS is configured to with error code 413 Request Entity Too Large (7.1)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS must be configurable to accept a Statement of any size (within reason of modern day storage capacity)  (7.1.b, **Implicit**)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects a Statement due to network/server issues with an error code of 500 Internal Server Error (7.1)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API rejects with Error Code 400 Bad Request any DELETE request (7.2)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A POST request is defined as a "pure" POST, as opposed to a GET taking on the form of a POST (7.2.2.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A GET request is defined as either a GET request or a POST request containing a GET request (7.2.3, 7.2.2.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API, upon receiving a GET request, has a field in the header with name "Content-Type" **Assumed?****', function (done) {
            done(new Error('Implement Test'));
        });

        it('The Statements within the "statements" property will correspond to the filtering criterion sent in with the GET request **Implicit** (7.2.4.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A "statements" property which is too large for a single page will create a container for each additional page (4.2.table1.row1.b)', function (done) {
            // TODO What determines to large? Property to set?
            done(new Error('Implement Test'));
        });

        it('A "more" property IRL is accessible for at least 24 hours after being returned (4.2.a)', function (done) {
            // TODO Skipping for now
            done(new Error('Implement Test'));
        });
    });

    function createFromTemplate(templates) {
        // convert template mapping to JSON objects
        var converted = helper.convertTemplate(templates);
        // this handles if no override
        var mockObject = helper.createTestObject(converted);
        return mockObject;
    }

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('qs'), require('should'), require('./../helper'), require('valid-url')));
