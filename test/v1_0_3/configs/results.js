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
                name: 'Results Verify Templates',
                config: [
                    {
                        name: 'should pass statement result template',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass substatement result template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A "score" property is an Object (Type, Data 2.4.5.1)',
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
                name: 'A "score" Object\'s "scaled" property is a Decimal accurate to seven significant decimal figures (Type, Data 2.4.5.1.s2.table1.row1)',
                config: [
                    {
                        name: 'statement result "scaled" accepts seven significant decimal',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {scaled: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "scaled" accepts seven significant decimal',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {scaled: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A "score" Object\'s "raw" property is a Decimal accurate to seven significant decimal figures (Type, Data 2.4.5.1.s2.table1.row2)',
                config: [
                    {
                        name: 'statement result "raw" accepts seven significant decimal',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {raw: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "raw" accepts seven significant decimal',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {raw: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A "score" Object\'s "min" property is a Decimal accurate to seven significant decimal figures (Type, Data 2.4.5.1.s2.table1.row3)',
                config: [
                    {
                        name: 'statement result "min" accepts seven significant decimal',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {min: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "min" accepts seven significant decimal',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {min: VALID_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A "score" Object\'s "max" property is a Decimal accurate to seven significant decimal figures (Type, Data 2.4.5.1.s2.table1.row4)',
                config: [
                    {
                        name: 'statement result "max" accepts seven significant decimal',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {max: VALID_MAX_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "max" accepts seven significant decimal',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {max: VALID_MAX_DECIMAL_DIGITS}}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A "success" property is a Boolean (Type, ata 2.4.5.s2.table1.row1)',
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
                name: 'A "completion" property is a Boolean (Type, Data 2.4.5.s2.table1.row2)',
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
                name: 'A "response" property is a String (Type, Data 2.4.5.s2.table1.row3)',
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
                name: 'A "duration" property is a formatted to ISO 8601 (Type, Data 2.4.5.s2.table1.row4)',
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
                    }
                ]
            },
            {
                name: 'A "duration" property keeps at least 0.01 seconds of precision (Type, Data 2.4.5.s2.table1.row4)',
                config: [
                    {
                        name: 'statement result "duration" property is invalid',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: VALID_DURATION}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result "duration" property is invalid',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            {duration: VALID_DURATION}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'An "extensions" property is an Object (Type, Data 2.4.5.s2.table1.row6)',
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
            },
            {
                name: 'An LRS stores 32-bit floating point numbers with at least the precision of IEEE 754 (Data 2.2.s4.b3)',
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
