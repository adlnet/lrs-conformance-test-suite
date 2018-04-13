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
    var INVALID_DATE = '01/011/2015';
    var INVALID_NUMERIC = 12345;
    var INVALID_OBJECT = {key: 'should fail'};
    var INVALID_STRING = 'should fail';
    var INVALID_UUID_TOO_MANY_DIGITS = 'AA97B177-9383-4934-8543-0F91A7A028368';
    var INVALID_UUID_INVALID_LETTER = 'MA97B177-9383-4934-8543-0F91A7A02836';
    var INVALID_VERSION_0_9_9 = '0.9.9';
    var INVALID_VERSION_1_1_0 = '1.1.0';
    var VALID_EXTENSION = {extensions: {'http://example.com/null': null}};
    var VALID_VERSION_1_0 = '1.0';
    var VALID_VERSION_1_0_9 = '1.0.9';

    // From SPEC Issue: https://github.com/adlnet/xAPI-Spec/issues/1073
    var INVALID_DATE_00 = "2008-09-15T15:53:00.601-00";
    var INVALID_DATE_0000 = "2008-09-15T15:53:00.601-0000";
    var INVALID_DATE_00_00 = "2008-09-15T15:53:00.601-00:00";

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'Statements Verify Templates',
                config: [
                    {
                        name: 'should pass statement template',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: '2013-05-18T05:32:34.804Z'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'A Statement contains an "actor" property (Multiplicity, 4.1.b)',
                config: [
                    {
                        name: 'statement "actor" missing',
                        templates: [
                            {statement: '{{statements.no_actor}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A Statement contains a "verb" property (Multiplicity, 4.1.b)',
                config: [
                    {
                        name: 'statement "verb" missing',
                        templates: [
                            {statement: '{{statements.no_verb}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A Statement contains an "object" property (Multiplicity, 4.1.b)',
                config: [
                    {
                        name: 'statement "object" missing',
                        templates: [
                            {statement: '{{statements.no_object}}'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A Statement\'s "id" property is a String (Type, 4.1.1.description.a)',
                config: [
                    {
                        name: 'statement "id" invalid numeric',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_NUMERIC}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "id" invalid object',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_OBJECT}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A Statement\'s "id" property is a UUID following RFC 4122 (Syntax, RFC 4122)',
                config: [
                    {
                        name: 'statement "id" invalid UUID with too many digits',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_UUID_TOO_MANY_DIGITS}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "id" invalid UUID with non A-F',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {id: INVALID_UUID_INVALID_LETTER}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A TimeStamp is defined as a Date/Time formatted according to ISO 8601 (Format, ISO8601)',
                config: [
                    {
                        name: 'statement "template" invalid string',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "template" invalid date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_DATE}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "template" invalid date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_DATE_00}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "template" invalid date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_DATE_0000}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "template" invalid date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_DATE_00_00}
                        ],
                        expect: [400]
                    },
                ]
            },
            {
                name: 'A "timestamp" property is a TimeStamp (Type, 4.1.2.1.table1.row7.a, 4.1.2.1.table1.row7.b)',
                config: [
                    {
                        name: 'statement "template" invalid string',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "template" invalid date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timestamp: INVALID_DATE}
                        ],
                        expect: [400]
                    },
                ]
            },
            {
                name: 'A "stored" property is a TimeStamp (Type, 4.1.2.1.table1.row8.a, 4.1.2.1.table1.row8.b) **Caution: these tests need reworked. They do not test what they are trying to test.**',
                config: [
                    {
                        name: 'statement "stored" invalid string',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {stored: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "stored" invalid date',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {stored: INVALID_DATE}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'test good timestamp data (predict will still be rejected because of "stored" property)',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {stored: '2013-05-18T05:32:34.804Z'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'A "version" property enters the LRS with the value of "1.0.0" or is not used (Vocabulary, 4.1.10.e, 4.1.10.f)',
                config: [
                    {
                        name: 'statement "version" invalid string',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: INVALID_STRING}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "version" invalid',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: INVALID_VERSION_0_9_9}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An LRS rejects with error code 400 Bad Request any Statement having a property whose value is set to "null", except in an "extensions" property (4.1.12.d.a)',
                config: [
                    {
                        name: 'statement actor should fail on "null"',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.mbox}}'},
                            {name: null}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement verb should fail on "null"',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.default}}'},
                            {display: {'en-US': null}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context should fail on "null"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {registration: null}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object should fail on "null"',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.default}}'},
                            {definition: {moreInfo: null}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement activity extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: VALID_EXTENSION}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement result extensions can be empty',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            VALID_EXTENSION
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement context extensions can be empty',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            VALID_EXTENSION
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.activity}}'},
                            {object: '{{activities.no_extensions}}'},
                            {definition: VALID_EXTENSION}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement result extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.result}}'},
                            {result: '{{results.no_extensions}}'},
                            VALID_EXTENSION
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement context extensions can be empty',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.no_extensions}}'},
                            VALID_EXTENSION
                        ],
                        expect: [200]
                    }
                ]
            },
            {
                name: 'An LRS rejects with error code 400 Bad Request, a Request which uses "version" and has the value set to anything but "1.0" or "1.0.x", where x is the semantic versioning number (Format, 4.1.10.b, 6.2.c, 6.2.f)',
                config: [
                    {
                        name: 'statement "version" valid 1.0',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: VALID_VERSION_1_0}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement "version" valid 1.0.9',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: VALID_VERSION_1_0_9}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement "version" invalid 0.9.9',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: INVALID_VERSION_0_9_9}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "version" invalid 1.1.0',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: INVALID_VERSION_1_1_0}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An LRS rejects with error code 400 Bad Request, a Request which the "X-Experience-API-Version" header\'s value is anything but "1.0" or "1.0.x", where x is the semantic versioning number to any API except the About API (Format, 6.2.d, 6.2.e, 6.2.f, 7.7.f)',
                config: [
                    {
                        name: 'statement "version" valid 1.0',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: VALID_VERSION_1_0}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement "version" valid 1.0.9',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: VALID_VERSION_1_0_9}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement "version" invalid 0.9.9',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: INVALID_VERSION_0_9_9}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "version" invalid 1.1.0',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {version: INVALID_VERSION_1_1_0}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
                name: 'An LRS rejects with error code 400 Bad Request any Statement violating a Statement Requirement. (4.1.12, Varies)',
                config: [
                    {
                        name: 'statement "actor" missing reply 400',
                        templates: [
                            {statement: '{{statements.no_actor}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "verb" missing reply 400',
                        templates: [
                            {statement: '{{statements.no_verb}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement "object" missing reply 400',
                        templates: [
                            {statement: '{{statements.no_object}}'}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
