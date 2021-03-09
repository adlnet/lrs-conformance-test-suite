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
    var INVALID_ACTIVITY = 'activity';
    var INVALID_AGENT = 'agent';
    var INVALID_GROUP = 'group';
    var INVALID_STATEMENTREF = 'statementref';
    var INVALID_SUBSTATEMENT = 'substatement';

    // configures tests
    module.exports.config = function () {
        return [

            {
            /**  XAPI-00046, Data 2.4.4 Object
             * An "object" property's "objectType" property is either "Activity", "Agent", "Group", "SubStatement", or "StatementRef". An LRS rejects with 400 Bad Request an “object” property with an objectType which is not "Activity", "Agent", "Group", "SubStatement", or "StatementRef".
             */
                name: 'An "object" property\'s "objectType" property is either "Activity", "Agent", "Group", "SubStatement", or "StatementRef" (Vocabulary, Data 2.4.4.s2, XAPI-00046)',
                config: [
                    {
                        name: 'statement activity should fail on "activity"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'},
                            {objectType: INVALID_ACTIVITY}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity should fail on "activity"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.default}}'},
                            {objectType: INVALID_ACTIVITY}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement agent template should fail on "agent"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.default}}'},
                            {objectType: INVALID_AGENT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement agent should fail on "agent"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.agent}}'},
                            {object: '{{agents.default}}'},
                            {objectType: INVALID_AGENT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement group should fail on "group"',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.default}}'},
                            {objectType: INVALID_GROUP}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement group should fail on "group"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.group}}'},
                            {object: '{{groups.default}}'},
                            {objectType: INVALID_GROUP}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement StatementRef should fail on "statementref"',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {objectType: INVALID_STATEMENTREF}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement StatementRef should fail on "statementref"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'},
                            {objectType: INVALID_STATEMENTREF}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement SubStatement should fail on "substatement"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {objectType: INVALID_SUBSTATEMENT}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
