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
    var CONTEXT_WHOSE_contextGroups_HAS_INVALID_OBJECT_TYPE = {
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
    var CONTEXT_WHOSE_contextGroups_HAS_INVALID_GROUP = {
        contextGroups: [
            {
                objectType: "contextGroup",
                group: {
                    key: "Should fail"
                }
            }
        ]
    };

    var INVALID_RELEVANT_TYPE_IS_EMPTY = {
        contextGroups: [
            {
                objectType: "contextGroup",
                group: {

                    objectType: "Group",
                    mbox: "mailto:player-1@example.com"
                },
                relevantTypes: []
            }
        ]
    };

    var INVALID_RELEVANT_TYPE_NON_IRI_ELEMENT = {
        contextGroups: [
            {
                objectType: "contextGroup",
                group: {
                    objectType: "Group",
                    mbox: "mailto:player-1@example.com"
                },
                relevantTypes: ['abc']
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
                            { context: '{{contexts.context_groups}}' }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'Statement substatement with "contextGroups" property has an array of valid "contextGroup" Objects',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: '{{contexts.context_groups}}' }
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
                            { context: CONTEXT_WHOSE_contextGroups_HAS_INVALID_OBJECT_TYPE }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement with "contextGroups" Object rejects statement if "group" property is invalid',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: CONTEXT_WHOSE_contextGroups_HAS_INVALID_GROUP }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement with "contextGroups" Object rejects statement if "relevantTypes" is empty',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: INVALID_RELEVANT_TYPE_IS_EMPTY }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement with "contextGroups" Object rejects statement if "relevantTypes" contains non-IRI elements',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: INVALID_RELEVANT_TYPE_NON_IRI_ELEMENT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement substatement with "contextGroups" Object rejects statement if "objectType" property is anything other than string "contextGroup"',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: CONTEXT_WHOSE_contextGroups_HAS_INVALID_OBJECT_TYPE }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement substatement with "contextGroups" Object rejects statement if "group" property is invalid',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: CONTEXT_WHOSE_contextGroups_HAS_INVALID_GROUP }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement substatement with "contextGroups" Object rejects statement if "relevantTypes" is empty',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: INVALID_RELEVANT_TYPE_IS_EMPTY }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement substatement with "contextGroups" Object rejects statement if "relevantTypes" contains non-IRI elements',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: INVALID_RELEVANT_TYPE_NON_IRI_ELEMENT}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
