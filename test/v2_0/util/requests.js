const path = require("path");
const axiosBase = require("axios");
const axios = axiosBase.default;
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
    let user = process.env.BASIC_AUTH_USER;
    let pass = process.env.BASIC_AUTH_PASSWORD;

    axios.defaults.headers.common["Authorization"] = "Basic " + Buffer.from(user + ':' + pass).toString("base64");
}

const requests = {
    
    resourcePaths: {
        activityState: PATH_ACTIVITIES_STATE,
        activityProfile: PATH_ACTIVITIES_PROFILE,
        agentsProfile: PATH_AGENTS_PROFILE,
    },

    /**
     * POST an xAPI statement to the LRS.
     * @param {Object} statement The xAPI statement to send. 
     * @param {Object} headerOverrides Headers to override for this request. 
     * @returns {axiosBase.AxiosResponse} The LRS's simplified response.
     */
    getStatementExact: async(id, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, PATH_STATEMENTS);
        let params = {
            statementId: id
        };
        
        try {
            return await requests.getDocuments(endpoint, params, {
                headers: headerOverrides
            });
        }
        catch (err) {
            return err.response;
        }
    },

    /**
     * POST an xAPI statement to the LRS.
     * @param {Object} statement The xAPI statement to send. 
     * @param {Object} headerOverrides Headers to override for this request. 
     * @returns {axiosBase.AxiosResponse} The LRS's simplified response.
     */
    getStatementExactPromise: async(id, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, PATH_STATEMENTS);
        let params = {
            statementId: id
        };

        return await requests.getDocuments(endpoint, params, {
            headers: headerOverrides
        });
    },

    /**
     * 
     * @returns {String} Boundary string.
     */
    generateRandomMultipartBoundary: () => {
        return `-------------__${oldHelpers.generateUUID()}__123__456`;
    },

    /**
     * Create a multipart/mixed body from a given statement + a boundary.
     * @param {Object} statement 
     * @param {string} boundary 
     * @returns 
     */
    generateSignedStatementBody: (statement, boundary) => {
        
        let multipartBoundary = (boundary || requests.generateRandomMultipartBoundary());
        let multipartBody = oldHelpers.signStatement(statement, {boundary: multipartBoundary});
        
        return multipartBody.toString();
    },
    
    /**
     * POST an xAPI statement to the LRS.
     * @param {Object} multipartBody The signed multipart body. 
     * @param {string} boundary The multipart boundary used to create this body. 
     * @param {Object} headerOverrides Headers to override for this request. 
     * @returns {axiosBase.AxiosResponse} The LRS's simplified response.
     */
    sendSignedStatementBody: async(multipartBody, boundary, headerOverrides) => {
        
        try {
            return await axios.post(endpoint, multipartBody, {
                headers: {
                    ...headerOverrides,
                    "Content-Type": `multipart/mixed; boundary=${boundary}`
                }
            });
        }
        catch (err) {
            return err.response;
        }
    },

    /**
     * POST an xAPI statement to the LRS.
     * @param {Object} statement The xAPI statement to send. 
     * @param {Object} headerOverrides Headers to override for this request. 
     * @returns {axiosBase.AxiosResponse} The LRS's simplified response.
     */
    sendStatement: async(statement, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, PATH_STATEMENTS);
        
        try {
            return await axios.post(endpoint, statement, {
                headers: headerOverrides
            });
        }
        catch (err) {
            return err.response;
        }
    },

    /**
     * POST an xAPI statement to the LRS.
     * @param {Object} statement The xAPI statement to send. 
     * @param {Object} headerOverrides Headers to override for this request. 
     */
    sendStatementPromise: async(statement, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, PATH_STATEMENTS);
        
        return axios.post(endpoint, statement, {
            headers: headerOverrides
        });
    },

    /**
     * GET an Activity from the LRS's Activity Resource endpoint.
     * @param {string} iri IRI for the Activity. 
     * @param {Object} headerOverrides Headers to override for this request. 
     * @returns {axiosBase.AxiosResponse} The LRS's simplified response.
     */
    getActivityWithIRI: async(iri, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, PATH_ACTIVITIES);
        let query = `?activityId=${encodeURIComponent(iri)}`;

        try {
            return await axios.get(endpoint + query, {
                headers: headerOverrides
            });
        }
        catch (err) {
            return err.response;
        }
    },

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
     * @returns {axiosBase.AxiosResponse} The LRS's simplified response.
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
     * @returns {axiosBase.AxiosResponse} The LRS's simplified response.
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
     * @returns {axiosBase.AxiosResponse}
     */
    getDocuments: async(resourcePath, params, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, resourcePath);
        let query = "?" + oldHelpers.getUrlEncoding(params);
        
        try {
            return await axios.get(endpoint + query, {
                headers: headerOverrides
            });
        }
        catch (err) {
            return err.response;
        }
    },
    
    /**
     * PUT a generic document to a generic resource path.
     * @param {string} resourcePath Relative path to the resource endpoint, relative to the LRS's base xAPI path. 
     * @param {any} document Document to send.
     * @param {Object} params Query parameters for the request.
     * @param {Object} headerOverrides Optional headers to override for this request.
     * @returns {axiosBase.AxiosResponse}
     */
    putDocument: async(resourcePath, document, params, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, resourcePath);
        let query = "?" + oldHelpers.getUrlEncoding(params);
        
        try {
            return await axios.put(endpoint + query, document, {
                headers: headerOverrides
            });
        }
        catch (err) {
            return err.response;
        }
    },
    
    /**
     * POST a generic document to a generic resource path.
     * @param {string} resourcePath Relative path to the resource endpoint, relative to the LRS's base xAPI path. 
     * @param {any} document Document to send.
     * @param {Object} params Query parameters for the request.
     * @param {Object} headerOverrides Optional headers to override for this request.
     * @returns {axiosBase.AxiosResponse}
     */
    postDocument: async(resourcePath, document, params, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, resourcePath);
        let query = "?" + oldHelpers.getUrlEncoding(params);

        try {
            return await axios.post(endpoint + query, document, {
                headers: headerOverrides
            });
        }
        catch (err) {
            return err.response;
        }
    },
    
    /**
     * DELETE a generic document to a generic resource path.
     * @param {string} resourcePath Relative path to the resource endpoint, relative to the LRS's base xAPI path. 
     * @param {Object} params Query parameters for the request.
     * @param {Object} headerOverrides Optional headers to override for this request.
     * @returns {axiosBase.AxiosResponse}
     */
    deleteDocument: async(resourcePath, params, headerOverrides) => {
        let endpoint = path.join(LRS_ENDPOINT, resourcePath);
        let query = "?" + oldHelpers.getUrlEncoding(params);
        
        try {
            return await axios.delete(endpoint + query, {
                headers: headerOverrides
            });
        }
        catch (err) {
            return err.response;
        }
    }
};

module.exports = requests;
