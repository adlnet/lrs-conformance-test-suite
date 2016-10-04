/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Document Resource Requirements (Communication 2.2)', () => {

    it('An LRS has a State Resource with endpoint "base IRI"+"/activities/state" (Communication 2.2.s3.table1.row1)', function () {
        //Also covers An LRS will accept a POST request to the State Resource
        var parameters = helper.buildState(),
            document = helper.buildDocument();

        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

    it('An LRS will accept a POST request to the State Resource (Communication 2.2.s3.table1.row1.a)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
    });

    it('An LRS has an Activity Profile Resource with endpoint "base IRI"+"/activities/profile" (Communication 2.2.s3.table1.row2)', function () {
        //Also covers An LRS will accept a POST request to the Activity Profile Resource
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();

        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

    it('An LRS will accept a POST request to the Activity Profile Resource (Communication 2.2.s3.table1.row2.a)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
    });

    it('An LRS has an Agent Profile Resource with endpoint "base IRI"+"/agents/profile" (Communication 2.2.s3.table2.row3.a, Communication 2.2.table2.row3.c)', function () {
        //Also covers An LRS will accept a POST request to the Agent Profile Resource
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();

        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

    it('An LRS will accept a POST request to the Agent Profile Resource (Communication 2.2.s3.table1.row3.a)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
    });

    describe('An LRS cannot reject a POST request to the State Resource based on the contents of the name/value pairs of the document (Communication 2.2.s4.b2, Implicit) **Implicit**', function () {
        var documents = [helper.buildDocument(), '1', 'true'];
        documents.forEach(function (document) {
            it('Should accept POST to State with document ' + document, function () {
                var parameters = helper.buildState();
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204);
            });
        });
    });

    describe('An LRS cannot reject a POST request to the Activity Profile Resource based on the contents of the name/value pairs of the document (Communication 2.2.s4.b2, Implicit) **Implicit**', function () {
        var documents = [helper.buildDocument(), '1', 'true'];
        documents.forEach(function (document) {
            it('Should accept POST to Activity profile with document ' + document, function () {
                var parameters = helper.buildActivityProfile();
                return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204);
            });
        });
    });

    describe('An LRS cannot reject a POST request to the Agent Profile Resource based on the contents of the name/value pairs of the document (Communication 2.2.s4.b2, Implicit) **Implicit**', function () {
        var documents = [{}, '1', 'true'];
        documents.forEach(function (document) {
            it('Should accept POST to Agent profile with document ' + document, function () {
                var parameters = helper.buildAgentProfile();
                return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
            });
        });
    });

    it('An LRS\'s State Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (Communication 2.2.s7)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    });
            });
    });

    it('An LRS\'s Activity Profile Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (Communication 2.2.s7)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    })
            });
    });

    it('An LRS\'s Agent Profile Resource, upon receiving a POST request for a document not currently in the LRS, treats it as a PUT request and store a new document (Communication 2.2.s7)', function () {
        var parameters = helper.buildAgentProfile(),
            document = helper.buildDocument();
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                    .then(function (res) {
                        var body = res.body;
                        expect(body).to.eql(document);
                    })
            });
    });

    it('A Document Merge overwrites any duplicate Objects from the previous document with the new document. (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3)', function () {
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

    it('A Document Merge only performs overwrites at one level deep, although the entire object is replaced. (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3)', function () {
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

    it('An LRS\'s State Resource performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3)', function () {
        var parameters = helper.buildState(),
            document = {
                car: 'Honda'
            },
            anotherDocument = {
                type: 'Civic'
            };
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointActivitiesState(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.eql({
                                    car: 'Honda',
                                    type: 'Civic'
                                })
                            });
                    });
            });
    });

    it('An LRS\'s Activity Profile Resource performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3)', function () {
        var parameters = helper.buildActivityProfile(),
            document = {
                car: 'Honda'
            },
            anotherDocument = {
                type: 'Civic'
            };
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.eql({
                                    car: 'Honda',
                                    type: 'Civic'
                                })
                            });
                    });
            });
    });

    it('An LRS\'s Agent Profile Resource performs a Document Merge if a document is found and both it and the document in the POST request have type "application/json" (Communication 2.2.s7.b1, Communication 2.2.s7.b2, Communication 2.2.s7.b3)', function () {
        var parameters = helper.buildAgentProfile(),
            document = {
                car: 'Honda'
            },
            anotherDocument = {
                type: 'Civic'
            };
        return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, anotherDocument, 204)
                    .then(function () {
                        return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                            .then(function (res) {
                                var body = res.body;
                                expect(body).to.eql({
                                    car: 'Honda',
                                    type: 'Civic'
                                })
                            });
                    });
            });
    });

    it('An LRS\'s State Resource, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (Communication 2.2.s8.b1)', function () {
        var parameters = helper.buildState(),
            document = helper.buildDocument(),
            anotherDocument = 'abc';
        return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesState(), parameters, anotherDocument, 400);
            });
    });

    it('An LRS\'s Activity Profile Resource, rejects a POST request if the document is found and either document\'s type is not "application/json" with error code 400 Bad Request (Communication 2.2.s8.b1)', function () {
        var parameters = helper.buildActivityProfile(),
            document = helper.buildDocument(),
            anotherDocument = 'abc';
        return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, anotherDocument, 400);
            });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
