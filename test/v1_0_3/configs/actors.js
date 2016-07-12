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
    var INVALID_MAIL_TO_EMAIL = 'mailto:should.fail.com';
    var INVALID_MAIL_TO_IRI = 'http://should.fail.com';
    var INVALID_URI = 'ab=c://should.fail.com';
    var INVALID_ACCOUNT_HOMEPAGE_IRL = {account: {homePage: INVALID_URI}};
    var INVALID_ACCOUNT_NAME_IRL = {account: {name: INVALID_OBJECT}};

    // configures tests
    module.exports.config = function () {
        return [
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
                name: 'An "mbox" property is an IRI (Type, 4.1.2.3.table1.row1.a)',
                config: [
                    {
                        name: 'statement actor "agent mbox" not IRI',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "group mbox" not IRI',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "agent mbox" not IRI',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "group mbox" not IRI',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "agent mbox" not IRI',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "group mbox" not IRI',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "group mbox" not IRI',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "agent mbox" not IRI',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "group mbox" not IRI',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "agent mbox" not IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "group mbox" not IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "agent mbox" not IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "group mbox" not IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "group mbox" not IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_IRI}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An "mbox" property has the form "mailto:email address" (Syntax, 4.1.2.3.table1.row1.b)',
                config: [
                    {
                        name: 'statement actor "agent mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "group mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "agent mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "group mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "agent mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "group mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "group mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "agent mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "group mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "agent mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "group mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "agent mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "group mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "group mbox" not mailto:email address',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            {mbox: INVALID_MAIL_TO_EMAIL}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An "mbox_sha1sum" property is a String (Type, 4.1.2.3.table1.row2.a)',
                config: [
                    {
                        name: 'statement actor "agent mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "group mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "agent mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "group mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "agent mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "group mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "group mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "agent mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "group mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "agent mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "group mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "agent mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "group mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "group mbox_sha1sum" not string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_sha1sum}}'},
                            {mbox_sha1sum: INVALID_OBJECT}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An "openid" property is a URI (Type, 4.1.2.3.table1.row3.a)',
                config: [
                    {
                        name: 'statement actor "agent openid" not URI',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "group openid" not URI',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "agent openid" not URI',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "group openid" not URI',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "agent openid" not URI',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "group openid" not URI',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "group openid" not URI',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "agent openid" not URI',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "group openid" not URI',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "agent openid" not URI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "group openid" not URI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "agent openid" not URI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "group openid" not URI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "group openid" not URI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid}}'},
                            {openid: INVALID_URI}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An Account Object is the "account" property of a Group or Agent (Definition, 4.1.2.4)',
                config: [
                    {
                        name: 'statement actor "agent account" property exists',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor "group account" property exists',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "agent account" property exists',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "group account" property exists',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.authority_group}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "agent account" property exists',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "group account" property exists',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team "group account" property exists',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as "agent account" property exists',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as "group account" property exists',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s "agent account" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s "group account" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "agent account" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "group account" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team "group account" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'An Account Object uses the "homePage" property (Multiplicity, 4.1.2.4.table1.row1.b)',
                config: [
                    {
                        name: 'statement actor "agent" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "group" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "agent" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "group" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "agent" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "group" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "group" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "agent" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "group" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "agent" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "group" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "agent" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "group" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_homepage}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "group" account "homePage" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_homepage}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An Account Object\'s "homePage" property is an IRL (Type, 4.1.2.4.table1.row1.a)',
                config: [
                    {
                        name: 'statement actor "agent" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "group" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "agent" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "group" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "agent" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "group" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "group" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "agent" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "group" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "agent" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "group" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "agent" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "group" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "group" account "homePage property is IRL',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_homepage}}'},
                            INVALID_ACCOUNT_HOMEPAGE_IRL
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An Account Object uses the "name" property (Multiplicity, 4.1.2.4.table1.row2.b)',
                config: [
                    {
                        name: 'statement actor "agent" account "name" property exists',
                        templates: [
                            {statement: '{{statements.actor}}'},
                                {actor: '{{agents.account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "group" account "name" property exists',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "agent" account "name" property exists',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "group" account "name" property exists',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "agent" account "name" property exists',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "group" account "name" property exists',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "group" account "name" property exists',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "agent" account "name" property exists',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "group" account "name" property exists',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "agent" account "name" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "group" account "name" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "agent" account "name" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "group" account "name" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "group" account "name" property exists',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An Account Object "name" property is a String (Type, 4.1.2.4.table1.row1.a)',
                config: [
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
