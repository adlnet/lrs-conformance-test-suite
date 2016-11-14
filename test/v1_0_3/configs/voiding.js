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
    var INVALID_URI = 'ab=c://should.fail.com';
    var INVALID_LANGUAGE_MAP = {'display': { 'a12345': 'attended'}};

    // configures tests
    module.exports.config = function () {
        return [
            {
            /**  XAPI-00019,  2.3.2 Voiding
             * A Voiding Statement is defined as a Statement whose "verb" property's "id" property's IRI ending with "voided"
             */
                name: 'A Voiding Statement is defined as a Statement whose "verb" property\'s "id" property\'s IRI ending with "voided" (Data 2.3.2, XAPI-00019)',
                config: [
                    {
                        name: 'statement verb voided IRI ends with "voided" (WARNING: this applies "Upon receiving a Statement that voids another, the LRS SHOULD NOT* reject the request on the grounds of the Object of that voiding Statement not being present")',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {verb: '{{verbs.voided}}'}
                        ],
                        expect: [200]
                    }
                ]
            },
            {
            /**  XAPI-00017, Data 2.3.2 Voiding
             * An LRS rejects a Voiding Statement with 400 Bad Request if the "objectType" field does not have a value of "StatementRef"
             */
            /**  XAPI-00020,  2.3.2 Voiding
             * A Voiding Statement's "objectType" field has a value of "StatementRef"
             */
                name: 'A Voiding Statement\'s "objectType" field has a value of "StatementRef" (Format, Data 2.3.2.s2.b1, XAPI-00017, XAPI-00020)',
                config: [
                    {   //XAPI-00020
                        name: 'statement verb voided uses substatement with "StatementRef"',
                        templates: [
                            {statement: '{{statements.object_statementref}}'},
                            {verb: '{{verbs.voided}}'}
                        ],
                        expect: [200]
                    },
                    {   //XAPI-00017
                        name: 'statement verb voided does not use object "StatementRef"',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.voided}}'}
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
