/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Alternate Request Syntax Requirements (Communication 1.3)', () => {

    it('An LRS rejects a new Request in the same way for violating rules of this document as it would a normal Request (**Implicit**, Communication 1.3)', function () {
        var parameters = {method: 'post'},
            formBody = helper.buildFormBody(helper.buildStatement().actor);
        return helper.sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 400);
    });

    it('Any LRS Resource that accepts a POST request can accept a POST request with a single query string parameter named "method" on that request (Communication 1.3.s3.b2)', function () {
        var parameters = {method: 'post'},
            formBody = helper.buildFormBody(helper.buildStatement());
        return helper.sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 200);
    });

    it('An LRS will reject any request sending content which does not have a form parameter with the name of "content" (Communication 1.3.s3.b4)', function () {
        var parameters = {method: 'put'};
        return helper.sendRequest('post', helper.getEndpointStatements(), parameters, undefined, 400);
    });

    it('An LRS will reject a Cross Origin Request or new Request which contains any extra information with error code 400 Bad Request (**Implicit**, Communication 1.3.s3.b4)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        data.statement.test = "test";

        var statement = data.statement;
        var sID = helper.generateUUID();
        var headers = helper.addAllHeaders({});
        var auth = headers['Authorization']
        var parameters = {
            method: 'PUT'
        }
        var body = 'statementId='+sID+'&content='+JSON.stringify(statement)+'&Content-Type=application/json&X-Experience-API-Version=1.0.2&Authorization='+auth
        return helper.sendRequest('post', helper.getEndpointStatements(), parameters, body, 400);
    });


    it('An LRS will treat the content of the form parameter named "content" as a UTF-8 String (Communication 1.3.s3.b4, Communication 1.3.s3.b5)', function () {

           var templates = [
             {statement: '{{statements.unicode}}'}
           ];

           var data = helper.createFromTemplate(templates);
           var statement = data.statement;
           var id = helper.generateUUID();
           statement.id  = id;
           var formBody = helper.buildFormBody(statement);

           var parameters = {method: 'post'};
           var parameters2 = {activityId: data.statement.object.id}

          return helper.sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 200)
          .then(function(){
               return helper.sendRequest('get', helper.getEndpointActivities(), parameters2, undefined, 200)
               .then(function(res){
                  var unicodeConformant = true;
                   var languages = res.body.definition.name;
                   for (var key in languages){
                     if (languages[key] !== statement.object.definition.name[key])
                       unicodeConformant = false;
                   }
                   expect(unicodeConformant).to.be.true;
               })
           })
    });

    it('An LRS will reject a new Request with a form parameter named "content" if "content" is found to be binary data with error code 400 Bad Request (Communication 1.3.s3.b5)', function () {
        var parameters = {method: 'post'},
            formBody = {
            'X-Experience-API-Version': '1.0.3',
            'Content-Type': 'application/json',
            }
        formBody.content = new Buffer("I'm a string", "binary");
        return helper.sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 400);
    });

    it('An LRS must parse the body of a Cross Origin Request and construct a new Request from it with the type of Request being the same as the value of the "method" parameter (Communication 1.3.s3.b6)', function () {
        var parameters = {method: 'put'},
            formBody = helper.buildFormBody(helper.buildStatement(), helper.generateUUID());
        return helper.sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 204)
    });

    it('An LRS will map form parameters from the body of the Cross Origin Request to the similarly named HTTP Headers in the new Request (Communication 1.3.s3.b7)', function () {
        var parameters = {method: 'get'};
        return helper.sendRequest('post', helper.getEndpointStatements(), parameters, undefined, 200)
            .then(function (res) {
                var body = res.body;
                expect(body).to.have.property('statements');
                expect(body).to.have.property('more');
            });
    });

    it('An LRS will reject a Cross Origin Request which attempts to send attachment data with error code 400 Bad Request (Communication 1.3.s3.b14)', function () {
        var templates = [
            {statement: '{{statements.attachment}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;
        var sID = helper.generateUUID();
        var headers = helper.addAllHeaders({});
        var auth = headers['Authorization']
        var parameters = {
            method: 'PUT'
        }
        var body = 'statementId='+sID+'&content='+JSON.stringify(statement)+'&Content-Type=application/json&X-Experience-API-Version=1.0.2&Authorization='+auth
        return helper.sendRequest('post', helper.getEndpointStatements(), parameters, body, 400);
    });

    it('An LRS will reject a Cross Origin Request or new Request which contains any extra information with error code 400 Bad Request **Implicit**', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        data.statement.test = "test";
        var statement = data.statement;
        var sID = helper.generateUUID();
        var headers = helper.addAllHeaders({});
        var auth = headers['Authorization']
        var parameters = {
            method: 'PUT'
        }
        var body = 'statementId='+sID+'&content='+JSON.stringify(statement)+'&Content-Type=application/json&X-Experience-API-Version=1.0.2&Authorization='+auth
        return helper.sendRequest('post', helper.getEndpointStatements(), parameters, body, 400);
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
