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
    var VALID_DECIMAL_DIGITS = .6767676;
    var VALID_MAX_DECIMAL_DIGITS = 100.6767676;

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00074, Data 2.4.5 result
             * A "success" property is a Boolean. The LRS rejects with 400 Bad Request a Statement which has a Result Object with a “success” property which does not have a valid Boolean value, if present.
             */
                name: 'A "success" property is a Boolean (Type, Data 2.4.5.s2.table1.row1, XAPI-00074)',
                config: [
                    {
                        name: 'statement result "success" property is string "true"',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {success: 'true'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result "success" property is string "false"',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {success: 'false'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "success" property is string "true"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {success: 'true'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "success" property is string "false"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {success: 'false'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00075, Data 2.4.5 result
             * A "completion" property is a Boolean. The LRS rejects with 400 Bad Request a Statement which has a Result Object with a “completion” property which does not have a valid Boolean value, if present.
             */
                name: 'A "completion" property is a Boolean (Type, Data 2.4.5.s2.table1.row2, XAPI-00075)',
                config: [
                    {
                        name: 'statement result "completion" property is string "true"',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {completion: 'true'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result "completion" property is string "false"',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {completion: 'false'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "completion" property is string "true"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {completion: 'true'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "completion" property is string "false"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {completion: 'false'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00076, Data 2.4.5 result
             * A "response" property is a String. The LRS rejects with 400 Bad Request a Statement which has a Result Object with a “response” property which does not have a valid String value, if present.
             */
                name: 'A "response" property is a String (Type, Data 2.4.5.s2.table1.row3, XAPI-00076)',
                config: [
                    {
                        name: 'statement result "response" property is numeric',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {response: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result "completion" property is object',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {response: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "completion" property is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {response: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "completion" property is object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {response: INVALID_OBJECT}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00077, Data 2.4.5 result
             * A "duration" property is a formatted to ISO 8601 durations (see Data 4.6). The LRS rejects with 400 Bad Request a Statement which has a Result Object with a “duration” property which does not have a valid ISO 8601 value, if present.
             */
                name: 'A "duration" property is a formatted to ISO 8601 (Type, Data 2.4.5.s2.table1.row4, XAPI-00077)',
                config: [
                    {
                        name: 'statement result "duration" property is invalid',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_DURATION}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "duration" property is invalid',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_DURATION}
                        ],
                        expect: [400]
                    },
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
                        name: 'statement result "duration" property is valid',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'PT4H35M59.14S'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "duration" property is valid',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'PT16559.14S'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "duration" property is valid',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'P3Y1M29DT4H35M59.14S'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "duration" property is valid',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'P3Y'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "duration" property is valid',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: 'P4W'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00078, Data 2.4.5 result
             * An "extensions" property is an Object. The LRS rejects with 400 Bad Request a Statement which has a Result Object with aa “extensions” property which does not have a valid Extensions Object, if present.
             */
                name: 'An "extensions" property is an Object (Type, Data 2.4.5.s2.table1.row6, XAPI-00078)',
                config: [
                    {
                        name: 'statement result "extensions" property is numeric',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result "extensions" property is string',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "extensions" property is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "extensions" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: INVALID_STRING}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
