/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * Created by vijay.budhram on 7/9/14.
 * Riptide Software
 */
(function () {
    "use strict";

    // Set the endpoint of the LRS you are testing.
    // For time being, it is assumed that the LRS endpoint does not require authentication.
    var LRS_ENDPOINT = 'http://asdf.elmnts-test.com:8001/lrs';

    var crypto = require('crypto');
    var request = require('request');
    var should = require('should');
    var q = require('q');
    var uuid = require('node-uuid');
    var statementNoActor = require('../test/data/statement_no_actor.json');
    var statementNoVerb = require('../test/data/statement_no_verb.json');
    var statementNoObject = require('../test/data/statement_no_object.json');
    var statementNoId = require('../test/data/statement_no_id.json');
    var statmentEmptyActor = require('../test/data/statement_empty_actor.json');
    var statmentEmptyVerb = require('../test/data/statement_empty_verb.json');
    var statmentEmptyObject = require('../test/data/statement_empty_object.json');

    // Generates an RFC4122 compliant uuid
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    function generateUUID() {
        return uuid.v4();
    };

    // Helper function to clone object
    function clone(item) {
        return JSON.parse(JSON.stringify(item));
    }

    /**
     * Generates a SHA1 hash enclosed within quotes.
     *
     * @param content
     * @returns {string}
     */
    function getSHA1Sum(content) {
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }

        var shasum = crypto.createHash('sha1');
        shasum.update(new Buffer(content));
        return shasum.digest('hex');
    }

    describe('Statement Requirements', function () {
        it('A Statement uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "actor" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "verb" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "object" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "result" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "context" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "timestamp" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "stored" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "authority" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "version" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement uses the "attachment" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement contains an "actor" property (Multiplicity, 4.1.b)', function (done) {
            var data = clone(statementNoActor);
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(400);
                done();
            });
        });

        it('A Statement contains a "verb" property (Multiplicity, 4.1.b)', function (done) {
            var data = clone(statementNoVerb);
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(400);
                done();
            });
        });

        it('A Statement contains an "object" property (Multiplicity, 4.1.b)', function (done) {
            var data = clone(statementNoObject);
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(400);
                done();
            });
        });

        it('An "id" property is a String (Type, 4.1.1.description.a)', function (done) {
            var data = clone(statementNoId);

            // Generate random number from 1-10000 as id
            data[0].id = Math.floor((Math.random() * 10000) + 1);
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(400);
                done();
            });
        });

        it('An "id" property is a UUID following RFC 4122(Syntax, RFC 4122 )', function (done) {
            var data = clone(statementNoId);

            data[0].id = generateUUID();
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(200);
                (err === null).should.be.true;
                done();
            });
        });

        it('An "actor" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "objectType" property is a String (Type, 4.1.2.1.table1.row1.a)', function (done) {
            var data = clone(statementNoId);

            data[0].actor.objectType = 123;
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.be.equal(400);
                done();
            });
        });

        it('An "actor" propertys "objectType" property is either "Agent" or "Group" (Vocabulary, 4.1.2.1.table1.row1.b, 4.1.2.1.table1.row1.b)', function (done) {
            var data = clone(statementNoId);

            data[0].actor.objectType = 'FooBar';
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.equal(400);
            });

            data = clone(statementNoId);

            data[0].actor.objectType = 'Agent';
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.equal(200);
            });

            data = clone(statementNoId);

            data[0].actor.objectType = 'Group';
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });

        });

        it('An Agent is defined by "objectType" of an "actor" or "object" with value "Agent" (4.1.2.1.table1.row1)', function (done) {
            var data = clone(statementNoId);

            data[0].actor.objectType = 'Agent';
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.equal(200);
            });

            var data = clone(statementNoId);

            data[0].object.objectType = 'Agent';
            data[0].object.mbox = 'mailto:asdf@asdf.com';
            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            request(options, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An Agent uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "name" property is a String (Type, 4.1.2.1.table1.row2.a)', function (done) {
            var data = clone(statementNoId);

            data[0].actor.objectType = 'Agent';
            data[0].actor.name = 123;

            var options = {
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            };

            // Test non string
            request(options, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        describe('An "actor" property with "objectType" as "Agent" uses one of the following properties: "mbox", "mbox_sha1sum", "openid", "account" (Multiplicity, 4.1.2.1.a)', function () {
            it('An "actor" property with "objectType" as "Agent" uses one of the following properties: "mbox" (Multiplicity, 4.1.2.1.a)', function (done) {
                var dataMbox = clone(statmentEmptyActor);
                dataMbox[0].actor.objectType = 'Agent';
                dataMbox[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: dataMbox
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });

            it('An "actor" property with "objectType" as "Agent" uses one of the following properties: "mbox_sha1sum" (Multiplicity, 4.1.2.1.a)', function (done) {
                var dataMbox = clone(statmentEmptyActor);
                dataMbox[0].actor.objectType = 'Agent';
                dataMbox[0].actor['mbox_sha1sum'] = '1234231412342312342423';
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: dataMbox
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });

            it('An "actor" property with "objectType" as "Agent" uses one of the following properties: "openid" (Multiplicity, 4.1.2.1.a)', function (done) {
                var dataMbox = clone(statmentEmptyActor);
                dataMbox[0].actor.objectType = 'Agent';
                dataMbox[0].actor['openid'] = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: dataMbox
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });

            it('An "actor" property with "objectType" as "Agent" uses one of the following properties: "account" (Multiplicity, 4.1.2.1.a)', function (done) {
                var dataMbox = clone(statmentEmptyActor);
                dataMbox[0].actor.objectType = 'Agent';
                dataMbox[0].actor['account'] = {
                    "homePage": "http://www.example.com",
                    "name": "1625378"
                };

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: dataMbox
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });
        });

        it('An Agent uses the "mbox" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        describe('An Agent does not use the "mbox" property if "mbox_sha1sum", "openid", or "account" are used (Multiplicity, 4.1.2.1.b)', function () {
            it('An Agent does not use the "mbox" property if "mbox_sha1sum" (Multiplicity, 4.1.2.1.b)', function (done) {
                var data = clone(statmentEmptyActor);
                data[0].actor.objectType = 'Agent';
                data[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
                data[0].actor['mbox_sha1sum'] = '1234231412342312342423';
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: data
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('An Agent does not use the "mbox" property if "openid" (Multiplicity, 4.1.2.1.b)', function (done) {
                var data = clone(statmentEmptyActor);
                data[0].actor.objectType = 'Agent';
                data[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
                data[0].actor['openid'] = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: data
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('An Agent does not use the "mbox" property if "account" (Multiplicity, 4.1.2.1.b)', function (done) {
                var data = clone(statmentEmptyActor);
                data[0].actor.objectType = 'Agent';
                data[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
                data[0].actor['account'] = {
                    "homePage": "http://www.example.com",
                    "name": "1625378"
                };
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: data
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });
        });

        it('An Agent uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        describe('An Agent does not use the "mbox_sha1sum" property if "mbox", "openid", or "account" are used (Multiplicity, 4.1.2.1.b)', function () {
            it('An Agent does not use the "mbox_sha1sum" property if "mbox" (Multiplicity, 4.1.2.1.b)', function (done) {
                var data = clone(statmentEmptyActor);
                data[0].actor.objectType = 'Agent';
                data[0].actor['mbox_sha1sum'] = '1234231412342312342423';
                data[0].actor['mbox'] = 'mailto:asdf@asdf.com';
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: data
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('An Agent does not use the "mbox_sha1sum" property if "openid" (Multiplicity, 4.1.2.1.b)', function (done) {
                var data = clone(statmentEmptyActor);
                data[0].actor.objectType = 'Agent';
                data[0].actor['mbox_sha1sum'] = '12342341242134214';
                data[0].actor['openid'] = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: data
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('An Agent does not use the "mbox_sha1sum" property if "account" (Multiplicity, 4.1.2.1.b)', function (done) {
                var data = clone(statmentEmptyActor);
                data[0].actor.objectType = 'Agent';
                data[0].actor['mbox_sha1sum'] = '1234123423422';
                data[0].actor['account'] = {
                    "homePage": "http://www.example.com",
                    "name": "1625378"
                };
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: data
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });
        });

        it('An Agent uses the "openid" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        describe('An Agent does not use the "account" property if "mbox", "mbox_sha1sum", or "openid" are used (Multiplicity, 4.1.2.1.b)', function () {
            if ('An Agent does not use the "account" property if "mbox" (Multiplicity, 4.1.2.1.b)', function (done) {
                    var data = clone(statmentEmptyActor);
                    data[0].actor.objectType = 'Agent';
                    data[0].actor['account'] = {
                        "homePage": "http://www.example.com",
                        "name": "1625378"
                    };
                    data[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: data
                    }, function (err, res, body) {
                        res.statusCode.should.equal(400);
                        done();
                    });
                });

            if ('An Agent does not use the "account" property if "mbox_sha1sum" (Multiplicity, 4.1.2.1.b)', function (done) {
                    var data = clone(statmentEmptyActor);
                    data[0].actor.objectType = 'Agent';
                    data[0].actor['account'] = {
                        "homePage": "http://www.example.com",
                        "name": "1625378"
                    };
                    data[0].actor['mbox_sha1sum'] = '123423412342342134';

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: data
                    }, function (err, res, body) {
                        res.statusCode.should.equal(400);
                        done();
                    });
                });

            if ('An Agent does not use the "account" property if "openid" (Multiplicity, 4.1.2.1.b)', function (done) {
                    var data = clone(statmentEmptyActor);
                    data[0].actor.objectType = 'Agent';
                    data[0].actor['account'] = {
                        "homePage": "http://www.example.com",
                        "name": "1625378"
                    };
                    data[0].actor['openid'] = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: data
                    }, function (err, res, body) {
                        res.statusCode.should.equal(400);
                        done();
                    });
                });
        });

        it('An Agent uses the "account" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        describe('An Agent does not use the "openid" property if "mbox", "mbox_sha1sum", or "account" are used (Multiplicity, 4.1.2.1.b)', function () {
            it('An Agent does not use the "openid" property if mbox are used (Multiplicity, 4.1.2.1.b)', function (done) {
                var data = clone(statmentEmptyActor);
                data[0].actor.objectType = 'Agent';
                data[0].actor.openid = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';
                data[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: data
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('An Agent does not use the "openid" property if mbox_sha1sum are used (Multiplicity, 4.1.2.1.b)', function (done) {
                var data = clone(statmentEmptyActor);
                data[0].actor.objectType = 'Agent';
                data[0].actor.openid = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';
                data[0].actor['mbox_sha1sum'] = 'mailto:xapi@adlnet.gov';
                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: data
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('An Agent does not use the "openid" property if account are used (Multiplicity, 4.1.2.1.b)', function (done) {
                var data = clone(statmentEmptyActor);
                data[0].actor.objectType = 'Agent';
                data[0].actor.openid = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';
                data[0].actor.account = {
                    "homePage": "http://cloud.scorm.com/",
                    "name": "group"
                };

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: data
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });
        });

        it('A Group is defined by "objectType" of an "actor" or "object" with value "Group" (4.1.2.2.table1.row2)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor.objectType = 'Group';
            data[0].actor.account = {
                "homePage": "http://cloud.scorm.com/",
                "name": "group"
            };
            data[0].actor['mbox'] = 'mailto:xapi@adlnet.gov';
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('A Group uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Group uses the "member" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Anonymous Group is defined by "objectType" of an "actor" or "object" with value "Group" and by none of "mbox", "mbox_sha1sum", "openid", or "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table1)', function (done) {
            // TODO Expand test cases to cover all combinations
            var data = clone(statmentEmptyActor);
            data[0].actor = {
                objectType: 'Group',
                "mbox":"mailto:bob@example.com"
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An Anonymous Group uses the "member" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Anonymous Group uses the "member" property (Multiplicity, 4.1.2.2.table1.row3.b)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor = {
                objectType: 'Group',
                "mbox":"mailto:bob@example.com"
            };

            data[0].actor.member = [
                {
                    "objectType": "Agent",
                    "mbox": "mailto:test@example.com"
                }
            ];
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('The "member" property is an array of Objects following Agent requirements (4.1.2.2.table1.row3.a)', function (done) {
            var data = clone(statmentEmptyActor);
            data[0].actor.objectType = 'Group';

            data[0].actor.member = {
                "mbox": "mailto:test@example.com"
            };
            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: data
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        describe('An Identified Group is defined by "objectType" of an "actor" or "object" with value "Group" and by one of "mbox", "mbox_sha1sum", "openid", or "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function () {
            describe('An Identified Group is defined by "objectType" of an "actor"', function () {
                it('An Identified Group is defined by "objectType" of an "actor" and "mbox" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function (done) {
                    var item = clone(statmentEmptyActor);
                    item[0].actor.objectType = 'Group';
                    item[0].actor['mbox'] = 'mailto:test@example.com';

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: item
                    }, function (err, res, body) {
                        res.statusCode.should.equal(200);
                        done();
                    });
                });

                it('An Identified Group is defined by "objectType" of an "actor" and by "mbox_sha1sum" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function (done) {
                    var item = clone(statmentEmptyActor);
                    item[0].actor.objectType = 'Group';
                    item[0].actor['mbox_sha1sum'] = '41341341241242';

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: item
                    }, function (err, res, body) {
                        res.statusCode.should.equal(200);
                        done();
                    });
                });

                it('An Identified Group is defined by "objectType" of an "actor" and by "openid" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function (done) {
                    var item = clone(statmentEmptyActor);
                    item[0].actor.objectType = 'Group';
                    item[0].actor['openid'] = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: item
                    }, function (err, res, body) {
                        res.statusCode.should.equal(200);
                        done();
                    });
                });

                it('An Identified Group is defined by "objectType" of an "actor" and by "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function (done) {
                    var item = clone(statmentEmptyActor);
                    item[0].actor.objectType = 'Group';
                    item[0].actor.account = {
                        "homePage": "http://www.example.com",
                        "name": "1625378"
                    };

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: item
                    }, function (err, res, body) {
                        res.statusCode.should.equal(200);
                        done();
                    });
                });
            });

            describe('An Identified Group is defined by "objectType" of an "object" with value "Group"', function () {
                it('An Identified Group is defined by "object" with value "Group" and "mbox" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function (done) {
                    var item = clone(statmentEmptyObject);
                    item[0].object.objectType = 'Group';
                    item[0].object['mbox'] = 'mailto:test@example.com';

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: item
                    }, function (err, res, body) {
                        res.statusCode.should.equal(200);
                        done();
                    });
                });

                it('An Identified Group is defined by "object" with value "Group" and "mbox_sha1sum" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function (done) {
                    var item = clone(statmentEmptyObject);
                    item[0].object.objectType = 'Group';
                    item[0].object['mbox_sha1sum'] = '41341341241242';

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: item
                    }, function (err, res, body) {
                        res.statusCode.should.equal(200);
                        done();
                    });
                });

                it('An Identified Group is defined by "object" with value "Group" and "openid" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function (done) {
                    var item = clone(statmentEmptyObject);
                    item[0].object.objectType = 'Group';
                    item[0].object['openid'] = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: item
                    }, function (err, res, body) {
                        res.statusCode.should.equal(200);
                        done();
                    });
                });

                it('An Identified Group is defined by "object" with value "Group" and "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function (done) {
                    var item = clone(statmentEmptyObject);
                    item[0].object.objectType = 'Group';
                    item[0].object.account = {
                        "homePage": "http://www.example.com",
                        "name": "1625378"
                    };

                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: item
                    }, function (err, res, body) {
                        res.statusCode.should.equal(200);
                        done();
                    });
                });
            });

        });

        it('An Identified Group uses one of the following properties: "mbox", "mbox_sha1sum", "openid", "account" (Multiplicity, 4.1.2.1.a)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox'] = 'mailto:test@example.com';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An Identified Group uses the "mbox" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group does not use the "mbox" property if "mbox_sha1sum", "openid", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox'] = 'mailto:test@example.com';
            item[0].actor['openid'] = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Identified Group uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group does not use the "mbox_sha1sum" property if "mbox", "openid", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox_sha1sum'] = '1234231412342312342423';
            item[0].actor['mbox'] = 'mailto:test@example.com';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Identified Group uses the "openid" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group does not use the "openid" property if "mbox", "mbox_sha1sum", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['openid'] = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';
            item[0].actor['mbox'] = 'mailto:test@example.com';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Identified Group uses the "account" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group does not use the "account" property if "mbox", "mbox_sha1sum", or "openid" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor.account = {
                "homePage": "http://www.example.com",
                "name": "1625378"
            };
            item[0].actor['openid'] = 'http://example.org/absolute/URI/with/absolute/path/to/resource.txt';
            item[0].actor['mbox'] = 'mailto:test@example.com';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "mbox" property is an IRI (Type, 4.1.2.3.table1.row1.a)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox'] = 'mailto:asdf@adsf.com';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An "mbox" property has the form "mailto:email address" (Syntax, 4.1.2.3.table1.row1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox'] = 'asdfasdf@ssss';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "mbox_sha1sum" property is it a String (Type, 4.1.2.3.table1.row2.a)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['mbox_sha1sum'] = 12312312312;

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "openid" property is a URI (Type, 4.1.2.3.table1.row3.a)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor['openid'] = 12312312312;

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "account" property uses the "homePage" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "account" property uses the "homePage" property (Multiplicity, 4.1.2.4.table1.row1.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor.account = {
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "account" propertys homePage" property is an IRL (Type, 4.1.2.4.table1.row1.a)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor.account = {
                homePage: "asdfasdfdsafsdfa",
                name: "asdfasdfs"
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An "account" property uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "account" property uses the "name" property (Multiplicity, 4.1.2.4.table1.row2.b)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor.account = {
                "name": 'asdf',
                "homePage": 'http://www.example.com'
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An "account" propertys "name" property is a String (Type, 4.1.2.4.table1.row1.a)', function (done) {
            var item = clone(statmentEmptyActor);
            item[0].actor.objectType = 'Group';
            item[0].actor.account = {
                "homePage": "http://www.example.com",
                "name": 234123213423
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('A "verb" property uses the "id" property at most one time (Multiplicity, 4.1.3.table1.row1.aultiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "verb" property contains an "id" property (Multiplicity, 4.1.3.table1.row1.b)', function (done) {
            var item = clone(statmentEmptyVerb);

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        describe('A "verb" propertys "id" property is an IRI (Type, 4.1.3.table1.row1.a)', function () {
            it('should validate verb with IRI', function (done) {
                var item = clone(statmentEmptyVerb);
                item[0].verb = {
                    "id": "http://adlnet.gov/expapi/verbs/created",
                    "display": {
                        "en-US": "created"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });

            it('should reject verb with IRI', function (done) {
                var item = clone(statmentEmptyVerb);
                item[0].verb = {
                    "id": 13123123131,
                    "display": {
                        "en-US": "created"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

        });

        it('A "verb" property uses the "display" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "verb" propertys "display" property is a Language Map (Type, 4.1.3.table1.row2.a)', function (done) {
            var item = clone(statmentEmptyVerb);
            item[0].verb.id = 'http://adlnet.gov/expapi/verbs/created';
            item[0].verb.display = {
                "en-US": "created"
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        describe('A Language Map is defined as a list of language tag/String pairs has at least 1 entry Implicit', function () {
            it('should reject invalid language map', function (done) {
                var item = clone(statmentEmptyVerb);
                item[0].verb.id = 'http://adlnet.gov/expapi/verbs/created';
                item[0].verb.display = {
                    "2345": 2345
                };

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should accept valid language map', function (done) {
                var item = clone(statmentEmptyVerb);
                item[0].verb.id = 'http://adlnet.gov/expapi/verbs/created';
                item[0].verb.display = {
                    "2345": 2345
                };

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });


        });

        it('A Language Map follows RFC5646 (Format, 5.2.a, RFC5646)', function (done) {
            var item = clone(statmentEmptyVerb);
            item[0].verb.id = 'http://adlnet.gov/expapi/verbs/created';
            item[0].verb.display = {
                "sdfg": {
                    "asdf": 23
                }
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('A "display" property uses a Language Map (Format, 4.1.3.table1.row1.a)', function (done) {
            var item = clone(statmentEmptyVerb);
            item[0].verb.id = 'http://adlnet.gov/expapi/verbs/created';
            item[0].verb.display = {
                "en-US": "created"
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An "object" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "object" property uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "object" property uses the "definition" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "object" property contains an "id" property (Multiplicity, 4.1.4.1.table1.row2.b)', function (done) {
            var item = clone(statmentEmptyObject);

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        describe('An "object" propertys "id" property is an IRI (Type, 4.1.4.1.table1.row2.a)', function () {
            it('should validate object property with valid IRI', function (done) {
                var item = clone(statmentEmptyObject);
                item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });

            it('should reject object property with invalid IRI', function (done) {
                var item = clone(statmentEmptyObject);
                item[0].object.id = 'asdfasdfasfdaf';

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

        });

        describe('An "object" propertys "objectType" property is either "Activity", "Agent", "Group", "SubStatement", or"StatementRef" (Vocabulary, 4.1.4.b)', function () {
            it('should reject invalid objectType', function (done) {
                var item = clone(statmentEmptyObject);
                item[0].object =
                    request({
                        url: LRS_ENDPOINT + '/statements',
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        },
                        json: item
                    }, function (err, res, body) {
                        res.statusCode.should.equal(400);
                        done();
                    });
            });

            it('should accept objectType Activity', function (done) {
                var item = clone(statmentEmptyObject);
                item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';
                item[0].object.objectType = 'Activity';

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });

            it('should accept objectType Agent', function (done) {
                var item = clone(statmentEmptyObject);
                item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';
                item[0].object.objectType = 'Agent';
                item[0].object.mbox = 'mailto:asdf@asdf.com';

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });

            it('should accept objectType Group', function (done) {
                var item = clone(statmentEmptyObject);
                item[0].object = {
                    "name": "Example Group",
                    "account": {
                        "homePage": "http://example.com/homePage",
                        "name": "GroupAccount"
                    },
                    "objectType": "Group",
                    "member": [
                        {
                            "name": "Andrew Downes",
                            "mbox": "mailto:andrew@example.com",
                            "objectType": "Agent"
                        },
                        {
                            "name": "Aaron Silvers",
                            "openid": "http://aaron.openid.example.org",
                            "objectType": "Agent"
                        }
                    ]
                };

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });

            it('should accept objectType SubStatement', function (done) {
                var item = clone(statmentEmptyObject);

                item[0].object = {
                    "objectType": "SubStatement",
                    "actor": {
                        "objectType": "Agent",
                        "mbox": "mailto:agent@example.com"
                    },
                    "verb": {
                        "id": "http://example.com/confirmed",
                        "display": {
                            "en": "confirmed"
                        }
                    },
                    "object": {
                        "objectType": "StatementRef",
                        "id": "9e13cefd-53d3-4eac-b5ed-2cf6693903bb"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });

            it('should accept objectType StatementRef', function (done) {
                var item = clone(statmentEmptyObject);
                item[0].object.id = generateUUID();
                item[0].object.objectType = 'StatementRef';

                request({
                    url: LRS_ENDPOINT + '/statements',
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    },
                    json: item
                }, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });
        });

        it('An Activity is defined by the "objectType" of an "object" with value "Activity" (4.1.4.1.table1.row1.b)', function (done) {
            var item = clone(statmentEmptyObject);
            item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';
            item[0].object.objectType = 'Activity';

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An Activity uses the "definition" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activitys "definition" property is an Object (Type, 4.1.4.1.table1.row3.a)', function (done) {
            var item = clone(statmentEmptyObject);
            item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';
            item[0].object.objectType = 'Activity';
            item[0].object.definition = 123123;

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(400);
                done();
            });
        });

        it('An Activity Object is the contents of a "definition" property object of an Activity (Format, 4.1.4.1.table2)', function (done) {
            var item = clone(statmentEmptyObject);
            item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';
            item[0].object.objectType = 'Activity';
            item[0].object.definition = {
                "description": {
                    "en-US": "Does the xAPI include the concept of statements?"
                },
                "type": "http://adlnet.gov/expapi/activities/cmi.interaction",
                "interactionType": "true-false",
                "correctResponsesPattern": [
                    "true"
                ]
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('An Activity Object contains at least one of the following properties: Implicit(Format, 4.1.4.1.table2)', function (done) {
            var item = clone(statmentEmptyObject);
            item[0].object.id = 'http://example.adlnet.gov/xapi/example/activity';
            item[0].object.objectType = 'Activity';
            item[0].object.definition = {
            };

            request({
                url: LRS_ENDPOINT + '/statements',
                method: 'POST',
                headers: {
                    'X-Experience-API-Version': '1.0.1'
                },
                json: item
            }, function (err, res, body) {
                res.statusCode.should.equal(200);
                done();
            });
        });
    });

    describe('Document API Requirements', function () {
        describe('State Document API Test', function () {
            it('should GET and include ETag (7.4) (7.4.b) (multiplicity, 7.4.table1.row3.b, 7.4.table2.row3.b) (multiplicity, 7.4.table1.row1.b)', function(done){
                var parameters = {
                    activityId: "http://www.example.com/activityId/hashset",
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };
                var document = {
                    "y" : "car",
                    "z" : "van"
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters,
                        method: 'GET',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        }
                    }, function (err, res, body) {
                        var etag = res.headers['etag'];
                        etag.should.be.ok;
                        etag.should.eql(getSHA1Sum(document));

                        var responseBody = JSON.parse(body);
                        responseBody.y.should.equal(document.y);
                        responseBody.z.should.equal(document.z);
                        done();
                    });
                });
            });

            it('should fail GET when missing activityId (multiplicity, 7.4.table1.row1.b)', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET when activityId is not type of string (format, 7.4.table1.row1.a)', function(done){
                var parameters = {
                    activityId: {
                        "objectType": "object"
                    },
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET when missing agent (multiplicity, 7.4.table1.row2.b)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET when agent is not type of JSON (format, 7.4.table1.row2.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: "fail",
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET when stateId is not type of String (format, 7.4.table1.row1.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET when registration is not type of UUID (format, 7.4.table1.row3.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277b57b4c158d91d292c5b2b8f7----",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET all when since is not type of Timestamp (format, 7.4.table2.row4.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    since: "should fail"
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when missing stateId', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7"
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when missing activityId (multiplicity, 7.4.table1.row1.b)', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when activityId is not type of string (format, 7.4.table1.row1.a)', function(done){
                var parameters = {
                    activityId: {
                        "objectType": "object"
                    },
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when missing agent (multiplicity, 7.4.table1.row2.b)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when agent is not type of JSON (format, 7.4.table1.row2.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: "fail",
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when stateId is not type of String (format, 7.4.table1.row1.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when registration is not type of UUID (format, 7.4.table1.row3.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277b57b4c158d91d292c5b2b8f7----",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when missing stateId', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7"
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when missing activityId (multiplicity, 7.4.table1.row1.b)', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when activityId is not type of string (format, 7.4.table1.row1.a)', function(done){
                var parameters = {
                    activityId: {
                        "objectType": "object"
                    },
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when missing agent (multiplicity, 7.4.table1.row2.b)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when agent is not type of JSON (format, 7.4.table1.row2.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: "fail",
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when stateId is not type of String (format, 7.4.table1.row1.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when registration is not type of UUID (format, 7.4.table1.row3.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277b57b4c158d91d292c5b2b8f7----",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when missing activityId (multiplicity, 7.4.table1.row1.b)', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when activityId is not type of string (format, 7.4.table1.row1.a)', function(done){
                var parameters = {
                    activityId: {
                        "objectType": "object"
                    },
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when missing agent (multiplicity, 7.4.table1.row2.b)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when agent is not type of JSON (format, 7.4.table1.row2.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: "fail",
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when stateId is not type of String (format, 7.4.table1.row1.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    stateId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when registration is not type of UUID (format, 7.4.table1.row3.a)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    registration: "ec531277b57b4c158d91d292c5b2b8f7----",
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should store a new document and return status code 204 (7.3.f, 7.4, 7.4.a)', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'fd41c918-b88b-4b20-a0a5-a4c32391aaa1',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);
                    done();
                });
            });

            it('should retrieve by registration (multiplicity, 7.4.table1.row3.b)', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };
                var parameters2 = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f8',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters2,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString()
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/activities/state',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            responseBody.y.should.equal(document.y);
                            responseBody.z.should.equal(document.z);
                            done();
                        });
                    });
                });
            });

            it('should retrieve on GET stateId (multiplicity, 7.4.table1.row3.b, 7.4.table2.row3.b) (multiplicity, 7.4.table1.row1.b)', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters,
                        method: 'GET',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        }
                    }, function (err, res, body) {
                        var responseBody = JSON.parse(body);
                        responseBody.y.should.equal(document.y);
                        responseBody.z.should.equal(document.z);
                        done();
                    });
                });
            });

            it('should merge document when type is JSON (7.3, 7.3.d)', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters,
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString()
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/activities/state',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            responseBody.x.should.equal(document2.x);
                            responseBody.y.should.equal(document2.y);
                            responseBody.z.should.equal(document.z);
                            done();
                        });
                    });
                });
            });

            it('should replace a document on PUT for non-JSON (7.3.d)', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString()
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/activities/state',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            responseBody.x.should.equal(document2.x);
                            responseBody.y.should.equal(document2.y);
                            done();
                        });
                    });
                });
            });

            it('should fail on POST when non-JSON (7.3.e)', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = "not JSON";

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters,
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString(),
                            'content-type': 'text/plain'
                        },
                        body: new Buffer(document2, 'utf-8')
                    }, function (err, res, body) {
                        res.statusCode.should.equal(400);
                        done();
                    });
                });
            });

            it('should GET all (Array) when missing stateId (7.4.b)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    registration: "ec531277-b57b-4c15-8d91-d292c5b2b8f7",
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    body.should.be.type('string');
                    var array = JSON.parse(body);
                    array.should.be.an.instanceOf(Array);
                    done();
                });
            });

            it('should GET all (Array) using since (7.4.c) (7.4.table2.row4) (multiplicity, 7.4.table2.row4.b, 7.4.table2.row3.b)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                var parameters2 = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters2,
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date(2000, 0, 1)).toISOString()
                        },
                        json: document
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        var search = {
                            activityId: 'http://www.example.com/activityId/hashset',
                            agent: {
                                objectType: 'Agent',
                                account: {
                                    homePage: 'http://www.example.com/agentId/1',
                                    name: 'Rick James'
                                }
                            },
                            since: (new Date(2010, 0, 1)).toISOString()
                        };
                        request({
                            url: LRS_ENDPOINT + '/activities/state',
                            qs: search,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            body.should.be.type('string');
                            var array = JSON.parse(body);
                            array.should.be.an.instanceOf(Array);

                            var found = false;
                            for (var i = 0; i < array.length; i++) {
                                array[i].should.not.eql(parameters2.stateId);
                                if (array[i] === parameters.stateId) {
                                    found = true;
                                }
                            }
                            found.should.be.true;
                            done();
                        });
                    });
                });
            });

            it('should GET all (Array) restricted to registration using since', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                var parameters2 = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f8',
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters2,
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString()
                        },
                        json: document
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);


                        var search = {
                            activityId: 'http://www.example.com/activityId/hashset',
                            agent: {
                                objectType: 'Agent',
                                account: {
                                    homePage: 'http://www.example.com/agentId/1',
                                    name: 'Rick James'
                                }
                            },
                            registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                            since: (new Date(2010, 0, 1)).toISOString()
                        };
                        request({
                            url: LRS_ENDPOINT + '/activities/state',
                            qs: search,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            body.should.be.type('string');
                            var array = JSON.parse(body);
                            array.should.be.an.instanceOf(Array);

                            var found = false;
                            for (var i = 0; i < array.length; i++) {
                                array[i].should.not.eql(parameters2.stateId);
                                if (array[i] === parameters.stateId) {
                                    found = true;
                                }
                            }
                            found.should.be.true;
                            done();
                        });
                    });
                });
            });

            it('should DELETE (7.4.b)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters,
                        method: 'DELETE',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        }
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/activities/state',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            res.statusCode.should.equal(200);
                            body.should.be.empty;
                            done();
                        });
                    });
                });
            });

            it('should DELETE all (Array) (7.4.d)', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                var parameters2 = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f8',
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters2,
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString()
                        },
                        json: document
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        var toDelete = {
                            activityId: 'http://www.example.com/activityId/hashset',
                            agent: {
                                objectType: 'Agent',
                                account: {
                                    homePage: 'http://www.example.com/agentId/1',
                                    name: 'Rick James'
                                }
                            }
                        };
                        request({
                            url: LRS_ENDPOINT + '/activities/state',
                            qs: toDelete,
                            method: 'DELETE',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            res.statusCode.should.equal(204);

                            var search = {
                                activityId: 'http://www.example.com/activityId/hashset',
                                agent: {
                                    objectType: 'Agent',
                                    account: {
                                        homePage: 'http://www.example.com/agentId/1',
                                        name: 'Rick James'
                                    }
                                }
                            };
                            request({
                                url: LRS_ENDPOINT + '/activities/state',
                                qs: search,
                                method: 'GET',
                                headers: {
                                    'X-Experience-API-Version': '1.0.1'
                                }
                            }, function (err, res, body) {
                                body.should.be.type('string');
                                var array = JSON.parse(body);
                                array.should.be.an.instanceOf(Array);

                                for (var i = 0; i < array.length; i++) {
                                    array[i].should.not.eql(parameters.stateId);
                                    array[i].should.not.eql(parameters2.stateId);
                                }
                                done();
                            });
                        });
                    });
                });
            });

            it('should DELETE all (Array) restricted to registration', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f7',
                    stateId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                var parameters2 = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    agent: {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://www.example.com/agentId/1',
                            name: 'Rick James'
                        }
                    },
                    registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f8',
                    stateId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/state',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/state',
                        qs: parameters2,
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString()
                        },
                        json: document
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        var toDelete = {
                            activityId: 'http://www.example.com/activityId/hashset',
                            agent: {
                                objectType: 'Agent',
                                account: {
                                    homePage: 'http://www.example.com/agentId/1',
                                    name: 'Rick James'
                                }
                            },
                            registration: 'ec531277-b57b-4c15-8d91-d292c5b2b8f8'
                        };
                        request({
                            url: LRS_ENDPOINT + '/activities/state',
                            qs: toDelete,
                            method: 'DELETE',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            res.statusCode.should.equal(204);

                            var search = {
                                activityId: 'http://www.example.com/activityId/hashset',
                                agent: {
                                    objectType: 'Agent',
                                    account: {
                                        homePage: 'http://www.example.com/agentId/1',
                                        name: 'Rick James'
                                    }
                                }
                            };
                            request({
                                url: LRS_ENDPOINT + '/activities/state',
                                qs: search,
                                method: 'GET',
                                headers: {
                                    'X-Experience-API-Version': '1.0.1'
                                }
                            }, function (err, res, body) {
                                body.should.be.type('string');
                                var array = JSON.parse(body);
                                array.should.be.an.instanceOf(Array);

                                var found = false;
                                for (var i = 0; i < array.length; i++) {
                                    array[i].should.not.eql(parameters2.stateId);
                                    if (array[i] === parameters.stateId) {
                                        found = true;
                                    }
                                }
                                found.should.be.true;
                                done();
                            });
                        });
                    });
                });
            });
        });

        describe('Activity Document API Test', function () {
            it('should GET', function(done){
                var parameters = {
                    activityId: "http://www.example.com/activityId/hashset",
                    profileId: generateUUID()
                };
                var document = {
                    "y" : "car",
                    "z" : "van"
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/profile',
                        qs: parameters,
                        method: 'GET',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        }
                    }, function (err, res, body) {
                        var etag = res.headers['etag'];
                        etag.should.be.ok;
                        etag.should.eql(getSHA1Sum(document));

                        var responseBody = JSON.parse(body);
                        responseBody.y.should.equal(document.y);
                        responseBody.z.should.equal(document.z);
                        done();
                    });
                });
            });

            it('should fail GET when missing activityId', function(done){
                var parameters = {
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET when activityId is not type of string', function(done){
                var parameters = {
                    activityId: {
                        "objectType": "object"
                    },
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET when profileId is not type of String', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET all when since is not type of Timestamp', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    since: "should fail"
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when missing profileId', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when missing activityId', function(done){
                var parameters = {
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when activityId is not type of string', function(done){
                var parameters = {
                    activityId: {
                        "objectType": "object"
                    },
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when profileId is not type of String', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when missing profileId', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when missing activityId', function(done){
                var parameters = {
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when activityId is not type of string', function(done){
                var parameters = {
                    activityId: {
                        "objectType": "object"
                    },
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when profileId is not type of String', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when missing profileId', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when missing activityId', function(done){
                var parameters = {
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when activityId is not type of string', function(done){
                var parameters = {
                    activityId: {
                        "objectType": "object"
                    },
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when profileId is not type of String', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should store a new document and return status code 204', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);
                    done();
                });
            });

            it('should retrieve on GET profileId', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/profile',
                        qs: parameters,
                        method: 'GET',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        }
                    }, function (err, res, body) {
                        var responseBody = JSON.parse(body);
                        responseBody.y.should.equal(document.y);
                        responseBody.z.should.equal(document.z);
                        done();
                    });
                });
            });

            it('should merge document when type is JSON', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/profile',
                        qs: parameters,
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString()
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/activities/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            responseBody.x.should.equal(document2.x);
                            responseBody.y.should.equal(document2.y);
                            responseBody.z.should.equal(document.z);
                            done();
                        });
                    });
                });
            });

            it('should GET all (Array) when missing profileId', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    body.should.be.type('string');
                    var array = JSON.parse(body);
                    array.should.be.an.instanceOf(Array);
                    done();
                });
            });

            it('should GET all (Array) using since', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                var parameters2 = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/profile',
                        qs: parameters2,
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date(2000, 0, 1)).toISOString()
                        },
                        json: document
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        var search = {
                            activityId: 'http://www.example.com/activityId/hashset',
                            since: (new Date(2010, 0, 1)).toISOString()
                        };
                        request({
                            url: LRS_ENDPOINT + '/activities/profile',
                            qs: search,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            body.should.be.type('string');
                            var array = JSON.parse(body);
                            array.should.be.an.instanceOf(Array);

                            var found = false;
                            for (var i = 0; i < array.length; i++) {
                                array[i].should.not.eql(parameters2.profileId);
                                if (array[i] === parameters.profileId) {
                                    found = true;
                                }
                            }
                            found.should.be.true;
                            done();
                        });
                    });
                });
            });

            it('should fail PUT on existing document when if-match / if-none-match missing', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/profile',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString()
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(409);

                        request({
                            url: LRS_ENDPOINT + '/activities/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            (responseBody.x === undefined).should.be.true;
                            responseBody.y.should.equal(document.y);
                            responseBody.z.should.equal(document.z);
                            done();
                        });
                    });
                });
            });

            it('should fail PUT on existing document when if-match does not match', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/profile',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString(),
                            'if-match': getSHA1Sum(document) + "invalid"
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(412);

                        request({
                            url: LRS_ENDPOINT + '/activities/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            (responseBody.x === undefined).should.be.true;
                            responseBody.y.should.equal(document.y);
                            responseBody.z.should.equal(document.z);
                            done();
                        });
                    });
                });
            });

            it('should fail PUT on existing document when if-none-match matches', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/profile',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString(),
                            'if-none-match': getSHA1Sum(document)
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(412);

                        request({
                            url: LRS_ENDPOINT + '/activities/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            (responseBody.x === undefined).should.be.true;
                            responseBody.y.should.equal(document.y);
                            responseBody.z.should.equal(document.z);
                            done();
                        });
                    });
                });
            });

            it('should PUT on existing document when if-match matches', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/profile',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString(),
                            'if-match': getSHA1Sum(document)
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/activities/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            (responseBody.z === undefined).should.be.true;
                            responseBody.x.should.equal(document2.x);
                            responseBody.y.should.equal(document2.y);
                            done();
                        });
                    });
                });
            });

            it('should PUT on existing document when if-none-match does not match', function (done) {
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/profile',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString(),
                            'if-none-match': getSHA1Sum(document) + "pass"
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/activities/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            (responseBody.z === undefined).should.be.true;
                            responseBody.x.should.equal(document2.x);
                            responseBody.y.should.equal(document2.y);
                            done();
                        });
                    });
                });
            });

            it('should DELETE', function(done){
                var parameters = {
                    activityId: 'http://www.example.com/activityId/hashset',
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                request({
                    url: LRS_ENDPOINT + '/activities/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/activities/profile',
                        qs: parameters,
                        method: 'DELETE',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        }
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/activities/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            res.statusCode.should.equal(200);
                            body.should.be.empty;
                            done();
                        });
                    });
                });
            });
        });

        describe('Agent Document API Test', function () {
            it('should GET', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    "y" : "car",
                    "z" : "van"
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/agents/profile',
                        qs: parameters,
                        method: 'GET',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        }
                    }, function (err, res, body) {
                        var etag = res.headers['etag'];
                        etag.should.be.ok;
                        etag.should.eql(getSHA1Sum(document));

                        var responseBody = JSON.parse(body);
                        responseBody.y.should.equal(document.y);
                        responseBody.z.should.equal(document.z);
                        done();
                    });
                });
            });

            it('should fail GET when missing agent', function(done){
                var parameters = {
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET when agent is not type of actor', function(done){
                var parameters = {
                    agent: {
                        "objectType": "object"
                    },
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET when profileId is not type of String', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail GET all when since is not type of Timestamp', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    since: "should fail"
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when missing profileId', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when missing agent', function(done){
                var parameters = {
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when agent is not type of string', function(done){
                var parameters = {
                    agent: {
                        "objectType": "object"
                    },
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail PUT when profileId is not type of String', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'PUT',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when missing profileId', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when missing agent', function(done){
                var parameters = {
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when agent is not type of string', function(done){
                var parameters = {
                    agent: {
                        "objectType": "object"
                    },
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail POST when profileId is not type of String', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when missing profileId', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when missing agent', function(done){
                var parameters = {
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when agent is not type of string', function(done){
                var parameters = {
                    agent: {
                        "objectType": "object"
                    },
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should fail DELETE when profileId is not type of String', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: {
                        "fail": "test"
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'DELETE',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    res.statusCode.should.equal(400);
                    done();
                });
            });

            it('should store a new document and return status code 204', function (done) {
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);
                    done();
                });
            });

            it('should retrieve on GET profileId', function (done) {
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/agents/profile',
                        qs: parameters,
                        method: 'GET',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        }
                    }, function (err, res, body) {
                        var responseBody = JSON.parse(body);
                        responseBody.y.should.equal(document.y);
                        responseBody.z.should.equal(document.z);
                        done();
                    });
                });
            });

            it('should merge document when type is JSON', function (done) {
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/agents/profile',
                        qs: parameters,
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString()
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/agents/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            responseBody.x.should.equal(document2.x);
                            responseBody.y.should.equal(document2.y);
                            responseBody.z.should.equal(document.z);
                            done();
                        });
                    });
                });
            });

            it('should GET all (Array) when missing profileId', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    }
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'GET',
                    headers: {
                        'X-Experience-API-Version': '1.0.1'
                    }
                }, function (err, res, body) {
                    body.should.be.type('string');
                    var array = JSON.parse(body);
                    array.should.be.an.instanceOf(Array);
                    done();
                });
            });

            it('should GET all (Array) using since', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                var parameters2 = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/agents/profile',
                        qs: parameters2,
                        method: 'POST',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date(2000, 0, 1)).toISOString()
                        },
                        json: document
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        var search = {
                            agent: {
                                "objectType": "Agent",
                                "account": {
                                    "homePage": "http://www.example.com/agentId/1",
                                    "name": "Rick James"
                                }
                            },
                            since: (new Date(2010, 0, 1)).toISOString()
                        };
                        request({
                            url: LRS_ENDPOINT + '/agents/profile',
                            qs: search,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            body.should.be.type('string');
                            var array = JSON.parse(body);
                            array.should.be.an.instanceOf(Array);

                            var found = false;
                            for (var i = 0; i < array.length; i++) {
                                array[i].should.not.eql(parameters2.profileId);
                                if (array[i] === parameters.profileId) {
                                    found = true;
                                }
                            }
                            found.should.be.true;
                            done();
                        });
                    });
                });
            });

            it('should fail PUT on existing document when if-match / if-none-match missing', function (done) {
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/agents/profile',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString()
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(409);

                        request({
                            url: LRS_ENDPOINT + '/agents/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            (responseBody.x === undefined).should.be.true;
                            responseBody.y.should.equal(document.y);
                            responseBody.z.should.equal(document.z);
                            done();
                        });
                    });
                });
            });

            it('should fail PUT on existing document when if-match does not match', function (done) {
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/agents/profile',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString(),
                            'if-match': getSHA1Sum(document) + "invalid"
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(412);

                        request({
                            url: LRS_ENDPOINT + '/agents/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            (responseBody.x === undefined).should.be.true;
                            responseBody.y.should.equal(document.y);
                            responseBody.z.should.equal(document.z);
                            done();
                        });
                    });
                });
            });

            it('should fail PUT on existing document when if-none-match matches', function (done) {
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/agents/profile',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString(),
                            'if-none-match': getSHA1Sum(document)
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(412);

                        request({
                            url: LRS_ENDPOINT + '/agents/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            (responseBody.x === undefined).should.be.true;
                            responseBody.y.should.equal(document.y);
                            responseBody.z.should.equal(document.z);
                            done();
                        });
                    });
                });
            });

            it('should PUT on existing document when if-match matches', function (done) {
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/agents/profile',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString(),
                            'if-match': getSHA1Sum(document)
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/agents/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            (responseBody.z === undefined).should.be.true;
                            responseBody.x.should.equal(document2.x);
                            responseBody.y.should.equal(document2.y);
                            done();
                        });
                    });
                });
            });

            it('should PUT on existing document when if-none-match does not match', function (done) {
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };
                var document2 = {
                    x: 'foo',
                    y: 'bar'
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/agents/profile',
                        qs: parameters,
                        method: 'PUT',
                        headers: {
                            'X-Experience-API-Version': '1.0.1',
                            'updated': (new Date()).toISOString(),
                            'if-none-match': getSHA1Sum(document) + "pass"
                        },
                        json: document2
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/agents/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            var responseBody = JSON.parse(body);
                            (responseBody.z === undefined).should.be.true;
                            responseBody.x.should.equal(document2.x);
                            responseBody.y.should.equal(document2.y);
                            done();
                        });
                    });
                });
            });

            it('should DELETE', function(done){
                var parameters = {
                    agent: {
                        "objectType": "Agent",
                        "account": {
                            "homePage": "http://www.example.com/agentId/1",
                            "name": "Rick James"
                        }
                    },
                    profileId: generateUUID()
                };
                var document = {
                    y: 'car',
                    z: 'van'
                };

                request({
                    url: LRS_ENDPOINT + '/agents/profile',
                    qs: parameters,
                    method: 'POST',
                    headers: {
                        'X-Experience-API-Version': '1.0.1',
                        'updated': (new Date()).toISOString()
                    },
                    json: document
                }, function (err, res, body) {
                    res.statusCode.should.equal(204);

                    request({
                        url: LRS_ENDPOINT + '/agents/profile',
                        qs: parameters,
                        method: 'DELETE',
                        headers: {
                            'X-Experience-API-Version': '1.0.1'
                        }
                    }, function (err, res, body) {
                        res.statusCode.should.equal(204);

                        request({
                            url: LRS_ENDPOINT + '/agents/profile',
                            qs: parameters,
                            method: 'GET',
                            headers: {
                                'X-Experience-API-Version': '1.0.1'
                            }
                        }, function (err, res, body) {
                            res.statusCode.should.equal(200);
                            body.should.be.empty;
                            done();
                        });
                    });
                });
            });
        });
    });
}());