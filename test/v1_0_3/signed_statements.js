'use strict';

(function (module, fs, extend, moment, request, requestPromise, chai, Joi, helper, multipartParser) {
    "use strict";

    var expect = chai.expect;

//so starting here we are making a statement with asignature and sending it
    describe('LRS must validate and store statement signatures if they are provided (Data.md#2.6)', function () {

        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = createFromTemplate(templates);
        data = data.statement;


        it("Signed statement with \"RS256\" (Data.md#2.6.s4.b1)", function (done)
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

        /*it("LRS must reject with 400 a signed statement with malformed signature - bad usageType (Data.md#2.6.s4.b1)", function (done)
        {
            data.id = helper.generateUUID();
            var options = {attachmentInfo: {usageType: 'http://adlnet.gov/expapi/voided'}};
            var body = helper.signStatement(data, options);

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({'Content-Type': 'multipart/mixed; boundary='+options.boundary}))
                .body(body)
                .expect(400)
                .end(function (err, res) {
                    done(err);
                });
        });*/

        it("LRS must reject with 400 a signed statement with malformed signature - bad contentType (Data.md#2.6.s4.b1)", function (done) {
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

        it("LRS must reject with 400 a signed statement with malformed signature - bad algorithm (Data.md#2.6.s4.b4)", function (done) {
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

        it("LRS must reject with 400 a signed statement with malformed signature - bad JSON serialization of statement (Data.md#2.6.s4.b3)", function (done) {
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
/*
        it("LRS must reject with 400 a signed statement with  (xAPI-Data 2.6.a)", function (done) {
            data.id = helper.generateUUID();
            data.attachments[0].contentType = 'text/plain; charset=ascii';

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
console.log('Oops', err);
                        done(err);
                    } else {
console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
                        done();
                    }
                });
        });

        it("LRS must reject with 400 a signed statement with  (xAPI-Data 2.6.a)", function (done) {
            data.id = helper.generateUUID();
            data.attachments[0].contentType = 'text/plain; charset=ascii';

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
console.log('Oops', err);
                        done(err);
                    } else {
console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
                        done();
                    }
                });
        });

        it("LRS must reject with 400 a signed statement with  (xAPI-Data 2.6.a)", function (done) {
            data.id = helper.generateUUID();
            data.attachments[0].contentType = 'text/plain; charset=ascii';

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
console.log('Oops', err);
                        done(err);
                    } else {
console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
                        done();
                    }
                });
        });

        it("LRS must reject with 400 a signed statement with  (xAPI-Data 2.6.a)", function (done) {
            data.id = helper.generateUUID();
            data.attachments[0].contentType = 'text/plain; charset=ascii';

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(400)
                .end(function (err, res) {
                    if (err) {
console.log('Oops', err);
                        done(err);
                    } else {
console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
                        done();
                    }
                });
        });

    */
    }); //end describe statement signatures

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

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('joi'), require('./../helper'), require('./../multipartParser')));
