/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */
(function (module) {
    "use strict";

/**  XAPI-00014, Data 2.2 Formatting Requirements
 * All Objects are well-created JSON Objects (Nature of Binding)
 *
 * Note: All tests in this file pertain to this requirement.
 */

    // defines overwriting data
    // var INVALID_STRING = 'should fail';
    // var INVALID_VERSION_0_9_9 = '0.9.9';
    // var INVALID_VERSION_1_1_0 = '1.1.0';
    // var VALID_VERSION_1_0 = '1.0';
    // var VALID_VERSION_1_0_9 = '1.0.9';
    var VALID_DESCRIPTION = {
        'description': {
            'en-GB': 'An example meeting that happened on a specific occasion with certain people present.',
            'en-US': 'An example meeting that happened on a specific occasion with certain people present.'
        }
    };
    var VALID_EXTENSIONS = {
        extensions: {
            'http://example.com/profiles/meetings/extension/location': 'X:\\meetings\\minutes\\examplemeeting.one',
            'http://example.com/profiles/meetings/extension/reporter': {
                'name': 'Thomas',
                'id': 'http://openid.com/342'
            }
        }
    };
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
            {   // see above
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
            {   // see above
                name: 'Agents Verify Templates',
                config: [
                    {
                        name: 'should pass statement actor template',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement authority template',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement context instructor template',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement as agent template',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement"s agent template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement"s context instructor template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {   // see above
                name: 'Groups Verify Templates',
                config: [
                    {
                        name: 'should pass statement actor template',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement authority template',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous_two_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement context instructor template',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement context team template',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement as group template',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement"s group template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement"s context instructor template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement"s context team template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {   // see above
                name: 'A Group is defined by "objectType" of an "actor" property or "object" property with value "Group" (Data 2.4.2.2.s2.table2.row1)',
                config: [
                    {
                        name: 'statement actor "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.authority_group}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {   // see above
                name: 'An Anonymous Group is defined by "objectType" of an "actor" or "object" with value "Group" and by none of "mbox", "mbox_sha1sum", "openid", or "account" being used (Data 2.4.2.2.s2.table1.row1)',
                config: [
                    {
                        name: 'statement actor does not require functional identifier',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority does not require functional identifier',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.authority_group}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor does not require functional identifier',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team does not require functional identifier',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group does not require functional identifier',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group does not require functional identifier',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor does not require functional identifier',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team does not require functional identifier',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {   //see above
                name: 'Verbs Verify Templates',
                config: [
                    {
                        name: 'should pass statement verb template',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass substatement verb template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {   //see above
                name: 'Objects Verify Templates',
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
                    },
                    {
                        name: 'should pass statement agent template',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement agent template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.agent}}'},
                            {object: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement group template',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement group template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.group}}'},
                            {object: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement StatementRef template',
                        templates: [
                            {statement: '{{statements.object_statementref}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement StatementRef template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement SubStatement template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {   //see above
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
                        name: 'should pass statement activity fill-in template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.fill_in}}'}
                        ],
                        expect: [200]
                    },                    
                    {
                        name: 'should pass statement activity numeric template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.numeric}}'}
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
                        name: 'should pass statement activity long-fill-in template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.long_fill_in}}'}
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
                        name: 'should pass statement activity other template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.other}}'}
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
                        name: 'should pass statement activity true-false template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.true_false}}'}
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
            {   //see above
                name: 'An Activity Definition uses the following properties: name, description, type, moreInfo, interactionType, or extensions (Format, Data 2.4.4.1.s2)',
                config: [
                    {
                        name: 'statement activity "definition" missing all properties',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_definition}}'},
                            {definition: {}}
                        ],
                        expect: [200]
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
                        expect: [200]
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
            {   //see above
                name: 'SubStatements Verify Templates',
                config: [
                    {
                        name: 'should pass statement SubStatement template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {   //see above
                name: 'StatementRefs Verify Templates',
                config: [
                    {
                        name: 'should pass statement StatementRef template',
                        templates: [
                            {statement: '{{statements.object_statementref}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass substatement StatementRef template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {   //see above
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
                name: 'A ContextActivity is defined as a single Activity of the "value" of the "contextActivities" property (definition, Data 2.4.6.2.s4.b2)',
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
                name: 'Languages Verify Templates',
                config: [
                    {
                        name: 'should pass statement verb template',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.no_display}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement object template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement attachment template',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        "usageType": "http://example.com/attachment-usage/test",
                                        "display": {"en-US": "A test attachment"},
                                        "description": {"en-US": "A test attachment (description)"},
                                        "contentType": "text/plain; charset=ascii",
                                        "length": 27,
                                        "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                                        "fileUrl": "http://over.there.com/file.txt"
                                    }
                                ]
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement verb template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.no_display}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement object template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'}
                        ],
                        expect: [200]
                    }
                ]
            }
        ];
    };
}(module));
