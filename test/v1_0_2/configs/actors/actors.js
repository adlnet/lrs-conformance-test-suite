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

    // defines templates
    var STATEMENT_ACTOR_DEFAULT = [
        {statement: 'statements.actor'},
        {actor: 'agents.default'}
    ];
    var STATEMENT_AUTHORITY_DEFAULT = [
        {statement: 'statements.authority'},
        {authority: 'agents.default'}
    ];
    var STATEMENT_CONTEXT_INSTRUCTOR_DEFAULT = [
        {statement: 'statements.context'},
        {context: 'contexts.instructor'},
        {instructor: 'agents.default'}
    ];
    var STATEMENT_SUBSTATEMENT_AS_AGENT_DEFAULT = [
        {statement: 'statements.object_actor'},
        {object: 'agents.default'}
    ];
    var STATEMENT_SUBSTATEMENTS_AGENT_DEFAULT = [
        {statement: 'statements.object_substatement'},
        {object: 'substatements.actor'},
        {actor: 'agents.default'}
    ];
    var STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR_DEFAULT = [
        {statement: 'statements.object_substatement'},
        {object: 'substatements.context'},
        {context: 'contexts.instructor'},
        {instructor: 'agents.default'}
    ];

    // defines overrides
    var INVALID_OBJECTTYPE_NUMERIC = {objectType: 123};
    var INVALID_OBJECTTYPE_OBJECT = {objectType: {key: 'value'}};
    var INVALID_OBJECTTYPE_INVALID_AGENT = {objectType: 'agent'};
    var INVALID_OBJECTTYPE_INVALID_GROUP = {objectType: 'group'};
    var INVALID_OBJECTTYPE_NAME_NUMERIC = { name: 123 };
    var INVALID_OBJECTTYPE_NAME_OBJECT = { name: { key: "value" } };

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'Verify Templates',
                config: [
                    {
                        name: 'should pass statement actor template',
                        template: STATEMENT_ACTOR_DEFAULT,
                        expect: [200]
                    },
                    {
                        name: 'should pass statement authority template',
                        template: STATEMENT_AUTHORITY_DEFAULT,
                        expect: [200]
                    },
                    {
                        name: 'should pass statement context instructor template',
                        template: STATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement as agent template',
                        template: STATEMENT_SUBSTATEMENT_AS_AGENT_DEFAULT,
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement"s agent template',
                        template: STATEMENT_SUBSTATEMENTS_AGENT_DEFAULT,
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement"s context instructor teamplate',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        expect: [200]
                    }
                ]
            },
            {
                name: 'An "objectType" property is a String (Type, 4.1.2.1.table1.row1.a)',
                config: [
                    {
                        name: 'statement actor "objectType" should fail numeric',
                        template: STATEMENT_ACTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement actor "objectType" should fail object',
                        template: [
                            {statement: 'statements.actor'},
                            {actor: 'agents.default'},
                            {objectType: {key: 'value'}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail numeric',
                        template: STATEMENT_AUTHORITY_DEFAULT,
                        override: INVALID_OBJECTTYPE_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail object',
                        template: STATEMENT_AUTHORITY_DEFAULT,
                        override: INVALID_OBJECTTYPE_OBJECT,
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail numeric',
                        template: STATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail object',
                        template: STATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_OBJECT,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "objectType" should fail numeric',
                        template: STATEMENT_SUBSTATEMENT_AS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "objectType" should fail object',
                        template: STATEMENT_SUBSTATEMENT_AS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_OBJECT,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "objectType" should fail numeric',
                        template: STATEMENT_SUBSTATEMENTS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "objectType" should fail object',
                        template: STATEMENT_SUBSTATEMENTS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_OBJECT,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail numeric',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail object',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_OBJECT,
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An "actor" property\'s "objectType" property is either "Agent" or "Group" (Vocabulary, 4.1.2.1.table1.row1.b, 4.1.2.1.table1.row1.b)',
                config: [
                    {
                        name: 'statement actor "objectType" should fail when not "Agent"',
                        template: STATEMENT_ACTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_AGENT,
                        expect: [400]
                    },
                    {
                        name: 'statement actor "objectType" should fail when not "Group"',
                        template: STATEMENT_ACTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_GROUP,
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail when not "Agent"',
                        template: STATEMENT_AUTHORITY_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_AGENT,
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail when not "Group"',
                        template: STATEMENT_AUTHORITY_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_GROUP,
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail when not "Agent"',
                        template: STATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_AGENT,
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail when not "Group"',
                        template: STATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_GROUP,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "objectType" should fail when not "Agent"',
                        template: STATEMENT_SUBSTATEMENT_AS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_AGENT,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group with "objectType" should fail when not "Group"',
                        template: STATEMENT_SUBSTATEMENT_AS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_GROUP,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s actor "objectType" should fail when not "Agent"',
                        template: STATEMENT_SUBSTATEMENTS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_AGENT,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s actor "objectType" should fail when not "Group"',
                        template: STATEMENT_SUBSTATEMENTS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_GROUP,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail when not "Agent"',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_AGENT,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail when not "Group"',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_INVALID_GROUP,
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "name" property is a String (Type, 4.1.2.1.table1.row2.a)',
                config: [
                    {
                        name: 'statement actor "name" should fail numeric',
                        template: STATEMENT_ACTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement actor "name" should fail object',
                        template: STATEMENT_ACTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_OBJECT,
                        expect: [400]
                    },
                    {
                        name: 'statement authority "name" should fail numeric',
                        template: STATEMENT_AUTHORITY_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement authority "name" should fail object',
                        template: STATEMENT_AUTHORITY_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_OBJECT,
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "name" should fail numeric',
                        template: STATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "name" should fail object',
                        template: STATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_OBJECT,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "name" should fail numeric',
                        template: STATEMENT_SUBSTATEMENT_AS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "name" should fail object',
                        template: STATEMENT_SUBSTATEMENT_AS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_OBJECT,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "name" should fail numeric',
                        template: STATEMENT_SUBSTATEMENTS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "name" should fail object',
                        template: STATEMENT_SUBSTATEMENTS_AGENT_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_OBJECT,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "name" should fail numeric',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "name" should fail object',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_OBJECT,
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An "actor" property with "objectType" as "Agent" uses one of the following properties: "mbox", "mbox_sha1sum", "openid", "account" (Multiplicity, 4.1.2.1.a)',
                config: [
                    {
                        name: 'statement actor without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        template: [
                            {statement: 'statements.actor'},
                            {actor: 'agents.default'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "account" should pass',
                        template: [
                            {statement: 'statements.actor'},
                            {actor: 'agents.account'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor "mbox" should pass',
                        template: [
                            {statement: 'statements.actor'},
                            {actor: 'agents.mbox'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor "mbox_sha1sum" should pass',
                        template: [
                            {statement: 'statements.actor'},
                            {actor: 'agents.mbox_sha1sum'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor "openid" should pass',
                        template: [
                            {statement: 'statements.actor'},
                            {actor: 'agents.openid'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        template: [
                            {statement: 'statements.authority'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "account" should pass',
                        template: [
                            {statement: 'statements.authority'},
                            {authority: 'agents.account'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "mbox" should pass',
                        template: [
                            {statement: 'statements.authority'},
                            {authority: 'agents.mbox'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "mbox_sha1sum" should pass',
                        template: [
                            {statement: 'statements.authority'},
                            {authority: 'agents.mbox_sha1sum'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "openid" should pass',
                        template: [
                            {statement: 'statements.authority'},
                            {authority: 'agents.openid'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        template: [
                            {statement: 'statements.context'},
                            {context: 'contexts.instructor'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "account" should pass',
                        template: [
                            {statement: 'statements.context'},
                            {context: 'contexts.instructor'},
                            {instructor: 'agents.account'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "mbox" should pass',
                        template: [
                            {statement: 'statements.context'},
                            {context: 'contexts.instructor'},
                            {instructor: 'agents.mbox'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "mbox_sha1sum" should pass',
                        template: [
                            {statement: 'statements.context'},
                            {context: 'contexts.instructor'},
                            {instructor: 'agents.mbox_sha1sum'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "openid" should pass',
                        template: [
                            {statement: 'statements.context'},
                            {context: 'contexts.instructor'},
                            {instructor: 'agents.openid'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as agent without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        template: [
                            {statement: 'statements.object_actor'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "account" should pass',
                        template: [
                            {statement: 'statements.object_actor'},
                            {object: 'agents.account'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as agent "mbox" should pass',
                        template: [
                            {statement: 'statements.object_actor'},
                            {object: 'agents.mbox'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as agent "mbox_sha1sum" should pass',
                        template: [
                            {statement: 'statements.object_actor'},
                            {object: 'agents.mbox_sha1sum'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as agent "openid" should pass',
                        template: [
                            {statement: 'statements.object_actor'},
                            {object: 'agents.openid'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s agent without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        template: [
                            {statement: 'statements.object_substatement'},
                            {object: 'substatements.actor'},
                            {actor: 'agents.default'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "account" should pass',
                        template: [
                            {statement: 'statements.object_substatement'},
                            {object: 'substatements.actor'},
                            {actor: 'agents.account'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s agent "mbox" should pass',
                        template: [
                            {statement: 'statements.object_substatement'},
                            {object: 'substatements.actor'},
                            {actor: 'agents.mbox'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s agent "mbox_sha1sum" should pass',
                        template: [
                            {statement: 'statements.object_substatement'},
                            {object: 'substatements.actor'},
                            {actor: 'agents.mbox_sha1sum'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s agent "openid" should pass',
                        template: [
                            {statement: 'statements.object_substatement'},
                            {object: 'substatements.actor'},
                            {actor: 'agents.openid'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        template: [
                            {statement: 'statements.object_substatement'},
                            {object: 'substatements.context'},
                            {context: 'contexts.instructor'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "account" should pass',
                        template: [
                            {statement: 'statements.object_substatement'},
                            {object: 'substatements.context'},
                            {context: 'contexts.instructor'},
                            {instructor: 'agents.account'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "mbox" should pass',
                        template: [
                            {statement: 'statements.object_substatement'},
                            {object: 'substatements.context'},
                            {context: 'contexts.instructor'},
                            {instructor: 'agents.mbox'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "mbox_sha1sum" should pass',
                        template: [
                            {statement: 'statements.object_substatement'},
                            {object: 'substatements.context'},
                            {context: 'contexts.instructor'},
                            {instructor: 'agents.mbox_sha1sum'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "openid" should pass',
                        template: [
                            {statement: 'statements.object_substatement'},
                            {object: 'substatements.context'},
                            {context: 'contexts.instructor'},
                            {instructor: 'agents.openid'}
                        ],
                        expect: [200]
                    },





                    {
                        name: 'statement substatement"s context instructor "name" should fail numeric',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_NUMERIC,
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "name" should fail object',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR_DEFAULT,
                        override: INVALID_OBJECTTYPE_NAME_OBJECT,
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
