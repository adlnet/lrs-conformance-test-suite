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
            /**  XAPI-00073, Data 2.4.4.3 when object is a statement
             * Statements that have a StatementRef or Sub-Statement as an Object MUST specify an "objectType" property. The LRS rejects with 400 Bad Request if the “objectType” property is absent and the Object is a StatementRef or Sub-Statement.
             */
                name: 'A Statement Reference is defined by the "objectType" of an "object" with value "StatementRef" (Data 2.4.4.3.s4.b1, XAPI-00073)',
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
            /**  XAPI-00072, Data 2.4.4.3 when object is a statement
            * A Statement Reference's "id" property is a UUID. The LRS rejects with 400 Bad Request a Statement Reference Object with an “id” property which is absent or an invalid UUID.
            */
                name: 'A Statement Reference contains an "id" property (Multiplicity, Data 2.4.4.3.s4.table1.row2, XAPI-00072)',
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
            {   //see above
                name: 'A Statement Reference\'s "id" property is a UUID (Type, Data 2.4.4.3.s4.table1.row2, XAPI-00072)',
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
