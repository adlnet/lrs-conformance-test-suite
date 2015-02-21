/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * Created by fwhorton on 2/20/15.
 * Riptide Software
 */
(function (module, process, request, should, helper) {
    "use strict"

    describe.only('Conformance Requirements', function () {

        var configurations = helper.getTestConfiguration();

        configurations.forEach(function(configuration) {
            describe(configuration.name, function () {

                configuration.config.forEach(function(test) {
                    it(test.name, function (done) {
                        if (!test.template && ! test.override) {
                            done('Invalid test: "' + test.name);
                            return;
                        }

                        try {
                            var data = {};

                            if (test.template) {
                                // builds template and combines override
                                var template = helper.getTemplate(test.template);
                                template.push(test.override);
                                // this handles if no override
                                data = helper.createTestObject(template);
                            } else {
                                // uses override
                                data = test.override;
                            }

                            var promise = request(helper.getEndpoint())
                                .post(helper.getEndpointStatements())
                                .headers(helper.addHeaderXapiVersion({}))
                                .json(data.statement);

                            promise.expect.apply(promise, test.expect).end(done);
                        } catch(error) {
                            done('Invalid test: "' + test.name + '" with error: ' + error.message);
                            return;
                        }
                    });
                });
            });
        });
    });

}(module, process, require('super-request'), require('should'), require('./../helper')));
