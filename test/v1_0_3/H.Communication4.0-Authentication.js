(function(module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect)
{
    
/**  XAPI-00334, Communication 2.1.3 GET Statements
 * An LRS rejects a Statement of bad authorization (either authentication needed or failed credentials) with error code 401 Unauthorized 
 */
 describe('An LRS rejects a Statement of bad authorization (either authentication needed or failed credentials) with error code 401 Unauthorized (Authentication 4.0 XAPI-00334)',function(){


    it("fails when given a random name pass pair", function(done)
    {
        var templates = [
        {
            statement: '{{statements.default}}'
        }];
        var data = helper.createFromTemplate(templates);
        data = data.statement;
        data.id = helper.generateUUID();
        var headers = helper.addAllHeaders(
        {});

        //warning: this ".\\" is super important. Node caches the modules, and the superrequest module has been modified to work correctly
        //with oauth already. We get a new verions by appending some other characters to defeat the cache. 
        if(global.OAUTH)
            request = require('.\\super-request');
        else
            headers["Authorization"] = 'Basic ' + new Buffer('RobCIsNot:AUserOnThisLRS').toString('base64');
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(401, done);
    });

    it('fails with a malformed header', function(done)
    {
        var templates = [
        {
            statement: '{{statements.default}}'
        }];
        var data = helper.createFromTemplate(templates);
        data = data.statement;
        data.id = helper.generateUUID();
        var headers = helper.addAllHeaders(
        {});

        //warning: this ".\\" is super important. Node caches the modules, and the superrequest module has been modified to work correctly
        //with oauth already. We get a new verions by appending some other characters to defeat the cache. 
        if(global.OAUTH)
            request = require('.\\super-request');
        else
            headers["Authorization"] = 'Basic:' + new Buffer('RobCIsNot:AUserOnThisLRS').toString('base64'); //note bad encoding here.
            request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(401, done);
    });
})

/**  XAPI-00335, Communication 2.1.3 GET Statements
 * An LRS must support HTTP Basic Authentication
 */
 //WARNING: This might not be a great test. OAUTH will override it
    it('An LRS must support HTTP Basic Authentication(Authentication 4.0 XAPI-00335)', function(done)
    {
        var templates = [
        {
            statement: '{{statements.default}}'
        }];
        var data = helper.createFromTemplate(templates);
        data = data.statement;
        data.id = helper.generateUUID();
        var headers = helper.addAllHeaders(
        {});
      
        request(helper.getEndpointAndAuth())
            .put(helper.getEndpointStatements() + '?statementId=' + data.id)
            .headers(headers)
            .json(data)
            .expect(204, done);
    });

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));