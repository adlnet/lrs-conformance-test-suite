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
    var INVALID_OBJECTTYPE_INVALID_AGENT = {objectType: 'agent'};
    var INVALID_OBJECTTYPE_INVALID_GROUP = {objectType: 'group'};

    // configures tests
    module.exports.config = function () {
        return [
            {
            /** XAPI-00031, Data 2.4.2 Actor
             * An "actor" property's "objectType" property is either "Agent" or "Group" An LRS rejects with 400 Bad Request an actor with an “objectType” which is not “Agent” or “Group”
             */
                name: 'An "actor" property\'s "objectType" property is either "Agent" or "Group" (Vocabulary, Data 2.4.2.1, Data 2.4.2.2, XAPI-00031)',
                config: [
                    {
                        name: 'statement actor "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as group with "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s actor "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s actor "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail when not "Agent"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_AGENT
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail when not "Group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.default}}'},
                            INVALID_OBJECTTYPE_INVALID_GROUP
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
