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
    var INVALID_ONE_MEMBER = [
        {
            "mbox": "mailto:bob@example.com"
        }
    ];
    var INVALID_THREE_MEMBER = [
        {
            "account": {
                "homePage": "http://example.com/xAPI/OAuth/Token",
                "name": "oauth_consumer_x75db"
            }
        },
        {
            "mbox": "mailto:bob@example.com"
        },
        {
            "mbox": "mailto:james@example.com"
        }
    ];

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'An "authority" property is an Agent or Group (Type, 4.1.2.1.table1.row9.a, 4.1.2.1.table1.row9.b, 4.1.9.a)',
                config: [
                    {
                        name: 'should pass statement authority agent template',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'}
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
                        name: 'should fail statement authority identified group (mbox)',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous_two_member}}'},
                            {"mbox": "mailto:bob@example.com"}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail statement authority identified group (mbox_sha1sum)',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous_two_member}}'},
                            {"mbox_sha1sum": "cd9b00a5611f94eaa7b1661edab976068e364975"}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail statement authority identified group (openid)',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous_two_member}}'},
                            {"openid": "http://openid.example.org/12345"}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail statement authority identified group (account)',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous_two_member}}'},
                            {
                                "account": {
                                    "homePage": "http://www.example.com",
                                    "name": "xAPI account name"
                                }
                            }
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An "authority" property which is also a Group contains exactly two Agents (Type, 4.1.2.1.table1.row9.a, 4.1.2.1.table1.row9.b, 4.1.9.a)',
                config: [
                    {
                        name: 'statement "authority" invalid one member',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous_no_member}}'},
                            {member: INVALID_ONE_MEMBER}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "authority" invalid three member',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous_no_member}}'},
                            {member: INVALID_THREE_MEMBER}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An LRS rejects with error code 400 Bad Request, a Request whose "authority" is a Group of more than two Agents (Format, 4.1.9.a)',
                config: [
                    {
                        name: 'statement "authority" invalid three member',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.anonymous_no_member}}'},
                            {member: INVALID_THREE_MEMBER}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
