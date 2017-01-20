/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Alternate Request Syntax Requirements (Communication 1.3)', () => {

    /**  XAPI-00148, Communication 2.1.2 POST Statements
     * An LRS accepts a valid POST request containing a GET request returning 200 OK and the StatementResult Object.
     */
    it('An LRS accepts a valid POST request containing a GET request returning 200 OK and the StatementResult Object. (Communication 1.3, Communication 2.1.2.s2.b3, XAPI-00148)', function (done) {
        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements() + "?method=GET")
        .headers(helper.addAllHeaders({}))
        .form({limit: 1})
        .expect(200).end(function (err, res) {
            if (err) {
                done(err);
            } else {
                var results = helper.parse(res.body, done);
                expect(results).to.have.property('statements');
                expect(results).to.have.property('more');
                done();
            }
        });
    });

    describe('An LRS will reject any request sending content which does not have a form parameter with the name of "content" (Communication 1.3.s3.b4)', function () {
        it('will fail PUT with no content body', function () {
            // var parameters = {method: 'put'};
            var parameters = {method: 'PUT'};
            return helper.sendRequest('post', helper.getEndpointStatements(), parameters, undefined, 400);
        });

// Adding old code to test if it will work, to find out why mine isn't
it('Any LRS Resource that accepts a POST request can accept a POST request with a single query string parameter named "method" on that request (Communication 1.3.s3.b2)', function () {
    var parameters = {method: 'POST'},
        formBody = helper.buildFormBody(helper.buildStatement());
    return helper.sendRequest('post', helper.getEndpointStatements(), parameters, formBody, 200);
});

        it('will fail PUT with content body which is not url encoded', function () {
            // var parameters = {method: 'put'};
            var parameters = {method: 'PUT'};
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;
            return helper.sendRequest('post', helper.getEndpointStatements(), parameters, data, 400);
        });

        it('will pass PUT with content body which is url encoded', function () {
            // var parameters = {method: 'put'};
            var parameters = {method: 'PUT'};
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates).statement;
            var body = 'statementId=' + helper.generateUUID() + '&content='+JSON.stringify(data);
            // var body = 'statementId=' + helper.generateUUID() + '&content='+JSON.stringify(data) + '&X-Experience-API-Version=1.0.3&Authorization=' + auth; //original
            return helper.sendRequest('post', helper.getEndpointStatements(), parameters, helper.buildFormBody(body), 204);
        });
    });

    it('An LRS will reject a Cross Origin Request or new Request which contains any extra information with error code 400 Bad Request (**Implicit**, Communication 1.3.s3.b4)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);

        var statement = data.statement;
        var sID = helper.generateUUID();
        var headers = helper.addAllHeaders({});
        var auth = headers['Authorization']
        var parameters = {
            method: 'PUT',
            statementId: helper.generateUUID()
        }
        var body = 'statementId=' + sID + '&content=' + JSON.stringify(statement) + '&Content-Type=application/json&X-Experience-API-Version=1.0.3&Authorization=' + auth;
        return helper.sendRequest('post', helper.getEndpointStatements(), parameters, body, 400);
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
