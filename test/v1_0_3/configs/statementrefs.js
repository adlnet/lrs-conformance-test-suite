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
    var INVALID_STATEMENT_REF = 'statementref';
    var INVALID_STRING = 'should fail';

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'StatementRefs Verify Templates',
                config: [
                    {
                        name: 'should pass statement StatementRef template',
                        templates: [
                            {statement: '{{statements.object_statementref}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass substatement StatementRef template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A Statement Reference is defined by the "objectType" of an "object" with value "StatementRef" (4.1.4.2.a)',
                config: [
                    {
                        name: 'statementref invalid when not "StatementRef"',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {object: {'objectType': INVALID_STATEMENT_REF}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'substatement statementref invalid when not "StatementRef"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'},
                            {object: {'objectType': INVALID_STATEMENT_REF}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A Statement Reference contains an "id" property (Multiplicity, 4.1.4.3.table1.row2.b)',
                config: [
                    {
                        name: 'statementref invalid when missing "id"',
                        templates: [
                            {statement: '{{statements.object_statementref_no_id}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'substatement statementref invalid when missing "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref_no_id}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A Statement Reference\'s "id" property is a UUID (Type, 4.1.4.3.table1.row2.a)',
                config: [
                    {
                        name: 'statementref "id" not "uuid"',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {object: {'id': INVALID_STRING}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'substatement statementref "id" not "uuid"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'},
                            {object: {'id': INVALID_STRING}}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
