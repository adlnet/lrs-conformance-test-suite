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
            /**  XAPI-00087-1, Data 2.4.6 Context
             * A "registration" property is a UUID. The LRS rejects with 400 Bad Request a statement with a “registration” property which is not a valid UUID.
             */
                name: 'A "registration" property is a UUID (Type, Data 2.4.6.s3.table1.row1, XAPI-00087-1)',
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
            /**  XAPI-00087-2, Data 2.4.6 Context
             * An "instructor" property is an Agent. The LRS rejects with 400 Bad Request a statement with an “instructor” property which is not a valid Agent.
             */
                name: 'An "instructor" property is an Agent (Type, Data 2.4.6.s3.table1.row2, XAPI-00087-2)',
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
            /**  XAPI-00088, Data 2.4.6 Context
             * A "team" property is a Group. The LRS rejects with 400 Bad Request a statement with a “team” property which is not a valid Group.
             */
                name: 'An "team" property is a Group (Type, Data 2.4.6.s3.table1.row3, XAPI-00088)',
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
            /**  XAPI-00086, Data 2.4.6 Context
             * A "contextActivities" property is an Object. The LRS rejects with 400 Bad Request a statement with a “contextActivities” property which is not a valid object.
             */
                name: 'A "contextActivities" property is an Object (Type, Data 2.4.6.s3.table1.row4, XAPI-00086)',
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
            /**  XAPI-00089, Data 2.4.6 Context
             * A "revision" property is a String. The LRS rejects with 400 Bad Request a statement with a “revision” property which is not a valid string.
             */
                name: 'A "revision" property is a String (Type, Data 2.4.6.s3.table1.row5, XAPI-00089)',
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
            /**  XAPI-00084, Data 2.4.6 Context
            * A Statement cannot contain both a "revision" property in its "context" property and have the value of the "object" property's "objectType" be anything but "Activity". The LRS rejects a statement with 400 Bad Request if contains a "revision" property in its "context" property and does not have an Object with an “objectType” value of “activity” or an Object where the “objectType” property is absent.
            */
                name: 'A Statement cannot contain both a "revision" property in its "context" property and have the value of the "object" property\'s "objectType" be anything but "Activity" (Data 2.4.6.s4.b1, XAPI-00084)',
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
                        name: 'statement context "revision" is valid with no ObjectType',
                        templates: [
                            {statement: '{{statements.context_sans_objectType}}'},
                            {context: '{{contexts.no_platform}}'}
                        ],
                        expect: [200]
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
                    },
                    {
                        name: 'statement substatement context "revision" is valid with no objectType',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{statements.context_sans_objectType}}'},
                            {context: '{{contexts.no_platform}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00090, Data 2.4.6 Context
             * A "platform" property is a String. The LRS rejects with 400 Bad Request a statement with a “platform” property which is not a valid string.
             */
                name: 'A "platform" property is a String (Type, Data 2.4.6.s3.table1.row6, XAPI-00090)',
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
            /**  XAPI-00085, Data 2.4.6 Context
            * A Statement cannot contain a "platform" property in its "context" property and have the value of the "object" property's "objectType" be anything but "Activity". The LRS rejects a statement with 400 Bad Request if contains a "platform" property in its "context" property and does not have an Object with an “objectType” value of “activity” or an Object where the “objectType” property is absent.
            */
                name: 'A Statement cannot contain both a "platform" property in its "context" property and have the value of the "object" property\'s "objectType" be anything but "Activity" (Data 2.4.6.s4.b2, XAPI-00085)',
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
                        name: 'statement context "platform" is valid with empty objectType',
                        templates: [
                            {statement: '{{statements.context_sans_objectType}}'},
                            {context: '{{contexts.no_revision}}'}
                        ],
                        expect: [200]
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
                    },
                    {
                        name: 'statement substatement context "platform" is valid with empty ObjectType',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{statements.context_sans_objectType}}'},
                            {context: '{{contexts.no_revision}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00091, Data 2.4.6 Context
             * A "language" property is a String which follows RFC 5646. The LRS rejects with 400 Bad Request a statement with a “language” property which is not a valid RFC 5646 string.
             * And see below
             */
                name: 'A "language" property is a String (Type, Data 2.4.6.s3.table1.row7, XAPI-00091)',
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
                    },
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
            /**  XAPI-00092, Data 2.4.6 Context
             * A "statement" property is a Statement Reference. The LRS rejects with 400 Bad Request a statement with a “statement” property which is not a valid StatementRef.
             */
                name: 'A "statement" property is a Statement Reference (Type, Data 2.4.6.s3.table1.row8, XAPI-00092)',
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
