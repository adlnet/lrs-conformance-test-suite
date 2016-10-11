/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */

/**  As there is no Data 2.4 file, I will match them up here
 * Matchup with Conformance Requirements Document
 * XAPI-00021 - these are all in Multiplicity folder, the community said this won't be a problem and do not test it.  some are also covered in templating tests, usually in these cases post and 200 or 400.
 * XAPI-00022 - in statements.js
 * XAPI-00023 - in Data 2.4.8 Stored Property
 * XAPI-00024 - in authorities.js
 * XAPI-00025 - in attachments.js
 */

(function (module, fs, extend, moment, request, requestPromise, chai, liburl, Joi, helper, multipartParser, redirect, templatingSelection) {
    // "use strict";

    var expect = chai.expect;
    if(global.OAUTH)
        request = helper.OAuthRequest(request);

/** Matchup with Conformance Requirements Document
 * XAPI-00026 - found below
 * XAPI-00027 - in uuids.js
 * XAPI-00028 - in uuids.js
 * XAPI-00029 - this looks the same as XAPI-00028 to me
 * XAPI-00030 - this looks the same as XAPI-00027 to me
 */

describe('Id Property Requirements (Data 2.4.1)', () => {

    templatingSelection.createTemplate('uuids.js');

/**  XAPI-00026,  Data 2.4.1 Id
 * An LRS generates the "id" property of a Statement if none is provided (Modify, 4.1.1.a)
 */
    describe ('An LRS generates the "id" property of a Statement if none is provided (Modify, Data 2.4.1.s2.b1, XAPI-00026)', function (){

        it('should complete an empty id property', (done) => {
            this.timeout(0);
            var templates = [
                {statement: '{{statements.default}}'}
            ];
            data = helper.createFromTemplate(templates);
            data = data.statement;
            var stmtTime = Date.now();

            request(helper.getEndpointAndAuth())
            .post(helper.getEndpointStatements())
            .headers(helper.addAllHeaders({}))
            .json(data)
            .expect(200)
            .end()
            .get(helper.getEndpointStatements() + '?limit=1')
            .wait(helper.genDelay(stmtTime, null, null))
            .headers(helper.addAllHeaders({}))
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    var results = helper.parse(res.body, done);
                    expect(results.statements[0].id).to.not.be.undefined;
                    done();
                }
            });
        });
    });

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartparser'), require('./../redirect.js'), require('./../templatingSelection.js')));
