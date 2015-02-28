/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * Created by fwhorton on 2/20/15.
 * Riptide Software
 */
(function (module) {
    "use strict"

    // defines overwriting data
    var INVALID_DATE = '01/011/2015';
    var INVALID_NUMERIC = 12345;
    var INVALID_OBJECT = {key: 'should fail'};
    var INVALID_STRING = 'should fail';
    var INVALID_UUID_TOO_MANY_DIGITS = 'AA97B177-9383-4934-8543-0F91A7A028368';
    var INVALID_UUID_INVALID_LETTER = 'MA97B177-9383-4934-8543-0F91A7A02836';
    var INVALID_VERSION = '0.9.9';

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
                    }
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
                    }
                ]
            },
            {
                name: 'A "stored" property is a TimeStamp (Type, 4.1.2.1.table1.row8.a, 4.1.2.1.table1.row8.b)',
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
                            {version: INVALID_VERSION}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
