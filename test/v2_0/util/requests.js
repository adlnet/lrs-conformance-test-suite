const path = require("path");
const axios = require("axios").default;
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

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common = {
    ...axios.defaults.headers.common,

    "Content-Type": "application/json",
    "Authorization": `Basic ${user + ':' + pass}`.toString('base64'),
    "X-Experience-API-Version": process.env.XAPI_VERSION,
}
axios.defaults.headers.common["X-Experience-API-Version"] = process.env.XAPI_VERSION;


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
