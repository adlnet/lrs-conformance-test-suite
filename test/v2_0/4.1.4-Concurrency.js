'use strict';
/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

var request = require('supertest-as-promised');
const expect = require('chai').expect;
const helper = require('../helper');
const xapiRequests = require("./util/requests");

request = request(helper.getEndpoint());

function runConcurrencyTestsForDocumentResource(resourceName, resourcePath, resourceParams) {

    describe(`Concurrency for the ${resourceName} Resource.`, () => {

        let document = helper.buildDocument();

        before('before', async() => {
            await xapiRequests.deleteDocument(resourcePath, resourceParams);
            await xapiRequests.postDocument(resourcePath, document, resourceParams);
        });

        it('An LRS responding to a GET request SHALL add an ETag HTTP header to the response.', async() => {

            let documentResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);
            let etag = documentResponse.headers.etag;

            expect(etag).to.be.a("string");
        });
        
        it('When responding to a GET Request the Etag header must be enclosed in quotes', async() => {

            let documentResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);

            /** @type {string} */
            let etag = documentResponse.headers.etag;

            expect(etag).to.be.a("string");

            if (etag[0] !== '"') {
                expect(etag[0]).to.equal('W');
                expect(etag[1]).to.equal('/');
                etag = etag.substring(2);
            }

            // We previously checked for the 40 character SHA1 hash as mandated by the 1.0.3 tests,
            // but no algorithm has been specified for xAPI 2.0 with the IEEE spec.  
            //
            // As such, the 40 character check is being removed, and the only current check is that
            // an ETag of any length has been provided.  We will only check that any sort of value has
            // been provided as the hash.
            //
            // expect(etag[0]).to.equal('"');
            // expect(etag[41]).to.equal('"');

            let hasInnerContents = etag.length >= 3;
            expect(hasInnerContents).to.equal(true);

            let firstChar = etag[0];
            let lastChar = etag[etag.length - 1];
            
            expect(firstChar).to.equal('"');
            expect(lastChar).to.equal('"');
        });

        describe('When responding to a PUT, POST, or DELETE request, must handle the If-Match header as described in RFC 2616, HTTP/1.1 if it contains an ETag', async () => {
            
            describe("Properly handles PUT requests with If-Match", async() => {

                let document = helper.buildDocument();
                let originalName = document.name;
                let updatedDocument = {
                    ...document,
                    name: "Updated Name:" + helper.generateUUID() 
                }
                var correctTag;

                before ("Get the current ETag", async() => {

                    await xapiRequests.deleteDocument(resourcePath, resourceParams);
                    await xapiRequests.postDocument(resourcePath, document, resourceParams);

                    let documentResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);
                    correctTag = documentResponse.headers.etag;
                });
                
                it("Should reject a PUT request with a 412 Precondition Failed when using an incorrect ETag", async() => {

                    let incorrectTag = `"1234"`;
                    let incorrectResponse = await xapiRequests.putDocument(resourcePath, document, resourceParams, { "If-Match": incorrectTag });

                    expect(incorrectResponse.status).to.equal(412);
                });

                it("Should not have modified the document for PUT requests with an incorrect ETag", async() => {

                    let originalDocResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);
                    expect(originalDocResponse.data.name).to.equal(originalName);
                });
                
                it("Should accept a PUT request with a correct ETag", async() => {

                    let correctResponse = await xapiRequests.putDocument(resourcePath, updatedDocument, resourceParams, { "If-Match": correctTag });
                    expect(correctResponse.status).to.equal(204);
                });

                it("Should have modified the document for PUT requests with a correct ETag", async() => {

                    let updatedResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);
                    expect(updatedResponse.data).to.eql(updatedDocument);
                });
            });
            
            describe("Properly handles POST requests with If-Match", function() {

                let document = helper.buildDocument();
                let originalName = document.name;
                let updatedDocument = {
                    ...document,
                    name: "Updated Name:" + helper.generateUUID() 
                }
                var correctTag;

                before ("Get the current ETag", async() => {

                    await xapiRequests.deleteDocument(resourcePath, resourceParams);
                    await xapiRequests.postDocument(resourcePath, document, resourceParams);

                    let documentResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);
                    correctTag = documentResponse.headers.etag;
                });
                
                it("Should reject a POST request with a 412 Precondition Failed when using an incorrect ETag", async() => {

                    let incorrectTag = `"1234"`;
                    let incorrectResponse = await xapiRequests.postDocument(resourcePath, document, resourceParams, { "If-Match": incorrectTag });

                    expect(incorrectResponse.status).to.equal(412);
                });

                it("Should not have modified the document for POST requests with an incorrect ETag", async() => {

                    let originalDocResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);
                    expect(originalDocResponse.data.name).to.equal(originalName);
                });
                
                it("Should accept a POST request with a correct ETag", async() => {

                    let correctResponse = await xapiRequests.postDocument(resourcePath, updatedDocument, resourceParams, { "If-Match": correctTag });
                    expect(correctResponse.status).to.equal(204);
                });

                it("Should have modified the document for POST requests with a correct ETag", async() => {

                    let updatedResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);
                    expect(updatedResponse.data).to.eql(updatedDocument);
                });
            });
            
            describe ("Properly handles DELETE requests with If-Match", function() {

                let document = helper.buildDocument();
                let originalName = document.name;
                var correctTag;

                before ("Get the current ETag", async() => {

                    await xapiRequests.deleteDocument(resourcePath, resourceParams);
                    await xapiRequests.postDocument(resourcePath, document, resourceParams);

                    let documentResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);
                    correctTag = documentResponse.headers.etag;
                });
                
                it("Should reject a DELETE request with a 412 Precondition Failed when using an incorrect ETag", async() => {

                    let incorrectTag = `"1234"`;
                    let incorrectResponse = await xapiRequests.deleteDocument(resourcePath, resourceParams, { "If-Match": incorrectTag });

                    expect(incorrectResponse.status).to.equal(412);
                });

                it("Should not have modified the document for DELETE requests with an incorrect ETag", async() => {

                    let originalDocResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);

                    expect(originalDocResponse.status).to.equal(200);
                    expect(originalDocResponse.data.name).to.equal(originalName);
                });
                
                it("Should accept a DELETE request with a correct ETag", async() => {

                    let correctResponse = await xapiRequests.deleteDocument(resourcePath, resourceParams, { "If-Match": correctTag });
                    expect(correctResponse.status).to.equal(204);
                });

                /**
                 * Note, the LRS isn't actually required to return a 404.  The language is currently:
                 * 
                 * 404 Not Found - Indicates the requested resource was not found. 
                 * May be returned by any method that returns a uniquely identified resource, 
                 * for instance, any State, Agent Profile, or Activity Profile Resource request 
                 * targeting a specific document, or the method to retrieve a single Statement.
                 * 
                 * Even though this is arguably the most appropriate error code for this situation,
                 * which --is-- a requirement:
                 * 
                 * An LRS shall return the error code most appropriate to the error condition from the list above.
                 */
            });
        });
        
        /**
         * Presently, If-None-Match is not included in the spec document for xAPI 2.0's LRS requirements.
         * 
         * This seems to be a presumed inclusion, but it will be omitted here until the document explicitly
         * requires its implementation by the LRS.
         */

        describe('If a PUT request is received without either header for a resource that already exists', function () {
            var etag;
            var originalDocument = helper.buildDocument();
            var updatedDocument = helper.buildDocument();

            before('Create the document and get the etag', async () => {

                await xapiRequests.deleteDocument(resourcePath, resourceParams);
                let postResponse = await xapiRequests.postDocument(resourcePath, originalDocument, resourceParams);

                expect(postResponse.status).to.equal(204);
                
                let getResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);
                
                expect(getResponse.status).to.equal(200);
                expect(getResponse.headers.etag).to.not.be.undefined;
                expect(getResponse.data).to.eql(originalDocument);

                etag = getResponse.headers.etag;
            });

            it('Return 409 conflict', async () => {
                let res = await xapiRequests.putDocument(resourcePath, updatedDocument, resourceParams);
                expect(res.status).to.equal(409);
            });

            it('Return error message explaining the situation', async () => {
                let res = await xapiRequests.putDocument(resourcePath, updatedDocument, resourceParams);
                let responseText = res.data;

                expect(responseText).to.not.be.empty;
            });

            it('Do not modify the resource', async () => {
                let getResponse = await xapiRequests.getDocuments(resourcePath, resourceParams);

                expect(getResponse.data).to.eql(originalDocument);
            });
        });
    });
}

describe('(4.1.4) Concurrency', () => {

    /**  XAPI-00322, Communication 3.1 Concurrency
     * An LRS must support HTTP/1.1 entity tags (ETags) to implement optimistic concurrency control when handling APIs where PUT may overwrite existing data (State, Agent Profile, and Activity Profile)
     */
    describe("xAPI uses HTTP 1.1 entity tags (ETags) to implement optimistic concurrency control in the following resources, where PUT, POST or DELETE are allowed to overwrite or remove existing data.", function() {

        let stateParams = helper.buildState();
        let activityProfileParams = helper.buildActivityProfile();
        let agentsProfileParams = helper.buildAgentProfile();

        runConcurrencyTestsForDocumentResource("Activity State", xapiRequests.resourcePaths.activityState, stateParams);
        runConcurrencyTestsForDocumentResource("Activity Profile", xapiRequests.resourcePaths.activityProfile, activityProfileParams);
        runConcurrencyTestsForDocumentResource("Agents Profile", xapiRequests.resourcePaths.agentsProfile, agentsProfileParams);
    });
});

