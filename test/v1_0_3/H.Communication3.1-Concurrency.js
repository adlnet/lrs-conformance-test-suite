/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (process, request, should, chai, isEmail, helper) {
    'use strict';

    var expect = chai.expect;

    var request = request(helper.getEndpoint());
    var oauth;
    if (global.OAUTH) {
        var OAuth = require('oauth');

        oauth = new OAuth.OAuth(
            "",
            "",
            global.OAUTH.consumer_key,
            global.OAUTH.consumer_secret,
            '1.0',
            null,
            'HMAC-SHA1'
        );
    }

describe('Concurrency Requirements (Communication 3.1)', () => {

/**  Matchup with Conformance Requirements Document
 * XAPI-00322 - below
 */

/**  XAPI-00322, Communication 3.1 Concurrency
 * An LRS must support HTTP/1.1 entity tags (ETags) to implement optimistic concurrency control when handling APIs where PUT may overwrite existing data (State, Agent Profile, and Activity Profile)
 */
    describe('An LRS must support HTTP/1.1 entity tags (ETags) to implement optimistic concurrency control when handling Resources where PUT may overwrite existing data (Agent Profile, and Activity Profile, Communication 3.1, XAPI-00322)', function () {

        it('When responding to a GET request to Agent Profile resource, include an ETag HTTP header in the response', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();

            var reqUrl = parameters ? (helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters)) : helper.getEndpointAgentsProfile();
            var headers = helper.addAllHeaders({'If-None-Match': '*'});
            var pre = request['put'](reqUrl);
            helper.extendRequestWithOauth(pre);
            pre.send(document);
            pre.set('If-None-Match', headers['If-None-Match']);
            pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);
            if (process.env.BASIC_AUTH_ENABLED === 'true') {
                pre.set('Authorization', headers['Authorization']);
            }
            //If we're doing oauth, set it up!
            try {
                if (global.OAUTH) {
                    pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
                }
            } catch (e) {
                console.log(e);
            }
            return pre.expect(204)
            .then(function (res) {
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                .then(function(res) {
                    expect(res.headers).to.have.property('etag');
                });
            });
        });

        it('When responding to a GET request to Activities Profile resource, include an ETag HTTP header in the response', function () {
            var parameters = helper.buildActivityProfile(),
                document = helper.buildDocument();

            var reqUrl = parameters ? (helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters)) : helper.getEndpointActivitiesProfile();
            var headers = helper.addAllHeaders({'If-None-Match': '*'});
            var pre = request['put'](reqUrl);
            helper.extendRequestWithOauth(pre);
            pre.send(document);
            pre.set('If-None-Match', headers['If-None-Match']);
            pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);
            if (process.env.BASIC_AUTH_ENABLED === 'true') {
                pre.set('Authorization', headers['Authorization']);
            }
            //If we're doing oauth, set it up!
            try {
                if (global.OAUTH) {
                    pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
                }
            } catch (e) {
                console.log(e);
            }
            return pre.expect(204)
            .then(function (res) {
                return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, undefined, 200)
                .then(function(res) {
                    expect(res.headers).to.have.property('etag');
                })
            });
        });

        it('When returning an ETag header, the value should be calculated as a SHA1 hexadecimal value', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();

            return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                .then(function (res) {
                    expect(res.headers.etag).to.be.ok;
                    expect(res.headers.etag).to.match(/\b[0-9a-fA-F]{40}\b/);
                });
            });
        });

        it('When responding to a GET Request the Etag header must be enclosed in quotes', function () {
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();

            return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, undefined, 200)
                .then(function (res) {
                    expect(res.headers.etag).to.be.ok;
                    var str = res.headers.etag;
                    //test for weak etags
                    if (str[0] !== '"') {
                        expect(str[0]).to.equal('W');
                        expect(str[1]).to.equal('/');
                        str = str.substring(2)
                    }
                    expect(str[0]).to.equal('"');
                    expect(str[41]).to.equal('"');
                });
            });
        });

        describe('With a valid etag', function () {
            var parameters, document;
            before('before', function() {
                parameters = helper.buildAgentProfile();
                document = helper.buildDocument();
                return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204);
            });

            it('When responding to a PUT request, must handle the If-Match header as described in RFC 2616, HTTP/1.1 if it contains an ETag', function () {
                document = helper.buildDocument();
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, null, 200)
                .then(function (res) {
                    var goodTag = res.headers.etag;

                    var document = helper.buildDocument();

                    var reqUrl = parameters ? (helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters)) : helper.getEndpointAgentsProfile();
                    var data = {'If-Match': goodTag};
                    var headers = helper.addAllHeaders(data);
                    var pre = request['put'](reqUrl);
                    helper.extendRequestWithOauth(pre);
                    pre.send(document);
                    pre.set('If-Match', headers['If-Match']);
                    pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);
                    if (process.env.BASIC_AUTH_ENABLED === 'true') {
                        pre.set('Authorization', headers['Authorization']);
                    }
                    //If we're doing oauth, set it up!
                    try {
                        if (global.OAUTH) {
                            pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    return pre.expect(204);
                });
            });
        });

        describe('When responding to a PUT request, handle the If-None-Match header as described in RFC 2616, HTTP/1.1 if it contains "*"', function () {
            var parameters = helper.buildActivityProfile();

            it('succeeds when no document exists', function () {
                var document = helper.buildDocument();

                var reqUrl = helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters);
                var data = {'If-None-Match': "*"};
                var headers = helper.addAllHeaders(data);
                var pre = request['put'](reqUrl);
                helper.extendRequestWithOauth(pre);
                pre.send(document);
                pre.set('If-None-Match', headers['If-None-Match']);
                pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);
                if (process.env.BASIC_AUTH_ENABLED === 'true') {
                    pre.set('Authorization', headers['Authorization']);
                }
                //If we're doing oauth, set it up!
                try {
                    if (global.OAUTH) {
                        pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
                    }
                } catch (e) {
                    console.log(e);
                }
                return pre.expect(204)
            });

            it('rejects if a document already exists', function () {
                var document2 = helper.buildDocument();

                var reqUrl = helper.getEndpointActivitiesProfile() + '?' + helper.getUrlEncoding(parameters);
                var data = {'If-None-Match': "*"};
                var headers = helper.addAllHeaders(data);
                var pre = request['put'](reqUrl);
                helper.extendRequestWithOauth(pre);
                pre.send(document2);
                pre.set('If-None-Match', headers['If-None-Match']);
                pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);
                if (process.env.BASIC_AUTH_ENABLED === 'true') {
                    pre.set('Authorization', headers['Authorization']);
                }
                //If we're doing oauth, set it up!
                try {
                    if (global.OAUTH) {
                        pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
                    }
                } catch (e) {
                    console.log(e);
                }
                return pre.expect(412);
            });
        });

        describe('If Header precondition in PUT Requests for RFC2616 fail', function () {
            var etag;
            var parameters = helper.buildAgentProfile(),
                document = helper.buildDocument();

            before('post the document and get the etag', function() {

                return helper.sendRequest('post', helper.getEndpointAgentsProfile(), parameters, document, 204)
                .then(function (res) {
                    return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, null, 200).then(function (res) {
                        etag = res.headers.etag;
                    });
                });
            });

            it('Return HTTP 412 (Precondition Failed)', function () {
                var badTag = '"1111111111111111111111111111111111111111"';
                var document2 = helper.buildDocument();

                var reqUrl = helper.getEndpointAgentsProfile() + '?' + helper.getUrlEncoding(parameters);
                var data = {'If-Match': badTag};
                var headers = helper.addAllHeaders(data);
                var pre = request['put'](reqUrl);

                helper.extendRequestWithOauth(pre);
                pre.send(document2);
                pre.set('If-Match', headers['If-Match']);
                pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);

                if (process.env.BASIC_AUTH_ENABLED === 'true') {
                    pre.set('Authorization', headers['Authorization']);
                }
                //If we're doing oauth, set it up!
                try {
                    if (global.OAUTH) {
                        pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
                    }
                } catch (e) {
                    console.log(e);
                }
                return pre.expect(412);
            });

            it('Do not modify the resource', function () {
                return helper.sendRequest('get', helper.getEndpointAgentsProfile(), parameters, null, 200).then(function (res) {
                    var result = res.body;
                    expect(result).to.eql(document);
                });
            });
        });

        describe('If put request is received without either header for a resource that already exists', function () {
            var etag;
            var parameters = helper.buildActivityProfile();
            var document = helper.buildDocument();
            var document2 = helper.buildDocument();

            before('post the document and get the etag', function () {
                return helper.sendRequest('post', helper.getEndpointActivitiesProfile(), parameters, document, 204)
                .then(function(res) {
                    return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, null, 200)
                    .then(function (res) {
                        etag = res.headers.etag;
                    });
                });
            });

            it('Return 409 conflict', function () {
                return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document2, 409);
            });

            it('Return error message explaining the situation', function () {
                return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document2, 409)
                .then(function (res) {
                    expect(res).to.have.property('text');
                    expect(res.text).to.have.length.above(0);
                });
            });

            it('Do not modify the resource', function () {
                return helper.sendRequest('put', helper.getEndpointActivitiesProfile(), parameters, document2, 409)
                .then(function (res) {
                    return helper.sendRequest('get', helper.getEndpointActivitiesProfile(), parameters, null, 200)
                    .then(function (res) {
                        var result = res.body;
                        expect(res.body).to.eql(document);
                    });
                });
            });
        });

    });

});

}(process, require('supertest-as-promised'), require('should'), require('chai'), require('isemail'), require('./../helper')));
