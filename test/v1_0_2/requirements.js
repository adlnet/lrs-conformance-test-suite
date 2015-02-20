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

        var mapping = helper.getJsonMapping();
        var configurations = helper.getTestConfiguration();

        configurations.forEach(function(configuration) {
            describe(configuration.name, function () {

                configuration.config.forEach(function(test) {
                    it(test.name, function (done) {
                        try {
                            var template = helper.getTemplate(mapping, test.template);
                            template.push(test.override);
                            var data = helper.createTestObject(template);

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
