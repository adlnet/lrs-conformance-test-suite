/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * Created by vijay.budhram on 7/9/14.
 * Riptide Software
 */
(function (process) {
    "use strict";

    describe.skip('Miscellaneous Requirements', function () {
        it('All Objects are well-created JSON Objects (Nature of binding) **Implicit**', function (done) {
            // JSON parser validates this
            done();
        });

        it('All Strings are encoded and interpreted as UTF-8 (6.1.a)', function (done) {
            done(new Error('Implement Test'));
        });

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

        it('A Statement uses the "attachments" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Group uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Group uses the "member" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An "actor" property uses the "objectType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent uses the "openid" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent uses the "account" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Agent uses the "mbox" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Anonymous Group uses the "member" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group uses the "mbox" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group uses the "mbox_sha1sum" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group uses the "open_id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group uses the "account" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Identified Group uses the "openid" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Account Object uses the "homePage" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Account Object property uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "verb" property uses the "id" property at most one time (Multiplicity, 4.1.3.table1.row1.aultiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Voiding Statement\'s Target is defined as the Statement corresponding to the "object" property\'s "id" property\'s IRI (4.3.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Voiding Statement cannot Target another Voiding Statement (4.3)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A "verb" property uses the "display" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
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

        it('An Activity is defined by the "objectType" of an "object" with value "Activity" (4.1.4.1.table1.row1.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An Activity uses the "definition" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "name" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "description" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "type" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "moreInfo" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "interactionType" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "correctResponsesPattern" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "choices" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "scale" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "source" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "target" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "steps" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Interaction Component uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Interaction Component uses the "description" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Activity Definition uses the "extensions" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement Reference uses the "id" property at most one time (Multiplicity, 4.1.a)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "score" Object uses a "scaled" property at most one time (Multiplicity, 4.1.5.1.table1.row1.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "score" Object uses a "raw" property at most one time (Multiplicity, 4.1.5.1.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "score" Object uses a "min" property at most one time (Multiplicity, 4.1.5.1.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A "score" Object uses a "max" property at most one time (Multiplicity, 4.1.5.1.table1.row4.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "result" property uses a "success" property at most one time (Multiplicity, 4.1.5.table1.row2.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "result" property uses a "completion" property at most one time (Multiplicity, 4.1.5.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "result" property uses a "response" property at most one time (Multiplicity, 4.1.5.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "result" property uses a "duration" property at most one time (Multiplicity, 4.1.5.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "result" property uses an "extensions" property at most one time (Multiplicity, 4.1.5.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses a "registration" property at most one time (Multiplicity, 4.1.6.table1.row1.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses an "instructor" property at most one time (Multiplicity, 4.1.6.table1.row2.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses an "team" property at most one time (Multiplicity, 4.1.6.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses a "contextActivities" property at most one time (Multiplicity, 4.1.6.table1.row4.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses an "revision" property at most one time (Multiplicity, 4.1.6.table1.row5.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses an "platform" property at most one time (Multiplicity, 4.1.6.table1.row6.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses a "language" property at most one time (Multiplicity, 4.1.6.table1.row7.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses a "statement" property at most one time (Multiplicity, 4.1.6.table1.row8.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Statement\'s "context" property uses an "extensions" property at most one time (Multiplicity, 4.1.6.table1.row9.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "usageType" property exactly one time (Multiplicity, 4.1.11.table1.row1.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "display" property exactly one time (Multiplicity, 4.1.11.table1.row2.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "description" property at most one time (Multiplicity, 4.1.11.table1.row3.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "contentType" property exactly one time (Multiplicity, 4.1.11.table1.row4.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "length" property exactly one time (Multiplicity, 4.1.11.table1.row5.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "sha2" property exactly one time (Multiplicity, 4.1.11.table1.row6.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('An Attachment uses a "fileUrl" property at most one time (Multiplicity, 4.1.11.table1.row7.c)', function (done) {
            // JSON parser validates this
            done();
        });

        it('A Person Object is an Object (7.6)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object uses an "objectType" property exactly one time (Multiplicity, 7.6.table1.row1.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object\'s "objectType" property is a String and is "Person" (Format, Vocabulary, 7.6.table1.row1.a, 7.6.table1.row1.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object uses a "name" property at most one time (Multiplicity, 7.6.table1.row2.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object\'s "name" property is an Array of Strings (Multiplicity, 7.6.table1.row2.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object uses a "mbox" property at most one time (Multiplicity, 7.6.table1.row3.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object\'s "mbox" property is an Array of IRIs (Multiplicity, 7.6.table1.row3.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object\'s "mbox" entries have the form "mailto:emailaddress" (Format, 7.6.table1.row3.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object uses a "mbox_sha1sum" property at most one time (Multiplicity, 7.6.table1.row4.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object\'s "mbox_sha1sum" property is an Array of Strings (Multiplicity, 7.6.table1.row4.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object uses an "openid" property at most one time (Multiplicity, 7.6.table1.row5.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object\'s "openid" property is an Array of Strings (Multiplicity, 7.6.table1.row5.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object uses an "account" property at most one time (Multiplicity, 7.6.table1.row6.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Person Object\'s "account" property is an Array of Account Objects (Multiplicity, 7.6.table1.row6.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request any Statement violating a Statement Requirement. (4.1.12, Varies)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS doesn\'t make any adjustments to incoming Statements that are not specifically mentioned in this section (4.1.12.d, Varies)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS stores 32-bit floating point numbers with at least the precision of IEEE 754 (4.1.12.d.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS returns a ContextActivity in an array, even if only a single ContextActivity is returned (4.1.6.2.c, 4.1.6.2.d)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a Request whose "authority" is a Group and consists of non-O-Auth Agents (4.1.9.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 403 Forbidden a Request whose "authority" is a Agent or Group that is not authorized (4.1.9.b, 6.4.2)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS populates the "authority" property if it is not provided in the Statement, based on header information with the Agent corresponding to the user (contained within the header) (Implicit, 4.1.9.b, 4.1.9.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a Request which uses Attachments and does not have a "Content-Type" header with value "application/json" or "multipart/mixed" (Format, 4.1.11.a, 4.1.11.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a GET Request which uses Attachments, has a "Content-Type" header with value "application/json", and has the "attachments" filter attribute set to "true" (4.1.11.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content-Type" header with value "application/json", and has a discrepancy in the number of Attachments vs. the number of fileURL members (4.1.11.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "Content-Type" with value "multipart/mixed" (RFC 1341)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "boundary" (4.1.11.b, RFC 1341)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Boundary is defined as the value of the body header named "boundary" (Definition, 4.1.11.b, RFC 1341)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "MIME-Version" with a value of "1.0" or greater (4.1.11.b, RFC 1341)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a Boundary before each "Content-Type" header (4.1.11.b, RFC 1341)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not the first document part with a "Content-Type" header with a value of "application/json" (RFC 1341, 4.1.11.b.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have all of the Statements in the first document part (RFC 1341, 4.1.11.b.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "Content-Transfer-Encoding" with a value of "binary" (4.1.11.b.c, 4.1.11.b.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and for any part except the first does not have a Header named "X-Experience-API-Hash" with a value of one of those found in a "sha2" property of a Statement in the first part of this document (4.1.11.b.c, 4.1.11.b.d)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "true" if it does not follow the rest of the attachment rules (7.2.3.d)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "false" if it includes attachment raw data (7.2.3.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API will reject a GET request having the "attachment" parameter set to "false" and the Content-Type field in the header set to anything but "application/json" (7.2.3.d) (7.2.3.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a Request which does not use a "X-Experience-API-Version" header name to any API except the About API (Format, 6.2.a, 6.2.f, 7.7.f)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request, a Request which the "X-Experience-API-Version" header\'s value is anything but "1.0" or "1.0.x", where x is the semantic versioning number to any API except the About API (Format, 6.2.d, 6.2.e, 6.2.f, 7.7.f)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS modifies the value of the header of any Statement not rejected by the previous three requirements to "1.0.1" (4.1.10.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS will not modify Statements based on a "version" before "1.0.1" (6.2.l)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS sends a header response with "X-Experience-API-Version" as the name and "1.0.1" as the value (Format, 6.2.a, 6.2.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS implements all of the Statement, State, Agent, and Activity Profile sub-APIs **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request any request to an API which uses a parameter not recognized by the LRS (7.0.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 400 Bad Request any request to an API which uses a parameter with differing case (7.0.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects with error code 405 Method Not Allowed to any request to an API which uses a method not in this specification **Implicit ONLY in that HTML normally does this behavior**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS does not process any batch of Statements in which one or more Statements is rejected and if necessary, restores the LRS to the state in which it was before the batch began processing (7.0.c, **Implicit**)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS can only reject Statements using the error codes in this specification **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS returns the correct corresponding error code when an error condition is met (7.0.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects a Statement of bad authorization (either authentication needed or failed credentials) with error code 401 Unauthorized (7.1)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects a Statement of insufficient permissions (credentials are valid, but not adequate) with error code 403 Forbidden (7.1)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects a Statement due to size if the Statement exceeds the size limit the LRS is configured to with error code 413 Request Entity Too Large (7.1)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS must be configurable to accept a Statement of any size (within reason of modern day storage capacity)  (7.1.b, **Implicit**)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS rejects a Statement due to network/server issues with an error code of 500 Internal Server Error (7.1)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS has a Statement API with endpoint "base IRI"+"/statements" (7.2)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API accepts PUT requests (7.2.1)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API rejects with Error Code 400 Bad Request any DELETE request (7.2)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API accepts PUT requests only if it contains a "statementId" parameter (Multiplicity, 7.2.1.table1.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API accepts PUT requests only if the "statementId" parameter is a String (Type, 7.2.1.table1.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS cannot modify a Statement, state, or Object in the event it receives a Statement with statementID equal to a Statement in the LRS already. (7.2.1.a, 7.2.2.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API upon processing a successful PUT request returns code 204 No Content (7.2.1)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API rejects with error code 409 Conflict any Statement with the "statementID" parameter equal to a Statement in the LRS already **Implicit** (7.2.1.b, 7.2.2.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A POST request is defined as a "pure" POST, as opposed to a GET taking on the form of a POST (7.2.2.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API accepts POST requests (7.2.2)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API upon processing a successful POST request returns code 204 No Content and all Statement UUIDs within the POST **Implicit** (7.2.2)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A GET request is defined as either a GET request or a POST request containing a GET request (7.2.3, 7.2.2.e)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API accepts GET requests (7.2.3)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "statementId" as a parameter (7.2.3)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "voidedStatementId" as a parameter  (7.2.3)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "agent" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "verb" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "activity" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "registration" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "related_activities" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "related_agents" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "since" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "until" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "limit" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "format" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "attachments" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API can process a GET request with "ascending" as a parameter  **Implicit**', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API rejects a GET request with both "statementId" and anything other than "attachments" or "format" as parameters (7.2.3.a, 7.2.3.b) with error code 400 Bad Request.', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API rejects a GET request with both "voidedStatementId" and anything other than "attachments" or "format" as parameters (7.2.3.a, 7.2.3.b) with error code 400 Bad Request.', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API upon processing a successful GET request with a "statementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (7.2.3)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API upon processing a successful GET request with a "voidedStatementId" parameter, returns code 200 OK and a single Statement with the corresponding "id".  (7.2.3)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API upon processing a successful GET request with neither a "statementId" nor a "voidedStatementId" parameter, returns code 200 OK and a StatementResult Object.  (7.2.3)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API upon processing a GET request, returns a header with name "X-Experience-API-Consistent-Through" regardless of the code returned. (7.2.3.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API, upon receiving a GET request, has a field in the header with name "Content-Type" **Assumed?****', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s "X-Experience-API-Consistent-Through" header is an ISO 8601 combined date and time (Type, 7.2.3.c).', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s "X-Experience-API-Consistent-Through" header\'s value is not before (temporal) any of the "stored" values of any of the returned Statements (7.2.3.c).', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API, upon processing a successful GET request, will return a single "statements" property (Multiplicity, Format, 4.2.table1.row1.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A "statements" property is an Array of Statements (Type, 4.2.table1.row1.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('The Statements within the "statements" property will correspond to the filtering criterion sent in with the GET request **Implicit** (7.2.4.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('The LRS will NOT reject a GET request which returns an empty "statements" property (**Implicit**, 4.2.table1.row1.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A "statements" property which is too large for a single page will create a container for each additional page (4.2.table1.row1.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API, upon processing a successful GET request, will return a single "more" property (Multiplicity, Format, 4.2.table1.row2.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A "more" property is an IRL (Format, 4.2.table1.row2.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('The "more" property an empty string if the entire results of the original GET request have been returned (4.2.table1.row2.b) (Do we need to be specific about the "type" of empty string?)', function (done) {
            done(new Error('Implement Test'));
        });

        it('If not empty, the "more" property\'s IRL refers to a specific container object corresponding to the next page of results from the orignal GET request (4.2.table1.row1.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A "more" property IRL is accessible for at least 24 hours after being returned (4.2.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A "more" property\'s referenced container object follows the same rules as the original GET request, originating with a single "statements" property and a single "more" property (4.2.table1.row1.b)', function (done) {
            done(new Error('Implement Test'));
        });

        it('A Voided Statement is defined as a Statement that is not a Voiding Statement and is the Target of a Voiding Statement within the LRS (4.2.c)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API, upon processing a successful GET request, can only return a Voided Statement if that Statement is specified in the voidedStatementId parameter of that request (7.2.4.a)', function (done) {
            done(new Error('Implement Test'));
        });

        it('An LRS\'s Statement API, upon processing a successful GET request wishing to return a Voided Statement still returns Statements which target it (7.2.4.b)', function (done) {
            done(new Error('Implement Test'));
        });
    });
}(process));
