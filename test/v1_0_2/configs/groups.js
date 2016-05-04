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
            {
                name: 'A Group is defined by "objectType" of an "actor" property or "object" property with value "Group" (4.1.2.2.table1.row2, 4.1.4.2.a)',
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
            {
                name: 'An Anonymous Group is defined by "objectType" of an "actor" or "object" with value "Group" and by none of "mbox", "mbox_sha1sum", "openid", or "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table1)',
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
            {
                name: 'An Anonymous Group uses the "member" property (Multiplicity, 4.1.2.2.table1.row3.b)',
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
                name: 'The "member" property is an array of Objects following Agent requirements (4.1.2.2.table1.row3.a)',
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
                name: 'Statement authority shall only be an anonymous group with two members',
                config: [
                    {
                        name: 'statement authority identified group is rejected',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_openid}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority anonymous group with two members is accepted',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous_two_member}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority anonymous group without two members is rejected',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous_no_member}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An Identified Group is defined by "objectType" of an "actor" or "object" with value "Group" and by one of "mbox", "mbox_sha1sum", "openid", or "account" being used (4.1.2.2.table1.row2, 4.1.2.2.table2)',
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
            {
                name: 'An Identified Group uses one of the following properties: "mbox", "mbox_sha1sum", "openid", "account" (Multiplicity, 4.1.2.1.a)',
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
            {
                name: 'An Identified Group does not use the "mbox" property if "mbox_sha1sum", "openid", or "account" are used (Multiplicity, 4.1.2.1.b)',
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
            {
                name: 'An Identified Group does not use the "mbox_sha1sum" property if "mbox", "openid", or "account" are used (Multiplicity, 4.1.2.1.b)',
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
            {
                name: 'An Identified Group does not use the "openid" property if "mbox", "mbox_sha1sum", or "account" are used (Multiplicity, 4.1.2.1.b)',
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
            {
                name: 'An Identified Group does not use the "account" property if "mbox", "mbox_sha1sum", or "openid" are used (Multiplicity, 4.1.2.1.b)',
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
