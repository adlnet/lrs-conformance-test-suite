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
            /**  XAPI-00079, Data 2.4.5.1 score
             * A "score" property is an Object. The LRS rejects with 400 Bad Request a “score” property which is not a valid object.
             */
                name: 'A "score" property is an Object (Type, Data 2.4.5.1, XAPI-00079)',
                config: [
                    {
                        name: 'statement result score numeric',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result score string',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result score numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result score string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: INVALID_STRING}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00083, Data 2.4.5.1 score
             * If the "score" Object uses the "scaled" property, the value must be a decimal number between -1 and 1. The LRS rejects with 400 Bad Request a statement with a Result Object using the “scaled” property (if it is present) which is not a decimal number or is greater than 1 or less than -1.
             */
                name: 'A "score" Object\'s "scaled" property is a decimal number between -1 and 1, inclusive. (Type, Data 2.4.5.1.s2.table1.row1, XAPI-00083)',
                config: [
                    {
                        name: 'statement result "scaled" accepts decimal',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {scaled: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "scaled" accepts decimal',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {scaled: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "scaled" should pass with value 1.0',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {scaled: 1.0}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "scaled" pass with value -1.0000',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {scaled: -1.0000}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "scaled" should reject with value 1.01',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {scaled: 1.01}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "scaled" reject with value -1.00001',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {scaled: -1.00001}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00082, Data 2.4.5.1 score
             * If the "score" Object uses the "raw" property, the value must be a decimal number between the "min" and "max", if they are present. If they are not present "raw" can be any number. The LRS rejects with 400 Bad Request a statement with a Result Object using the “raw” property (if it is present) which is not a decimal number or is greater than the value of the “max” property, if it is present, or lesser than the value of the “min” property, if it is present.
             */
                name: 'A "score" Object\'s "raw" property is a decimal number between min and max, if present and otherwise unrestricted, inclusive (Type, Data 2.4.5.1.s2.table1.row2, XAPI-00082)',
                config: [
                    {
                        name: 'statement result "raw" accepts decimal',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {raw: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "raw" accepts decimal',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {raw: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "raw" rejects raw greater than max',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {raw: VALID_DECIMAL_DIGITS, max: VALID_DECIMAL_DIGITS - 0.02}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "raw" rejects raw greater than max',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {raw: VALID_DECIMAL_DIGITS, max: VALID_DECIMAL_DIGITS - 2}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result "raw" rejects raw less than min',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {raw: VALID_DECIMAL_DIGITS, min: VALID_DECIMAL_DIGITS + 0.73}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "raw" rejects raw less than min',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {raw: VALID_DECIMAL_DIGITS, min: VALID_DECIMAL_DIGITS + 7}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /** XAPI-00081, Data 2.4.5.1 score
             * If the "score" Object uses the "min" property, the value must be a decimal number less than the "max" property, if it is present. If "max" is not present "min" can be any number. The LRS rejects with 400 Bad Request a statement with a Result Object using the “min” property (if it is present) which is not a decimal number or is greater than the value of the “max” property, if it is present.
             */
                name: 'A "score" Object\'s "min" property is a decimal number less than the "max" property, if it is present. (Type, Data 2.4.5.1.s2.table1.row3, XAPI-00081)',
                config: [
                    {
                        name: 'statement result "min" accepts decimal',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {min: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "min" accepts decimal',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {min: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "min" rejects decimal number greater than "max"',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {min: VALID_DECIMAL_DIGITS, max: VALID_DECIMAL_DIGITS - 0.0000321, raw: VALID_DECIMAL_DIGITS - 0.0000033}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "min" rejects decimal number greater than "max"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {min: VALID_DECIMAL_DIGITS, max: VALID_DECIMAL_DIGITS - 4, raw: VALID_DECIMAL_DIGITS - 1}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00080, Data 2.4.5.1 score
             * If the "score" Object uses the "max" property, the value must be a decimal number more than the "min" property, if it is present. If "min" is not present "max" can be any number. The LRS rejects with 400 Bad Request a statement with a Result Object using the “max” property (if it is present) which is not a decimal number or is lesser than the value of the “min” property, if it is present.
             * If this is the test, this will need to be moved, so that the result can be checked, oh no now that i read closer, no get and check it needed just a couple more tests sending in particular configurations of min and max and expecting 400's or 200's
             */
                name: 'A "score" Object\'s "max" property is a Decimal accurate to seven significant decimal figures (Type, Data 2.4.5.1.s2.table1.row4, XAPI-00080)',
                config: [
                    {
                        name: 'statement result "max" accepts a decimal number more than the "min" property, if it is present.',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {max: VALID_MAX_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "max" accepts a decimal number more than the "min" property, if it is present.',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {max: VALID_MAX_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result "max" accepts a decimal number more than the "min" property, if it is present.',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {max: VALID_MAX_DECIMAL_DIGITS, min: VALID_MAX_DECIMAL_DIGITS + 4, raw: VALID_MAX_DECIMAL_DIGITS + 1}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result "max" accepts a decimal number more than the "min" property, if it is present.',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {max: VALID_MAX_DECIMAL_DIGITS, raw: VALID_MAX_DECIMAL_DIGITS + 10, min: VALID_MAX_DECIMAL_DIGITS + 100}}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
