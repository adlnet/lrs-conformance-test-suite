/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, process, request, should, helper) {
    "use strict";


    if(global.OAUTH)
        request = helper.OAuthRequest(request);

        module.exports = {
            /**
             * select template to be run
             * @returns {Object}
             */

    createTemplate: function(templateName) {

        var configurations = helper.getSingleTestConfiguration(templateName);

        configurations.forEach(function(configuration) {
            describe(configuration.name, function () {
                configuration.config.forEach(function(test) {
                    it(test.name, function (done) {
                        if (!test.templates && !test.json) {
                            done('Invalid test: "' + test.name);
                            return;
                        }

                        try {
                            var data = {};
                            if (test.templates) {
                                // Convert template mapping to JSON objects.
                                var converted = helper.convertTemplate(test.templates);
                                // This handles if no override.
                                var mockObject = helper.createTestObject(converted);
                                var key = Object.keys(mockObject);
                                data = mockObject[key];
                            } else {
                                data = test.json;
                            }

                            var promise = request(helper.getEndpointAndAuth())
                                .post(helper.getEndpointStatements())
                                .headers(helper.addAllHeaders({}))
                                .json(data);

                            promise.expect.apply(promise, test.expect).end(done);
                        } catch(error) {
                            done('Invalid test: "' + test.name + '" with error: ' + error.message);
                            return;
                        }
                    });
                });
            });
        });
    }
  };

}(module, process, require('super-request'), require('should'), require('./helper')));
