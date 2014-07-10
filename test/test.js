/**
 * Created by vijay.budhram on 7/9/14.
 */
(function () {
    "use strict";
    var request = require('supertest');
    var should = require('should');
    request = request('http://tnw.elmnts-test.com/lrs');

    describe('Statement Requirements', function () {
        it('A Statement uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            var data = '[{"id":"ef11c918-b88b-4b20-a0a5-a4c32391fff9","id":"ef11c918-b88b-4b20-a0a5-a4c32391fff9","actor":{"mbox":"mailto:xapi@adlnet.gov"},"verb":{"id":"http://adlnet.gov/expapi/verbs/created","display":{"en-US":"created"}},"object":{"id":"http://example.adlnet.gov/xapi/example/activity"}}]'

            request.put('/statement')
                .set('X-Experience-API-Version', '1.0.1')
                .expect(400)
                .end(function (err, res) {
                    done();
                });
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
            done();
        });

        it('A Statement contains a "verb" property (Multiplicity, 4.1.b)', function (done) {
            done();
        });

        it('A Statement contains an "object" property (Multiplicity, 4.1.b)', function (done) {
            done();
        });

        it('An "id" property is a String (Type, 4.1.1.description.a)', function (done) {
            done();
        });

        it('An "id" property is a UUID following RFC 4122(Syntax, RFC 4122 )', function (done) {
            done();
        });

        it('An "actor" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('An "objectType" property is a String (Type, 4.1.2.1.table1.row1.a)', function (done) {
            done();
        });

        it('An "actor" propertys "objectType" property is either "Agent" or "Group" (Vocabulary, 4.1.2.1.table1.row1.b, 4.1.2.1.table1.row1.b)', function (done) {
            done();
        });

        it('An Agent is defined by "objectType" of an "actor" or "object" with value "Agent" (4.1.2.1.table1.row1)', function (done) {
            done();
        });

        it('An Agent uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            done();
        });

        it('A "name" property is a String (Type, 4.1.2.1.table1.row2.a)', function (done) {
            done();
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