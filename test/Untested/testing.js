(function (module, fs, extend, moment, request, requestPromise, chai, Joi, helper, multipartParser) {
    "use strict";

    var expect = chai.expect;

    /*
    JSON never specifies about duplicate keys and while many parsers
    automatically remove or merge such can not be relied upon, and the
    best indication from the xAPI spec is that malformed statements
    should be rejected
    */

    describe('These test requirements may or may not be required by the spec but nonetheless have no testing procedure associated with them as of yet', function () {

      it ('An LRS implements all of the Statement, State, Agent, and Activity Profile sub-APIs **Implicit**', function(done){
          //large test that should be covered by other tests
          done();
      });

      it('A "more" property IRL is accessible for at least 24 hours after being returned (4.2.a)', function (done){
        //impractical to test in real-time
        done();
      });

      it('A Document Merge is defined by the merging of an existing document at an endpoint with a document received in a POST request. (7.3)', function (done){
        //definition. Already covered in document.js (Communication.md#2.2.s7.b1, Communication.md#2.2.s7.b2, Communication.md#2.2.s7.b3)
        done();
      });

      it('A Document Merge de-serializes all Objects represented by each document before making other changes. (7.3.d)', function (done){
        //definition. Already covered in document.js (Communication.md#2.2.s7.b1, Communication.md#2.2.s7.b2, Communication.md#2.2.s7.b3)
        done();
      });

      it('A Document Merge re-serializes all Objects to finalize a single document (7.3.d)', function (done){
        //definition. Already covered in document.js (Communication.md#2.2.s7.b1, Communication.md#2.2.s7.b2, Communication.md#2.2.s7.b3)
        done();
      });

      it('In 1.0.3, the IRI requires a scheme, but does not in 1.0.2, thus we only test type String in this version', function (done){
        //update test once version 1.0.3 is released
        done();
      });

      it('NOTE: **There is no requirement here that the LRS reacts to the "since" parameter in the case of a GET request with valid "stateId" - this is intentional**', function (done){
        //not a test
        done();
      });

      it('A Cross Origin Request is defined as this POST request as described in the previous requirement (definition)', function (done){
        //definition
        done();
      });

      it ('An LRS rejects a Statement due to size if the Statement exceeds the size limit the LRS is configured to with error code 413 Request Entity Too Large (7.1)', function (done){
        //each LRS defines its own limit, not possible to make universal test at this time
        // this.timeout(0);
        // var id = helper.generateUUID();
        // var statementTemplates = [
        //     {statement: '{{statements.context}}'},
        //     {context: '{{contexts.oversized}}'}
        // ];
        //
        // var statement = createFromTemplate(statementTemplates);
        // statement = statement.statement;
        // statement.id = id;
        // var query = helper.getUrlEncoding({statementId: id});
        // var stmtTime = Date.now();
        //
        // request(helper.getEndpointAndAuth())
        //     .post(helper.getEndpointStatements())
        //     .headers(helper.addAllHeaders({}))
        //     .json(statement)
        //     .expect(200)
        //     .end()
        //     .get(helper.getEndpointStatements() + '?' + query)
        //     .wait(genDelay(stmtTime, '?' + query, id))
        //     .headers(helper.addAllHeaders({}))
        //     .expect(200)
        //     .end(function(err,res){
        //       if (err){
        //         console.log(err);
        //         done(err);
        //       }
        //       else{
        //         console.log(res.body);
        //         done();
        //       }
        //     });
        done();
      });

      it('An LRS rejects a Statement due to network/server issues with an error code of 500 Internal Server Error (7.1)', function (done){
        //not implemented
        done();
      });

      it('An LRS\'s Statement API, upon receiving a Get request, had a field in the header with name "Content-Type" ***Assumed?***', function (done){
        //Implicit, does not test
        done();
      });

      it('An LRS rejects with error code 400 Bad Request, a PUT or POST Request which uses Attachments, has a "Content Type" header with value "multipart/mixed", and does not have a body header named "MIME-Version" with a value of "1.0" or greater (4.1.11.b, RFC 1341)', function (done) {
          // RFC 1341: MIME-Version header field is required at the top level of a message. It is not required for each body part of a multipart entity
          done();
      });

      it('An LRS\'s Statement API rejects with Error Code 400 Bad Request any DELETE request (7.2)', function (done) {
          // Using requirement: An LRS rejects with error code 405 Method Not Allowed to any request to an API which uses a method not in this specification **Implicit ONLY in that HTML normally does this behavior**
          //depends on LRS how it wants to response to a bad DELETE request

          // var id = helper.generateUUID();
          // var statementTemplates = [
          //     {statement: '{{statements.default}}'}
          // ];
          //
          // var statement = createFromTemplate(statementTemplates);
          // statement = statement.statement;
          // statement.id = id;
          // var query = helper.getUrlEncoding({statementId: id});
          //
          // request(helper.getEndpointAndAuth())
          //     .post(helper.getEndpointStatements())
          //     .headers(helper.addAllHeaders({}))
          //     .json(statement)
          //     .expect(200)
          //     .end()
          //     .del(helper.getEndpointStatements() + '?statementId=' + statement.id)
          //     .headers(helper.addAllHeaders({}))
          //     .expect(405, done); // requirement expects 400 but LRS returns 405
          done();
      });

      it('A POST request is defined as a "pure" POST, as opposed to a GET taking on the form of a POST (7.2.2.e)', function (done) {
          // All of these "defined" aren't really tests, rather ways to disambiguate future tests.
          done();
      });



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
  });

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('joi'), require('./../helper'), require('./../multipartParser')));
