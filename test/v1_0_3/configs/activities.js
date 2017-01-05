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
    var INVALID_INTERACTION_NO_ID = {
        'description': {
            'en-US': 'valid'
        }
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
    var INVALID_INTERACTION_COMPONENT_DUPLICATE_ID = [
        {
            'id': 'valid'
        },
        {
            'id': 'valid'
        }
    ];
    var VALID_ACTIVITY = {id: 'http://www.example.com/meetings/occurances/34534'};
    var VALID_EXTENSIONS = {
        extensions: {
            'http://example.com/profiles/meetings/extension/location': 'X:\\meetings\\minutes\\examplemeeting.one',
            'http://example.com/profiles/meetings/extension/reporter': {
                'name': 'Thomas',
                'id': 'http://openid.com/342'
            }
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
    var VALID_MORE_INFO = {moreInfo: 'http://virtualmeeting.example.com/345256'};
    var VALID_NAME = {
        'name': {
            'en-GB': 'example meeting',
                'en-US': 'example meeting'
        }
    };
    var VALID_TYPE = {type: 'http://adlnet.gov/expapi/activities/meeting'};

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'Activities Verify Templates',
                config: [
                    {
                        name: 'should pass statement activity default template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement activity default template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement activity choice template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement activity likert template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement activity matching template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement activity performance template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement activity sequencing template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement activity choice template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement activity likert template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement activity matching template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement activity performance template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement activity sequencing template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
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
                name: 'An Activity Definition is defined as the contents of a "definition" property object of an Activity (Format, Data 2.4.4.1.s1.table1.row3)',
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
            /**  XAPI-00048, Data 2.4.4.1 when objectType is activity
             * An "object" property uses the "definition" property at most one time. The LRS rejects with 400 Bad Request an otherwise legal statement if the object's “definition” property is an invalid object.
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
                name: 'An Activity Definition contains at least one of the following properties: name, description, type, moreInfo, interactionType, or extensions (Format, Data 2.4.4.1.s2)',
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
            /**  XAPI-00056, Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "name" property is a Language Map. The LRS rejects with 400 Bad Request an otherwise legal statement if the Activity Definition's "name" property is present and is an invalid Language Map.
             */
                name: 'An Activity Definition\'s "name" property is a Language Map (Type, Data 2.4.4.1.s2.table1.row1, XAPI-00056)',
                config: [
                    {
                        name: 'statement object "name" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "name" language map is string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "name" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "name" language map is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_STRING}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00062, Data 2.4.4.1 when objectType is activity
             * An Interaction Component’s "description" property is a Language Map. The LRS rejects with 400 Bad Request an otherwise legal statement if the Interaction Component's "description" property is present and is an invalid Language Map.
             */
                name: 'An Interaction Component\'s "description" property is a Language Map. (Type, Data 2.4.4.1.s15.table1.row2, XAPI-00062)',
                config: [
                    {
                        name: 'statement object interaction component choice "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component choice "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'},
                            // {definition: {choices: [{description:{English: 'Choice A'}}]}}
                            {definition: {choices: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component sequencing "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component sequencing "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component likert "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component likert "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component matching source "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {source: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component matching source "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {source: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component matching target "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {target: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component matching target "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {target: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component performance "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object interaction component performance "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component choice "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component choice "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component sequencing "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component sequencing "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component likert "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component likert "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component matching source "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {source: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component matching source "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {source: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component matching target "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {target: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component matching target "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {target: [{description: INVALID_STRING}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component performance "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [{description: INVALID_NUMERIC}]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement object interaction component performance "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [{description: INVALID_STRING}]}}
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
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "description" language map is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "description" language map is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_STRING}
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
            /**  XAPI-00050,  Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "correctResponsesPattern" property is an array of Strings. An LRS rejects with 400 Bad Request an Activity Definition's "correctResponsesPattern" property if present, and if it is not a valid array of strings.
             */
                name: 'An Activity Definition\'s "correctResponsesPattern" property is an array of Strings (Data 2.4.4.1.s8.table1.row2, XAPI-00050)',
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
            /**  XAPI-00055, Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "choices" property is an array of Interaction Components. An LRS rejects with 400 Bad Request if an Activity Definition's "choices" property if present, and is not a valid array of Interaction Components.
             */
                name: 'An Activity Definition\'s "choices" property is an array of Interaction Components (Data 2.4.4.1.s8.table1.row3, XAPI-00055)',
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
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00054, Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "scale" property is an array of Interaction Components, An LRS rejects with 400 Bad Request if an Activity Definition's "scale" property if present, and is not a valid array of Interaction Components.
             */
                name: 'An Activity Definition\'s "scale" property is an array of Interaction Components (Data 2.4.4.1.s8.table1.row3, XAPI-00054)',
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
            /**  XAPI-00053, Data 2.4.4.1 when the objectType is activity
             * An Activity Definition's "source" property is an array of Interaction Components. An LRS rejects with 400 Bad Request if an Activity Definition's "source" property if present, and is not a valid array of Interaction Components.
             */
                name: 'An Activity Definition\'s "source" property is an array of Interaction Components (Data 2.4.4.1.s8.table1.row3, XAPI-00053)',
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
                            {definition: {source: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "source" uses matching is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {source: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "source" uses matching is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {source: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "source" uses matching is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {source: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
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
                            {definition: {source: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "source" uses matching is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {source: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "source" uses matching is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {source: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "source" uses matching is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_source}}'},
                            {definition: {source: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00052,  Data 2.4.4.1 when the objectType is activity
             * An Activity Definition's "target" property is an array of Interaction Components. An LRS rejects with 400 Bad Request if an Activity Definition's "target" property if present, and is not a valid array of Interaction Components.
             */
                name: 'An Activity Definition\'s "target" property is an array of Interaction Components (Data 2.4.4.1.s8.table1.row3, XAPI-00052)',
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
                            {definition: {target: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "target" uses matching is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {target: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "target" uses matching is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {target: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "target" uses matching is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {target: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
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
                            {definition: {target: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "target" uses matching is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {target: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "target" uses matching is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {target: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "target" uses matching is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_target}}'},
                            {definition: {target: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00051,  Data 2.4.4.1 when objectType is activity
             * An Activity Definition's "steps" property is an array of Interaction Components. An LRS rejects with 400 Bad Request if an Activity Definition's "steps" property if present, and is not a valid array of Interaction Components.
             */
                name: 'An Activity Definition\'s "steps" property is an array of Interaction Components (Data 2.4.4.1.s8.table1.row3, XAPI-00051)',
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
                            {definition: {steps: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "steps" uses performance is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "steps" uses performance is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "steps" uses performance is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
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
                            {definition: {steps: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "steps" uses performance is an array of non string ID',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "steps" uses performance is an array of non object description',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "steps" uses performance is an array of non description language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [INVALID_INTERACTION_COMPONENT_DESCRIPTION_LANGUAGE]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00063, Data 2.4.4.1 when objectType is activity
             * An individual Interaction Component, within the array of Interaction Components, is an Object. The LRS rejects with 400 Bad Request an otherwise legal statement if the Interaction Component is present and is an invalid Object.
             */
                name: 'An Interaction Component is an Object (Data 2.4.4.1.s14, XAPI-00063)',
                config: [
                    {
                        name: 'statement activity "choice choices" is not an object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "likert scale" is not an object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "matching source" is not an object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {source: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "matching target" is not an object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {target: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "performance steps" is not an object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "sequencing choices" is not an object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choice choices" is not an object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "likert scale" is not an object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "matching source" is not an object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {source: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "matching target" is not an object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {target: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "performance steps" is not an object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "sequencing choices" is not an object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [INVALID_STRING]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00058, Data 2.4.4.1 when objectType is activity
             * Within an array of Interaction Components, the "id" property is a string which is required and unique (within the specific interaction array). The LRS rejects with 400 Bad Request an interaction activity with an array of interaction components in which the “id” property is absent, duplicative, or an invalid string.
             */
                name: 'Interaction Component contains an "id" property (Multiplicity, Data 2.4.4.1.s15.table1.row1, XAPI-00058)',
                config: [
                    {
                        name: 'statement activity "choice choices" missing "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice_no_choices}}'},
                            {definition: {choices: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "likert scale" missing "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert_no_scale}}'},
                            {definition: {scale: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "matching source" missing "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_no_source}}'},
                            {definition: {source: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "matching target" missing "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching_no_target}}'},
                            {definition: {target: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "performance steps" missing "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance_no_steps}}'},
                            {definition: {steps: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "sequencing choices" missing "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing_no_choices}}'},
                            {definition: {choices: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choice choices" missing "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice_no_choices}}'},
                            {definition: {choices: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "likert scale" missing "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert_no_scale}}'},
                            {definition: {scale: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "matching source" missing "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_no_source}}'},
                            {definition: {source: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "matching target" missing "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching_no_target}}'},
                            {definition: {target: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "performance steps" missing "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance_no_steps}}'},
                            {definition: {steps: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "sequencing choices" missing "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing_no_choices}}'},
                            {definition: {choices: [INVALID_INTERACTION_NO_ID]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {   //see above
                name: 'An Interaction Component\'s "id" property is a String (Type, Data 2.4.4.1.s15.table1.row1, XAPI-00058)',
                config: [
                    {
                        name: 'statement activity "choice choices id" not a string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "likert scale id" not a string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "matching source id" not a string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {source: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "matching target id" not a string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {target: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "performance steps id" not a string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity "sequencing choices id" not a string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "choice choices id" not a string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "likert scale id" not a string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "matching source id" not a string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {source: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "matching target id" not a string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {target: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "performance steps id" not a string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "sequencing choices id" not a string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: [INVALID_INTERACTION_COMPONENT_ID]}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {   //see above
                name: 'Within an array of Interaction Components, the "id" property is unique (Multiplicty, Data 2.4.4.1.s16.b1, XAPI-00058)',
                config: [
                    {
                        name: 'statement activity choice "choices" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity likert "scale" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity matching "source" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {source: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity matching "target" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {target: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity performance "steps" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity sequencing "choices" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity choice "choices" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {choices: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity likert "scale" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {scale: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity matching "source" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {source: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity matching "target" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {target: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity performance "steps" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {steps: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity sequencing "choices" cannot use same "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {choices: INVALID_INTERACTION_COMPONENT_DUPLICATE_ID}}
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
                            {definition: {extensions: VALID_INTERACTION_COMPONENT}}
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
                            {definition: {extensions: VALID_INTERACTION_COMPONENT}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An LRS generates an "objectType" property of "Activity" to any "object" property if none is provided (Modify, Data 2.4.4.s2)',
                config: [
                    {
                        name: 'statement activity without "objectType" is valid',
                        templates: [
                            {statement: '{{statements.no_object}}'},
                            {object: VALID_ACTIVITY}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity without "objectType" is valid',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.no_object}}'},
                            {object: VALID_ACTIVITY}
                        ],
                        expect: [200]
                    }
                ]
            }
        ];
    };
}(module));
