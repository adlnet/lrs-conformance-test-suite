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
    var INVALID_EXTENSION_KEY = {'extensions': {'should fail': true}};
    var NULL_VALUE = {'extensions': {'http://example.com/ex': null}};
    var EMPTY_STRING_VALUE = {'extensions': {'http://example.com/ex': ''}};
    var EMPTY_OBJECT_VALUE = {'extensions': {'http://example.com/ex': {}}};
    var VALID_EXTENSION_EMPTY = {'extensions': {}};
    var VALID_EXTENSION_BOOLEAN = {'extensions': {'http://example.com/ex': true}};
    var VALID_EXTENSION_NUMERIC = {'extensions': {'http://example.com/ex': 12345}};
    var VALID_EXTENSION_OBJECT = {'extensions': {'http://example.com/ex': {key: 'valid'}}};
    var VALID_EXTENSION_STRING = {'extensions': {'http://example.com/ex': 'valid'}};

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00120, Data 4.1 Extensions
             * An Extension's structure is that of "key"/"value" pairs. The LRS rejects with 400 a statement which does not use valid “key”/”value” pairs in the Extension property
             * See XAPI-00118 for the 400
             */
                name: 'An Extension is defined as an Object of any "extensions" property (Multiplicity, Data 4.1.s2, XAPI-00120)',
                config: [
                    {
                        name: 'statement activity extensions valid boolean',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: VALID_EXTENSION_BOOLEAN}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity extensions valid numeric',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: VALID_EXTENSION_NUMERIC}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity extensions valid object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: VALID_EXTENSION_OBJECT}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity extensions valid string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: VALID_EXTENSION_STRING}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extensions valid boolean',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            VALID_EXTENSION_BOOLEAN
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extensions valid numeric',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            VALID_EXTENSION_NUMERIC
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extensions valid object',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            VALID_EXTENSION_OBJECT
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extensions valid string',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            VALID_EXTENSION_STRING
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions valid boolean',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            VALID_EXTENSION_BOOLEAN
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions valid numeric',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            VALID_EXTENSION_NUMERIC
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions valid object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            VALID_EXTENSION_OBJECT
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions valid string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            VALID_EXTENSION_STRING
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extensions valid boolean',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: VALID_EXTENSION_BOOLEAN}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extensions valid numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: VALID_EXTENSION_NUMERIC}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extensions valid object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: VALID_EXTENSION_OBJECT}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extensions valid string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: VALID_EXTENSION_STRING}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions valid boolean',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            VALID_EXTENSION_BOOLEAN
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions valid numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            VALID_EXTENSION_NUMERIC
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions valid object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            VALID_EXTENSION_OBJECT
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions valid string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            VALID_EXTENSION_STRING
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions valid boolean',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            VALID_EXTENSION_BOOLEAN
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions valid numeric',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            VALID_EXTENSION_NUMERIC
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions valid object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            VALID_EXTENSION_OBJECT
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions valid string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            VALID_EXTENSION_STRING
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00119, Data 4.1 Extensions
             * An Extension can be null, an empty string, objects with nothing in them. The LRS accepts with 200 if a PUT or 204 if a POST an otherwise valid statement which has any extension value including null, an empty string, or an empty object.
             * These are all emptys and POST
             */
                name: 'An Extension can be null, an empty string, objects with nothing in them when using POST. (Format, Data 4.1, XAPI-00119)',
                config: [
                    {
                        name: 'statement activity extensions can be empty object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: VALID_EXTENSION_EMPTY}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity extension values can be empty string',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: EMPTY_STRING_VALUE}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity extension values can be null',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: NULL_VALUE}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement activity extension values can be empty object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: EMPTY_OBJECT_VALUE}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extensions can be empty object',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            VALID_EXTENSION_EMPTY
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extension values can be empty string',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            EMPTY_STRING_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extension values can be null',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            NULL_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extension values can be empty object',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            EMPTY_OBJECT_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions can be empty object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            VALID_EXTENSION_EMPTY
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions can be empty string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            EMPTY_STRING_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions can be null',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            NULL_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions can be empty object',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            EMPTY_OBJECT_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extensions can be empty object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: VALID_EXTENSION_EMPTY}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extension values can be empty string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: EMPTY_STRING_VALUE}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extension values can be null',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: NULL_VALUE}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extension values can be empty object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: EMPTY_OBJECT_VALUE}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions can be empty object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            VALID_EXTENSION_EMPTY
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions can be empty string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            EMPTY_STRING_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions can be null',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            NULL_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions can be empty object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            EMPTY_OBJECT_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions can be empty object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            VALID_EXTENSION_EMPTY
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions can be empty string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            EMPTY_STRING_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions can be null',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            NULL_VALUE
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions can be empty object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            EMPTY_OBJECT_VALUE
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00118, Data 4.1 Extensions
             * An Extension "key" is an IRI. The LRS rejects with 400 a statement which has an extension key which is not a valid IRI, if an extension object is present.
             */
                name: 'An Extension "key" is an IRI (Format, Data 4.1.s3.b1, XAPI-00118)',
                config: [
                    {
                        name: 'statement activity extensions key is not an IRI',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: INVALID_EXTENSION_KEY}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement result extensions key is not an IRI',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            INVALID_EXTENSION_KEY
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context extensions key is not an IRI',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            INVALID_EXTENSION_KEY
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity extensions key is not an IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: INVALID_EXTENSION_KEY}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement result extensions key is not an IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.default}}'},
                            INVALID_EXTENSION_KEY
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement context extensions key is not an IRI',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.default}}'},
                            INVALID_EXTENSION_KEY
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
