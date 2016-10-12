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

describe('Activities Resource Requirements (Communication 2.5)', () => {

/**
 * XAPI-00250 - below
 * XAPI-00251 - below
 * XAPI-00252 - below
 * XAPI-00253 - below
 * XAPI-00254 - not found yet - The Activity Object must contain all available information about an activity from any statements who target the same “activityId”. For example, LRS accepts two statements each with a different language description of an activity using the exact same “activityId”. The LRS must return both language descriptions when a GET request is made to the Activities endpoint for that “activityId”.
 */

/**  XAPI-00252, Communication 2.5 Activities Resource
 * An LRS has an Activities API with endpoint "base IRI" + /activities" (7.5) Implicit (in that it is not named this by the spec)
 */
    it('An LRS has an Activities Resource with endpoint "base IRI" + /activities" (Communication 2.5, Implicit) **Implicit** (in that it is not named this by the spec)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;
        var parameters = {
            activityId: data.statement.object.id
        }
        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 200);
            });
    });

/**  XAPI-00253, Communication 2.5 Activities Resource
 * An LRS's Activities API accepts GET requests
 */
    it('An LRS\'s Activities Resource accepts GET requests (Communication 2.5, XAPI-00253)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;
        var parameters = {
            activityId: data.statement.object.id
        }
        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 200);
            });
    });

/**  XAPI-00251, Communication 2.5 Activities Resource
 * An LRS's Activities API upon processing a successful GET request returns 200 OK and the complete Activity Object
 */
    it('An LRS\'s Activities Resource upon processing a successful GET request returns the complete Activity Object (Communication 2.5.s1)', function () {
        var templates = [
            {statement: '{{statements.object_activity}}'},
            {object: '{{activities.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;
        statement.object.id = 'http://www.example.com/verify/complete/34534';

        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
        .then(function () {
            var parameters = {
                activityId: statement.object.id
            };
            return helper.sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 200)
            .then(function (res) {
                var activity = res.body;
                expect(activity).to.be.ok;
                expect(activity).to.eql(statement.object);
            });
        });
    });

/**  XAPI-00250, Communication 2.5 Activities Resource
 * An LRS's Activities API rejects a GET request without "activityId" as a parameter with error code 400 Bad Request
 */
    it('An LRS\'s Activities Resource rejects a GET request without "activityId" as a parameter with error code 400 Bad Request (multiplicity, Communication.md#2.5.s1.table1.row1, XAPI-00250)', function () {
        return helper.sendRequest('get', helper.getEndpointActivities(), undefined, undefined, 400);
    });

    //Note: tests focusing on type "String" as a parameter are likely to be stricken or reworded before final release.
    //Also note: using an it over and it nullifies the inner its, consider using a describe.
    it('An LRS\'s Activities Resource rejects a GET request with "activityId" as a parameter if it is not type "String" with error code 400 Bad Request (format, Communication 2.5.s1.table1.row1)', function () {
        var invalidTypes = [1, true, { key: 'value'}];
        invalidTypes.forEach(function (type) {
            it('Should reject GET with "activityId" with type ' + type, function () {
                var parameters = helper.buildActivity();
                console.log(parameters);
                parameters.activityId = type;
                console.log(parameters);
                return helper.sendRequest('get', helper.getEndpointActivities(), parameters, undefined, 400).then((res) => {
                    console.log('howdy', res.text);
                });
            });
        });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
