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
    var INVALID_STRING = 'should fail';
    var INVALID_CONTENT_TYPE = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment'},
        'contentType': INVALID_STRING,
        'length': 27,
        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
        'fileUrl': 'http://over.there.com/file.txt'
    };
    var INVALID_FILE_URL = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment'},
        'contentType': 'text/plain; charset=ascii',
        'length': 27,
        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
        'fileUrl': INVALID_STRING
    };
    var INVALID_LENGTH = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment'},
        'contentType': 'text/plain; charset=ascii',
        'length': INVALID_STRING,
        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
        'fileUrl': 'http://over.there.com/file.txt'
    };
    var INVALID_SHA2 = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment'},
        'contentType': 'text/plain; charset=ascii',
        'length': 27,
        'sha2': INVALID_NUMERIC,
        'fileUrl': 'http://over.there.com/file.txt'
    };
    var INVALID_USAGE_TYPE = {
        'usageType': INVALID_STRING,
        'display': {'en-US': 'A test attachment'},
        'contentType': 'text/plain; charset=ascii',
        'length': 27,
        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
        'fileUrl': 'http://over.there.com/file.txt'
    };
    var VALID_ATTACHMENT = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment'},
        'description': {'en-US': 'A test attachment (description)'},
        'contentType': 'text/plain; charset=ascii',
        'length': 27,
        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
        'fileUrl': 'http://over.there.com/file.txt'
    };

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'A Statement\'s "attachments" property is an array of Attachments (4.1.2.1.table1.row11.a)',
                config: [
                    {
                        name: 'statement "attachments" is an array',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [VALID_ATTACHMENT]}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A Statement\'s "attachments" property is an array of Attachments (4.1.2.1.table1.row11.a)',
                config: [
                    {
                        name: 'statement "attachments" not an array',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: VALID_ATTACHMENT}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An Attachment is an Object (Definition, 4.1.11)',
                config: [
                    {
                        name: 'statement "attachment" invalid numeric',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "attachment" invalid string',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {attachments: INVALID_STRING}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "usageType" property is an IRI (Multiplicity, 4.1.11.table1.row1.b)',
                config: [
                    {
                        name: 'statement "usageType" invalid string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: INVALID_USAGE_TYPE}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "contentType" property is an Internet Media/MIME type (Format, 4.1.11.table1.row4.a, IETF.org)',
                config: [
                    {
                        name: 'statement "contentType" invalid string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: INVALID_CONTENT_TYPE}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "length" property is an Integer (Format, 4.1.11.table1.row5.a)',
                config: [
                    {
                        name: 'statement "length" invalid string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: INVALID_LENGTH}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "sha2" property is a String (Format, 4.1.11.table1.row6.a)',
                config: [
                    {
                        name: 'statement "sha2" invalid string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: INVALID_SHA2}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "fileUrl" property is an IRL (Format, 4.1.11.table1.row7.a)',
                config: [
                    {
                        name: 'statement "fileUrl" invalid string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: INVALID_FILE_URL}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "display" property is a Language Map (Type, 4.1.3.table1.row1.a, 4.1.11.table1.row2.a)',
                config: [
                    {
                        name: 'statement attachment "description" language map numeric',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        'usageType': 'http://example.com/attachment-usage/test',
                                        'display': {'en-US': 'A test attachment'},
                                        'description': INVALID_NUMERIC,
                                        'contentType': 'text/plain; charset=ascii',
                                        'length': 27,
                                        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
                                        'fileUrl': 'http://over.there.com/file.txt'
                                    }
                                ]
                            }
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement attachment "description" language map string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        'usageType': 'http://example.com/attachment-usage/test',
                                        'display': {'en-US': 'A test attachment'},
                                        'description': 'should error',
                                        'contentType': 'text/plain; charset=ascii',
                                        'length': 27,
                                        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
                                        'fileUrl': 'http://over.there.com/file.txt'
                                    }
                                ]
                            }
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
