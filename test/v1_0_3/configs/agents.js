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
    var INVALID_OBJECTTYPE_INVALID_AGENT = {objectType: 'agent'};
    var INVALID_OBJECTTYPE_INVALID_GROUP = {objectType: 'group'};

    var FOREIGN_IDENTIFIER_ACCOUNT = {'account': {'homePage': 'http://www.example.com', 'name': 'xAPI account name'}};
    var FOREIGN_IDENTIFIER_MBOX = {'mbox': 'mailto:xapi@adlnet.gov'};
    var FOREIGN_IDENTIFIER_MBOX_SHA1SUM = {'mbox_sha1sum': 'cd9b00a5611f94eaa7b1661edab976068e364975'};
    var FOREIGN_IDENTIFIER_OPENID = {'openid': 'http://openid.example.org/12345'};

    // configures tests
    module.exports.config = function () {
        return [
            {
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
                name: 'An Agent is defined by "objectType" of an "actor" property or "object" property with value "Agent" (4.1.2.1.table1.row1, 4.1.4.2.a)',
                config: [
                    {
                        name: 'statement actor does not require objectType',
                        templates: [
                            {statement: '{{statements.no_actor}}'},
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
                        name: 'statement actor "mbox" cannot be used with "openid"',
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
                        name: 'statement actor "mbox_sha1sum" cannot be used with "openid"',
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
                        name: 'statement actor "account" cannot be used with "openid"',
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
            },
            {
                name: 'An Agent does not use the "openid" property if "mbox", "mbox_sha1sum", or "account" are used (Multiplicity, 4.1.2.1.b)',
                config: [
                    {
                        name: 'statement actor "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {actor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
