const path = require("path");
const axios = require("axios").default;
const addOAuthInterceptor = require("axios-oauth-1.0a").default;
const chai = require("chai");
const oldHelpers = require("../../helper");

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

    getActivityWithIRI: async(iri, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, PATH_ACTIVITIES);
        let query = `?activityId=${encodeURIComponent(iri)}`;

        let res = await axios.get(endpoint + query, {
            headers: headerOverrides
        });

        chai.expect(res.status).to.equal(200);

        return res.data;
    },

    /** 
     * @typedef {Object} DocumentResponse
     * @property {number} statusCode Status code of the LRS response.
     * @property {Object} headers Response headers.
     * @property {Object} data The object being returned.
     */
    /** 
     * @typedef {Object} ActivityStateParameters
     * @property {string} activityId The Activity id associated with this state.
     * @property {Object} agent The Agent or Identified Group associated with this state.
     * @property {string} registration The registration associated with this state.
     * @property {string} stateId The id for this state, within the given context.
     */
    /**
     * @typedef {ActivityStateParameters} ActivityStateGetParameters
     * @property {string} since Additional Timestamp parameter for multiple document requests.  DO NOT USE FOR SINGLE DOCUMENTS.
     */
    /**
     * PUT a document into the Activity State resource.
     * @param {any} state Generic state document to store. 
     * @param {ActivityStateParameters} params 
     * @param {Object} headerOverrides Headers to override for this request. 
     */
    putState: async(state, params, headerOverrides) => {
        return await requests.putDocument(PATH_ACTIVITIES_STATE, state, params, headerOverrides);
    },

    /**
     * POST a document into the Activity State resource.
     * @param {any} state Generic state document to store. 
     * @param {ActivityStateParameters} params 
     * @param {Object} headerOverrides Headers to override for this request. 
     */
    postState: async(state, params, headerOverrides) => {
        return await requests.postDocument(PATH_ACTIVITIES_STATE, state, params, headerOverrides);
    },

    /**
     * DELETE a document into the Activity State resource.
     * @param {ActivityStateParameters} params 
     * @param {Object} headerOverrides Headers to override for this request. 
     */
    deleteState: async(params, headerOverrides) => {
        return await requests.deleteDocument(PATH_ACTIVITIES_STATE, params, headerOverrides);
    },
    
    /**
     * GET one or multiple documents from the Activity State resource.
     * @param {ActivityStateParameters} params 
     * @param {Object} headerOverrides Headers to override for this request. 
     * @returns {DocumentResponse} The LRS's simplified response.
     */
    getSingleState: async(params, headerOverrides) => {
        return await requests.getDocuments(PATH_ACTIVITIES_STATE, params, headerOverrides);
    },
    
    /**
     * GET one or multiple documents from the Activity State resource.
     * @param {ActivityStateGetParameters} params 
     * @param {Object} headerOverrides Headers to override for this request. 
     */
    getMultipleStates: async(params, headerOverrides) => {
        return await requests.getDocuments(PATH_ACTIVITIES_STATE, params, headerOverrides);
    },
    
    /** 
     * @typedef {Object} AgentProfileParameters
     * @property {string} profileId The Activity id associated with this state.
     * @property {Object} agent The Agent or Identified Group associated with this state.
     */
    /**
     * @typedef {Object} AgentProfileMultipleGetParameters
     * @property {Object} agent The Agent or Identified Group associated with this state.
     * @property {string} since Additional Timestamp parameter for multiple document requests.  DO NOT USE FOR SINGLE DOCUMENTS.
     */
    /**
     * PUT a document into the Activity State resource.
     * @param {any} document Generic state document to store. 
     * @param {AgentProfileParameters} params 
     * @param {Object} headerOverrides Headers to override for this request. 
     */
    putAgentProfile: async(document, params, headerOverrides) => {
        return await requests.putDocument(PATH_AGENTS_PROFILE, document, params, headerOverrides);
    },

    /**
     * POST a document into the Activity State resource.
     * @param {any} document Generic state document to store. 
     * @param {AgentProfileParameters} params 
     * @param {Object} headerOverrides Headers to override for this request. 
     */
    postAgentProfile: async(document, params, headerOverrides) => {
        return await requests.postDocument(PATH_AGENTS_PROFILE, document, params, headerOverrides);
    },

    /**
     * DELETE a document into the Activity State resource.
     * @param {ActivityStateParameters} params 
     * @param {Object} headerOverrides Headers to override for this request. 
     */
    deleteAgentProfile: async(params, headerOverrides) => {
        return await requests.deleteDocument(PATH_AGENTS_PROFILE, params, headerOverrides);
    },
    
    /**
     * GET one or multiple documents from the Activity State resource.
     * @param {ActivityStateParameters} params 
     * @param {Object} headerOverrides Headers to override for this request. 
     * @returns {DocumentResponse} The LRS's simplified response.
     */
    getSingleAgentProfile: async(params, headerOverrides) => {
        return await requests.getDocuments(PATH_AGENTS_PROFILE, params, headerOverrides);
    },
    
    /**
     * GET one or multiple documents from the Activity State resource.
     * @param {AgentProfileMultipleGetParameters} params 
     * @param {Object} headerOverrides Headers to override for this request. 
     */
    getMultipleAgentProfiles: async(params, headerOverrides) => {
        return await requests.getDocuments(PATH_AGENTS_PROFILE, params, headerOverrides);
    },
    
    /**
     * Get a generic document from a generic resource path.
     * @param {string} resourcePath Relative path to the resource endpoint, relative to the LRS's base xAPI path. 
     * @param {Object} params Query parameters for the request.
     * @param {Object} headerOverrides Optional headers to override for this request.
     * @returns 
     */
    getDocuments: async(resourcePath, params, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, resourcePath);
        let query = "?" + oldHelpers.getUrlEncoding(params);

        let res = await axios.get(endpoint + query, {
            headers: headerOverrides
        });

        return {
            statusCode: res.status,
            headers: res.headers,
            data: res.data,
        }
    },
    
    /**
     * PUT a generic document to a generic resource path.
     * @param {string} resourcePath Relative path to the resource endpoint, relative to the LRS's base xAPI path. 
     * @param {any} document Document to send.
     * @param {Object} params Query parameters for the request.
     * @param {Object} headerOverrides Optional headers to override for this request.
     * @returns 
     */
    putDocument: async(resourcePath, document, params, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, resourcePath);
        let query = "?" + oldHelpers.getUrlEncoding(params);

        return await axios.put(endpoint + query, document, {
            headers: headerOverrides
        });
    },
    
    /**
     * POST a generic document to a generic resource path.
     * @param {string} resourcePath Relative path to the resource endpoint, relative to the LRS's base xAPI path. 
     * @param {any} document Document to send.
     * @param {Object} params Query parameters for the request.
     * @param {Object} headerOverrides Optional headers to override for this request.
     * @returns 
     */
    postDocument: async(resourcePath, document, params, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, resourcePath);
        let query = "?" + oldHelpers.getUrlEncoding(params);

        return await axios.post(endpoint + query, document, {
            headers: headerOverrides
        });
    },
    
    /**
     * DELETE a generic document to a generic resource path.
     * @param {string} resourcePath Relative path to the resource endpoint, relative to the LRS's base xAPI path. 
     * @param {Object} params Query parameters for the request.
     * @param {Object} headerOverrides Optional headers to override for this request.
     * @returns 
     */
    deleteDocument: async(resourcePath, params, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, resourcePath);
        let query = "?" + oldHelpers.getUrlEncoding(params);

        return await axios.delete(endpoint + query, {
            headers: headerOverrides
        });
    }
};

module.exports = requests;
