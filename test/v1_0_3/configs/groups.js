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
    var FOREIGN_IDENTIFIER_ACCOUNT = {'account': {'homePage': 'http://www.example.com', 'name': 'xAPI account name'}};
    var FOREIGN_IDENTIFIER_MBOX = {'mbox': 'mailto:xapi@adlnet.gov'};
    var FOREIGN_IDENTIFIER_MBOX_SHA1SUM = {'mbox_sha1sum': 'cd9b00a5611f94eaa7b1661edab976068e364975'};
    var FOREIGN_IDENTIFIER_OPENID = {'openid': 'http://openid.example.org/12345'};

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00035, 2.4.2.2 when the actor objectType is group
             * A Group uses the "member" property. An LRS rejects with 400 Bad Request if the "member" property is present anywhere but in a group object (Actor or team).
             */
                name: 'An Anonymous Group uses the "member" property (Multiplicity, Data 2.4.2.2.s2.table1.row3, XAPI-00035)',
                config: [
                    {
                        name: 'statement actor anonymous group missing member',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.anonymous_no_member}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority anonymous group missing member',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.default}}'},
                            {member: '{{groups.anonymous_no_member}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor anonymous group missing member',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.default}}'},
                            {member: '{{groups.anonymous_no_member}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team anonymous group missing member',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.default}}'},
                            {member: '{{groups.anonymous_no_member}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group anonymous group missing member',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.default}}'},
                            {member: '{{groups.anonymous_no_member}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s group anonymous group missing member',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.default}}'},
                            {member: '{{groups.anonymous_no_member}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor anonymous group missing member',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.default}}'},
                            {member: '{{groups.anonymous_no_member}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team anonymous group missing member',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.default}}'},
                            {member: '{{groups.anonymous_no_member}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00036, Data 2.4.2.2 when the actor objectType is group
             * The "member" property is an array of Objects following Agent requirements. An LRS rejects with 400 Bad Request any group object which has a member property with anything other than a valid array of Agents as a value
             */
                name: 'The "member" property is an array of Objects following Agent requirements (Data 2.4.2.2.s2.table2.row3, XAPI-00036)',
                config: [
                    {
                        name: 'statement actor requires member type "array"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.default}}'},
                            {member: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority requires member type "array"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.default}}'},
                            {member: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor requires member type "array"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.default}}'},
                            {member: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team requires member type "array"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.default}}'},
                            {member: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group requires member type "array"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.default}}'},
                            {member: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s group requires member type "array"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.default}}'},
                            {member: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor requires member type "array"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.default}}'},
                            {member: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team requires member type "array"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.default}}'},
                            {member: '{{agents.default}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00037,  Data 2.4.2.2 when actor objectType is group
             * An "actor" property with "objectType" as "Group" uses exactly one of the following Inverse Functional Identifier properties: "mbox", "mbox_sha1sum", "openid", "account" or a member property with at least one Agent. An LRS rejects with 400 Bad Request any group object with:
                - no IFI and no member property
                - more than one IFI
                - an invalid IFI value
             * The remaining 6 suites take care of XAPI-00037
             */
                name: 'An Identified Group is defined by "objectType" of an "actor" or "object" with value "Group" and by one of "mbox", "mbox_sha1sum", "openid", or "account" being used (Data 2.4.2.2.s2.table2.row1, XAPI-00037)',
                config: [
                    {
                        name: 'statement actor identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_sha1sum}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_openid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_account}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {   //see above
                name: 'An Identified Group uses one of the following properties: "mbox", "mbox_sha1sum", "openid", "account" (Multiplicity, Data 2.4.2.2.s2.table2.row4, XAPI-00037)',
                config: [
                    {
                        name: 'statement actor identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_openid_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement actor identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_sha1sum_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_sha1sum_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_openid_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_account_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox_sha1sum_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_openid_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_openid_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_account_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_sha1sum_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team identified group accepts "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team identified group accepts "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_sha1sum_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team identified group accepts "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_openid_no_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team identified group accepts "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_account_no_member}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {   //see above
                name: 'An Identified Group does not use the "mbox" property if "mbox_sha1sum", "openid", or "account" are used (Multiplicity, Data 2.4.2.2.s5.b1, XAPI-00037)',
                config: [
                    {
                        name: 'statement actor "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "mbox" cannot be used with "openid',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {actor: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox}}'},
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
                            {instructor: '{{groups.identified_mbox}}'},
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
                            {instructor: '{{groups.identified_mbox}}'},
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
                            {instructor: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "mbox" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "mbox" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "mbox" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    }
                ]
            },
            {   //see above
                name: 'An Identified Group does not use the "mbox_sha1sum" property if "mbox", "openid", or "account" are used (Multiplicity, Data 2.4.2.2.s5.b1, XAPI-00037)',
                config: [
                    {
                        name: 'statement actor "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "mbox_sha1sum" cannot be used with "openid',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {actor: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_mbox_sha1sum}}'},
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
                            {instructor: '{{groups.identified_mbox_sha1sum}}'},
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
                            {instructor: '{{groups.identified_mbox_sha1sum}}'},
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
                            {instructor: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "mbox_sha1sum" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "mbox_sha1sum" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "mbox_sha1sum" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_mbox_sha1sum}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    }
                ]
            },
            {   //see above
                name: 'An Identified Group does not use the "openid" property if "mbox", "mbox_sha1sum", or "account" are used (Multiplicity, Data 2.4.2.2.s5.b1, XAPI-00037)',
                config: [
                    {
                        name: 'statement actor "openid" cannot be used with "account',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {actor: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_openid}}'},
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
                            {instructor: '{{groups.identified_openid}}'},
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
                            {instructor: '{{groups.identified_openid}}'},
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
                            {instructor: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "openid" cannot be used with "account"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_ACCOUNT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "openid" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "openid" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_openid}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    }
                ]
            },
            {   //see above
                name: 'An Identified Group does not use the "account" property if "mbox", "mbox_sha1sum", or "openid" are used (Multiplicity, Data 2.4.2.2.s5.b1, XAPI-00037)',
                config: [
                    {
                        name: 'statement actor "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "account" cannot be used with "openid',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {actor: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_account}}'},
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
                            {instructor: '{{groups.identified_account}}'},
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
                            {instructor: '{{groups.identified_account}}'},
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
                            {instructor: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "account" cannot be used with "mbox"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "account" cannot be used with "mbox_sha1sum"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_MBOX_SHA1SUM
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "account" cannot be used with "openid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.identified_account}}'},
                            FOREIGN_IDENTIFIER_OPENID
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
