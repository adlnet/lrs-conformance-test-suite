/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements.
 */

const superRequest = require('super-request');
const oldHelpers = require('../helper');
const requests = require("./util/requests");
const { expect } = require('chai');

if(global.OAUTH)
    superRequest = oldHelpers.OAuthRequest(superRequest);

describe('Alternate Request Syntax Requirements (Communication 1.3)', function () {

    /**
     * Alternate request syntax was removed from the IEEE specification.
     * 
     * This area is a bit vague, but for now we are assuming that this is simply not allowed
     * and will expect that the LRS 
     */
    describe('The LRS does NOT allow Alternate Request Syntax in xAPI 2.0', function () {
        
        it('An LRS rejects POST requests containing method query parameters', async function () {
            let alternateParams = {
                method: "GET"
            };

            let res = await requests.postToStatements(null, alternateParams, null);
            expect(res.status).to.be.within(400, 499);
        });

        it('An LRS rejects an alternate request syntax not issued as a POST', async function () {
            let alternateParams = {
                method: "POST"
            };

            let res = await requests.putToStatements(null, alternateParams, null);
            expect(res.status).to.be.within(400, 499);
        });

        it('An LRS rejects an alternate request syntax PUT issued as a POST', async function () {
            let alternateParams = {
                method: "PUT"
            };

            let res = await requests.postToStatements(null, alternateParams, null);
            expect(res.status).to.be.within(400, 499);
        });

        /**
         * From here on, these tests are pretty pointless now.
         * 
         * These will be removed in an upcoming version of the 2.0 test suite, but as this is a general cleanup,
         * updating the test quantity would warrant a version increment.
         */
        it('During an alternate request syntax the LRS treats the listed form parameters, \'Authorization\', \'X-Experience-API-Version\', \'Content-Type\', \'Content-Length\', \'If-Match\' and \'If-None-Match\', as header parameters (Communictation 1.3.s3.b7)', async function () {
            var alternateParams = {
                method: 'PUT'
            };
            var sID = oldHelpers.generateUUID();
            var formBody = {
                statementId: sID,
                'X-Experience-API-Version': '0.8',
                content: oldHelpers.buildStatement()
            }

            let res = await requests.postToStatements(formBody, alternateParams, null);
            expect(res.status).to.be.within(400, 499);
        });

        it('An LRS will reject an alternate request syntax which contains any extra information with error code 400 Bad Request (Communication 1.3.s3.b4)', async function () {
            var alternateParams = {
                method: 'PUT',
                statementId: sID
            };
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = oldHelpers.createFromTemplate(templates);
            var statement = data.statement;
            var sID = oldHelpers.generateUUID();
            
            var formBody = {
                statementId: sID,
                content: statement,
            };

            let res = await requests.postToStatements(formBody, alternateParams, null);
            expect(res.status).to.be.within(400, 499);
        });

        describe('An LRS will reject an alternate request syntax sending content which does not have a form parameter with the name of "content" (Communication 1.3.s3.b4)', function () {
            it('will reject PUT with content body which is url encoded', async function () {
                var headers = oldHelpers.addAllHeaders({});
                var auth = headers['Authorization'];
                var alternateParams = {
                    method: 'PUT'
                };

                var templates = [
                    {statement: '{{statements.default}}'}
                ];
                var statement = oldHelpers.createFromTemplate(templates).statement;
                var payload = {
                    statementId: oldHelpers.generateUUID(),
                    content: JSON.stringify(statement),
                    'X-Experience-API-Version': '2.0.0',
                    Authorization: auth
                };
                let headers = {
                    'content-type': 'application/x-www-form-urlencoded'
                };

                let res = await requests.postToStatements(payload, alternateParams, headers);
                expect(res.status).to.be.within(400, 499);
            });

            it('will reject PUT with no content body', async function () {
                let alternateParams = {
                    method: "PUT"
                };
    
                let res = await requests.postToStatements(null, alternateParams, null);
                expect(res.status).to.be.within(400, 499);
            });

            it('will reject PUT with content body which is not url encoded', async function () {
                var headers = oldHelpers.addAllHeaders({});
                var alternateParams = oldHelpers.getUrlEncoding({method: 'PUT'});
                var templates = [
                    {statement: '{{statements.default}}'}
                ];
                var statement = oldHelpers.createFromTemplate(templates).statement;
                headers['content-type'] = 'application/x-www-form-urlencoded';

                var payload = {
                    statementId: oldHelpers.generateUUID(),
                    content: JSON.stringify(statement),
                    'X-Experience-API-Version': '2.0.0'
                }

                let res = await requests.postToStatements(payload, alternateParams, null);
                expect(res.status).to.be.within(400, 499);
            });
        });
    });

});