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
    var INVALID_LANGUAGE = {a12345: 'should fail'};
    var INVALID_NUMERIC = 12345;
    var INVALID_OBJECT = {key: 'should fail'};
    var INVALID_STRING = 'should fail';
    var VALID_ACTIVITY = {
        "objectType": "Activity",
        "id": "http://www.example.com/meetings/occurances/34534"
    };

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00093, Data 2.4.6.2 ContextActivities Property
             * A "contextActivities" property's "key" has a value of "parent", "grouping", "category", or "other". The LRS rejects with 400 Bad Request a statement which has a key other than "parent", "grouping", "category", or "other" for the “contextActivities” property
             */
                name: 'A "contextActivities" property\'s "key" has a value of "parent", "grouping", "category", or "other" (Format, Data 2.4.6.2.s4.b1, XAPI-00093)',
                config: [
                    {
                        name: 'statement context "contextActivities" is "parent"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.parent}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities" is "grouping"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.grouping}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities" is "category"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.category}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities" is "other"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.other}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities" accepts all property keys "parent", "grouping", "category", and "other"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.all_activities}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities" rejects any property key other than "parent", "grouping", "category", or "other"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.invalid_activity}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "contextActivities" is "parent"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.parent}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities" is "grouping"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.grouping}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities" is "category"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.category}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities" is "other"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.other}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities" accepts all property keys "parent", "grouping", "category", and "other"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.all_activities}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities" rejects any property key other than "parent", "grouping", "category", or "other"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.invalid_activity}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00094, Data 2.4.6.2 ContextActivities Property
             * A "contextActivities" property's "value" is an Activity. The LRS rejects with 400 Bad Request a statement which has a value which is not an Activity for the “contextActivities” property.
             */
                name: 'A "contextActivities" property\'s "value" is an Activity (Format, Data 2.4.6.2.s4.b2, XAPI-00094)',
                config: [
                    {
                            name: 'statement context "contextActivities parent" value is activity array',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.parent}}'},
                            {
                                contextActivities: {
                                    parent: [VALID_ACTIVITY]
                                }
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities grouping" value is activity array',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.grouping}}'},
                            {
                                contextActivities: {
                                    grouping: [VALID_ACTIVITY]
                                }
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities category" value is activity array',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.category}}'},
                            {
                                contextActivities: {
                                    category: [VALID_ACTIVITY]
                                }
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities other" value is activity array',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.other}}'},
                            {
                                contextActivities: {
                                    other: [VALID_ACTIVITY]
                                }
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context contextActivities property\'s value is activity array with activities',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.other}}'},
                            {
                                contextActivities: {
                                    other: [VALID_ACTIVITY, INVALID_OBJECT]
                                }
                            }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "contextActivities parent" value is activity array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.parent}}'},
                            {
                                contextActivities: {
                                    parent: [VALID_ACTIVITY]
                                }
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities grouping" value is activity array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.grouping}}'},
                            {
                                contextActivities: {
                                    grouping: [VALID_ACTIVITY]
                                }
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities category" value is activity array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.category}}'},
                            {
                                contextActivities: {
                                    category: [VALID_ACTIVITY]
                                }
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities other" value is activity array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.other}}'},
                            {
                                contextActivities: {
                                    other: [VALID_ACTIVITY]
                                }
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities property\'s value is activity array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.other}}'},
                            {
                                contextActivities: {
                                    other: [INVALID_OBJECT, VALID_ACTIVITY]
                                }
                            }
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
