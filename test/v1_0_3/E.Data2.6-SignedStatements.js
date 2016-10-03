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

        it("LRS must reject with 400 a signed statement with malformed signature - bad contentType (Data 2.6.s4.b1)", function (done) {
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

        it("LRS must reject with 400 a signed statement with malformed signature - bad algorithm (Data 2.6.s4.b4)", function (done) {
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

        it("LRS must reject with 400 a signed statement with malformed signature - bad JSON serialization of statement (Data 2.6.s4.b3)", function (done) {
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
