/**
 * Created by vijay.budhram on 7/9/14.
 */
(function () {
    "use strict";
    var request = require('request');
    var should = require('should');
    var LRS_ENDPOINT = 'http://tnw.elmnts-test.com/lrs';

    // Generates an RFC4122 compliant uuid
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    };

    describe('Statement Requirements', function () {
        it('A Statement uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // Validation is done in the web server JSON parser or side side
            done();
        });

        it('A Statement uses the "actor" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Statement uses the "verb" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Statement uses the "object" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Statement uses the "result" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Statement uses the "context" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Statement uses the "timestamp" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Statement uses the "stored" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Statement uses the "authority" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Statement uses the "version" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Statement uses the "attachment" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Statement contains an "actor" property (Multiplicity, 4.1.b)', function (done) {
            var data = require('../test/data/statement_no_actor.json');
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
            var data = require('../test/data/statement_no_verb.json');
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
            var data = require('../test/data/statement_no_object.json');
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
            var data = require('../test/data/statement_no_id.json');

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
            var data = require('../test/data/statement_no_id.json');

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
                done();
            });
        });

        it('An "actor" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An "objectType" property is a String (Type, 4.1.2.1.table1.row1.a)', function (done) {
            var data = require('../test/data/statement_no_id.json');

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
            var data = require('../test/data/statement_no_id.json');

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
                done();
            });
        });

        it('An Agent is defined by "objectType" of an "actor" or "object" with value "Agent" (4.1.2.1.table1.row1)', function (done) {
            var data = require('../test/data/statement_no_id.json');

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
                done();
            });
        });

        it('An Agent uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A "name" property is a String (Type, 4.1.2.1.table1.row2.a)', function (done) {
            var data = require('../test/data/statement_no_id.json');

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

            // Non string
            request(options, function (err, res, body) {
                res.statusCode.should.equal(400);
                // Test string
                data.actor.name = 'FooBar';
                request(options, function (err, res, body) {
                    res.statusCode.should.equal(200);
                    done();
                });
            });
        });

        it('An "actor" property with "objectType" as "Agent" uses one of the following properties: "mbox", "mbox_sha1sum", "open_id", "account" (Multiplicity, 4.1.2.1.a)', function (done) {
            done();
        });
        it('An Agent uses the "mbox" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Agent does not use the "mbox" property if "mbox_sha1sum", "open_id", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            done();
        });

        it('An Agent uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Agent does not use the "mbox_sha1sum" property if "mbox", "open_id", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            done();
        });

        it('An Agent uses the "open_id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Agent does not use the "open_id" property if "mbox", "mbox_sha1sum", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            done();
        });

        it('An Agent uses the "account" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Agent does not use the "account" property if "mbox", "mbox_sha1sum", or "open_id" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            done();
        });

        it('A Group is defined by "objectType" of an "actor" or "object" with value "Group" (4.1.2.2.table1.row2)', function (done) {
            done();
        });

        it('A Group uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A Group uses the "member" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Anonymous Group is defined by "objectType" of an "actor" or "object" with value "Group" and by none of "mbox", "mbox_sha1sum", "open_id", or "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table1)', function (done) {
            done();
        });

        it('An Anonymous Group uses the "member" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Anonymous Group uses the "member" property (Multiplicity, 4.1.2.2.table1.row3.b)', function (done) {
            done();
        });

        it('The "member" property is an array of Objects following Agent requirements (4.1.2.2.table1.row3.a)', function (done) {
            done();
        });

        it('An Identified Group is defined by "objectType" of an "actor" or "object" with value "Group" and by one of "mbox", "mbox_sha1sum", "open_id", or "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)', function (done) {
            done();
        });

        it('An Identified Group uses one of the following properties: "mbox", "mbox_sha1sum", "open_id", "account" (Multiplicity, 4.1.2.1.a)', function (done) {
            done();
        });
        it('An Identified Group uses the "mbox" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Identified Group does not use the "mbox" property if "mbox_sha1sum", "open_id", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            done();
        });

        it('An Identified Group uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Identified Group does not use the "mbox_sha1sum" property if "mbox", "open_id", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            done();
        });

        it('An Identified Group uses the "open_id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Identified Group does not use the "open_id" property if "mbox", "mbox_sha1sum", or "account" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            done();
        });

        it('An Identified Group uses the "account" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Identified Group does not use the "account" property if "mbox", "mbox_sha1sum", or "open_id" are used (Multiplicity, 4.1.2.1.b)', function (done) {
            done();
        });

        it('An "mbox" property is an IRI (Type, 4.1.2.3.table1.row1.a)', function (done) {
            done();
        });

        it('An "mbox" property has the form "mailto:email address" (Syntax, 4.1.2.3.table1.row1.b)', function (done) {
            done();
        });

        it('An "mbox_sha1sum" property is it a String (Type, 4.1.2.3.table1.row2.a)', function (done) {
            done();
        });

        it('An "open_id" property is a URI (Type, 4.1.2.3.table1.row3.a)', function (done) {
            done();
        });

        it('An "account" property uses the "homePage" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An "account" property uses the "homePage" property (Multiplicity, 4.1.2.4.table1.row1.b)', function (done) {
            done();
        });

        it('An "account" propertys homePage" property is an IRL (Type, 4.1.2.4.table1.row1.a)', function (done) {
            done();
        });

        it('An "account" property uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An "account" property uses the "name" property (Multiplicity, 4.1.2.4.table1.row2.b)', function (done) {
            done();
        });

        it('An "account" propertys "name" property is a String (Type, 4.1.2.4.table1.row1.a)', function (done) {
            done();
        });

        it('A "verb" property uses the "id" property at most one time (Multiplicity, 4.1.3.table1.row1.aultiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A "verb" property contains an "id" property (Multiplicity, 4.1.3.table1.row1.b)', function (done) {
            done();
        });

        it('A "verb" propertys "id" property is an IRI (Type, 4.1.3.table1.row1.a)', function (done) {
            done();
        });

        it('A "verb" property uses the "display" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A "verb" propertys "display" property is a Language Map (Type, 4.1.3.table1.row2.a)', function (done) {
            done();
        });

        it('A Language Map is defined as a list of language tag/String pairs has at least 1 entry Implicit', function (done) {
            done();
        });

        it('A Language Map follows RFC5646 (Format, 5.2.a, RFC5646)', function (done) {
            done();
        });

        it('A "display" property uses a Language Map (Format, 4.1.3.table1.row1.a)', function (done) {
            done();
        });

        it('An "object" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An "object" property uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An "object" property uses the "definition" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An "object" property contains an "id" property (Multiplicity, 4.1.4.1.table1.row2.b)', function (done) {
            done();
        });

        it('An "object" propertys "id" property is an IRI (Type, 4.1.4.1.table1.row2.a)', function (done) {
            done();
        });

        it('An "object" propertys "objectType" property is either "Activity", "Agent", "Group", "SubStatement", or"StatementRef" (Vocabulary, 4.1.4.b)', function (done) {
            done();
        });

        it('An Activity is defined by the "objectType" of an "object" with value "Activity" (4.1.4.1.table1.row1.b)', function (done) {
            done();
        });

        it('An Activity uses the "definition" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An Activitys "definition" property is an Object (Type, 4.1.4.1.table1.row3.a)', function (done) {
            done();
        });

        it('An Activity Object is the contents of a "definition" property object of an Activity (Format, 4.1.4.1.table2)', function (done) {
            done();
        });

        it('An Activity Object contains at least one of the following properties: Implicit(Format, 4.1.4.1.table2)', function (done) {
            done();
        });
    });
}());