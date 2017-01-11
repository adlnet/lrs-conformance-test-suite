/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */
(function (module, helper) {
    "use strict";

    // defines overwriting data
    var INVALID_DATE = '01/011/2015';
    var INVALID_NUMERIC = 12345;
    var INVALID_OBJECT = {key: 'should fail'};
    var INVALID_STRING = 'should fail';
    var INVALID_UUID_TOO_MANY_DIGITS = 'AA97B177-9383-4934-8543-0F91A7A028368';
    var INVALID_UUID_INVALID_LETTER = 'MA97B177-9383-4934-8543-0F91A7A02836';
    var VALID_EXTENSION = {extensions: {'http://example.com/null': null}};
    var INVALID_ACCOUNT_NAME_IRL = {account: {name: INVALID_OBJECT}};
    var VALID_ATTACHMENT = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment'},
        'description': {'en-US': 'A test attachment (description)'},
        'contentType': 'text/plain; charset=ascii',
        'length': 27,
        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
        'fileUrl': 'http://over.there.com/file.txt'
    };
    var VALID_ATTACHMENT_DISPLAY = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment', 'es': 'Un accesorio de prueba'},
        'description': {'en-US': 'A test attachment (description)'},
        'contentType': 'text/plain; charset=ascii',
        'length': 27,
        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
        'fileUrl': 'http://over.there.com/file.txt'
    };
    var VALID_ATTACHMENT_DESCRIPTION = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment'},
        'description': {'en-US': 'A test attachment (description)', 'es-MX': 'Un accesorio de prueba (descripción)'},
        'contentType': 'text/plain; charset=ascii',
        'length': 27,
        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
        'fileUrl': 'http://over.there.com/file.txt'
    };
    var INVALID_DESCRIPTION_ATTACHMENT = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment'},
        'description': {'en-US': 'A test attachment (description)', 'es-MX-PE': 'Un accesorio de prueba (descripción)'},
        'contentType': 'text/plain; charset=ascii',
        'length': 27,
        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
        'fileUrl': 'http://over.there.com/file.txt'
    };
    var INVALID_DISPLAY_ATTACHMENT = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment', 'es-a-aaa-b-bbb-b-ccc': 'Un accesorio de prueba'},
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
            /**  XAPI-00013  2.2 Formatting Requirements
             * The LRS rejects with error code 400 Bad Request a token with does not validate as matching the RFC 5646 standard in the sequence of token lengths for language map keys.
             */
                name: 'The LRS rejects with error code 400 Bad Request a token with does not validate as matching the RFC 5646 standard in the sequence of token lengths for language map keys. (Format, Data 2.2.s4.b2, Data 2.4.6.s3.table1.row7, RFC5646, XAPI-00013)',
                config: [
                    {
                        name: 'statement verb "display" should pass given de two letter language code only',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {verb: '{{verbs.default}}'},
                            {display: {de: 'besucht'}}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement verb "display" should fail given de-419-DE invalid (two region tags) language code',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {verb: '{{verbs.default}}'},
                            {display: {'de-419-DE': 'besucht'}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "name" should pass given de-DE language-region code',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.language_maps_valid_name}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement object "name" should fail given a-DE invalid (use of a single-character subtag in primary position) language code',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.name_invalid}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement object "description" should pass given zh-Hant language-script code',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.language_maps_valid_description}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement object "description" should fail given ar-a-aaa-b-bbb-a-ccc invalid (two extensions with same single-letter prefix) language code',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.description_invalid}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'interaction components\' description should pass given sr-Latn-RS language-script-region code',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert_valid_language_map}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'interaction components\' description should fail given en-US-GB invalid (two region tags) language code',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice_invalid_language_map}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'context.language should pass given three letter cmn language code',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {language: 'cmn'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'context.language should fail given g-GR invalid (use of a single-character subtag in primary position) language code',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {language: 'g-GR'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement attachment "display" should pass given es two letter language code only',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [VALID_ATTACHMENT_DISPLAY]}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement attachment "display" should fail given es-a-aaa-b-bbb-b-ccc invalid (two extensions with same single-letter prefix) language code',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [INVALID_DISPLAY_ATTACHMENT]}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement attachment "description" should pass given es-MX language-UN region code',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [VALID_ATTACHMENT_DESCRIPTION]}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement attachment "description" should fail given es-MX invalid es-MX-PE (two region tags) language code',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachments: [INVALID_DESCRIPTION_ATTACHMENT]}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement verb "display" should pass given sr-Cyrl language-script code',
                        templates: [
                            {statement: '{{statements.object_substatement_default}}'},
                            {object: '{{substatements.verb_valid}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement verb "display" should fail given s-RS invalid (use of a single-character subtag in primary position) language code',
                        templates: [
                            {statement: '{{statements.object_substatement_default}}'},
                            {object: '{{substatements.verb_invalid}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "name" should pass given zh-Hans-CN language-script-region code',
                        templates: [
                            {statement: '{{statements.object_substatement_default}}'},
                            {object: '{{substatements.activity_definition_name}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "name" should fail given zh-z-aaa-z-bbb-c-ccc invalid (two extensions with same single-letter prefix) language code',
                        templates: [
                            {statement: '{{statements.object_substatement_default}}'},
                            {object: '{{substatements.activity_definition_name_invalid}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement activity "description" should pass given ase three letter language code',
                        templates: [
                            {statement: '{{statements.object_substatement_default}}'},
                            {object: '{{substatements.activity_definition_description}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'statement substatement activity "description" should fail given ase-GB-US invalid (two region tags) language code',
                        templates: [
                            {statement: '{{statements.object_substatement_default}}'},
                            {object: '{{substatements.activity_definition_description_invalid}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'substatement interaction components\' description should pass given ja two letter language code only',
                        templates: [
                            {statement: '{{statements.object_substatement_default}}'},
                            {object: '{{substatements.interaction_component_valid_language_map}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'substatement interaction components\' description should fail given j-JP invalid (use of a single-character subtag in primary position) language code',
                        templates: [
                            {statement: '{{statements.object_substatement_default}}'},
                            {object: '{{substatements.interaction_component_invalid_language_map}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'substatement context.language should pass given two letter fr-CA language-region code',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context_valid_language_map}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'substatement context.language should fail given fr-f-aaa-b-rrr-f-ccc invalid (two extensions with same single-letter prefix) language code',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context_invalid_language_map}}'}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module, require('./../../helper.js')));
