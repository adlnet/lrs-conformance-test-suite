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
    var INVALID_NUMERIC = 12345;
    var INVALID_OBJECT = {key: 'should fail'};
    var INVALID_UUID_TOO_MANY_DIGITS = 'AA97B177-9383-4934-8543-0F91A7A028368';
    var INVALID_UUID_INVALID_LETTER = 'MA97B177-9383-4934-8543-0F91A7A02836';

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00030, Data 2.4.1 Id
             * All UUID types follow requirements of RFC4122.  An LRS rejects with 400 Bad Request a statement which has a property which is required to be a UUID and does not follow RFC4122.
             */
            /**  XAPI-00027, Data 2.4.1 Id
             * A Statement's "id" property is a UUID following RFC 4122. An LRS rejects with 400 Bad Request a statement which has an “id” and that “id” is invalid.
             */
                name: 'All UUID types follow requirements of RFC4122 (Type, Data 2.4.1.s1, XAPI-00030, XAPI-00027)',
                config: [
                    {   //XAPI-00027
                        name: 'statement "id" invalid UUID with too many digits',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_UUID_TOO_MANY_DIGITS}
                        ],
                        expect: [400]
                    },
                    {   //XAPI-00027
                        name: 'statement "id" invalid UUID with non A-F',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_UUID_INVALID_LETTER}
                        ],
                        expect: [400]
                    },
                    {   //XAPI-00027
                        name: 'statement object statementref "id" invalid UUID with too many digits',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {object: {id: INVALID_UUID_TOO_MANY_DIGITS}}
                        ],
                        expect: [400]
                    },
                    {   //XAPI-00027
                        name: 'statement object statementref "id" invalid UUID with non A-F',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'},
                            {object: {id: INVALID_UUID_INVALID_LETTER}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "registration" invalid UUID with too many digits',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {registration: INVALID_UUID_TOO_MANY_DIGITS}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "registration" invalid UUID with non A-F',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {registration: INVALID_UUID_INVALID_LETTER}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "statement" invalid UUID with too many digits',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {context: '{{contexts.default}}'},
                            {statement: {id: INVALID_UUID_TOO_MANY_DIGITS}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "statement" invalid UUID with non A-F',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'},
                            {context: '{{contexts.default}}'},
                            {statement: {id: INVALID_UUID_INVALID_LETTER}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00029, Data 2.4.1 Id
             * All UUID types are in standard String form. An LRS rejects with 400 Bad Request a statement which has an property which is required to be a UUID and that property is not in standard string form
             */
            /**  XAPI-00028, Data 2.4.1 Id
             * A Statement's "id" property is a String. An LRS rejects with 400 Bad Request a statement which has an “id” and that property is not a string
             */
                name: 'All UUID types are in standard String form (Type, Data 2.4.1.s1, XAPI-00029, XAPI-00028)',
                config: [
                    {   //XAPI-00028
                        name: 'statement "id" invalid numeric',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {   //XAPI-00028
                        name: 'statement "id" invalid object',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {   //XAPI-00028
                        name: 'statement object statementref "id" invalid numeric',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {object: {id: INVALID_NUMERIC}}
                        ],
                        expect: [400]
                    },
                    {   //XAPI-00028
                        name: 'statement object statementref "id" invalid object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'},
                            {object: {id: INVALID_OBJECT}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "registration" invalid numeric',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {registration: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "registration" invalid object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {registration: INVALID_OBJECT}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context "statement" invalid numeric',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {context: '{{contexts.default}}'},
                            {statement: {id: INVALID_NUMERIC}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context "statement" invalid object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'},
                            {context: '{{contexts.default}}'},
                            {statement: {id: INVALID_OBJECT}}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
