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
    var INVALID_OBJECT = {key: 'value'};
    var INVALID_OBJECTTYPE_NUMERIC = {objectType: 123};
    var INVALID_OBJECTTYPE_OBJECT = {objectType: INVALID_OBJECT};
    var INVALID_OBJECTTYPE_NAME_NUMERIC = {name: 123};
    var INVALID_OBJECTTYPE_NAME_OBJECT = {name: INVALID_OBJECT};
    var FOREIGN_IDENTIFIER_ACCOUNT = {'account': {'homePage': 'http://www.example.com', 'name': 'xAPI account name'}};
    var FOREIGN_IDENTIFIER_MBOX = {'mbox': 'mailto:xapi@adlnet.gov'};
    var FOREIGN_IDENTIFIER_MBOX_SHA1SUM = {'mbox_sha1sum': 'cd9b00a5611f94eaa7b1661edab976068e364975'};
    var FOREIGN_IDENTIFIER_OPENID = {'openid': 'http://openid.example.org/12345'};

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00032, Data 2.4.2.1 when the actor objectType is agent
             * An "objectType" property is a String. If present, the LRS must validate and reject with 400 Bad Request if invalid
             */
                name: 'An "objectType" property is a String (Type, Data 2.4.2.1.s2.table1.row1, XAPI-00032)',
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
            /**  XAPI-00033, Data 2.4.2.1 when the actor objectType is agent
             * A "name" property is a String. If present, the LRS must validate and reject with 400 Bad Request if invalid.
             */
                name: 'A "name" property is a String (Type, Data 2.4.2.1.s2.table1.row2, XAPI-00033)',
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
            /**  XAPI-00034, Data 2.4.2.1 when the actor objectType is agent
             * An "actor" property with "objectType" as "Agent" uses exactly one of the following Inverse Functional Identifier properties: "mbox", "mbox_sha1sum", "openid", "account". An LRS rejects with 400 Bad Request any agent object:
                - Where the IFI property is absent
                - Where the IFI value is invalid
                - With more than one IFI
             */
                name: 'An "actor" property with "objectType" as "Agent" uses one of the following properties: "mbox", "mbox_sha1sum", "openid", "account" (Multiplicity, Data 2.4.2.1.s2.b1, XAPI-00034)',
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
            {   //see above
                name: 'An Agent is defined by "objectType" of an "actor" property or "object" property with value "Agent" (Data 2.4.2.1.s2.table1.row1, XAPI-00034)',
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
            {   //see above
                name: 'An Agent does not use the "mbox" property if "mbox_sha1sum", "openid", or "account" are used (Multiplicity, Data 2.4.2.1.s2.b2, XAPI-00034)',
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
            {   //see above
                name: 'An Agent does not use the "mbox_sha1sum" property if "mbox", "openid", or "account" are used (Multiplicity, Data 2.4.2.1.s2.b2, XAPI-00034)',
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
            {   //see above
                name: 'An Agent does not use the "account" property if "mbox", "mbox_sha1sum", or "openid" are used (Multiplicity, Data 2.4.2.1.s2.b2, XAPI-00034)',
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
            {   //see above
                name: 'An Agent does not use the "openid" property if "mbox", "mbox_sha1sum", or "account" are used (Multiplicity, Data 2.4.2.1.s2.b2, XAPI-00034)',
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
