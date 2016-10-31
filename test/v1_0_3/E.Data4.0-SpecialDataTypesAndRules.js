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

describe('Special Data Types and Rules (Data 4.0)', () => {

    //Data 4.1
/**  Matchup with Conformance Requirements Document
 * XAPI-00118 - in extensions.js
 * XAPI-00119 - in extensions.js - make tests for PUT and other emptys
 * XAPI-00120 - in extensions.js - make tests for 400 condition
 */
    templatingSelection.createTemplate("extensions.js");

    //Data 4.2
/**  Matchup with Conformance Requirements Document
 * XAPI-00121 - in languages.js
 */
    templatingSelection.createTemplate("languages.js");

    //Data 4.5
/**  Matchup with Conformance Requirements Document
 * XAPI-00122 - not found yet - A Timestamp MUST preserve precision to at least milliseconds (3 decimal points beyond seconds). The LRS accepts a statement with a valid timestamp which has more than 3 decimal points beyond seconds and when recalled it returns at least 3 decimals points beyond seconds.
 * See test in Data2.4.8-StoredProperty
 * XAPI-00123 - in timestamps.js
 */
    templatingSelection.createTemplate("timestamps.js");

/**  XAPI-00123, Data 4.5 ISO 8601 Timestamps
 * A Timestamp MUST preserve precision to at least milliseconds (3 decimal points beyond seconds). The LRS accepts a statement with a valid timestamp which has more than 3 decimal points beyond seconds and when recalled it returns at least 3 decimals points beyond seconds.
 */
    describe('A Timestamp MUST preserve precision to at least milliseconds, 3 decimal points beyond seconds. (Data 4.5.s1.b3, XAPI-00123)', function () {

        it('retrieve statements, test a timestamp property', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    var result = helper.parse(res.body);
                    var stmts = result.statements;
                    var milliChecker = (num) => {
                        expect(stmts[num]).to.have.property('timestamp');
                        //formatted iso 8601
                        var chkStored =  moment(stmts[num].timestamp, moment.ISO_8601);
                        expect(chkStored.isValid()).to.be.true;
                        expect(isNaN(chkStored._pf.parsedDateParts[6])).to.be.false;
                        //precision to milliseconds
                        if ((chkStored._pf.parsedDateParts[6] % 10) > 0) {
                            expect(chkStored._pf.parsedDateParts[6] % 10).to.be.above(0);
                            done();
                        } else {
                            if (++num < stmts.length) {
                                milliChecker(num);
                            } else {
                                expect(chkStored._pf.parsedDateParts[6] % 10).to.be.above(0);
                                done();
                            }
                        }
                    }; milliChecker(0);
                }
            });
        });

        it('retrieve statements, test a stored property', function (done) {
            request(helper.getEndpointAndAuth())
            .get(helper.getEndpointStatements())
            .headers(helper.addAllHeaders())
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    var result = helper.parse(res.body);
                    var stmts = result.statements;
                    var milliChecker = (num) => {
                        expect(stmts[num]).to.have.property('stored');
                        //formatted iso 8601
                        var chkStored =  moment(stmts[num].stored, moment.ISO_8601);
                        expect(chkStored.isValid()).to.be.true;
                        expect(isNaN(chkStored._pf.parsedDateParts[6])).to.be.false;
                        //precision to milliseconds
                        if ((chkStored._pf.parsedDateParts[6] % 10) > 0) {
                            expect(chkStored._pf.parsedDateParts[6] % 10).to.be.above(0);
                            done();
                        } else {
                            if (++num < stmts.length) {
                                milliChecker(num);
                            } else {
                                expect(chkStored._pf.parsedDateParts[6] % 10).to.be.above(0);
                                done();
                            }
                        }
                    }; milliChecker(0);
                }
            });
        });
    });

    //Data 4.6
/**  Matchup with Conformance Requirements Document
 * XAPI-00124 - in durations.js
 */
    templatingSelection.createTemplate.("durations.js");

});

}(module, require('fs'), require('extend'), require('moment'), require('super-request'), require('supertest-as-promised'), require('chai'), require('url'), require('joi'), require('./../helper'), require('./../multipartParser'), require('./../redirect.js'), require('./../templatingSelection.js')));
