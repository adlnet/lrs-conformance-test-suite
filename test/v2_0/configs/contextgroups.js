/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */
(function (module) {
    "use strict";

    // Defines overwriting data.
    var INVALID_OBJECT_TYPE = {
        contextGroups: [
            {
                objectType: "Should fail",
                group: {
                    objectType: "Group",
                    mbox: "mailto:team-1@example.com"
                },
                member: [
                    {
                        objectType: "Agent",
                        mbox: "mailto:player-1@example.com"
                    }
                ],
            }
        ]
    };
    var INVALID_GROUP = {
        contextAgents: [
            {
                objectType: "contextGroup",
                group: {
                    key: "Should fail"
                }
            }
        ]
    };

    // Configures tests.
    module.exports.config = function () {
        return [
            {
                /** ContextGroups Property
                 *  A "contextGroups" property is an array of "contextGroup" Objects.
                 */
                name: 'A "contextGroups" property is an array of "contextGroup" Objects',
                config: [
                    {
                        name: 'Statement with "contextGroups" property has an array of valid "contextGroup" Objects',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: '{{contexts.context_agents}}' }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'Statement substatement with "contextGroups" property has an array of valid "contextGroup" Objects',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: '{{contexts.context_agents}}' }
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                /** ContextGroups Object
                 *  A "contextGroups" Object must have an "objectType" property of string "contextGroup" and a valid Group Object "group";
                 *  it may also have a "relevantTypes" property as an array of Activity Type IRIs.
                 */
                name: 'A "contextGroups" Object must have an "objectType" property of string "contextGroup" and a valid Group Object "group"',
                config: [
                    {
                        name: 'Statement with "contextGroups" Object rejects statement if "objectType" property is anything other than string "contextGroup"',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: INVALID_OBJECT_TYPE }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement with "contextGroups" Object rejects statement if "group" property is invalid',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: INVALID_GROUP }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement substatement with "contextGroups" Object rejects statement if "objectType" property is anything other than string "contextGroup"',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: INVALID_OBJECT_TYPE }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement substatement with "contextGroups" Object rejects statement if "group" property is invalid',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: INVALID_GROUP }
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
