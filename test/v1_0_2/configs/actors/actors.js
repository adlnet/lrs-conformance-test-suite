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

    // defines mapping
    var STATEMENT_ACTOR = [
        {statement: 'statements.actor'},
        {actor: 'agents.default'}
    ];
    var STATEMENT_AUTHORITY = [
        {statement: 'statements.authority'},
        {authority: 'agents.default'}
    ];
    var STATEMENT_CONTEXT_INSTRUCTOR = [
        {statement: 'statements.context'},
        {context: 'contexts.instructor'},
        {instructor: 'agents.default'}
    ];
    var STATEMENT_SUBSTATEMENT_AS_AGENT = [
        {statement: 'statements.object_actor'},
        {object: 'agents.default'}
    ];
    var STATEMENT_SUBSTATEMENTS_AGENT = [
        {statement: 'statements.object_substatement'},
        {object: 'substatements.actor'},
        {actor: 'agents.default'}
    ];
    var STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR = [
        {statement: 'statements.object_substatement'},
        {object: 'substatements.context'},
        {context: 'contexts.instructor'},
        {instructor: 'agents.default'}
    ];

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'An "objectType" property is a String (Type, 4.1.2.1.table1.row1.a)',
                config: [
                    {
                        name: 'statement actor "objectType" should fail numeric',
                        template: STATEMENT_ACTOR,
                        override: {objectType: 123},
                        expect: [400]
                    },
                    {
                        name: 'statement actor "objectType" should fail object',
                        template: STATEMENT_ACTOR,
                        override: {objectType: {key: "value"}},
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail numeric',
                        template: STATEMENT_AUTHORITY,
                        override: {objectType: 123},
                        expect: [400]
                    },
                    {
                        name: 'statement authority "objectType" should fail object',
                        template: STATEMENT_AUTHORITY,
                        override: {objectType: {key: "value"}},
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail numeric',
                        template: STATEMENT_CONTEXT_INSTRUCTOR,
                        override: {objectType: 123},
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "objectType" should fail object',
                        template: STATEMENT_CONTEXT_INSTRUCTOR,
                        override: {objectType: {key: "value"}},
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "objectType" should fail numeric',
                        template: STATEMENT_SUBSTATEMENT_AS_AGENT,
                        override: {objectType: 123},
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as agent with "objectType" should fail object',
                        template: STATEMENT_SUBSTATEMENT_AS_AGENT,
                        override: {objectType: {key: "value"}},
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "objectType" should fail numeric',
                        template: STATEMENT_SUBSTATEMENTS_AGENT,
                        override: {objectType: 123},
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s agent "objectType" should fail object',
                        template: STATEMENT_SUBSTATEMENTS_AGENT,
                        override: {objectType: {key: "value"}},
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail numeric',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR,
                        override: {objectType: 123},
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "objectType" should fail object',
                        template: STATEMENT_SUBSTATEMENT_CONTEXT_INSTRUCTOR,
                        override: {objectType: {key: "value"}},
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
