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
        'contentType': INVALID_NUMERIC,
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
            /**  XAPI-00025,  Data 2.4 Statement Properties
             * A Statement's "attachments" property is an array of Attachments. An LRS rejects with 400 Bad Request a statement which has an “attachments” property which is not an array of attachments.
             */
                name: 'A Statement\'s "attachments" property is an array of Attachments (Data 2.4.s1.table1.row11, XAPI-00025)',
                config: [
                    {
                        name: 'statement "attachments" is an array',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [VALID_ATTACHMENT]}
                        ],
                        expect: [200]
                    },
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
            {   //this seems good - worth keeping
                name: 'An Attachment is an Object (Definition, Data 2.4.11)',
                config: [
                    {
                        name: 'statement "attachment" invalid numeric',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [INVALID_NUMERIC]}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "attachment" invalid string',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {attachments: [INVALID_STRING]}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00107, Data 2.4.11 Attachments
             * A "usageType" property is an IRI. The LRS rejects with 400 Bad Request a statement which does not have a "usageType" property or the "usageType" property value is not a valid IRI in the Attachment Object.
             */
                name: 'A "usageType" property is an IRI (Multiplicity, Data 2.4.11.s2.table1.row1, XAPI-00107)',
                config: [
                    {
                        name: 'statement "usageType" invalid string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [INVALID_USAGE_TYPE]}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00105, Data 2.4.11 Attachment
             * A "contentType" property is an Internet Media/MIME type. The LRS rejects with 400 Bad Request a statement which does not have a “contentType” property or the “contentType” property value is not Internet Media/MIME in the Attachment Object.
             */
                name: 'A "contentType" property is an Internet Media/MIME type (Format, Data 2.4.11.s2.table1.row4, XAPI-00105)',
                config: [
                    {
                        name: 'statement "contentType" invalid number',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [INVALID_CONTENT_TYPE]},
                            {attachments: {contentType: 999}}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00102, Data 2.4.11 Attachments
             * A "length" property is an Integer. The LRS rejects with 400 Bad Request a statement whichdoes not have a “length” property or the “length” property is not a valid integer in octets in the Attachment Object.
             */
                name: 'A "length" property is an Integer (Format, Data 2.4.11.s2.table1.row5, XAPI-00102)',
                config: [
                    {
                        name: 'statement "length" invalid string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [INVALID_LENGTH]}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00103, Data 2.4.11 Attachments
             * A "sha2" property is a String. The LRS rejects with 400 Bad Request a statement which does not have a “sha2” property or the ”sha2” property is not a valid hash in the Attachment Object.
             */
                name: 'A "sha2" property is a String (Format, Data 2.4.11.s2.table1.row6, XAPI-00103)',
                config: [
                    {
                        name: 'statement "sha2" invalid string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [INVALID_SHA2]}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00104, Data 2.4.11 Attachments
             * A "fileUrl" property is an IRL. The LRS rejects with 400 Bad Request a statement the “fileURL” property if it is present and it is not a valid IRL in the Attachment Object.
             */
                name: 'A "fileUrl" property is an IRL (Format, Data 2.4.11.s2.table1.row7, XAPI-00104)',
                config: [
                    {
                        name: 'statement "fileUrl" invalid string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [INVALID_FILE_URL]}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00106, Data 2.4.11 Attachments
             * A "display" property is a Language Map. The LRS rejects with 400 Bad Request a statement which does not have a “display” property or the “display” property value is not a valid Language Map in the Attachment Object.
             */
                name: 'A "display" property is a Language Map (Type, Data 2.4.11.s2.table1.row2, XAPI-00106)',
                config: [
                    {
                        name: 'statement attachment "display" language map numeric',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        'usageType': 'http://example.com/attachment-usage/test',
                                        'display': INVALID_NUMERIC,
                                        'description': {'en-US': 'A test attachment (description)'},
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
                        name: 'statement attachment "display" language map string',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        'usageType': 'http://example.com/attachment-usage/test',
                                        'display': INVALID_STRING,
                                        'description': {'en-US': 'A test attachment (description)'},
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
