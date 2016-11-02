/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */
(function (module) {
    "use strict";

    // defines overwriting data
    var INVALID_STRING = 'should fail';
    var INVALID_VERSION_0_9_9 = '0.9.9';
    var INVALID_VERSION_1_1_0 = '1.1.0';
    var VALID_VERSION_1_0 = '1.0';
    var VALID_VERSION_1_0_9 = '1.0.9';

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00101, Data 2.4.10 Version
             * An LRS rejects with error code 400 Bad Request, a Request which uses "version" and has the value set to anything but "1.0" or "1.0.x", where x is the semantic versioning number
             */
                name: 'An LRS rejects with error code 400 Bad Request, a Request which uses "version" and has the value set to anything but "1.0" or "1.0.x", where x is the semantic versioning number (Format, Data 2.4.10.s2.b1, Data 2.4.10.s3.b1, Communication 3.3.s3.b3, Communication 3.3.s3.b6, XAPI-00101)',
                config: [
                    {
                        name: 'statement "version" valid 1.0',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: VALID_VERSION_1_0}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement "version" valid 1.0.9',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: VALID_VERSION_1_0_9}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement "version" invalid string',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "version" invalid 0.9.9',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: INVALID_VERSION_0_9_9}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "version" invalid 1.1.0',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: INVALID_VERSION_1_1_0}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
