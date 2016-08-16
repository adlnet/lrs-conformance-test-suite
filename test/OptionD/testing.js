/* Testing if I can make a quick set of dummy tests to explore the possibility o fadding test profiles.  This is copied and pasted from the non_templating file. */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;

    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('New requirements for specification version 1.0.3', function() {


    describe('Stored Statements property is a “Timestamp (Formatted according to ISO 8601) of when this Statement was recorded. Set by LRS.” (4.1 Statement Properties)', function () {
        it('Message goes here', function (done) {

            function testTime (ctr) {
                console.log('Attempt #', ctr);
                var templates = [
                    {statement: '{{statements.default}}'}
                ];
                var data = createFromTemplate(templates).statement;
                data.id = helper.generateUUID();
                var query = '?statementId=' + data.id;
                var stmtTime = Date.now();

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders())
                .json(data)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + query)
                // .wait(genDelay(stmtTime, query, data.id));
                .headers(helper.addAllHeaders())
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        console.log('This is the first thing that should be printed in the results section');
                        stmt = parse(res.body);
                        console.log('We have parsed the body of the res');
                        expect(stmt).to.have.property('stored');
                        console.log('There is a stored property');
                        var stored = moment(stmt.stored, moment.ISO_8601, true);
                        console.log('This is after the moment strict iso thing');
                        expect(stored.isValid()).to.be.true;
                        console.log('Stored property is', Object.keys(stored), stored._i);
                        console.log("Ciao", stored._pf, stored._pf.parsedDateParts[6]);
                        //The following will send and recieve multiple times if necessary to determine that an LRS preserves a timestamp to at least milliseconds
                        if (stored._pf.parsedDateParts[6] === 0) {
                            if (ctr < 5) {
                                testTime(++ctr);
                            } else {
                                throw new Error("LRS did not preseve milliseconds");
                                done(err);
                            }
                        } else {
                            done();
                        }
                    }
                });
            } testTime(1);
        });
    });


    describe('Statements returned by an LRS MUST retain the version they are accepted with. (4.1.10)', function () {
        // var versions = ['0.9', '1.0', '1.0.0', '1.0.1', '1.0.2', '1.0.3'];
        // versions.forEach(function(version) {
        //     var templates = [
        //         {statement: '{{statments.default}}'}
        //     ];
        // })
        // done();
    });


    describe('If it (LRS) accepts the attachment, it can match the raw data of an attachment with the attachment header in a Statement by comparing the SHA-2 of the raw data to the SHA-2 declared in the header. It (LRS) MUST not do so any other way. (4.4.11)', function () {
        // done();
    });


    describe('When handling Statement Signature, LRS MUST do the following (4.4)', function () {

        it('Reject requests to store Statements that contain malformed signatures, with HTTP 400.', function (done) {
            done();
        });

        it('Decode the JWS signature, and load the signed serialization of the Statement from the JWS signature payload.', function (done) {
            done();
        });

        it('Validate that the "original" Statement is logically equivalent to the received Statement.', function (done) {
            // When making this equivalence check, differences which could have been caused by allowed or required LRS processing of "id", "authority", "stored", "timestamp", or "version" MUST be ignored.
            done();
        });

        it('If the JWS header includes an X.509 certificate, validate the signature against that certificate as defined in JWS.', function (done) {
            done();
        });
    });


    describe('An LRS must support HTTP/1.1 entity tags (ETags) to implement optimistic concurrency control when handling APIs where PUT may overwrite existing data (State, Agent Profile, and Activity Profile). (6.3)', function () {


        it('When responding to a GET request, include an ETag HTTP header in the response', function (done) {
            done();
        });

        it('When returning an ETag header, the value should be calculated as a SHA1 hexadecimal value', function (done) {
            done();
        });

        it('When responding to a GET Request the Etag header must be enclosed in quotes', function (done) {
            done();
        });

        it('When responding to a PUT request, must handle the If-Match header as described in RFC 2616, HTTP/1.1 if it contains an ETag', function (done) {
            done();
        });

        it('When responding to a PUT request, handle the If-None-Match header as described in RFC 2616, HTTP/1.1 if it contains “*”', function (done) {
            done();
        });

        describe('If Header precondition in PUT Requests for RFC2616 fail', function () {

            it('Return HTTP 412 (Precondition Failed)', function (done) {
                done();
            });

            it('Do not modify the resource', function (done) {
                done();
            });
        });

        describe('If put request is received without either header for a resource that already exists', function () {

            it('Return 409 conflict', function (done) {
                done();
            });

            it('Return plaintext body explaining the situation', function (done) {
                done();
            });

            it('Do not modify the resource', function (done) {
                done();
            });
        });

    });

    describe('The LRS MUST support authentication using at least one of the following methods: (6.4)', function () {

        it('OAuth 1.0 (RFC 5849), with signature methods of "HMAC-SHA1", "RSA-SHA1", and "PLAINTEXT"', function (done) {
            done();
        });

        it('HTTP Basic Authentication', function (done) {
            done();
        });

        it('Common Access Cards (implementation details to follow in a later version)', function (done) {
            done();
        });
    });

});


    // describe('An LRS populates the "authority" property if it is not provided in the Statement, based on header information with the Agent corresponding to the user (contained within the header) (Implicit, 4.1.9.b, 4.1.9.c)', function () {
    //     it('should populate authority', function (done) {
    //         var templates = [
    //             {statement: '{{statements.default}}'}
    //         ];
    //         var data = createFromTemplate(templates);
    //         data = data.statement;
    //         data.id = helper.generateUUID();
    //
    //         request(helper.getEndpoint())
    //             .post(helper.getEndpointStatements())
    //             .headers(helper.addAllHeaders({}))
    //             .json(data)
    //             .expect(200)
    //             .end()
    //             .get(helper.getEndpointStatements() + '?statementId=' + data.id)
    //             .headers(helper.addAllHeaders({}))
    //             .expect(200).end(function (err, res) {
    //                 if (err) {
    //                     done(err);
    //                 } else {
    //                     var statement = parse(res.body, done);
    //                     expect(statement).to.have.property('authority');
    //                     done();
    //                 }
    //             });
    //     });
    // });

    // describe('A Voiding Statement cannot Target another Voiding Statement (4.3)', function () {
    //     var voidedId;
    //
    //     before('persist voided statement', function (done) {
    //         var templates = [
    //             {statement: '{{statements.default}}'}
    //         ];
    //         var data = createFromTemplate(templates);
    //         data = data.statement;
    //         request(helper.getEndpoint())
    //             .post(helper.getEndpointStatements())
    //             .headers(helper.addAllHeaders({}))
    //             .json(data).expect(200).end(function (err, res) {
    //                 if (err) {
    //                     done(err);
    //                 } else {
    //                     voidedId = res.body[0];
    //                     done();
    //                 }
    //             });
    //     });
    //
    //     before('persist voiding statement', function (done) {
    //         var templates = [
    //             {statement: '{{statements.object_statementref}}'},
    //             {verb: '{{verbs.voided}}'}
    //         ];
    //         var data = createFromTemplate(templates);
    //         data = data.statement;
    //         data.object.id = voidedId;
    //         request(helper.getEndpoint())
    //             .post(helper.getEndpointStatements())
    //             .headers(helper.addAllHeaders({}))
    //             .json(data).expect(200).end(function (err, res) {
    //                 if (err) {
    //                     done(err);
    //                 } else {
    //                     done();
    //                 }
    //             });
    //     });
    //
    //     it('should fail when "StatementRef" points to a voiding statement', function (done) {
    //         var templates = [
    //             {statement: '{{statements.object_statementref}}'},
    //             {verb: '{{verbs.voided}}'}
    //         ];
    //         var data = createFromTemplate(templates);
    //         data = data.statement;
    //         data.object.id = voidedId;
    //         request(helper.getEndpoint())
    //             .post(helper.getEndpointStatements())
    //             .headers(helper.addAllHeaders({}))
    //             .json(data).expect(400).end(function (err, res) {
    //                 if (err) {
    //                     done(err);
    //                 } else {
    //                     done();
    //                 }
    //             });
    //     });
    // });

    // describe('Welcome to Option D.  An LRS returns a ContextActivity in an array, even if only a single ContextActivity is returned (4.1.6.2.c, 4.1.6.2.d)', function () {
    //     var types = ['parent', 'grouping', 'category', 'other'];

        // types.forEach(function (type) {
        //     it('should return array for statement context "' + type + '"  when single ContextActivity is passed', function (done) {
        //         var templates = [
        //             {statement: '{{statements.context}}'},
        //             {context: '{{contexts.' + type + '}}'}
        //         ];
        //         var data = createFromTemplate(templates);
        //         data = data.statement;
        //         data.id = helper.generateUUID();
        //
        //         request(helper.getEndpoint())
        //             .post(helper.getEndpointStatements())
        //             .headers(helper.addAllHeaders({}))
        //             .json(data)
        //             .expect(200)
        //             .end()
        //             .get(helper.getEndpointStatements() + '?statementId=' + data.id)
        //             .headers(helper.addAllHeaders({}))
        //             .expect(200)
        //             .end(function (err, res) {
        //                 if (err) {
        //                     done(err);
        //                 } else {
        //                     var statement = parse(res.body, done);
        //                     expect(statement).to.have.property('context').to.have.property('contextActivities');
        //                     expect(statement.context.contextActivities).to.have.property(type);
        //                     expect(statement.context.contextActivities[type]).to.be.an('array');
        //                     done();
        //                 }
        //             });
        //     });
        // });

    //     types.forEach(function (type) {
    //         it('should return array for statement substatement context "' + type + '"  when single ContextActivity is passed', function (done) {
    //             var templates = [
    //                 {statement: '{{statements.object_substatement}}'},
    //                 {object: '{{substatements.context}}'},
    //                 {context: '{{contexts.' + type + '}}'}
    //             ];
    //             var data = createFromTemplate(templates);
    //             data = data.statement;
    //             data.id = helper.generateUUID();
    //
    //             request(helper.getEndpoint())
    //                 .post(helper.getEndpointStatements())
    //                 .headers(helper.addAllHeaders({}))
    //                 .json(data)
    //                 .expect(200)
    //                 .end()
    //                 .get(helper.getEndpointStatements() + '?statementId=' + data.id)
    //                 .headers(helper.addAllHeaders({}))
    //                 .expect(200)
    //                 .end(function (err, res) {
    //                     if (err) {
    //                         done(err);
    //                     } else {
    //                         var statement = parse(res.body, done);
    //                         expect(statement).to.have.property('object').to.have.property('context').to.have.property('contextActivities');
    //                         expect(statement.object.context.contextActivities).to.have.property(type);
    //                         expect(statement.object.context.contextActivities[type]).to.be.an('array');
    //                         done();
    //                     }
    //                 });
    //         });
    //     });
    // });
    //
    // describe('Will these three tests now show up??', function () {
    //
    //     it('An LRS\'s Statement API, upon processing a successful GET request, will return a single "statements" property (Multiplicity, Format, 4.2.table1.row1.c)', function (done) {
    //         // JSON parser validates this
    //         done();
    //     });
    //
    //     it('A "more" property\'s referenced container object follows the same rules as the original GET request, originating with a single "statements" property and a single "more" property (4.2.table1.row1.b)', function (done) {
    //         // JSON parser validates this
    //         done();
    //     });
    //
    //     it('An LRS\'s Statement API rejects with Error Code 400 Bad Request any DELETE request (7.2)', function (done) {
    //         // Using requirement: An LRS rejects with error code 405 Method Not Allowed to any request to an API which uses a method not in this specification **Implicit ONLY in that HTML normally does this behavior**
    //         done();
    //     });
    // });


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
