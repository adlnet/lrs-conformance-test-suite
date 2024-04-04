/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xapi-lrs-conformance-requirements.
 */

const superRequest = require('super-request');
const oldHelpers = require('../helper');
const requests = require("./util/requests");
const { expect } = require('chai');

if(global.OAUTH)
    superRequest = oldHelpers.OAuthRequest(superRequest);

describe('Alternate Request Syntax Requirements', function () {

    it('The LRS Spec does not mandate any properties regarding Alternate Request Syntax in xAPI 2.0', async function () {
        expect(true).to.eql(true);
    });
});
