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
    var INVALID_OBJECTTYPE_INVALID_AGENT = {objectType: 'agent'};
    var INVALID_OBJECTTYPE_INVALID_GROUP = {objectType: 'group'};

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
                            {actor: '{{groups.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement authority template',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.default}}'}
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
                            {authority: '{{groups.default}}'}
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
                        name: 'statement actor "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement authority "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context instructor "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context team "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement as group "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s group "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement"s context team "objectType" accepts "Group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.team}}'},
                            {team: '{{groups.anonymous}}'}
                        ],
                        expect: [200]
                    }
                ]
            }
        ];
    };
}(module));
