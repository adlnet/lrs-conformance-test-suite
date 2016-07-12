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
                name: 'Contexts Verify Templates',
                config: [
                    {
                        name: 'should pass statement context template',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass substatement context template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A "registration" property is a UUID (Type, 4.1.6.table1.row1.a)',
                config: [
                    {
                        name: 'statement context "registration" is object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {registration: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "registration" is string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {registration: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "registration" is object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {registration: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "registration" is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {registration: INVALID_STRING}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An "instructor" property is an Agent (Type, 4.1.6.table1.row2.a)',
                config: [
                    {
                        name: 'statement context "instructor" is object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "instructor" is string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "instructor" is object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "instructor" is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: INVALID_STRING}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An "team" property is a Group (Type, 4.1.6.table1.row3.a)',
                config: [
                    {
                        name: 'statement context "team" is agent',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "team" is object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "team" is string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "team" is agent',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "team" is object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "team" is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: INVALID_STRING}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "contextActivities" property is an Object (Type, 4.1.5.table1.row4.a)',
                config: [
                    {
                        name: 'statement context "contextActivities" is string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {contextActivities: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "contextActivities" is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {contextActivities: INVALID_STRING}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "contextActivities" property contains one or more key/value pairs (Format, 4.1.a, 4.1.6.2.b)',
                config: [
                    {
                        name: 'statement context "contextActivities" is empty',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {contextActivities: {}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "contextActivities" is empty',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {contextActivities: {}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "contextActivities" property\'s "key" has a value of "parent", "grouping", "category", or "other" (Format, 4.1.6.2.a)',
                config: [
                    {
                        name: 'statement context "contextActivities" is "parent"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'}
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
                        name: 'statement substatement context "contextActivities" is "parent"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'}
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
                    }
                ]
            },
            {
                name: 'A "contextActivities" property\'s "value" is an Activity (Format, 4.1.6.2.a)',
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
                    }
                ]
            },
            {
                name: 'A ContextActivity is defined as a single Activity of the "value" of the "contextActivities" property (definition)',
                config: [
                    {
                        name: 'statement context "contextActivities parent" value is activity',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.parent}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities grouping" value is activity',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.grouping}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities category" value is activity',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.category}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context "contextActivities other" value is activity',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.other}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities parent" value is activity',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.parent}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities grouping" value is activity',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.grouping}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities category" value is activity',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.category}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context "contextActivities other" value is activity',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.other}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A "revision" property is a String (Type, 4.1.6.table1.row5.a)',
                config: [
                    {
                        name: 'statement context "revision" is numeric',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {revision: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "revision" is object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {revision: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "revision" is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {revision: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "revision" is object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {revision: INVALID_OBJECT}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A Statement cannot contain both a "revision" property in its "context" property and have the value of the "object" property\'s "objectType" be anything but "Activity" (4.1.6.a)',
                config: [
                    {
                        name: 'statement context "revision" is invalid with object agent',
                        templates: [
                            {statement: '{{statements.object_agent_default}}'},
                            {context: '{{contexts.no_platform}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "revision" is invalid with object group',
                        templates: [
                            {statement: '{{statements.object_group_default}}'},
                            {context: '{{contexts.no_platform}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "revision" is invalid with statementref',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {context: '{{contexts.no_platform}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "revision" is invalid with substatement',
                        templates: [
                            {statement: '{{statements.object_substatement_default}}'},
                            {context: '{{contexts.no_platform}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "revision" is invalid with object agent',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.agent_default}}'},
                            {context: '{{contexts.no_platform}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "revision" is invalid with object group',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.group_default}}'},
                            {context: '{{contexts.no_platform}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "revision" is invalid with statementref',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'},
                            {context: '{{contexts.no_platform}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "platform" property is a String (Type, 4.1.6.table1.row6.a)',
                config: [
                    {
                        name: 'statement context "platform" is numeric',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {platform: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "platform" is object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {platform: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "platform" is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {platform: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "platform" is object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {platform: INVALID_OBJECT}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A Statement cannot contain both a "platform" property in its "context" property and have the value of the "object" property\'s "objectType" be anything but "Activity" (4.1.6.b)',
                config: [
                    {
                        name: 'statement context "platform" is invalid with object agent',
                        templates: [
                            {statement: '{{statements.object_agent_default}}'},
                            {context: '{{contexts.no_revision}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "platform" is invalid with object group',
                        templates: [
                            {statement: '{{statements.object_group_default}}'},
                            {context: '{{contexts.no_revision}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "platform" is invalid with statementref',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {context: '{{contexts.no_revision}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "platform" is invalid with substatement',
                        templates: [
                            {statement: '{{statements.object_substatement_default}}'},
                            {context: '{{contexts.no_revision}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "platform" is invalid with object agent',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.agent_default}}'},
                            {context: '{{contexts.no_revision}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "platform" is invalid with object group',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.group_default}}'},
                            {context: '{{contexts.no_revision}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "platform" is invalid with statementref',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'},
                            {context: '{{contexts.no_revision}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "language" property is a String (Type, 4.1.6.table1.row7.a)',
                config: [
                    {
                        name: 'statement context "language" is numeric',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {language: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "language" is object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {language: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "language" is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {language: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "language" is object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {language: INVALID_OBJECT}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "language" property follows RFC5646 (Format, 4.1.6.table1.row7.a, RFC5646)',
                config: [
                    {
                        name: 'statement context "language" is is invalid language',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {language: INVALID_LANGUAGE}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "language" is is invalid language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {language: INVALID_LANGUAGE}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "statement" property is a Statement Reference (Type, 4.1.6.table1.row8.a)',
                config: [
                    {
                        name: 'statement context "statement" invalid with "statementref"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {statement: {objectType: 'statementref'}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "statement" invalid with "id" not UUID',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {statement: {id: INVALID_STRING}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "statement" invalid with "statementref"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {statement: {objectType: 'statementref'}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "statement" invalid with "id" not UUID',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            {statement: {id: INVALID_STRING}}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
