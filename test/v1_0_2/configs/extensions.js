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
    var VALID_EXTENSION_EMPTY = {'extensions': {}};
    var VALID_EXTENSION_BOOLEAN = {'extensions': {'http://example.com/ex': true}};
    var VALID_EXTENSION_NUMERIC = {'extensions': {'http://example.com/ex': 12345}};
    var VALID_EXTENSION_OBJECT = {'extensions': {'http://example.com/ex': {key: 'valid'}}};
    var VALID_EXTENSION_STRING = {'extensions': {'http://example.com/ex': 'valid'}};

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'An Extension is defined as an Object of any "extensions" property (Multiplicity, 5.3)',
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
                name: 'An Extension can be empty (Format, 5.3)',
                config: [
                    {
                        name: 'statement activity extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: VALID_EXTENSION_EMPTY}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extensions can be empty',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            VALID_EXTENSION_EMPTY
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions can be empty',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            VALID_EXTENSION_EMPTY
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: VALID_EXTENSION_EMPTY}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            VALID_EXTENSION_EMPTY
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            VALID_EXTENSION_EMPTY
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'An Extension "key" is an IRI (Format, 5.3.a)',
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
