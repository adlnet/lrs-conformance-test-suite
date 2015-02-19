var path = require('path');
if (!process.env.EB_NODE_COMMAND) {
    (require('node-env-file'))(path.join(__dirname, '.env'));
}
(function(module, uuid, deepcopy, chai, lodash) {

    /** Defines endpoint of the LRS you are testing.  Currently assumes authentication is not required */
    var LRS_ENDPOINT = process.env.LRS_ENDPOINT;

    /** Endpoint About */
    var URL_ABOUT = '/about';

    /** Endpoint Activities */
    var URL_ACTIVITIES = '/activities';

    /** Endpoint Activities Profile */
    var URL_ACTIVITIES_PROFILE = '/activities/profile';

    /** Endpoint Activities State */
    var URL_ACTIVITIES_STATE = '/activities/state';

    /** Endpoint Agents */
    var URL_AGENTS = '/agents';

    /** Endpoint Agents Profile */
    var URL_AGENTS_PROFILE = '/agents/profile';

    /** Endpoint Statements */
    var URL_STATEMENTS = '/statements';

    /** HTTP header xAPI Version */
    var XAPI_VERSION = process.env.XAPI_VERSION;

    module.exports = {
        /**
         * Returns endpoint to web application.
         * @returns {String}
         */
        getEndpoint: function() {
            return LRS_ENDPOINT;
        },
        /**
         * Returns endpoint to statements.
         * @returns {String}
         */
        getEndpointAbout: function() {
            return URL_ABOUT;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointActivities: function() {
            return URL_ACTIVITIES;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointActivitiesProfile: function() {
            return URL_ACTIVITIES_PROFILE;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointActivitiesState: function() {
            return URL_ACTIVITIES_STATE;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointAgents: function() {
            return URL_AGENTS;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointAgentsProfile: function() {
            return URL_AGENTS_PROFILE;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointStatements: function() {
            return URL_STATEMENTS;
        },
        /**
         * Adds xAPI header version.
         * @returns {String}
         */
        addHeaderXapiVersion: function(header) {
            var newHeader = module.exports.clone(header);
            newHeader['X-Experience-API-Version'] = XAPI_VERSION;
            return newHeader;
        },
        /**
         * Receives and object and returns a new object with same structure and values.  In turn,
         * we can modify the cloned JSON without affecting original JSON.
         * @param {json} - JSON object
         * @returns {json}
         */
        clone: function(json) {
            return deepcopy(json);
        },
        /**
         * Generates an RFC4122 compliant uuid.
         * http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
         * @returns {String}
         */
        generateUUID: function() {
            return uuid.v4();
        },
        /**
         * Returns Chai expect.
         * @returns {Function}
         */
        getExpect: function() {
            chai.use(require('dirty-chai'));
            chai.use(require('chai-as-promised'));
            chai.config.includeStack = true;
            return chai.expect;
        },
        /**
         * Generates a SHA1 hash enclosed within quotes.
         *
         * @param content
         * @returns {string}
         */
        getSHA1Sum: function(content) {
            if (typeof content !== 'string') {
                content = JSON.stringify(content);
            }

            var shasum = crypto.createHash('sha1');
            shasum.update(new Buffer(content));
            return shasum.digest('hex');
        },
        /**
         * Performs deep compare of JSON original / other parameters to determine equivalence.
         * @param {json} original - JSON object
         * @param {other} other - JSON object
         * @returns {boolean}
         */
        isEqual: function(original, other) {
            return lodash.isEqual(original, other);
        }
    };
}(module, require('node-uuid'), require('deepcopy'), require('chai'), require('lodash-node')));