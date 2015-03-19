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
    var INVALID_LANGUAGE = {a12345: 'should error'};
    var INVALID_DESCRIPTION_LANGUAGE = {description: INVALID_LANGUAGE};
    var INVALID_DESCRIPTION_NO_ENTRY = {description: {}};
    var INVALID_DESCRIPTION_STRING = {description: 'should error'};
    var INVALID_DISPLAY_LANGUAGE = {display: INVALID_LANGUAGE};
    var INVALID_DISPLAY_NO_ENTRY = {display: {}};
    var INVALID_DISPLAY_STRING = {display: 'should error'};
    var INVALID_NAME_LANGUAGE = {name: INVALID_LANGUAGE};
    var INVALID_NAME_NO_ENTRY = {name: {}};
    var INVALID_NAME_STRING = {name: 'should error'};

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'Languages Verify Templates',
                config: [
                    {
                        name: 'should pass statement verb template',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.no_display}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement object template',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement attachment template',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        "usageType": "http://example.com/attachment-usage/test",
                                        "display": {"en-US": "A test attachment"},
                                        "description": {"en-US": "A test attachment (description)"},
                                        "contentType": "text/plain; charset=ascii",
                                        "length": 27,
                                        "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a",
                                        "fileUrl": "http://over.there.com/file.txt"
                                    }
                                ]
                            }
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement verb template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.no_display}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'should pass statement substatement object template',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A Language Map is defined as an array of language tag/String pairs has at least 1 entry',
                config: [
                    {
                        name: 'statement verb "display" language map needs one entry',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.no_display}}'},
                            INVALID_DISPLAY_NO_ENTRY
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement verb "display" language map must be object',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.no_display}}'},
                            INVALID_DISPLAY_STRING
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "name" language map needs one entry',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_NAME_NO_ENTRY}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "name" language map must be object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_NAME_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "description" language map needs one entry',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_DESCRIPTION_NO_ENTRY}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "description" language map must be object',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_DESCRIPTION_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement attachment "display" language map needs one entry',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        'usageType': 'http://example.com/attachment-usage/test',
                                        'display': {},
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
                        name: 'statement attachment "display" language map must be object',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        'usageType': 'http://example.com/attachment-usage/test',
                                        'display': 'should error',
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
                        name: 'statement attachment "description" language map needs one entry',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        'usageType': 'http://example.com/attachment-usage/test',
                                        'display': {'en-US': 'A test attachment'},
                                        'description': {},
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
                        name: 'statement attachment "description" language map must be object',
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
                    },
                    {
                        name: 'statement substatement verb "display" language map needs one entry',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.no_display}}'},
                            INVALID_DISPLAY_NO_ENTRY
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement verb "display" language map must be object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.no_display}}'},
                            INVALID_DISPLAY_STRING
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "name" language map needs one entry',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_NAME_NO_ENTRY}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "name" language map must be object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_NAME_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "description" language map needs one entry',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_DESCRIPTION_NO_ENTRY}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "description" language map must be object',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_DESCRIPTION_STRING}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A Language Map follows RFC5646 (Format, 5.2.a, RFC5646)',
                config: [
                    {
                        name: 'statement verb "display" language map invalid',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.no_display}}'},
                            INVALID_DISPLAY_LANGUAGE
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "name" language map invalid',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_NAME_LANGUAGE}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "description" language map invalid',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_DESCRIPTION_LANGUAGE}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement attachment "display" language map invalid',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        'usageType': 'http://example.com/attachment-usage/test',
                                        'display': INVALID_LANGUAGE,
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
                        name: 'statement attachment "description" language map invalid',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {
                                attachments: [
                                    {
                                        'usageType': 'http://example.com/attachment-usage/test',
                                        'display': {'en-US': 'A test attachment'},
                                        'description': INVALID_LANGUAGE,
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
                        name: 'statement substatement verb "display" language map invalid',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.no_display}}'},
                            INVALID_DISPLAY_LANGUAGE
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "name" language map invalid',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_NAME_LANGUAGE}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "description" language map invalid',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_languages}}'},
                            {definition: INVALID_DESCRIPTION_LANGUAGE}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
