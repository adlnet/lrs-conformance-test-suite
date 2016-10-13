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

describe('Versioning Requirements (Communication 3.3)', () => {

/**  Matchup with Conformance Requirements Document
 * XAPI-00330 - below
 * XAPI-00331 - below
 * XAPI-00332 - not found yet - Statements returned by an LRS MUST retain the version property they are accepted with. - should this be under Data 2.4.10 version property??
 * XAPI-00333 - below
 */

/**  XAPI-00333, Communication 3.3 Versioning
 * An LRS sends a header response with "X-Experience-API-Version" as the name and latest patch version after 1.0.0 as the value
 */
    it ('An LRS sends a header response with "X-Experience-API-Version" as the name and "1.0.3" as the value (Format, Communication 3.3.s3.b1, Communication 3.3.s3.b2, XAPI-00333)', function (done){
        this.timeout(0);
        var id = helper.generateUUID();
        var statementTemplates = [
          {statement: '{{statements.default}}'}
        ];

        var statement = helper.createFromTemplate(statementTemplates);
        statement = statement.statement;
        statement.id = id;
        var query = helper.getUrlEncoding({statementId: id});
        var stmtTime = Date.now();

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders({}))
        .json(statement)
        .expect(200)
        .end()
        .get(helper.getEndpointStatements() + '?' + query)
        .wait(helper.genDelay(stmtTime, '?' + query, id))
        .headers(helper.addAllHeaders({}))
        .expect(200)
        .end(function(err,res){
            if (err){
                done(err);
            }
            else{
                expect(res.headers).to.have.property('x-experience-api-version');
                expect(res.headers['x-experience-api-version']).to.equal("1.0.3");
                done();
            }
        });
    });

    describe('An LRS MUST set the X-Experience-API-Version header to the latest patch version (Communication 3.3.s3.b2)', function () {
        it('should respond with header "version" set to "1.0.3"', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            var query = '?statementId=' + data.id;
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .wait(helper.genDelay(stmtTime, query, data.id))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .expect('x-experience-api-version', '1.0.3', done);
        });
    });

/**  XAPI-00330, Communication 3.3 Versioning
 * An LRS will not modify Statements based on a "version" before "1.0.1"
 */
    describe('An LRS will not modify Statements based on a "version" before "1.0.1" (Communication 3.3.s3.b4, XAPI-00330)', function () {
        it('should not convert newer version format to prior version format', function (done) {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;
            data.id = helper.generateUUID();
            var query = '?statementId=' + data.id;
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .headers(helper.addAllHeaders({}))
                .json(data)
                .expect(200)
                .end()
                .get(helper.getEndpointStatements() + '?statementId=' + data.id)
                .wait(helper.genDelay(stmtTime, query, data.id))
                .headers(helper.addAllHeaders({}))
                .expect(200).end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        var statement = helper.parse(res.body, done);
                        expect(helper.isEqual(data.actor, statement.actor)).to.be.true;
                        expect(helper.isEqual(data.object, statement.object)).to.be.true;
                        expect(helper.isEqual(data.verb, statement.verb)).to.be.true;
                        done();
                    }
                });
        });
    });

/**  XAPI-00331, Communication 3.3 Versioning
 * An LRS rejects with error code 400 Bad Request, a Request which the "X-Experience-API-Version" header's value is anything but "1.0" or "1.0.x", where x is the semantic versioning number to any API except the About API
 */
    describe('An LRS rejects with error code 400 Bad Request, a Request which does not use a "X-Experience-API-Version" header name to any Resource except the About Resource (Format, Communication 3.3.s4.b1, Communication 3.3.s3.b7, Communication 2.8.s5.b4, XAPI-00331)', function () {

        it('should pass when About GET without header "X-Experience-API-Version"', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointAbout())
                .expect(200, done);
        });

        it('should fail when Statement GET without header "X-Experience-API-Version"', function (done) {
            request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?statementId=' + helper.generateUUID())
                .expect(400, done);
        });

        it('should fail when Statement POST without header "X-Experience-API-Version"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
                .post(helper.getEndpointStatements())
                .json(data).expect(400, done);
        });

        it('should fail when Statement PUT without header "X-Experience-API-Version"', function (done) {
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            var data = helper.createFromTemplate(templates);
            data = data.statement;

            request(helper.getEndpointAndAuth())
                .put(helper.getEndpointStatements() + '?statementId=' + helper.generateUUID())
                .json(data).expect(400, done);
        });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js')));
