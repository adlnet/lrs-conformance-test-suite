const path = require("path");
const axios = require("axios").default;
const addOAuthInterceptor = require("axios-oauth-1.0a").default;
const chai = require("chai");

/** Test directory */
const DIRECTORY = process.env.DIRECTORY;

/** Defines endpoint of the LRS you are testing.  Currently assumes authentication is not required */
const LRS_ENDPOINT = process.env.LRS_ENDPOINT;

/** Appears to use absolute path */
const TEMPLATE_FOLDER = './test/' + process.env.DIRECTORY + '/templates';

/** Appears to use relative path */
const TEMPLATE_FOLDER_RELATIVE = './' + process.env.DIRECTORY + '/templates';

/** Endpoint About */
const PATH_ABOUT = '/about';

/** Endpoint Activities */
const PATH_ACTIVITIES = '/activities';

/** Endpoint Activities Profile */
const PATH_ACTIVITIES_PROFILE = '/activities/profile';

/** Endpoint Activities State */
const PATH_ACTIVITIES_STATE = '/activities/state';

/** Endpoint Agents */
const PATH_AGENTS = '/agents';

/** Endpoint Agents Profile */
const PATH_AGENTS_PROFILE = '/agents/profile';

/** Endpoint Statements */
const PATH_STATEMENTS = '/statements';

/** Assign the default headers for our setup */
axios.defaults.headers.common = {
    ...axios.defaults.headers.common,

    "Content-Type": "application/json",
    "X-Experience-API-Version": process.env.XAPI_VERSION,
}

/**
 * Configure our auth setup.
 * 
 * If they're using OAuth, then a global value will know about it,
 * but the basic auth values are written into the process env parser.
 */
if (global.OAUTH != undefined) {
    addOAuthInterceptor(axios, {
        algorithm: "HMAC-SHA1",
        key: global.OAUTH.consumer_key,
        secret: global.OAUTH.consumer_secret,
        token: global.OAUTH.token,
        tokenSecret: global.OAUTH.token_secret,
        verifier: global.OAUTH.verifier,
    });
}
else {  
    axios.defaults.headers.common["Authorization"] = `Basic ${user + ':' + pass}`.toString('base64');
}

const requests = {

    sendStatement: async(statement, headerOverrides) => {

        let endpoint = path.join(LRS_ENDPOINT, PATH_STATEMENTS);

        return await axios.post(endpoint, statement, {
            headers: headerOverrides
        });
    },

    getActivityWithIRI: async(iri) => {
        let endpoint = path.join(LRS_ENDPOINT, PATH_ACTIVITIES);
        let query = `?activityId=${encodeURIComponent(iri)}`;

        let res = await axios.get(endpoint + query, {
            headers: headerOverrides
        });

        chai.expect(res.status).to.equal(200);

        return res.data;
    }
};

module.exports = requests;
