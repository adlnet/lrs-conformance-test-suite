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
    var INVALID_IRI = 'ab=c://should.fail.com';
    var INVALID_NUMERIC = 12345;
    var INVALID_OBJECT = {something: 'value'};
    var INVALID_STRING = 'should error';
    var VALID_ACTIVITY = {id: 'http://www.example.com/meetings/occurances/34534'};
    var VALID_EXTENSION_COMPONENT = {
        'id': 'valid',
        'description': {
            'en-US': 'valid'
        }
    }

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00047, Data 2.4.4.1 when the objectType is activity
             * An "object" property uses the "id" property exactly one time. The LRS must reject with 400 Bad Request an otherwise legal statement if the object's objectType is Activity and the object's “id” is not an IRI or the object’s “id” is absent
             */
                name: 'An "object" property uses the "id" property exactly one time (Multiplicity, Data 2.4.4.1.s1.table1.row2, XAPI-00047)',
                config: [
                    {
                        name: 'statement activity "id" not provided',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_id}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "id" not provided',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_id}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {   //see above
                name: 'An "object" property\'s "id" property is an IRI (Type, Data 2.2.4.4.1.table1.row2, XAPI-00047)',
                config: [
                    {
                        name: 'statement activity "id" not IRI',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'},
                            {id: INVALID_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "id" is IRI',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "id" not IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.default}}'},
                            {id: INVALID_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "id" is IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00048, Data 2.4.4.1 when objectType is activity
             * An "object" property uses the "definition" property at most one time. The LRS rejects with 400 Bad Request an otherwise legal statement if the object's "definition" property is an invalid object.
             */
                name: 'An Activity\'s "definition" property is an Object (Type, Data 2.4.4.1.s1.table1.row3, XAPI-00048)',
                config: [
                    {
                        name: 'statement activity "definition" not object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "definition" not object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: INVALID_STRING}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00056, Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "name" property is a Language Map. The LRS rejects with 400 Bad Request an otherwise legal statement if the Activity Definition's "name" property is present and is an invalid Language Map.
             */
                name: 'An Activity Definition\'s "name" property is a Language Map (Type, Data 2.4.4.1.s2.table1.row1, XAPI-00056)',
                config: [
                    {
                        name: 'statement object "name" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.numeric_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "name" language map is string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.string_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "name" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.numeric_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "name" language map is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.string_name}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00059, Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "description" property is a Language Map. The LRS rejects with 400 Bad Request an otherwise legal statement if the Activity Definition's "description" property is present and is an invalid Language Map.
             */
                name: 'An Activity Definition\'s "description" property is a Language Map (Type, Data 2.4.4.1.s2.table1.row2, XAPI-00059)',
                config: [
                    {
                        name: 'statement object "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.numeric_description}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.string_description}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.numeric_description}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.string_description}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00060, Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "type" property is an IRI. The LRS rejects with 400 Bad Request an otherwise legal statement if the Activity Definition's "type" property is present and is an invalid IRI.
             */
                name: 'An Activity Definition\'s "type" property is an IRI (Type, Data 2.4.4.1.s2.table1.row3, XAPI-00060)',
                config: [
                    {
                        name: 'statement activity "type" not IRI',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {type: INVALID_STRING}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "type" not IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {type: INVALID_STRING}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00061, Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "moreinfo" property is an IRL. The LRS rejects with 400 Bad Request an otherwise legal statement if the Activity Definition's "moreinfo" property is present and is an invalid IRL.
             */
                name: 'An Activity Definition\'s "moreinfo" property is an IRL (Type, Data 2.4.4.1.s2.table1.row4, XAPI-00061)',
                config: [
                    {
                        name: 'statement activity "moreInfo" not IRI',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {moreInfo: INVALID_STRING}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "moreInfo" not IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {moreInfo: INVALID_STRING}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /** XAPI-00049, Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "interactionType" property is a String with a value of either true-false, choice, fill-in, long-fill-in, matching, performance, sequencing, likert, numeric or other. An LRS rejects with 400 Bad Request an Activity Definition's "interactionType" property if it is not a string value of true-false, choice, fill-in, long-fill-in, matching, performance, sequencing, likert, numeric or other.
             */
                name: 'An Activity Definition\'s "interactionType" property is a String with a value of either “true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other” (Data 2.4.4.1.s8.table1.row1, XAPI-00049)',
                config: [
                    {
                        name: 'statement activity "interactionType" can be used with "true-false"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.true_false}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "interactionType" can be used with "choice"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "interactionType" can be used with "fill-in"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.fill_in}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "interactionType" can be used with "long-fill-in"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.long_fill_in}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "interactionType" can be used with "matching"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "interactionType" can be used with "performance"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "interactionType" can be used with "sequencing"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "interactionType" can be used with "likert"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "interactionType" can be used with "numeric"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.numeric}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "interactionType" can be used with "other"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.other}}'},
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "interactionType" fails with invalid iri',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.interaction_type_invalid_iri}}'},
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "interactionType" fails with invalid numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.interaction_type_invalid_numeric}}'},
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "interactionType" fails with invalid object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.interaction_type_invalid_object}}'},
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "interactionType" fails with invalid string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.interaction_type_invalid_string}}'},
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "interactionType" can be used with "true-false"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.true_false}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "interactionType" can be used with "choice"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "interactionType" can be used with "fill-in"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.fill_in}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "interactionType" can be used with "long-fill-in"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.long_fill_in}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "interactionType" can be used with "matching"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "interactionType" can be used with "performance"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "interactionType" can be used with "sequencing"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "interactionType" can be used with "likert"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "interactionType" can be used with "numeric"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.numeric}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "interactionType" can be used with "other"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.other}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "interactionType" fails with invalid iri',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.interaction_type_invalid_iri}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "interactionType" fails with invalid numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.interaction_type_invalid_numeric}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "interactionType" fails with invalid object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.interaction_type_invalid_object}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "interactionType" fails with invalid string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.interaction_type_invalid_string}}'}
                        ],
                        expect: [400]
                    }
                ]
            },

            {
            /**  XAPI-00057,  Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "extension" property is an Object. The LRS rejects with 400 Bad Request an otherwise legal statement if the Activity Definition's "extension" property is present and is an invalid Extension Object.
             */
                name: 'An Activity Definition\'s "extension" property is an Object (Type, Data 2.4.4.1.s2.table1.row5, XAPI-00057)',
                config: [
                    {
                        name: 'statement activity "extension" invalid string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {extensions: INVALID_STRING}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "extension" invalid iri',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {extensions: VALID_EXTENSION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "extension" invalid string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {extensions: INVALID_STRING}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "extension" invalid iri',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {extensions: VALID_EXTENSION_COMPONENT}}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
