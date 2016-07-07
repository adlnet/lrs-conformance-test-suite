/* Testing if I can make a quick set of dummy tests to explore the possibility o fadding test profiles.  This is copied and pasted from the non_templating file. */

(function (module, fs, extend, moment, request, requestPromise, chai, Joi, helper, multipartParser) {
    "use strict";

    var expect = chai.expect;

//so starting here we are making a statement with asignature and sending it
    describe('Altoona A new set of tests which will now include statement signatures - Hip hip hooray!!! (Data.md#2.6)', function () {

        var templates = [
            {statement: '{{statements.default}}'},
            {attachments: [
                {"usageType": "http://example.com/attachment-usage/test",
                "display": {"en-US": "A test attachment"},
                "description": {"en-US": "A test attachment (description)"},
                "contentType": "text/plain; charset=ascii",
                "length": 27,
                "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                "fileUrl": "http://over.there.com/file.txt"}
            ]}
        ];
        var data = createFromTemplate(templates);
        data = data.statement;
        data.id = helper.generateUUID();

        var privateKey =  "-----BEGIN RSA PRIVATE KEY-----\nMIICXgIBAAKBgQCq480SFNQfy/HSkox2swxsan4w6zEXQGyMmSMyvxInEj26wuOY\nxj3N7E0GzX5qjKXS12ZjSi618XNgdFuJq4b68oyf5URiR1qrTa3EAK36hPsxtXnE\nO9fse0tcMI5gh5mVk378mTTOl5Kv7MLe9gBkjMveoqg3Tmu1It3Zmh8wZwIDAQAB\nAoGBAIHKOGNmPGHV9Nl4goRYorPpAeTHjGZbgNYcLPaK1g+ktAuXn2LWFfTDZxEm\nm7/zCLKk9Feu7OE0++sjFK7v/rh2D9gU+ocGljjp+uySZkpFovtrszs9mnT7iLMR\nNytenT/sZUsLA72PUP9MDryzMdW1dJi95PdstGJxugAy943hAkEA1uy4jpl6TDai\nITc7Z4IVnH/w2X8p4pkSQJtOtFm2RQlX7MIDNlNZJx4g2G8wc2juonoAIWnWjEnO\nMsKO4szGFwJBAMuMqEORZru0NgVXB2vkVYsZ6fZdcwZlavpaj2wI0miUEIb2dPLe\niNQhuGOL6wZTTIwpphUAp0hmfDOg79TuqjECQQCXiHmrWPzIRXDUWHvSw/32xKIM\nx0LB2EjtMlMwh1wimq7aaAQZxnRCR1TDJMoVZPNzrO7woA28BcGTOmfB8rzrAkEA\ngV83GyrxNuBFbYNxDhwkWrLvx0yB7VDMe67PdYTt5tYk4wMGNc9G/D0qaurlSDHt\ndzCJhNPTfurUiiQCCz5eIQJACZgrfK3pe8YzkmCWJMzFUgcX7O/8qU2aSuP+xkMI\nCvTe0zjWjU7wB5ftdvcQb6Pf7NCKwYJyMgwQHZttHmb4WQ==\n-----END RSA PRIVATE KEY-----";
        var publicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCq480SFNQfy/HSkox2swxsan4w\n6zEXQGyMmSMyvxInEj26wuOYxj3N7E0GzX5qjKXS12ZjSi618XNgdFuJq4b68oyf\n5URiR1qrTa3EAK36hPsxtXnEO9fse0tcMI5gh5mVk378mTTOl5Kv7MLe9gBkjMve\noqg3Tmu1It3Zmh8wZwIDAQAB\n-----END PUBLIC KEY-----";
        var jwt = require('jsonwebtoken');
        var FormData = require('form-data');
        var form = new FormData();
        var CRLF = "\r\n";
        var options = {
            header: CRLF + '--' + form.getBoundary() + CRLF + 'Content-Type:application/json' + CRLF + "Content-Disposition: form-data; name=\"statement\"" + CRLF + CRLF
        };
        var sigs = [];

        var token = jwt.sign(data, privateKey,
        {
            algorithm: 'RS256',
        //     NOTE: This does not work properly with the ADL LRS 'headers':
        //    {
        //        'x5c': [(new Buffer(publicKey)).toString('base64')]
        //    }
        });

        var hash = require("crypto").createHash('sha256')
            .update(token).digest();
        hash = hash.toString('hex');
        var hash384 = require("crypto").createHash('sha384')
            .update(token).digest();
        hash384 = hash384.toString('hex');
        var hash512 = require("crypto").createHash('sha512')
            .update(token).digest();
        hash512 = hash512.toString('hex');
        if (!data.attachments)
            data.attachments = [];
        var attachmentMetadata = {
            "usageType": "http://adlnet.gov/expapi/attachments/signature",
            "display":
            {
                "en-US": "A JWT signature"
            },
            "description":
            {
                "en-US": "Signing this document was posted from the xAPI Conformance Test Suite"
            },
            "contentType": "application/octet-stream",
            "length": Buffer.byteLength(token),
            "sha2": hash,
            "fileUrl": "http://adlnet.gov/this.file"
        }
        data.attachments.push(attachmentMetadata);

        sigs.push(
        {
            options:
            {
                header: CRLF + '--' + form.getBoundary() + CRLF + 'X-Experience-API-Hash:' + hash + CRLF + "Content-Type:application/octet-stream" + CRLF +  "Content-Transfer-Encoding: binary" + CRLF + CRLF
            },
            val: token
        })

        form.append('statement', JSON.stringify(data), options);
        form.append('signature', sigs[0].val, sigs[0].options);

console.log('Here we are:', data, '\nAnd then:', form, "token:", token, '\n256: ', hash, '\n384: ', hash384, '\n512: ', hash512, '\nattaching', data.attachments[0].sha2);

        it("Signed statement with \"RS256\" (Data.md#2.6.s4.b1)", function (done) {

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
console.log('send this', data);
                    if (err) {
console.log('Oops', err);
                        done(err);
                    } else {
console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
                        done();
                    }
                });

        }); //end it good sig with "RS256"

        it("Signed statement with \"RS384\" (Data.md#2.6.s4.b4)", function (done) {
            data.id = helper.generateUUID();
            data.attachments[0].contentType = 'text/plain; charset=ascii';
            data.attachments[0].sha2 = hash384;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
console.log('test2(384)', data.attachments);
                    if (err) {
console.log('Oops', err);
                        done(err);
                    } else {
console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
                        done();
                    }
                });

        }); //end it good sig with "RS384"

        it("Signed statement with \"RS512\" (Data.md#2.6.s4.b4)", function (done) {
            data.id = helper.generateUUID();
            data.attachments[0].contentType = 'text/plain; charset=ascii';
            data.attachments[0].sha2 = hash512;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200)
                .end(function (err, res) {
console.log('test3(512)', data.attachments);
                    if (err) {
console.log('Oops', err);
                        done(err);
                    } else {
console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
                        done();
                    }
                });
        });

//         it("LRS must reject with 400 a signed statement with malformed signature - bad usageType (Data.md#2.6.s5.b1)", function (done) {
//             data.id = helper.generateUUID();
//             data.attachments[0].contentType = 'text/plain; charset=ascii';
//
//             request(helper.getEndpointAndAuth())
//                 .post(helper.getEndpointStatements())
//                 .headers(helper.addAllHeaders({}))
//                 .json(data)
//                 .expect(400)
//                 .end(function (err, res) {
//                     if (err) {
// console.log('Oops', err);
//                         done(err);
//                     } else {
// console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
//                         done();
//                     }
//                 });
//         });
//
//         it("LRS must reject with 400 a signed statement with malformed signature - bad contentType (Data.md#2.6.s5.b1)", function (done) {
//             data.id = helper.generateUUID();
//             data.attachments[0].contentType = 'text/plain; charset=ascii';
//
//             request(helper.getEndpointAndAuth())
//                 .post(helper.getEndpointStatements())
//                 .headers(helper.addAllHeaders({}))
//                 .json(data)
//                 .expect(400)
//                 .end(function (err, res) {
//                     if (err) {
// console.log('Oops', err);
//                         done(err);
//                     } else {
// console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
//                         done();
//                     }
//                 });
//         });
//
//         it("LRS must reject with 400 a signed statement with malformed signature - bad algorithm (Data.md#2.6.s5.b1)", function (done) {
//             data.id = helper.generateUUID();
//             data.attachments[0].contentType = 'text/plain; charset=ascii';
//
//             request(helper.getEndpointAndAuth())
//                 .post(helper.getEndpointStatements())
//                 .headers(helper.addAllHeaders({}))
//                 .json(data)
//                 .expect(400)
//                 .end(function (err, res) {
//                     if (err) {
// console.log('Oops', err);
//                         done(err);
//                     } else {
// console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
//                         done();
//                     }
//                 });
//         });
//
//         it("LRS must reject with 400 a signed statement with malformed signature - bad JSON serialization of statement (Data.md#2.6.s5.b1)", function (done) {
//             data.id = helper.generateUUID();
//             data.attachments[0].contentType = 'text/plain; charset=ascii';
//
//             request(helper.getEndpointAndAuth())
//                 .post(helper.getEndpointStatements())
//                 .headers(helper.addAllHeaders({}))
//                 .json(data)
//                 .expect(400)
//                 .end(function (err, res) {
//                     if (err) {
// console.log('Oops', err);
//                         done(err);
//                     } else {
// console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
//                         done();
//                     }
//                 });
//         });
//
//         it("LRS must reject with 400 a signed statement with  (xAPI-Data 2.6.a)", function (done) {
//             data.id = helper.generateUUID();
//             data.attachments[0].contentType = 'text/plain; charset=ascii';
//
//             request(helper.getEndpointAndAuth())
//                 .post(helper.getEndpointStatements())
//                 .headers(helper.addAllHeaders({}))
//                 .json(data)
//                 .expect(400)
//                 .end(function (err, res) {
//                     if (err) {
// console.log('Oops', err);
//                         done(err);
//                     } else {
// console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
//                         done();
//                     }
//                 });
//         });
//
//         it("LRS must reject with 400 a signed statement with  (xAPI-Data 2.6.a)", function (done) {
//             data.id = helper.generateUUID();
//             data.attachments[0].contentType = 'text/plain; charset=ascii';
//
//             request(helper.getEndpointAndAuth())
//                 .post(helper.getEndpointStatements())
//                 .headers(helper.addAllHeaders({}))
//                 .json(data)
//                 .expect(400)
//                 .end(function (err, res) {
//                     if (err) {
// console.log('Oops', err);
//                         done(err);
//                     } else {
// console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
//                         done();
//                     }
//                 });
//         });
//
//         it("LRS must reject with 400 a signed statement with  (xAPI-Data 2.6.a)", function (done) {
//             data.id = helper.generateUUID();
//             data.attachments[0].contentType = 'text/plain; charset=ascii';
//
//             request(helper.getEndpointAndAuth())
//                 .post(helper.getEndpointStatements())
//                 .headers(helper.addAllHeaders({}))
//                 .json(data)
//                 .expect(400)
//                 .end(function (err, res) {
//                     if (err) {
// console.log('Oops', err);
//                         done(err);
//                     } else {
// console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
//                         done();
//                     }
//                 });
//         });
//
//         it("LRS must reject with 400 a signed statement with  (xAPI-Data 2.6.a)", function (done) {
//             data.id = helper.generateUUID();
//             data.attachments[0].contentType = 'text/plain; charset=ascii';
//
//             request(helper.getEndpointAndAuth())
//                 .post(helper.getEndpointStatements())
//                 .headers(helper.addAllHeaders({}))
//                 .json(data)
//                 .expect(400)
//                 .end(function (err, res) {
//                     if (err) {
// console.log('Oops', err);
//                         done(err);
//                     } else {
// console.log('Ta Da', res.headers, res.body, res.statusCode, res.statusMessage);
//                         done();
//                     }
//                 });
//         });

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
