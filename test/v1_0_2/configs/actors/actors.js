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
    var INVALID_OBJECTTYPE_NUMERIC = {objectType: 123};
    var INVALID_OBJECTTYPE_OBJECT = {objectType: {key: 'value'}};
    var INVALID_OBJECTTYPE_INVALID_AGENT = {objectType: 'agent'};
    var INVALID_OBJECTTYPE_INVALID_GROUP = {objectType: 'group'};
    var INVALID_OBJECTTYPE_NAME_NUMERIC = {name: 123};
    var INVALID_OBJECTTYPE_NAME_OBJECT = {name: {key: "value"}};

    var FOREIGN_IDENTIFIER_ACCOUNT = {"account": {"homePage": "http://www.example.com", "name": "xAPI account name"}};
    var FOREIGN_IDENTIFIER_MBOX = {"mbox": "mailto:xapi@adlnet.gov"};
    var FOREIGN_IDENTIFIER_MBOX_SHA1SUM = {"mbox_sha1sum": "cd9b00a5611f94eaa7b1661edab976068e364975"};
    var FOREIGN_IDENTIFIER_OPENID = {"openid": "http://openid.example.org/12345"};

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'Verify Templates',
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
            {
                name: 'An "objectType" property is a String (Type, 4.1.2.1.table1.row1.a)',
                config: [
                    {
                        name: 'statement actor "objectType" should fail numeric',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "objectType" should fail object',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_OBJECT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail numeric',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail object',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_OBJECT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail numeric',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_OBJECT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "objectType" should fail numeric',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "objectType" should fail object',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_OBJECT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "objectType" should fail numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "objectType" should fail object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_OBJECT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_OBJECT
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An "actor" property\'s "objectType" property is either "Agent" or "Group" (Vocabulary, 4.1.2.1.table1.row1.b, 4.1.2.1.table1.row1.b)',
                config: [
                    {
                        name: 'statement actor "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group with "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s actor "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s actor "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "name" property is a String (Type, 4.1.2.1.table1.row2.a)',
                config: [
                    {
                        name: 'statement actor "name" should fail numeric',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "name" should fail object',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_OBJECT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "name" should fail numeric',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "name" should fail object',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_OBJECT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "name" should fail numeric',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "name" should fail object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_OBJECT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "name" should fail numeric',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "name" should fail object',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_OBJECT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "name" should fail numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "name" should fail object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_OBJECT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "name" should fail numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "name" should fail object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_NAME_OBJECT
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An "actor" property with "objectType" as "Agent" uses one of the following properties: "mbox", "mbox_sha1sum", "openid", "account" (Multiplicity, 4.1.2.1.a)',
                config: [
                    {
                        name: 'statement actor without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        templates: [
                            {statement: '{{statements.actor}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "account" should pass',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor "mbox" should pass',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor "mbox_sha1sum" should pass',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor "openid" should pass',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        templates: [
                            {statement: '{{statements.authority}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "account" should pass',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "mbox" should pass',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "mbox_sha1sum" should pass',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "openid" should pass',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "account" should pass',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "mbox" should pass',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "mbox_sha1sum" should pass',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "openid" should pass',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as agent without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        templates: [
                            {statement: '{{statements.object_actor}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "account" should pass',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as agent "mbox" should pass',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as agent "mbox_sha1sum" should pass',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as agent "openid" should pass',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s agent without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "account" should pass',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s agent "mbox" should pass',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s agent "mbox_sha1sum" should pass',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s agent "openid" should pass',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor without "account", "mbox", "mbox_sha1sum", "openid" should fail',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "account" should pass',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "mbox" should pass',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "mbox_sha1sum" should pass',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "openid" should pass',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.openid}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'An Agent is defined by "objectType" of an "actor" property or "object" property with value "Agent" (4.1.2.1.table1.row1, 4.1.4.2.a)',
                config: [
                    {
                        name: 'statement actor does not require objectType',
                        templates: [
                            {statement: '{{statements.actor_none}}'},
                            {
                                "actor": {
                                    "name": "xAPI mbox",
                                    "mbox": "mailto:xapi@adlnet.gov"
                                }
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor "objectType" accepts "Agent"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "objectType" accepts "Agent"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "objectType" accepts "Agent"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as agent "objectType" accepts "Agent"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s agent "objectType" accepts "Agent"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" accepts "Agent"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                ]
            },
            {
                name: 'An Agent does not use the "mbox" property if "mbox_sha1sum", "openid", or "account" are used (Multiplicity, 4.1.2.1.b)',
                config: [
                    {
                        name: 'statement actor "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "mbox" cannot be used with "openid',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {actor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                ]
            },
            {
                name: 'An Agent does not use the "mbox_sha1sum" property if "mbox", "openid", or "account" are used (Multiplicity, 4.1.2.1.b)',
                config: [
                    {
                        name: 'statement actor "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "mbox_sha1sum" cannot be used with "openid',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {actor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                ]
            },
            {
                name: 'An Agent does not use the "account" property if "mbox", "mbox_sha1sum", or "openid" are used (Multiplicity, 4.1.2.1.b)',
                config: [
                    {
                        name: 'statement actor "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "account" cannot be used with "openid',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {actor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
