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
        'description': {'en-US': 'A test attachment (description)', 'something': 'Un accesorio de prueba (descripción)'},
        'contentType': 'text/plain; charset=ascii',
        'length': 27,
        'sha2': '495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a',
        'fileUrl': 'http://over.there.com/file.txt'
    };
    var INVALID_DISPLAY_ATTACHMENT = {
        'usageType': 'http://example.com/attachment-usage/test',
        'display': {'en-US': 'A test attachment', 'something': 'Un accesorio de prueba'},
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
            /**  XAPI-00003, 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement which does not contain an "actor" property
             */
                name: 'A Statement contains an "actor" property (Multiplicity, Data 2.2.s2.b3, XAPI-00003)',
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
            /**  XAPI-00004, 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement which does not contain a "verb" property
             */
                name: 'A Statement contains a "verb" property (Multiplicity, Data 2.2.s2.b3, XAPI-00004)',
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
            /**  XAPI-00005, 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement which does not contain an "object" property
             */
                name: 'A Statement contains an "object" property (Multiplicity, Data 2.2.s2.b3, XAPI-00005)',
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
            /**  XAPI-00001, 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request any Statement having a property whose value is set to "null", an empty object, or has no value, except in an "extensions" property
             */
                name: 'An LRS rejects with error code 400 Bad Request any Statement having a property whose value is set to "null", except in an "extensions" property (Data 2.2.s4.b1.b1, XAPI-00001)',
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
            /**  XAPI-00006, Data 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement which uses the wrong data type
             */
                name: 'An LRS rejects with error code 400 Bad Request a Statement which uses the wrong data type (Data 2.2.s4.b2, XAPI-00006)',
                config: [
                    {
                        name: 'with strings where numbers are required',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {max: 'one hundred'}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'even if those strings contain numbers',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {score: {max: '100'}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'with strings where booleans are required',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {success: 'We regret to inform you that your effort was unsuccessful.'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'even if those strings contain booleans',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {result: '{{results.default}}'},
                            {completion: 'false'}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00007, Data 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement which uses any non-format-following key or value, including the empty string, where a string with a particular format (such as mailto IRI, UUID, or IRI) is required.
             * Additional UUID tests in uuids.js xapi-00027 & 28
             * IFI's covered in actors.js xapi-0038
             */
                name: 'An LRS rejects with error code 400 Bad Request a Statement which uses any non-format-following key or value, including the empty string, where a string with a particular format, such as mailto IRI, UUID, or IRI, is required. (Data 2.2.s4.b4, XAPI-00007)',
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
                    },
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
                    },
                    {
                        name: 'statement actor "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement actor "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.actor}}'},
                            {actor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement authority "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {authority: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context instructor "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement context team "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement as "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_actor}}'},
                            {object: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.actor}}'},
                            {actor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "agent" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{agents.account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context instructor "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement"s context team "group" account "name" property is string',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context}}'},
                            {context: '{{contexts.instructor}}'},
                            {instructor: '{{groups.identified_account_no_name}}'},
                            INVALID_ACCOUNT_NAME_IRL
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00008, Data 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement where the case of a key does not match the case specified in this specification.
             */
             /**  XAPI-00010, Data 2.2 Formatting Requirements
              * An LRS rejects with error code 400 Bad Request a Statement where a key or value is not allowed by this specification.
              * This meets keys not allowed.  Values not allowed are scattered throughout the suite.
              */
                name: 'An LRS rejects with error code 400 Bad Request a Statement where the case of a key does not match the case specified in this specification. (Data 2.2.s4.b1.b5, XAPI-00008, XAPI-00010)',
                config: [
                    {
                        name: 'should fail when not using "id"',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {iD: helper.generateUUID()}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail when not using "actor"',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {Actor: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail when not using "verb"',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {veRb: '{{verbs.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail when not using "object"',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {oBject: "{{activities.default}}"}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail when not using "result"',
                        templates: [
                            {statement: '{{statements.result}}'},
                            {RESULT: '{{results.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail when not using "context"',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {conText: '{{contexts.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail when not using "timestamp"',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {timeStamp: new Date("July 04, 1776 16:00:45.123456")}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail when not using "stored"',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {STOred: new Date("Sep 17, 1787 09:33:32:1111111")}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail when not using "authority"',
                        templates: [
                            {statement: '{{statements.authority}}'},
                            {auTHORity: '{{agents.default}}'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail when not using "version"',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {Version: '1.0.3'}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'should fail when not using "attachments"',
                        templates: [
                            {statement: '{{statements.attachment}}'},
                            {attachmentS: [VALID_ATTACHMENT]}
                        ],
                        expect: [400]
                    }
                ]
            },
            {
            /**  XAPI-00009, Data 2.2 Formatting Requirements
             * An LRS rejects with error code 400 Bad Request a Statement where the case of a value restricted to enumerated values does not match an enumerated value given in this specification exactly.
             */
                name: 'An LRS rejects with error code 400 Bad Request a Statement where the case of a value restricted to enumerated values does not match an enumerated value given in this specification exactly. (Data 2.2.s4.b1.b6, XAPI-00009)',
                config: [
                    {
                        name: 'when interactionType is wrong case ("true-faLse")',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.true_false}}'},
                            {definition: {interactionType: "true-faLse"}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'when interactionType is wrong case ("choiCe")',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.choice}}'},
                            {definition: {interactionType: "choiCe"}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'when interactionType is wrong case ("fill-iN")',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.fill_in}}'},
                            {definition: {interactionType: "fill-iN"}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'when interactionType is wrong case ("long-fiLl-in")',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.long_fill_in}}'},
                            {definition: {interactionType: "long-fiLl-in"}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'when interactionType is wrong case ("matchIng")',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.matching}}'},
                            {definition: {interactionType: "matchIng"}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'when interactionType is wrong case ("perfOrmance")',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.performance}}'},
                            {definition: {interactionType: "perfOrmance"}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'when interactionType is wrong case ("seqUencing")',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.sequencing}}'},
                            {definition: {interactionType: "seqUencing"}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'when interactionType is wrong case ("liKert")',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.likert}}'},
                            {definition: {interactionType: "liKert"}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'when interactionType is wrong case ("nUmeric")',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.numeric}}'},
                            {definition: {interactionType: "nUmeric"}}
                        ],
                        expect: [400]
                    },
                    {
                        name: 'when interactionType is wrong case ("Other")',
                        templates: [
                            {statement: '{{statements.object_activity}}'},
                            {object: '{{activities.other}}'},
                            {definition: {interactionType: "Other"}}
                        ],
                        expect: [400]
                    }
                ]
            },
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
                        name: 'statement verb "display" should fail given invalid language code',
                        templates: [
                            {statement: '{{statements.default}}'},
                            {verb: '{{verbs.default}}'},
                            {display: {'something': 'besucht'}}
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
                        name: 'statement object "name" should fail given invalid language code',
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
                        name: 'statement object "description" should fail given invalid language code',
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
                        name: 'context.language should pass given three letter cmn language code',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {language: 'cmn'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'context.language should fail given invalid language code',
                        templates: [
                            {statement: '{{statements.context}}'},
                            {context: '{{contexts.default}}'},
                            {language: 'something'}
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
                        name: 'statement attachment "display" should fail given invalid language code',
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
                        name: 'statement attachment "description" should fail given es-MX invalid language code',
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
                        name: 'statement substatement verb "display" should fail given invalid language code',
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
                        name: 'statement substatement activity "description" should fail given invalid language code',
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
                        name: 'substatement context.language should pass given two letter fr-CA language-region code',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.context_valid_language_map}}'}
                        ],
                        expect: [200]
                    },
                    {
                        name: 'substatement context.language should fail given invalid language code',
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
