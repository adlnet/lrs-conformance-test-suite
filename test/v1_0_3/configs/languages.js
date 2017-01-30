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
    var INVALID_LANGUAGE = {a12345678: 'should error'};
    var INVALID_DESCRIPTION_LANGUAGE = {description: INVALID_LANGUAGE};
    var INVALID_DISPLAY_LANGUAGE = {display: INVALID_LANGUAGE};
    var INVALID_NAME_LANGUAGE = {name: INVALID_LANGUAGE};

    // configures tests
    module.exports.config = function () {
        return [

            {
            /**  XAPI-00121, Data 4.2 Language Maps
             * A Language Map follows RFC 5646. The LRS rejects with 400 a statement using a Language Map which doesn’t not validate to RFC 5646.
             */
                name: 'A Language Map follows RFC5646 (Format, Data 4.2.s1, RFC5646, XAPI-00121)',
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
