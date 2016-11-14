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

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00038, Data 2.4.2.3 Inverse Functional Identifier
             * An "mbox" property has the form "mailto:email address" and is an IRI. An LRS rejects with 400 Bad Request if a statement that uses the “mbox” IFI is an invalid form.
             */
                name: 'An "mbox" property has the form "mailto:email address" and is an IRI (Type, Data 2.4.2.3.s3.table1.row1, XAPI-00038)',
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
                    },
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
            /**  XAPI-00039, Data 2.4.2.3 Inverse Functional Identifier
             * An "mbox_sha1sum" property is a String An LRS rejects with 400 Bad Request if a statement uses the “mbox_sha1sum” IFI and it is not a valid string.
             */
                name: 'An "mbox_sha1sum" property is a String (Type, Data 2.4.2.3.s3.table1.row2, XAPI-00039)',
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
            /**  XAPI-00040, Data 2.4.2.3 Inverse Functional Identifier
             * An "openid" property is a URI. An LRS rejects with 400 Bad Request if a statement uses the “openID” IFI and the URI is invalid.
             */
                name: 'An "openid" property is a URI (Type, Data 2.4.2.3.s3.table1.row3, XAPI-00040)',
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
            /**  XAPI-00041,  Data 2.4.2.3 Inverse Functional Identifier
             * An “account” property is an object. An LRS rejects with 400 Bad Request if a statement uses an invalid Account Object. A valid account is defined by the requirements listed in XAPI-I-63 and XAPI-I-66
             * Covers next suite
             */
                name: 'An Account Object is the "account" property of a Group or Agent (Definition, Data 2.4.2.4, XAPI-00041)',
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
            }
        ];
    };
}(module));
