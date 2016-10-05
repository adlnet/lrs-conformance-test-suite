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
    var INVALID_URI = 'ab=c://should.fail.com';
    var INVALID_LANGUAGE_MAP = {'display': { 'a12345': 'attended'}};

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'Verbs Verify Templates',
                config: [
                    {
                        name: 'should pass statement verb template',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.default}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass substatement verb template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.default}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /** XAPI-00044, Data 2.4.3 Verb
             * A "verb" object contains an "id" property which is required to be an IRI. An LRS rejects with 400 Bad Request if a statement uses the Verb Object and “id” is absent or “id” is present, but the value is an invalid IRI.
             * Covers this and next suite
             */
                name: 'A "verb" property contains an "id" property (Multiplicity, Data 2.4.3.s3.table1.row1, XAPI-00044)',
                config: [
                    {
                        name: 'statement verb missing "id"',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.no_id}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement verb missing "id"',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.no_id}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {   //see above
                name: 'A "verb" property\'s "id" property is an IRI (Type, Data 2.4.3.s3.table1.row1, XAPI-00044)',
                config: [
                    {
                        name: 'statement verb "id" not IRI',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.default}}'},
                            {id: INVALID_URI}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement verb "id" not IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: INVALID_URI}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00019,  2.3.2 Voiding
             * A Voiding Statement is defined as a Statement whose "verb" property's "id" property's IRI ending with "voided"
             */
                name: 'A Voiding Statement is defined as a Statement whose "verb" property\'s "id" property\'s IRI ending with "voided" (Data 2.3.2, XAPI-00019)',
                config: [
                    {
                        name: 'statement verb voided IRI ends with "voided" (WARNING: this applies "Upon receiving a Statement that voids another, the LRS SHOULD NOT* reject the request on the grounds of the Object of that voiding Statement not being present")',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {verb: '{{verbs.voided}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00020,  2.3.2 Voiding
             * A Voiding Statement's "objectType" field has a value of "StatementRef"
             ??  does this also cover XAPI-00017?? - An LRS rejects a Voiding Statement with 400 Bad Request if the "objectType" field does not have a value of "StatementRef"
             */
                name: 'A Voiding Statement\'s "objectType" field has a value of "StatementRef" (Format, Data 2.3.2.s2.b1, XAPI-00020)',
                config: [
                    {
                        name: 'statement verb voided uses substatement with "StatementRef"',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {verb: '{{verbs.voided}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement verb voided does not use object "StatementRef"',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.voided}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00045, Data 2.4.3 Verb
             * A "verb" property's "display" property is a Language Map. An LRS rejects with 400 Bad Request if a statement uses the Verb Object’s “display” property and it is not a valid Language Map.
             */
                name: 'A "verb" property\'s "display" property is a Language Map (Type, Data 2.4.3.s3.table1.row2, XAPI-00045)',
                config: [
                    {
                        name: 'statement verb "display" not language',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.default}}'},
                            INVALID_LANGUAGE_MAP
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement verb "display" not language',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.default}}'},
                            INVALID_LANGUAGE_MAP
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
