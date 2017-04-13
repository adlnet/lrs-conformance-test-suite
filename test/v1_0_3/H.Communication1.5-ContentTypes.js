/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, crypto) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Content Type Requirements (Communication 1.5)', function () {

    //Communication 1.5.1
/**  Matchup with Conformance Requirements Document
 * XAPI-00127 - below
 * XAPI-00128 - below
 * XAPI-00129 - below
 */

    //Communication 1.5.2
/**
 * XAPI-00130 - below
 * XAPI-00131 - below
 * XAPI-00132 - below
 * XAPI-00133 - below
 * XAPI-00134 - below
 * XAPI-00135 - below
 * there is no XAPI-00136
 * XAPI-00137 - removed
 * XAPI-00138 - removed
 */


/**  XAPI-00127, Communication 1.5.1 Application/JSON
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which does not have a "Content-Type" header with value "application/json" or "multipart/mixed"
 */
    describe('An LRS rejects with error code 400 Bad Request, a Request which uses Attachments and does not have a "Content-Type" header with value "application/json" or "multipart/mixed" (Format, Data 2.4.11, XAPI-00127)', function () {
        var data;
        var attachment;
        var msg;

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

            attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_image_p2.jpeg', {encoding: 'binary'});

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

            delete data.attachments[0].fileUrl;
            data.attachments[0].contentType = 'image/jpeg';
            var stats = fs.statSync('test/v1_0_3/templates/attachments/basic_image_p2.jpeg');
            var sizebytes = stats.size;
            data.attachments[0].length = sizebytes;
            data.attachments[0].sha2 = crypto.createHash('SHA256').update(attachment).digest('hex');

            var dashes = '--';
            var crlf = '\r\n';
            var boundary = '-------314159265358979323846'

            var msg = dashes + boundary + crlf;
            msg += 'Content-Type: application/json' + crlf + crlf;
            msg += JSON.stringify(data) + crlf;
            msg += dashes + boundary + crlf;
            msg += 'Content-Type: image/jpeg' + crlf;
            msg += 'Content-Transfer-Encoding: binary' + crlf;
            msg += 'X-Experience-API-Hash: ' + data.attachments[0].sha2 + crlf + crlf;
            msg += attachment + crlf;
            msg += dashes + boundary + dashes + crlf;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders(header))
            .body(msg).expect(200, done);
        });

        it('should fail when attachment is raw data and request content-type is "multipart/form-data"', function (done) {
            var header = {'Content-Type': 'multipart/form-data; boundary=-------314159265358979323846'};

            delete data.attachments[0].fileUrl;
            data.attachments[0].contentType = 'image/jpeg';
            var stats = fs.statSync('test/v1_0_3/templates/attachments/basic_image_p2.jpeg');
            var sizebytes = stats.size;
            data.attachments[0].length = sizebytes;
            data.attachments[0].sha2 = crypto.createHash('SHA256').update(attachment).digest('hex');

            var dashes = '--';
            var crlf = '\r\n';
            var boundary = '-------314159265358979323846'

            var msg = dashes + boundary + crlf;
            msg += 'Content-Type: application/json' + crlf + crlf;
            msg += JSON.stringify(data) + crlf;
            msg += dashes + boundary + crlf;
            msg += 'Content-Type: image/jpeg' + crlf;
            msg += 'Content-Transfer-Encoding: binary' + crlf;
            msg += 'X-Experience-API-Hash: ' + data.attachments[0].sha2 + crlf + crlf;
            msg += attachment + crlf;
            msg += dashes + boundary + dashes + crlf;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders(header))
            .body(msg).expect(400, done);
        });
    });

/**  XAPI-00128, Communication 1.5.1 Application/JSON
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which has excess multi-part sections that are not attachments.
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which has excess multi-part sections that are not attachments. (Communication 1.5.1.s1.b2, Data 2.4.11, XAPI-00128)', function() {
        it('should fail when passing statement attachments with excess multipart sections', function(done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'},
                attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_too_many_multipart_attachment_valid.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders(header))
            .body(attachment).expect(400, done);
        });
    });

/**  XAPI-00129, Communication 1.5.1 Application/JSON
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which is missing multi-part sections for non-fileURL attachments must be rejected.
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content-Type" header with value "application/json", and has a discrepancy in the number of Attachments vs. the number of fileURL members (Communication 1.5.1.s1.b2, Data 2.4.11, XAPI-00129)', function () {
        it('should fail when passing statement attachments and missing attachment"s binary', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'},
                attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_too_few_multipart_attachment_valid.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders(header))
            .body(attachment).expect(400, done);
        });
    });

/**  XAPI-00131, Communication 1.5.2 Multipart/Mixed
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "boundary"
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "boundary" (Communication 1.5.2.s2.b2, Data 2.4.11, RFC 2046, XAPI-00131)', function () {
        it('should fail if boundary not provided in body', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_first_part_no_boundary.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders(header))
            .body(attachment).expect(400, done);
        });
    });

/**  XAPI-00130, Communication 1.5.2 Multipart/Mixed
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a Boundary before each "Content-Type" header
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a Boundary before each "Content-Type" header (Communication 1.5.2.s2.b2, Data 2.4.11, RFC 2046, XAPI-00130)', function () {

        it('should fail if boundary not provided in body', function (done) {
            var header = {'Content-Type': 'multipart/mixed; boundary=-------314159265358979323846'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_invalid_middle_part_no_boundary.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders(header))
            .body(attachment).expect(400, done);
        });

        it('should fail if boundary not provided in header', function (done) {
            var header = {'Content-Type': 'multipart/mixed;'};
            var attachment = fs.readFileSync('test/v1_0_3/templates/attachments/basic_text_multipart_attachment_valid.part', {encoding: 'binary'});

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders(header))
            .body(attachment).expect(400, done);
        });
    });

/**  XAPI-00134, Communication 1.5.2 Multipart/Mixed
 * An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not the first document part with a "Content-Type" header with a value of "application/json"
 */
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not the first document part with a "Content-Type" header with a value of "application/json" (RFC 2046, Communication 1.5.2.s2.b2.b1, Data 2.4.11, XAPI-00134)', function () {
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
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have all of the Statements in the first document part (RFC 2046, Data 2.4.11, Communication 1.5.2.s2.b2.b1, XAPI-00133)', function () {
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
    describe('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "X-Experience-API-Hash" with a value of one of those found in a "sha2" property of a Statement in the first part of this document (Communication 1.5.2.s2.b2.b3", Communication 1.5.2.s1.b4, Data 2.4.11, XAPI-00132)', function () {
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
});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('crypto')));
