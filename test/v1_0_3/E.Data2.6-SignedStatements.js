/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, Joi, helper, multipartParser) {
    "use strict";

    var expect = chai.expect;

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


        it("Signed statement with \"RS256\" (Data 2.6.s4.b1)", function (done)
        {
            // sign statement
            data.id = helper.generateUUID();
            var options = {};
            var body = helper.signStatement(data, options);

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(200)
                .end(function (err, res) {
                    done(err);
                });

        }); //end it good sig with "RS256"

        it("Signed statement with \"RS384\" (Data 2.6.s4.b1)", function (done)
        {
            // sign statement
            data.id = helper.generateUUID();
            var options = {algorithm: 'RS384'};
            var body = helper.signStatement(data, options);

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(200)
                .end(function (err, res) {
                    done(err);
                });

        }); //end it good sig with "RS384"

        it("Signed statement with \"RS512\" (Data 2.6.s4.b1)", function (done)
        {
            // sign statement
            data.id = helper.generateUUID();
            var options = {algorithm: 'RS512'};
            var body = helper.signStatement(data, options);

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(200)
                .end(function (err, res) {
                    done(err);
                });

        }); //end it good sig with "RS512"

/**  XAPI-00115, Data 2.5 Signed Statements
 * A Signed Statement MUST include a JSON web signature (JWS) as defined here: http://tools.ietf.org/html/rfc7515, as an Attachment with a usageType of http://adlnet.gov/expapi/attachments/signature and a contentType of application/octet-stream. The LRS must reject with 400 a statement which has usageType of http://adlnet.gov/expapi/attachments/signature and a contentType of application/octet-stream but does not have a signature attached.
 */
        it("LRS must reject with 400 a signed statement with malformed signature - bad contentType (Data 2.6.s4.b1, XAPI-00115)", function (done) {
            data.id = helper.generateUUID();
            var options = {attachmentInfo: {contentType: 'text/plain; charset=ascii'}};
            var body = helper.signStatement(data, options);

            var res = request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(400)
                .end(function (err, res) {
                    done(err);
                });
        });

/**  XAPI-00117, Data 2.6 Signed Statements
 * The JWS signature MUST use an algorithm of "RS256", "RS384", or "RS512". The LRS must reject with 400 a statement which does not use one of these algorithms or does not use one of these algorithms correctly.
 */
        it('The JWS signature MUST use an algorithm of "RS256", "RS384", or "RS512". (Data 2.6.s4.b4, XAPI-00117)', function (done) {
            data.id = helper.generateUUID();
            var options = {algorithm: 'HS256'};
            var body = helper.signStatement(data, options);

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(400)
                .end(function (err, res) {
                    done(err);
                });
        });

/**  XAPI-00116, Data 2.6 Signed Statements
 * The JWS signature MUST have a payload of a valid JSON serialization of the complete Statement before the signature was added.The LRS must reject with 400 a statement which does not have a valid JSON serialization.
 */
        it("The JWS signature MUST have a payload of a valid JSON serialization of the complete Statement before the signature was added. (Data 2.6.s4.b3, XAPI-00116)", function (done) {
            data.id = helper.generateUUID();
            var options = {breakJson: true};
            var body = helper.signStatement(data, options);

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(400)
                .end(function (err, res) {
                    done(err);
                });
        });

    }); //end describe statement signatures

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('joi'), require('./../helper'), require('./../multipartParser')));
