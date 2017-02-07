/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, Joi, helper, multipartParser) {
    "use strict";

    var expect = chai.expect;
     request = helper.OAuthRequest(request);
describe('Signed Statements (Data 2.6)', () => {

/**  Matchup with Conformance Requirements Document
 * XAPI-00115 - below
 * XAPI-00116 - below
 * XAPI-00117 - below
 */

    describe('LRS must validate and store statement signatures if they are provided (Data 2.6)', function () {

        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        data = data.statement;

/**  XAPI-00115, Data 2.5 Signed Statements
 * A Signed Statement MUST include a JSON web signature (JWS) as defined here: http://tools.ietf.org/html/rfc7515, as an Attachment with a usageType of http://adlnet.gov/expapi/attachments/signature and a contentType of application/octet-stream. The LRS must reject with 400 a statement which has usageType of http://adlnet.gov/expapi/attachments/signature and a contentType of application/octet-stream but does not have a signature attached.
 */
        describe("A Signed Statement MUST include a JSON web signature, JWS (Data 2.6.s4.b1, XAPI-00115)", function () {

            it('rejects a signed statement with a malformed signature - bad content type', function (done) {
                data.id = helper.generateUUID();
                var options = {attachmentInfo: {contentType: 'text/plain; charset=ascii'}};
                var body = helper.signStatement(data, options);

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary=' + options.boundary}))
                .body(body)
                .expect(400, done);
            });

            it('rejects a signed statement with a malformed signature - bad JWS', function (done) {
                data.id = helper.generateUUID();
                var options = {breakJson: true};
                var body = helper.signStatement(data, options);

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary=' + options.boundary}))
                .body(body)
                .expect(400, done);
            });
        });

/**  XAPI-00116, Data 2.6 Signed Statements
 * The JWS signature MUST have a payload of a valid JSON serialization of the complete Statement before the signature was added.The LRS must reject with 400 a statement which does not have a valid JSON serialization.
 */
        describe("The JWS signature MUST have a payload of a valid JSON serialization of the complete Statement before the signature was added. (Data 2.6.s4.b3, XAPI-00116)", function () {
            it("rejects statement with invalid JSON serialization", function (done) {
                data.id = helper.generateUUID();
                var options = {breakJson: true};
                var body = helper.signStatement(data, options);

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(400, done);
            });
        });

/**  XAPI-00117, Data 2.6 Signed Statements
 * The JWS signature MUST use an algorithm of "RS256", "RS384", or "RS512". The LRS must reject with 400 a statement which does not use one of these algorithms or does not use one of these algorithms correctly.
 */
        describe('The JWS signature MUST use an algorithm of "RS256", "RS384", or "RS512". (Data 2.6.s4.b4, XAPI-00117)', function () {

            it("Accepts signed statement with \"RS256\"", function (done)
            {
                // sign statement
                data.id = helper.generateUUID();
                var options = {};
                var body = helper.signStatement(data, options);

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(200, done);
            }); //end it good sig with "RS256"

            it("Accepts signed statement with \"RS384\"", function (done)
            {
                // sign statement
                data.id = helper.generateUUID();
                var options = {algorithm: 'RS384'};
                var body = helper.signStatement(data, options);

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(200, done);
            }); //end it good sig with "RS384"

            it("Accepts signed statement with \"RS512\"", function (done)
            {
                // sign statement
                data.id = helper.generateUUID();
                var options = {algorithm: 'RS512'};
                var body = helper.signStatement(data, options);

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(200, done);
            }); //end it good sig with "RS512"

            it('Rejects signed statement with another algorithm', function (done) {
                data.id = helper.generateUUID();
                var options = {algorithm: 'HS256'};
                var body = helper.signStatement(data, options);

                request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(400, done);
            });
        });

    }); //end describe statement signatures

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('joi'), require('./../helper'), require('./../multipartParser')));
