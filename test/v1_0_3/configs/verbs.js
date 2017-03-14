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
    var INVALID_LANGUAGE_MAP_NUMERIC = {'display': 12345};
    var INVALID_LANGUAGE_MAP_STRING = {'display': 'a12345 attended'};

    // configures tests
    module.exports.config = function () {
        return [
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
            /**  XAPI-00045, Data 2.4.3 Verb
             * A "verb" property's "display" property is a Language Map. An LRS rejects with 400 Bad Request if a statement uses the Verb Object’s “display” property and it is not a valid Language Map.
             * Further verification of language map in Data 2.2 Formatting
             */
                name: 'A "verb" property\'s "display" property is a Language Map (Type, Data 2.4.3.s3.table1.row2, XAPI-00045)',
                config: [
                    {
                        name: 'statement verb "display" is numeric',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.default}}'},
                            INVALID_LANGUAGE_MAP_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement verb "display" is string',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.default}}'},
                            INVALID_LANGUAGE_MAP_STRING
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement verb "display" is numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.default}}'},
                            INVALID_LANGUAGE_MAP_NUMERIC
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement verb "display" is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.default}}'},
                            INVALID_LANGUAGE_MAP_STRING
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
