/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */
(function (module) {
    "use strict";

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'A Sub-Statement is defined by the "objectType" of an "object" with value "SubStatement" (Data 2.4.4.3.s8.b1)',
                config: [
                    {
                        name: 'substatement invalid when not "SubStatement"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {objectType: 'substatement'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00066, Data 2.4.4.3 when object is a statement
             * A Sub-Statement follows the requirements of all Statements. The LRS rejects with 400 Bad Request a Statement with a Sub-Statement with any invalid statement properties in an otherwise valid sub-statement.
             */
                name: 'A Sub-Statement follows the requirements of all Statements (Data 2.4.4.3.s8.b2, XAPI-00066)',
                config: [
                    {
                        name: 'substatement requires actor',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.no_actor}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'substatement requires object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.no_object}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'substatement requires verb',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.no_verb}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should pass substatement context',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass substatement result',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass substatement statementref',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.statementref}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass substatement as agent',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.agent}}'},
                            {object: '{{agents.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass substatement as group',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.group}}'},
                            {object: '{{groups.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00071, Data 2.4.4.3 when object is a statement
             * A Sub-Statement cannot have a Sub-Statement. The LRS rejects with 400 Bad Request a Statement with a Sub-Statement which contains a Sub-Statement.
             */
                name: 'A Sub-Statement cannot have a Sub-Statement (Data 2.4.4.3.s8.b4, XAPI-00071)',
                config: [
                    {
                        name: 'substatement invalid nested "SubStatement"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{statements.object_substatement}}'},
                            {object: '{{statements.object_substatement_default}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00070, Data 2.4.4.3 when object is a statement
             * A Sub-Statement cannot use the "id" property at the Statement level The LRS rejects with 400 Bad Request a Statement with a Sub-Statement where the “id” property is present.
             */
                name: 'A Sub-Statement cannot use the "id" property at the Statement level (Data 2.4.4.3.s8.b3, XAPI-00070)',
                config: [
                    {
                        name: 'substatement invalid with property "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {id: 'fd41c918-b88b-4b20-a0a5-a4c32391aaa0'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00069, Data 2.4.4.3 when object is a statement
             * A Sub-Statement cannot use the "stored" property. The LRS rejects with 400 Bad Request a Statement with a Sub-Statement where the “stored” property is present.
             */
                name: 'A Sub-Statement cannot use the "stored" property (Data 2.4.4.3.s8.b3, XAPI-00069)',
                config: [
                    {
                        name: 'substatement invalid with property "stored"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {stored: '2013-05-18T05:32:34.804Z'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00068, Data 2.4.4.3 when object is a statement
             * A Sub-Statement cannot use the "version" property. The LRS rejects with 400 Bad Request a Statement with a Sub-Statement where the “version” property is present.
             */
                name: 'A Sub-Statement cannot use the "version" property (Data 2.4.4.3.s8.b3, XAPI-00068)',
                config: [
                    {
                        name: 'substatement invalid with property "version"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.default}}'},
                            {version: '1.0.0'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00067, Data 2.4.4.3 when object is a statement
             * A Sub-Statement cannot use the "authority" property. The LRS rejects with 400 Bad Request a Statement with a Sub-Statement where the “authority” property is present.
             */
                name: 'A Sub-Statement cannot use the "authority" property (Data 2.4.4.3.s8.b3, XAPI-00067)',
                config: [
                    {
                        name: 'substatement invalid with property "authority"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{statements.authority}}'},
                            {authority: '{{agents.default}}'}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
