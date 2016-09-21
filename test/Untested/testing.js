/* Testing if I can make a quick set of dummy tests to explore the possibility o fadding test profiles.  This is copied and pasted from the non_templating file. */

(function (module, fs, extend, moment, request, requestPromise, chai, Joi, helper, multipartParser) {
    "use strict";

    var expect = chai.expect;

    describe('Welcome to Option A.  An LRS populates the "authority" property if it is not provided in the Statement, based on header information with the Agent corresponding to the user (contained within the header) (Implicit, 4.1.9.b, 4.1.9.c)', function () {

      it('A POST request is defined as a "pure" POST, as opposed to a GET taking on the form of a POST (7.2.2.e)', function (done) {
          // All of these "defined" aren't really tests, rather ways to disambiguate future tests.
          done();
      });

      it('An LRS rejects a Statement due to network/server issues with an error code of 500 Internal Server Error (7.1)', function (done){
        //not implemented
        done();
      });

      it('An LRS\'s Statement API, upon receiving a Get request, had a field in the header with name "Content-Type" ***Assumed?***', function (done){
        //Implicit, does not test --move to document
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

      it ('An LRS implements all of the Statement, State, Agent, and Activity Profile sub-APIs **Implicit**', function(done){
          //large test that should be covered by other tests
          done();
      });



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

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('joi'), require('./../helper'), require('./../multipartParser')));
