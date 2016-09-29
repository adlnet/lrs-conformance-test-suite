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

describe('Agents Resource Requirements (Communication 2.4)', () => {

    it('An LRS has an Agents API with endpoint "base IRI" + /agents" (Communication 2.4) **Implicit** (in that it is not named this by the spec)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;
        var parameters = {
            agent: data.statement.actor
        }
        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgents(), parameters, undefined, 200);
            });
    });

    it('An LRS\'s Agents API accepts GET requests (Communication 2.4.s2)', function () {
        return helper.sendRequest('get', helper.getEndpointAgents(), helper.buildAgent(), undefined, 200);
    });

    it('A Person Object is an Object (Communication 2.4.s2)', function () {
        return helper.sendRequest('get', helper.getEndpointAgents(), helper.buildAgent(), undefined, 200)
            .then(function (res) {
                var person = res.body;
                expect(person).to.be.an('object');
            });
    });

    it('An LRS\'s Agents API rejects a GET request without "agent" as a parameter with error code 400 Bad Request (multiplicity, Communication 2.4.s2.table1.row1)', function () {
        return helper.sendRequest('get', helper.getEndpointAgents(), undefined, undefined, 400);
    });

    it('A Person Object\'s "objectType" property is a String and is "Person" (Format, Vocabulary, Communication 2.4.s5.table1.row1)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;

        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                    .then(function (res) {
                        var person = res.body;
                        expect(person).to.have.property('objectType').to.equal('Person');
                    });
            });
    });

    it('A Person Object\'s "name" property is an Array of Strings (Multiplicity, Communication 2.4.s5.table1.row2)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;

        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                    .then(function (res) {
                        var person = res.body;
                        expect(person).to.have.property('name').to.be.an('array');
                        person.name.forEach(function(item){
                            expect(item).to.be.a('string');
                        });
                    });
            });
    });

    it('A Person Object\'s "mbox" property is an Array of IRIs (Multiplicity, Communication 2.4.s5.table1.row3)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;
        var MAIL_TO = 'mailto:';
        var isEmail = require('isemail');

        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                    .then(function (res) {
                        var person = res.body;
                        expect(person).to.have.property('mbox').to.be.an('array');
                        person.mbox.forEach(function(item){
                            expect(item).to.be.a('string');
                            var email = item.substring(MAIL_TO.length);
                            expect(isEmail(email)).to.be.true;
                        });
                    });
            });
    });

    it('A Person Object\'s "mbox" entries have the form "mailto:emailaddress" (Format, Communication 2.4.s5.table1.row3)', function () {
        var templates = [
            {statement: '{{statements.default}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;

        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                    .then(function (res) {
                        var person = res.body;
                        expect(person).to.have.property('mbox').to.be.an('array');
                        person.mbox.forEach(function(item){
                            expect(item).to.be.a('string');
                            expect(item).to.match(/^mailto:/);
                        });
                    });
            });
    });

    it('A Person Object\'s "mbox_sha1sum" property is an Array of Strings (Multiplicity, Communication 2.4.s5.table1.row4)', function () {
        var templates = [
            {statement: '{{statements.no_actor}}'},
            {actor: '{{agents.mbox_sha1sum}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;

        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                    .then(function (res) {
                        var person = res.body;
                        expect(person).to.have.property('mbox_sha1sum').to.be.an('array');
                        person.mbox_sha1sum.forEach(function(item){
                            expect(item).to.be.a('string');
                        });
                    });
            });
    });

    it('A Person Object\'s "openid" property is an Array of Strings (Multiplicity, Communication 2.4.s5.table1.row5)', function () {
        var templates = [
            {statement: '{{statements.no_actor}}'},
            {actor: '{{agents.openid}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;

        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                    .then(function (res) {
                        var person = res.body;
                        expect(person).to.have.property('openid').to.be.an('array');
                        person.openid.forEach(function(item){
                            expect(item).to.be.a('string');
                        });
                    });
            });
    });

    it('A Person Object\'s "account" property is an Array of Account Objects (Multiplicity, Communication 2.4.s5.table1.row6)', function () {
        var templates = [
            {statement: '{{statements.no_actor}}'},
            {actor: '{{agents.account}}'}
        ];
        var data = helper.createFromTemplate(templates);
        var statement = data.statement;

        return helper.sendRequest('post', helper.getEndpointStatements(), undefined, [statement], 200)
            .then(function () {
                return helper.sendRequest('get', helper.getEndpointAgents(), { agent: statement.actor }, undefined, 200)
                    .then(function (res) {
                        var person = res.body;
                        expect(person).to.have.property('account').to.be.an('array');
                        person.account.forEach(function(item){
                            expect(item).to.be.an('object');
                        });
                    });
            });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
