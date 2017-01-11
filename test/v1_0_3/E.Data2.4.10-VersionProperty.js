/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, templatingSelection) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

describe('Version Property Requirements (Data 2.4.10)', () => {

/**  Matchup with Conformance Requirements Document
 * XAPI-00101 - in version.js
 * Unnumbered test - came from XAPI-00332
 */

    templatingSelection.createTemplate('version.js');

/**  XAPI-00332, Communication 3.3 Versioning which should be moved to Data 2.4.10 Version Property
 * Statements returned by an LRS MUST retain the version property they are accepted with.
 */
    it ('Statements returned by an LRS MUST retain the version property they are accepted with (Format, Data 2.4.10, XAPI-00332)', function (done){
        this.timeout(0);
        var stmtTime = Date.now();

        var statementTemplates = [
            {statement: '{{statements.default}}'}
        ];

        var version = '1.0.3';
        var id = helper.generateUUID();

        var statement = helper.createFromTemplate(statementTemplates);
        statement = statement.statement;
        statement.id = id;
        statement.version = version;

        var query = helper.getUrlEncoding({statementId: id});

        request(helper.getEndpointAndAuth())
        .post(helper.getEndpointStatements())
        .headers(helper.addAllHeaders({}))
        .json(statement)
        .expect(200)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                request(helper.getEndpointAndAuth())
                .get(helper.getEndpointStatements() + '?' + query)
                .wait(helper.genDelay(stmtTime, '?' + query, id))
                .headers(helper.addAllHeaders({}))
                .expect(200)
                .end(function(err,res){
                     if (err){
                        done(err);
                     }
                     else{
                        var results = helper.parse(res.body);
                        expect(results.version).to.equal(version);
                        done();
                     }
                });
            }
        });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection')));
