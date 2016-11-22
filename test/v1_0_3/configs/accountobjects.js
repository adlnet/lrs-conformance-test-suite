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
            /**  XAPI-00042, 2.4.2.4 Account Object
             * An Account Object's homePage" property is an IRL. An LRS rejects with 400 Bad Request if a statement uses the “account” IFI and the “homePage” property is absent or has an invalid IRL.
             */
                name: 'An Account Object uses the "homePage" property (Multiplicity, Data 2.4.2.4.s2.table1.row1, XAPI-00042)',
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
            {   //see above
                name: 'An Account Object\'s "homePage" property is an IRL (Type, Data 2.4.2.4.s2.table1.row1, XAPI-00042)',
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
            /**  XAPI-00043, 2.4.2.4 Account Object
             * An Account Object "name" property is a String. An LRS rejects with 400 Bad Request if a statement uses the “account” IFI and the “name” property is absent or has an invalid string.
             */
                name: 'An Account Object uses the "name" property (Multiplicity, Data 2.4.2.4.s2.table1.row2, XAPI-00043)',
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
            }
        ];
    };
}(module));
