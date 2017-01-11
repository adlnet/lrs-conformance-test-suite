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
    var INVALID_DURATION = 'PA1H0M0S';
    var INVALID_NUMERIC = 12345;
    var INVALID_OBJECT = {key: 'invalid'};
    var INVALID_STRING = 'should fail';
    var VALID_DURATION = 'PT1H0M0.1S';

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00124, Data 2.4.5 result
             * A Duration MUST be expressed using the format for Duration in ISO 8601:2004(E) section 4.4.3.2. The alternative format (in conformity with the format used for time points and described in ISO 8601:2004(E) section 4.4.3.3) MUST NOT be used. The LRS rejects with 400 a statement which includes the “duration” property and the value does not validate to ISO 8601:2004(E) section 4.4.3.2.
             */
                name: 'A Duration MUST be expressed using the format for Duration in ISO 8601:2004(E) section 4.4.3.2. (Type, Data 4.6.s1.b1, XAPI-00124)',
                config: [
                    {
                        name: 'statement result "duration" property is valid',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: VALID_DURATION}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "duration" property is valid',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: VALID_DURATION}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "duration" property is invalid with invalid string',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "duration" property is invalid',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result "duration" property is invalid with invalid number',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "duration" property is invalid invalid number',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result "duration" property is invalid with invalid object',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "duration" property is invalid with invalid object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result "duration" property is invalid with invalid duration',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_DURATION}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "duration" property is invalid with invalid duration',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_DURATION}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result "duration" property is valid with "PT4H35M59.14S"',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'PT4H35M59.14S'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "duration" property is valid with "PT16559.14S"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'PT16559.14S'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "duration" property is valid with "P3Y1M29DT4H35M59.14S"',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'P3Y1M29DT4H35M59.14S'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "duration" property is valid with "P3Y"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'P3Y'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "duration" property is valid with "P4W"',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'P4W'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "duration" property is invalid with "P4W1D"',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'P4W1D'}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
