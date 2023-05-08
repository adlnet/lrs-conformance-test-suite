const fs = require('fs');
const extend = require('extend');
const moment = require('moment');
const request = require('super-request');
const requestPromise = require('supertest-as-promised');
const chai = require('chai');
const liburl = require('url');
const Joi = require('joi');
const helper = require('../helper');
const multipartParser = require('../multipartParser');
const redirect = require('../redirect.js');
const templatingSection = require('../templatingSelection.js');

const requestHelpers = require("./util/requests");

const expect = chai.expect;

if(global.OAUTH)
    request = helper.OAuthRequest(request);

describe("(4.2.7) Additional Requirements for Data Types", function () {

    describe("IRIs", function() {

        it ("When storing or comparing IRIs, LRSs shall handle them only by " 
        + "using one or more of the approaches described in 5.3.1 (Simple String Comparison) "
        + "and 5.3.2 (Syntax-Based Normalization) of RFC 3987", async() => {
            
            let slug = helper.generateUUID();

            let iriA = `http://example.com/path/${slug}`;
            let iriB = `http://example.com/path/../${slug}`;

            let statement = helper.buildStatement();
            statement.object.id = iriB;

            await requestHelpers.sendStatement(statement);
            
            // We have to receive an activity regardless here, as the 2.0 spec requires it etc.
            //
            let activityA = await requestHelpers.getActivityWithIRI(iriA);
            let activityB = await requestHelpers.getActivityWithIRI(iriB);

            let matchesA = activityA.id === iriA;
            let matchesB = activityB.id === iriB;

            chai.expect(matchesA || matchesB).to.be.true;
        });
    });
});