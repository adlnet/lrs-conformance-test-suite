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

    //Data 2.4.4
    templatingSelection.createTemplate('objects.js');
    //Data 2.4.4.1
    templatingSelection.createTemplate("activities.js");

    describe('An Activity Definition uses the "interactionType" property if any of the correctResponsesPattern, choices, scale, source, target, or steps properties are used (Multiplicity, Data 2.4.4.1.s8) **Implicit**', function (){

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

    //Data 2.4.4.3
    templatingSelection.createTemplate('statementrefs.js')
    templatingSelection.createTemplate('substatements.js')

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
