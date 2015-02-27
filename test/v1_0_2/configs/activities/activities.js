/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * Created by fwhorton on 2/20/15.
 * Riptide Software
 */
(function (module) {
    "use strict"

    // defines overwriting data
    var INVALID_IRI = 'abc://should.fail.com';
    var INVALID_OBJECT = {key: 'value'};
    var INVALID_STRING = 'should error';
    var INVALID_INTERACTION_COMPONENT_ID = {
        'id': INVALID_OBJECT,
        'description': {
            'en-US': 'valid'
        }
    };
    var INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE = {
        'id': 'valid',
        'description': INVALID_OBJECT
    };
    var INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING = {
        'id': 'valid',
        'description': INVALID_STRING
    };
    var VALID_DESCRIPTION = {
        'description': {
            'en-GB': 'An example meeting that happened on a specific occasion with certain people present.',
            'en-US': 'An example meeting that happened on a specific occasion with certain people present.'
        }
    };
    var VALID_EXTENSIONS = {
        'http://example.com/profiles/meetings/extension/location': 'X:\\meetings\\minutes\\examplemeeting.one',
        'http://example.com/profiles/meetings/extension/reporter': {
            'name': 'Thomas',
            'id': 'http://openid.com/342'
        }
    };
    var VALID_INTERACTION_COMPONENT = {
        'id': 'valid',
        'description': {
            'en-US': 'valid'
        }
    }
    var VALID_INTERACTION_TYPE = {
        'interactionType': 'fill-in',
        'correctResponsesPattern': [
            'Bob"s your uncle'
        ]
    };
    var VALID_MORE_INFO = 'http://virtualmeeting.example.com/345256';
    var VALID_NAME = {
        'name': {
            'en-GB': 'example meeting',
                'en-US': 'example meeting'
        }
    };
    var VALID_TYPE = 'http://adlnet.gov/expapi/activities/meeting';

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'Activities Verify Templates',
                config: [
                    {
                        name: 'should pass statement activity template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement activity template',
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
                name: 'An "object" property uses the "id" property exactly one time (Multiplicity, 4.1.4.1.table1.row2.b)',
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
            {
                name: 'An "object" property\'s "id" property is an IRI (Type, 4.1.4.1.table1.row2.a)',
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
                name: 'An Activity\'s "definition" property is an Object (Type, 4.1.4.1.table1.row3.a)',
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
                name: 'An Activity Definition contains at least one of the following properties: name, description, type, moreInfo, interactionType, or extensions (Format, 4.1.4.1.table2, 4.1.4.1.table3)',
                config: [
                    {
                        name: 'statement activity "definition" missing all properties',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "definition" contains "name"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_NAME}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "definition" contains "description"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_DESCRIPTION}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "definition" contains "type"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_TYPE}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "definition" contains "moreInfo"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_MORE_INFO}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "definition" contains "extensions"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_EXTENSIONS}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "definition" contains "interactionType"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_INTERACTION_TYPE}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "definition" missing all properties',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "definition" contains "name"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_NAME}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "definition" contains "description"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_DESCRIPTION}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "definition" contains "type"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_TYPE}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "definition" contains "moreInfo"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_MORE_INFO}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "definition" contains "extensions"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_EXTENSIONS}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "definition" contains "interactionType"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: VALID_INTERACTION_TYPE}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'An Activity Definition\'s "type" property is an IRI (Type, 4.1.4.1.table2.row3.a)',
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
                name: 'An Activity Definition\'s "moreinfo" property is an IRL (Type, 4.1.4.1.table2.row4.a)',
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
                name: 'An Activity Definition uses the "interactionType" property if any of the correctResponsesPattern, choices, scale, source, target, or steps properties are used (Multiplicity, 4.1.4.1.t)',
                config: [
                    {
                        name: 'statement activity "correctResponsesPattern" must be used with "interactionType"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.other_no_interaction_type}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "choices" must be used with "interactionType"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice_no_interaction_type}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "scale" must be used with "interactionType"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert_no_interaction_type}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "source target" must be used with "interactionType"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_no_interaction_type}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "steps" must be used with "interactionType"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance_no_interaction_type}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "correctResponsesPattern" must be used with "interactionType"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.other_no_interaction_type}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choices" must be used with "interactionType"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice_no_interaction_type}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "scale" must be used with "interactionType"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert_no_interaction_type}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "source target" must be used with "interactionType"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_no_interaction_type}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "steps" must be used with "interactionType"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance_no_interaction_type}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An Activity Definition\'s "interactionType" property is a String with a value of either “true-false”, “choice”, “fill-in”, “long-fill-in”, “matching”, “performance”, “sequencing”, “likert”, “numeric” or “other” (4.1.4.1.table3.row1.a, SCORM 2004 4th Edition RTE Book)',
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
                            {object: '{{activities.other}}'}
                        ],
                        expect: [200]
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
                    }
                ]
            },
            {
                name: 'An Activity Definition\'s "correctResponsesPattern" property is an array of Strings (4.1.4.1.table3.row2.a)',
                config: [
                    {
                        name: 'statement activity "correctResponsesPattern" is an array of strings',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.numeric}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "correctResponsesPattern" is an object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.numeric}}'},
                            {definition: {correctResponsesPattern: INVALID_OBJECT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "correctResponsesPattern" is an array of object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.numeric}}'},
                            {definition: {correctResponsesPattern: [INVALID_OBJECT]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "correctResponsesPattern" is an array of number',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.numeric}}'},
                            {definition: {correctResponsesPattern: [12345]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "correctResponsesPattern" is an array of strings',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.numeric}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "correctResponsesPattern" is an object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.numeric}}'},
                            {definition: {correctResponsesPattern: INVALID_OBJECT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "correctResponsesPattern" is an array of object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.numeric}}'},
                            {definition: {correctResponsesPattern: [INVALID_OBJECT]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "correctResponsesPattern" is an array of number',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.numeric}}'},
                            {definition: {correctResponsesPattern: [12345]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                // An Interaction Component is an Object (4.1.4.1.table4)
                // An Interaction Component contains an "id" property (Multiplicity, 4.1.4.1.table4.row1.b)
                // An Interaction Component's "id" property is a String (Type, 4.1.4.1.table4.row1.a)
                name: 'An Activity Definition\'s "choices" property is an array of Interaction Components (4.1.4.1.table3.row3.a)',
                config: [
                    {
                        name: 'statement activity "choices" uses choice is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "choices" uses choice is not an array',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "choices" uses choice is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "choices" uses choice is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "choices" uses choice is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "choices" uses sequencing is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "choices" uses sequencing is not an array',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "choices" uses sequencing is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "choices" uses sequencing is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "choices" uses sequencing is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choices" uses choice is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "choices" uses choice is not an array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choices" uses choice is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choices" uses choice is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choices" uses choice is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choices" uses sequencing is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "choices" uses sequencing is not an array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choices" uses sequencing is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choices" uses sequencing is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choices" uses sequencing is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                // An Interaction Component is an Object (4.1.4.1.table4)
                // An Interaction Component contains an "id" property (Multiplicity, 4.1.4.1.table4.row1.b)
                // An Interaction Component's "id" property is a String (Type, 4.1.4.1.table4.row1.a)
                name: 'An Activity Definition\'s "scale" property is an array of Interaction Components (4.1.4.1.table3.row3.a)',
                config: [
                    {
                        name: 'statement activity "scale" uses likert is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "scale" uses likert is not an array',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "scale" uses likert is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "scale" uses likert is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "scale" uses likert is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "scale" uses likert is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "scale" uses likert is not an array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "scale" uses likert is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "scale" uses likert is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "scale" uses likert is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                // An Interaction Component is an Object (4.1.4.1.table4)
                // An Interaction Component contains an "id" property (Multiplicity, 4.1.4.1.table4.row1.b)
                // An Interaction Component's "id" property is a String (Type, 4.1.4.1.table4.row1.a)
                name: 'An Activity Definition\'s "source" property is an array of Interaction Components (4.1.4.1.table3.row3.a)',
                config: [
                    {
                        name: 'statement activity "source" uses matching is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_source}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "source" uses matching is not an array',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {scale: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "source" uses matching is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "source" uses matching is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "source" uses matching is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "source" uses matching is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_source}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "source" uses matching is not an array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {scale: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "source" uses matching is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "source" uses matching is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "source" uses matching is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                // An Interaction Component is an Object (4.1.4.1.table4)
                // An Interaction Component contains an "id" property (Multiplicity, 4.1.4.1.table4.row1.b)
                // An Interaction Component's "id" property is a String (Type, 4.1.4.1.table4.row1.a)
                name: 'An Activity Definition\'s "target" property is an array of Interaction Components (4.1.4.1.table3.row3.a)',
                config: [
                    {
                        name: 'statement activity "target" uses matching is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_target}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "target" uses matching is not an array',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {scale: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "target" uses matching is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "target" uses matching is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "target" uses matching is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "target" uses matching is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_target}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "target" uses matching is not an array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {scale: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "target" uses matching is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "target" uses matching is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "target" uses matching is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                // An Interaction Component is an Object (4.1.4.1.table4)
                // An Interaction Component contains an "id" property (Multiplicity, 4.1.4.1.table4.row1.b)
                // An Interaction Component's "id" property is a String (Type, 4.1.4.1.table4.row1.a)
                name: 'An Activity Definition\'s "steps" property is an array of Interaction Components (4.1.4.1.table3.row3.a)',
                config: [
                    {
                        name: 'statement activity "steps" uses performance is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity "steps" uses performance is not an array',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {scale: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "steps" uses performance is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "steps" uses performance is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "steps" uses performance is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "steps" uses performance is an array of interaction components',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "steps" uses performance is not an array',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {scale: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "steps" uses performance is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "steps" uses performance is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "steps" uses performance is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
