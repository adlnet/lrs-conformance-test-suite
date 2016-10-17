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
    var INVALID_DATE = '01/011/2015';
    var INVALID_NUMERIC = 12345;
    var INVALID_OBJECT = {key: 'should fail'};
    var INVALID_STRING = 'should fail';
    var INVALID_UUID_TOO_MANY_DIGITS = 'AA97B177-9383-4934-8543-0F91A7A028368';
    var INVALID_UUID_INVALID_LETTER = 'MA97B177-9383-4934-8543-0F91A7A02836';
    var VALID_EXTENSION = {extensions: {'http://example.com/null': null}};
    var INVALID_ACCOUNT_NAME_IRL = {account: {name: INVALID_OBJECT}};

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'Statements Verify Templates',
                config: [
                    {
                        name: 'should pass statement template',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: '2013-05-18T05:32:34.804Z'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00003, 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement which does not contain an "actor" property
             */
                name: 'A Statement contains an "actor" property (Multiplicity, Data 2.2.s2.b3, XAPI-00003)',
                config: [
                    {
                        name: 'statement "actor" missing',
                        templates: [
                            {statement: '{{statements.no_actor}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00004, 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement which does not contain a "verb" property
             */
                name: 'A Statement contains a "verb" property (Multiplicity, Data 2.2.s2.b3, XAPI-00004)',
                config: [
                    {
                        name: 'statement "verb" missing',
                        templates: [
                            {statement: '{{statements.no_verb}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00005, 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement which does not contain an "object" property
             */
                name: 'A Statement contains an "object" property (Multiplicity, Data 2.2.s2.b3, XAPI-00005)',
                config: [
                    {
                        name: 'statement "object" missing',
                        templates: [
                            {statement: '{{statements.no_object}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00123, Data 4.5 ISO8601 Timestamps
             * A Timestamp must conform to ISO 8601 Date format. An LRS rejects a statement with a Timestamp which doesn’t validate to ISO 8601 Extended or ISO 8601 Basic.
             */
                name: 'A TimeStamp is defined as a Date/Time formatted according to ISO 8601 (Format, Data 4.5.s1.b1, ISO8601, XAPI-00123)',
                config: [
                    {
                        name: 'statement "template" invalid string',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "template" invalid date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_DATE}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00022, Data 2.4 Statement Properties
             * A "timestamp" property is a TimeStamp, per section 4.5. An LRS rejects with 400 Bad Request a statement if it has a TimeStamp and that TimeStamp is invalid.
             */
                name: 'A "timestamp" property is a TimeStamp (Type, Data 2.4.s1.table1.row7)',
                config: [
                    {
                        name: 'statement "template" invalid string',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "template" invalid date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_DATE}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00001, 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request any Statement having a property whose value is set to "null", an empty object, or has no value, except in an "extensions" property
             */
                name: 'An LRS rejects with error code 400 Bad Request any Statement having a property whose value is set to "null", except in an "extensions" property (Data 2.2.s4.b1.b1, XAPI-00001)',
                config: [
                    {
                        name: 'statement actor should fail on "null"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            {name: null}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement verb should fail on "null"',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.default}}'},
                            {display: {'en-US': null}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context should fail on "null"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {registration: null}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object should fail on "null"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: {moreInfo: null}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: VALID_EXTENSION}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extensions can be empty',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            VALID_EXTENSION
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions can be empty',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            VALID_EXTENSION
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: VALID_EXTENSION}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            VALID_EXTENSION
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            VALID_EXTENSION
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00006, Data 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement which uses the wrong data type
             */
                name: 'An LRS rejects with error code 400 Bad Request a Statement which uses the wrong data type (Data 2.2.s4.b2)',
                config: [
                    {
                        name: 'with strings where numbers are required',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {max: 'one hundred'}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'even if those strings contain numbers',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {max: '100'}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'with strings where booleans are required',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {success: 'We regret to inform you that your effort was unsuccessful.'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'even if those strings contain booleans',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {completion: 'false'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00007, Data 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement which uses any non-format-following key or value, including the empty string, where a string with a particular format (such as mailto IRI, UUID, or IRI) is required.
             * Additional UUID tests in uuids.js xapi-00027 & 28
             * IFI's covered in actors.js xapi-0038
             */
                name: 'An LRS rejects with error code 400 Bad Request a Statement which uses any non-format-following key or value, including the empty string, where a string with a particular format (such as mailto IRI, UUID, or IRI) is required. (Data 2.2.s4.b4)',
                config: [
                    {
                        name: 'statement "id" invalid numeric',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "id" invalid object',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "id" invalid UUID with too many digits',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_UUID_TOO_MANY_DIGITS}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "id" invalid UUID with non A-F',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_UUID_INVALID_LETTER}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
