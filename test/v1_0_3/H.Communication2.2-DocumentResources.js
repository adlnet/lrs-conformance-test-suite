/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Document Resource Requirements (Communication 2.2)', function () {

/**  Macthup with Conformance Requirements Document
 * XAPI-00182 - below
 * XAPI-00183 - below
 * XAPI-00184 - below
 * XAPI-00185 - untestable
 * XAPI-00186 - untestable
 */

/**  XAPI-00182, Communication 2.2 Documents Resources
 * An LRS makes no modifications to stored data for any rejected request.
 */
    it ('An LRS makes no modifications to stored data for any rejected request (Multiple, including Communication 2.1.2.s2.b4, XAPI-00182)', function(done){
        this.timeout(0);
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var correct = helper.createFromTemplate(templates);
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
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?statementId=' + correct.id)
                .wait(helper.genDelay(stmtTime, '?statementId=' + correct.id, correct.id))
                .headers(helper.addAllHeaders({}))
                .expect(404, done);
            }
        });
    });

/**  XAPI-00184, Communication 2.2 Documents Resources
 * A Document Merge overwrites any duplicate values from the previous document with the new document.
 */
    it('A Document Merge overwrites any duplicate Objects from the previous document with the new document. (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3, XAPI-00184)', function () {
        var parameters = helper.buildState(),
            document = {
                car: 'MKX'
            },
            anotherDocument = {
                car: 'MKZ'
            };
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.eql({
                                    car: 'MKZ'
                                })
                            });
                    });
            });
    });

/**  XAPI-00183, Communication 2.2 Documents Resources
 * A Document Merge only performs overwrites at one level deep, although the entire object is replaced.
 */
    it('A Document Merge only performs overwrites at one level deep, although the entire object is replaced. (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3, XAPI-00183)', function () {
        var parameters = helper.buildState(),
            document = {
                car: {
                        make: "Ford",
                        model: "Escape"
                },
                driver: "Dale",
                series: {
                    nascar: {
                        series: "sprint"
                    }
                }
            },
            anotherDocument = {
                car: {
                        make: "Dodge",
                        model: "Ram"
                },
                driver: "Jeff",
                series: {
                    nascar: {
                        series: "nextel"
                    }
                }
            };
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.eql({
                                    car: {
                                            make: "Dodge",
                                            model: "Ram"
                                    },
                                    driver: "Jeff",
                                    series: {
                                        nascar: {
                                            series: "nextel"
                                        }
                                    }
                                })
                            });
                    });
            });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
