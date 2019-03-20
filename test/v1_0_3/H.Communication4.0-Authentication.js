/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function(module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect)
{

	describe('Authentication Requirements (Communication 4.0)', function()
	{

		/**  XAPI-00334, Communication 2.1.3 GET Statements
		 * An LRS rejects a Statement of bad authorization (either authentication needed or failed credentials) with error code 401 Unauthorized
		 */
		describe('An LRS rejects a Statement of bad authorization, either authentication needed or failed credentials, with error code 401 Unauthorized (Authentication, Communication 4.0, XAPI-00334)', function()
        {
            // This test was not allowing for different, non-standardized prioritizations of request statuses
            // when rejecting Requests based on Authentication.  An LRS may receive a request with bad credentials,
            // but place higher priority on an improper header -- returning 400 for that header violation.  This test
            // has been updated to first check that bad credentials receive a 401 and then check that bad credentials
            // AND invalid headers receive either 400 or 401.
            //
            // Identical changes were made to the 1.0.2 test for Authentication in v1_0_2/non_templating.js.

            it("fails when given a random name pass pair", function (done) {
                if (global.OAUTH) {
                    done();
                }
                else {
                    var templates = [
                        {
                            statement: '{{statements.default}}'
                        }];
                    var data = helper.createFromTemplate(templates);
                    data = data.statement;
                    data.id = helper.generateUUID();
                    var headers = helper.addAllHeaders({});

                    //warning: this ".\\" is super important. Node caches the modules, and the superrequest module has been modified to work correctly
                    //with oauth already. We get a new verions by appending some other characters to defeat the cache.
                    if (global.OAUTH)
                        request = require('.\\super-request');
                    else
                        headers["Authorization"] = 'Basic ' + new Buffer('RobCIsNot:AUserOnThisLRS123').toString('base64');

                    // Assuming everything is fine, minus the auth credentials
                    request(helper.getEndpointAndAuth())
                        .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                        .headers(headers)
                        .json(data)
                        .expect(401)
                        .end();

                    // In the case of BOTH a bad header situation AND bad auth, the LRS can return either 401 or 400
                    headers["X-Experience-API-Version"] = "BAD";

                    request(helper.getEndpointAndAuth())
                        .get(helper.getEndpointStatements())
                        .headers(headers)
                        .end(function (err, res) {

                            if (res.statusCode === 400 || res.statusCode === 401) {
                                done();
                            } else {
                                done("Response should have been either 401 or 400.");
                            }

                        });
                }
            });

            it('fails with a malformed header', function (done) {
                if (global.OAUTH) {
                    done();
                }
                else {
                    var templates = [
                        {
                            statement: '{{statements.default}}'
                        }];
                    var data = helper.createFromTemplate(templates);
                    data = data.statement;
                    data.id = helper.generateUUID();
                    var headers = helper.addAllHeaders(
                        {});

                    //warning: this ".\\" is super important. Node caches the modules, and the superrequest module has been modified to work correctly
                    //with oauth already. We get a new verions by appending some other characters to defeat the cache.
                    if (global.OAUTH)
                        request = require('.\\super-request');
                    else
                        headers["Authorization"] = 'Basic:' + new Buffer('RobCIsNot:AUserOnThisLRS').toString('base64'); //note bad encoding here.

                    request(helper.getEndpointAndAuth())
                        .put(helper.getEndpointStatements() + '?statementId=' + data.id)
                        .headers(headers)
                        .json(data)
                        .expect(401)
                        .end();

                    // Same as above
                    headers["X-Experience-API-Version"] = "BAD";

                    request(helper.getEndpointAndAuth())
                        .get(helper.getEndpointStatements())
                        .headers(headers)
                        .end(function (err, res) {

                            if (res.statusCode === 400 || res.statusCode === 401) {
                                done();
                            } else {
                                done("Response should have been either 401 or 400.");
                            }

                        });
                }
            });
        });


		/**  XAPI-00335, Communication 2.1.3 GET Statements
		 * An LRS must support HTTP Basic Authentication
		 */
		//WARNING: This might not be a great test. OAUTH will override it
		it('An LRS must support HTTP Basic Authentication (Authentication, Communication 4.0, XAPI-00335)', function(done)
		{
			if (global.OAUTH)
			{
				done();
			}
			else
			{
				var templates = [
				{
					statement: '{{statements.default}}'
				}];
				var data = helper.createFromTemplate(templates);
				data = data.statement;
				data.id = helper.generateUUID();
				var headers = helper.addAllHeaders(
				{});

				request(helper.getEndpointAndAuth())
					.put(helper.getEndpointStatements() + '?statementId=' + data.id)
					.headers(headers)
					.json(data)
					.expect(204, done);
			}
		});

	});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
