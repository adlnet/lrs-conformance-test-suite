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
    var CONTEXT_WHOSE_contextAgents_HAS_INVALID_OBJECT_TYPE = {
        contextAgents: [
            {
                objectType: "Should fail",
                agent: {
                    objectType: "Agent",
                    mbox: "mailto:player-1@example.com"
                }
            }
        ]
    };
    var CONTEXT_WHOSE_contextAgents_HAS_INVALID_AGENT = {
        contextAgents: [
            {
                objectType: "contextAgent",
                agent: {
                    key: "Should fail"
                }
            }
        ]
    };

    var INVALID_RELEVANT_TYPE_IS_EMPTY = {
        contextAgents: [
            {
                objectType: "contextAgent",
                agent: {

                    objectType: "Agent",
                    mbox: "mailto:player-1@example.com"
                },
                relevantTypes: []
            }
        ]
    };

    var INVALID_RELEVANT_TYPE_NON_IRI_ELEMENT = {
        contextAgents: [
            {
                objectType: "contextAgent",
                agent: {
                    objectType: "Agent",
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
                /** ContextAgents Property
                 *  A "contextAgents" property is an array of "contextAgent" Objects.
                 */
                name: 'A "contextAgents" property is an array of "contextAgent" Objects.',
                config: [
                    {
                        name: 'Statement with "contextAgents" property has an array of valid "contextAgent" Objects',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: '{{contexts.context_agents}}' }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'Statement substatement with "contextAgents" property has an array of valid "contextAgent" Objects',
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
                /** ContextAgents Object
                 *  A "contextAgents" Object must have an "objectType" property of string "contextAgent" and a valid Agent Object "agent";
                 *  it may also have a "relevantTypes" property as an array of Activity Type IRIs.
                 */
                name: 'A "contextAgents" Object must have an "objectType" property of string "contextAgent" and a valid Agent Object "agent"',
                config: [
                    {
                        name: 'Statement with "contextAgents" Object rejects statement if "objectType" property is anything other than string "contextAgent"',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: CONTEXT_WHOSE_contextAgents_HAS_INVALID_OBJECT_TYPE }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement with "contextAgents" Object rejects statement if "agent" property is invalid',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: CONTEXT_WHOSE_contextAgents_HAS_INVALID_AGENT }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement with "contextAgents" Object rejects statement if "relevantTypes" is empty',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: INVALID_RELEVANT_TYPE_IS_EMPTY }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement with "contextAgents" Object rejects statement if "relevantTypes" contains non-IRI elements',
                        templates: [
                            { statement: '{{statements.context}}' },
                            { context: INVALID_RELEVANT_TYPE_NON_IRI_ELEMENT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement substatement with "contextAgents" Object rejects statement if "objectType" property is anything other than string "contextAgent"',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: CONTEXT_WHOSE_contextAgents_HAS_INVALID_OBJECT_TYPE }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement substatement with "contextAgents" Object rejects statement if "agent" property is invalid',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: CONTEXT_WHOSE_contextAgents_HAS_INVALID_AGENT }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement substatement with "contextAgents" Object rejects statement if "relevantTypes" is empty',
                        templates: [
                            { statement: '{{statements.object_substatement}}' },
                            { object: '{{substatements.context}}' },
                            { context: INVALID_RELEVANT_TYPE_IS_EMPTY }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'Statement substatement with "contextAgents" Object rejects statement if "relevantTypes" contains non-IRI elements',
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
