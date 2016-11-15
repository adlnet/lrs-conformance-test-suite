/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, templatingSelection) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Attachments Property Requirements (Data 2.4.11)', () => {

/**  Matchup with Conformance Requirements Document
 * XAPI-00102 - in attachments.js
 * XAPI-00103 - in attachments.js
 * XAPI-00104 - in attachments.js
 * XAPI-00105 - in attachments.js
 * XAPI-00106 - in attachments.js
 * XAPI-00107 - in attachments.js

 * Note XAPI-00025 - in attachments.js
 */

    templatingSelection.createTemplate('attachments.js');

/**  XAPI-00138, Communication 1.5.2 Multipart/Mixed
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "Content-Type" with value "multipart/mixed"
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "Content-Type" with value "multipart/mixed" (RFC 1341, Data 2.4.11, XAPI-00138)', function () {
        it('should fail when attachment is raw data and first part content type is not "application/json"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_first_part_content_type.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

/**  XAPI-00127, Communication 1.5.1 Application/JSON
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which does not have a "Content-Type" header with value "application/json" or "multipart/mixed"
 */
    describe('An LRS rejects with error code 400 Bad Request, a Request which uses Attachments and does not have a "Content-Type" header with value "application/json" or "multipart/mixed" (Format, Data 2.4.11, XAPI-00127)', function () {
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
            data = helper.createFromTemplate(templates);
            data = data.statement;

            attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_image_multipart_attachment_valid.part', {encoding: 'binary'});
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

/**  XAPI-00128, Communication 1.5.1 Application/JSON
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which has excess multi-part sections that are not attachments.
 */
/**  XAPI-00129, Communication 1.5.1 Application/JSON
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which is missing multi-part sections for non-fileURL attachments must be rejected.
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content-Type" header with value "application/json", and has a discrepancy in the number of Attachments vs. the number of fileURL members (Data 2.4.11, Communication 1.5.1.s1.b2, XAPI-00128, XAPI-00129)', function () {
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
            var data = helper.createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data).expect(400, done);
        });
    });

/**  XAPI-00131, Communication 1.5.2 Multipart/Mixed
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "boundary"
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "boundary" (Data 2.4.11, RFC 1341, Communication 1.5.2.s2.b2, XAPI-00131)', function () {
        it('should fail if boundary not provided in body', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_first_part_no_boundary.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

    describe('A Boundary is defined as the value of the body header named "boundary" (Definition, Data 2.4.11, RFC 1341, Communication 1.5.2.s2.b2)', function () {
        it('should fail if boundary not provided in header', function (done) {
            var header = {'Content-Type': 'multipart/mixed;'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

/**  XAPI-00130, Communication 1.5.2 Multipart/Mixed
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a Boundary before each "Content-Type" header
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a Boundary before each "Content-Type" header (Data 2.4.11, RFC 1341, Communication 1.5.2.s2.b2, XAPI-00130)', function () {
        it('should fail if boundary not provided in body', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_first_part_no_boundary.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

/**  XAPI-00134, Communication 1.5.2 Multipart/Mixed
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not the first document part with a "Content-Type" header with a value of "application/json"
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not the first document part with a "Content-Type" header with a value of "application/json" (RFC 1341, Data 2.4.11, Communication 1.5.2.s2.b2.b1, XAPI-00134)', function () {
        it('should fail when attachment is raw data and first part content type is not "application/json"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_first_part_content_type.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

/**  XAPI-00133, Communication 1.5.2 Multipart/Mixed
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have all of the Statements in the first document part
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have all of the Statements in the first document part (RFC 1341, Data 2.4.11, Communication 1.5.2.s2.b2.b1, XAPI-00133)', function () {
        it('should fail when statements separated into multiple parts', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_statement_parts.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

/**  XAPI-00132, Communication 1.5.2 Multipart/Mixed
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "X-Experience-API-Hash" with a value of one of those found in a "sha2" property of a Statement in the first part of this document
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "X-Experience-API-Hash" with a value of one of those found in a "sha2" property of a Statement in the first part of this document (Data 2.4.11, Communication 1.5.2.s2.b2.b3", Communication 1.5.2.s1.b4, XAPI-00132)', function () {
        it('should fail when attachments missing header "X-Experience-API-Hash"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_no_x_experience_api_hash.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });

        it('should fail when attachments header "X-Experience-API-Hash" does not match "sha2"', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_no_match_sha2.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders(header))
                .body(attachment).expect(400, done);
        });
    });

/**  XAPI-00135, Communication 1.5.2 Multipart/Mixed
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "Content-Transfer-Encoding" with a value of "binary"
 */
    it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "Content-Transfer-Encoding" with a value of "binary" (Data 2.4.11, XAPI-00135)', function (done) {

      var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_content_transfer_encoding.part', {encoding: 'binary'});
      var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};

      request(helper.getEndpointAndAuth())
          .post(helper.getEndpointStatements())
          .headers(helper.addAllHeaders(header))
          .body(attachment).expect(400,done);
    });

    it('An LRS rejects with error code 400 Bad Request, a GET Request which uses Attachments, has a "Content-Type" header with value "application/json", and has the "attachments" filter attribute set to "true" (Data 2.4.11)', function (done) {
        this.timeout(0);
        var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_image_multipart_attachment_valid.part', {encoding: 'binary'});
        var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};

        var data = {
            attachments: true,
            limit: 1
        };
        var query = helper.getUrlEncoding(data);
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders(header))
        .body(attachment).expect(200)
        .end()
        .get(helper.getEndpointStatements() + '?' + query)
        .wait(helper.genDelay(stmtTime, '?' + query, null))
        .headers(helper.addAllHeaders(header))
        .expect(200)
        .end(function(err,res){
            if (err){
                done(err);
            }
            else{
                expect(res.headers['content-type']).to.have.string('multipart/mixed');
                done();
            }
        });
    });

    it('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "false" and the Content-Type field in the header set to anything but "application/json" (Data 2.4.11)', function (done) {
        //Not concerned with "Content-Type" when use a GET request
        // response header should be application json if attachment parameter is false
        this.timeout(0);
        var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_image_multipart_attachment_valid.part', {encoding: 'binary'});
        var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};

        var data = {
            attachments: false,
            limit: 1
        };
        var query = helper.getUrlEncoding(data);
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders(header))
        .body(attachment).expect(200)
        .end()
        .get(helper.getEndpointStatements() + '?' + query)
        .wait(helper.genDelay(stmtTime, '?' + query, null))
        .headers(helper.addAllHeaders(header))
        .expect(200)
        .end(function(err,res){
            if (err){
                done(err);
            }
            else{
                expect(res.headers['content-type']).to.equal('application/json');
                done();
            }
        });
    });

    it ('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "true" if it does not follow the rest of the attachment rules (Data 2.4.11)', function (done){
        //incomplete- should compare raw data between request and response
        this.timeout(0);
        var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_image_multipart_attachment_valid.part', {encoding: 'binary'});
        var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};

        var data = {
            attachments: true,
            limit: 1
        };
        var query = helper.getUrlEncoding(data);
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders(header))
        .body(attachment).expect(200)
        .end()
        .get(helper.getEndpointStatements()+ '?' + query)
        .wait(helper.genDelay(stmtTime, '?' + query, null))
        .headers(helper.addAllHeaders(header))
        .expect(200)
        .end(function(err,res){
            if (err){
              done(err);
            }
            else{
                try {
                    var request = helper.parse(res.body);
                    done("Contains raw data");
                } catch (e) {
                    expect(res.headers['content-type']).to.have.string('multipart/mixed');
                    done();
                }

            }
        });
    });

    it ('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "false" if it includes attachment raw data (Data 2.4.11)', function (done){

        var data = {
            attachments: false,
            limit: 1
        };
        var query = helper.getUrlEncoding(data);

        var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_image_multipart_attachment_valid.part', {encoding: 'binary'});
        var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders(header))
        .body(attachment).expect(200)
        .end()
        .get(helper.getEndpointStatements()+ '?' + query)
        .wait(helper.genDelay(stmtTime, '?' + query, null))
        .headers(helper.addAllHeaders(header))
        .expect(200)
        .end(function(err,res){
            if (err){
                done(err);
            }
            else{
                var request = helper.parse(res.body);
                expect(res.headers['content-type']).to.equal('application/json');
                done();
            }
        });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
