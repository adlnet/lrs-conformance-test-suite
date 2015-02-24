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
    var INVALID_DISPLAY_NO_ENTRY = {display: {}};

    // configures tests
    module.exports.config = function () {
        return [
            {
                name: 'A Language Map is defined as an array of language tag/String pairs has at least 1 entry',
                config: [
                    {
                        name: 'statement verb language map needs one entry',
                        templates: [
                            {statement: '{{statements.verb}}'},
                            {verb: '{{verbs.no_display}}'},
                            INVALID_DISPLAY_NO_ENTRY
                        ],
                        expect: [400]
                    },
                    {
                        name: 'statement substatement verb language map needs one entry',
                        templates: [
                            {statement: '{{statements.object_substatement}}'},
                            {object: '{{substatements.verb}}'},
                            {verb: '{{verbs.no_display}}'},
                            INVALID_DISPLAY_NO_ENTRY
                        ],
                        expect: [400]
                    }
                ]
            }
        ];
    };
}(module));
