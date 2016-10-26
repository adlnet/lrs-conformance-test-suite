/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, templatingSelection) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Object Property Requirements (Data 2.4.4)', () => {

    //Data 2.4.4 object
/**  Matchup with Conformance Requirements Document
 * XAPI-00046 - in objects.js
 */
    templatingSelection.createTemplate('objects.js');

    //Data 2.4.4.1 when objectType is activity
/**  Matchup with Conformance Requirements Document
 * XAPI-00047 - in activities.js
 * XAPI-00048 - in activities.js
 * XAPI-00049 - in activities.js
 * XAPI-00050 - in activities.js
 * XAPI-00051 - in activities.js
 * XAPI-00052 - in activities.js
 * XAPI-00053 - in activities.js
 * XAPI-00054 - in activities.js
 * XAPI-00055 - in activities.js
 * XAPI-00056 - in activities.js
 * XAPI-00057 - in activities.js
 * XAPI-00058 - in activities.js
 * XAPI-00059 - in activities.js
 * XAPI-00060 - in activities.js
 * XAPI-00061 - in activities.js
 * XAPI-00062 - in activities.js
 * XAPI-00063 - in activities.js
 * XAPI-00064 - below
 */
    templatingSelection.createTemplate("activities.js");

    /**  XAPI-00064, Data 2.4.4.1 when objectType is activity
     * An Activity Definition uses the "interactionType" property if correctResponsesPattern is present. An LRS rejects a statement with 400 Bad Request if a correctResponsePattern is present and interactionType is not.
     */
    describe('An Activity Definition uses the "interactionType" property if any of the correctResponsesPattern, choices, scale, source, target, or steps properties are used (Multiplicity, Data 2.4.4.1.s8, XAPI-00064) **Implicit**', function () {

        it ('Activity Definition uses correctResponsesPattern without "interactionType" property',function(done){
            id = helper.generateUUID();
            var correctResponsesPatterntemplates = [
                {statement: '{{statements.default}}'},
                {object: '{{activities.other}}'}
            ];
            correctResponsesPattern = helper.createFromTemplate(correctResponsesPatterntemplates);
            correctResponsesPattern = correctResponsesPattern.statement;
            delete correctResponsesPattern.object.definition.interactionType;
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(correctResponsesPattern).expect(400, done);
        });

        it ('Activity Definition uses choices without "interactionType" property',function(done){
            id = helper.generateUUID();
            var choicetemplates = [
                {statement: '{{statements.default}}'},
                {object: '{{activities.choice}}'}
            ];
            choice = helper.createFromTemplate(choicetemplates);
            choice = choice.statement;
            delete choice.object.definition.interactionType;
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(choice).expect(400, done);
        });

        it ('Activity Definition uses scale without "interactionType" property',function(done){
            id = helper.generateUUID();
            var scaletemplates = [
                {statement: '{{statements.default}}'},
                {object: '{{activities.likert}}'}
            ];
            scale = helper.createFromTemplate(scaletemplates);
            scale = scale.statement;
            delete scale.object.definition.interactionType;
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(scale).expect(400, done);
        });

        it ('Activity Definition uses source without "interactionType" property',function(done){
            id = helper.generateUUID();
            var sourcetemplates = [
                {statement: '{{statements.default}}'},
                {object: '{{activities.matching}}'}
            ];
            source = helper.createFromTemplate(sourcetemplates);
            source = source.statement;
            delete source.object.definition.interactionType;
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(source).expect(400, done);
        });

        it ('Activity Definition uses target without "interactionType" property',function(done){
            id = helper.generateUUID();
            var targettemplates = [
                {statement: '{{statements.default}}'},
                {object: '{{activities.matching_target}}'}
            ];
            target = helper.createFromTemplate(targettemplates);
            target = target.statement;
            delete target.object.definition.interactionType;
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(target).expect(400, done);
        });

        it ('Activity Definition uses steps without "interactionType" property',function(done){
            id = helper.generateUUID();
            var stepstemplates = [
                {statement: '{{statements.default}}'},
                {object: '{{activities.performance}}'}
            ];
            steps = helper.createFromTemplate(stepstemplates);
            steps = steps.statement;
            delete steps.object.definition.interactionType;
            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(steps).expect(400, done);
        });

    });

    //Data 2.4.4.2 - when the object is an agent or a group
/**  Matchup with Conformance Requirements Document
 * XAPI-00065 - not found yet - Statements that use an Agent or Group as an Object MUST specify an "objectType" property. The LRS rejects with 400 Bad Request if the “objectType” property is absent and the Object is an Agent Object or Group Object.
 * Think this will have to be added.
 */
    describe('Statements that use an Agent or Group as an Object MUST specify an "objectType" property. (Data 2.4.4.2.s1.b1, XAPI-00065)', function () {

        it('should fail when using agent as object and no objectType', function (done) {
            var templates = [
                {statement: '{{statements.object_agent_default}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;
            delete data.object.objectType;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('should fail when using group as object and no objectType', function (done) {
            var templates = [
                {statement: '{{statements.object_group_default}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;
            delete data.object.objectType;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('substatement should fail when using agent as object and no objectType', function (done) {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{statements.object_agent_default}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;
            delete data.object.objectType;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });

        it('substatement should fail when using group as object and no objectType', function (done) {
            var templates = [
                {statement: '{{statements.object_substatement}}'},
                {object: '{{statements.object_group_default}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;
            delete data.object.objectType;

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(400, done);
        });
    });

    //Data 2.4.4.3 - when the object is a statement
/** Matchup with Conformance Requirements Document
 * XAPI-00066 - in substatements.js
 * XAPI-00067 - in substatements.js
 * XAPI-00068 - in substatements.js
 * XAPI-00069 - in substatements.js
 * XAPI-00070 - in substatements.js
 * XAPI-00071 - in substatements.js
 * XAPI-00072 - in statementrefs.js
 * XAPI-00073 - in statementrefs.js
 */
    templatingSelection.createTemplate('substatements.js');
    templatingSelection.createTemplate('statementrefs.js');

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
