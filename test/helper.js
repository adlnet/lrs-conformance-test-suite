/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * Created by fwhorton on 2/20/15.
 * Riptide Software
 */
var path = require('path');
if (!process.env.EB_NODE_COMMAND) {
    (require('node-env-file'))(path.join(__dirname, './.env'));
}
(function(module, fs, extend, uuid, lodash) {

    /** Appears to use absolute path */
    var CONFIG_FOLDER = './test/v1_0_2/configs';

    /** Appears to use relative path */
    var CONFIG_FOLDER_RELATIVE = './v1_0_2/configs';

    /** Defines endpoint of the LRS you are testing.  Currently assumes authentication is not required */
    var LRS_ENDPOINT = process.env.LRS_ENDPOINT;

    /** Appears to use absolute path */
    var TEMPLATE_FOLDER = './test/v1_0_2/templates';

    /** Appears to use relative path */
    var TEMPLATE_FOLDER_RELATIVE = './v1_0_2/templates';

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
         * Adds xAPI header version.
         * @returns {String}
         */
        addHeaderXapiVersion: function(header) {
            var newHeader = extend(true, {}, header);
            newHeader['X-Experience-API-Version'] = XAPI_VERSION;
            return newHeader;
        },
        /**
         * Convert template mapping to JSON objects.  Assumes there is one key / value and templates
         * are denoted by wrapping the folder.filename (without extension) with double curly braces.
         *
         * @param {Array} list - Array list of converted string mappings to JSON
         * @returns {Object}
         */
        convertTemplate: function(list) {
            var mapper = module.exports.getJsonMapping();

            var templates = []
            list.forEach(function (item) {
                var key = Object.keys(item)[0];
                var value = item[key];

                var object = {};
                var template;
                if (typeof value === 'string'
                    && value.indexOf('{{') === 0
                    && value.indexOf('}}') === value.length -2) {
                    // if value appears to be template mapping '{{...}}'
                    template = createMapping(mapper, item[key]);
                    object[key] = template;
                    templates.push(object);
                } else {
                    templates.push(item);
                }
            });
            return templates;
        },
        /**
         * Iterates through array of objects.  Each value in array needs to be a JSON
         * object with one key / value.  This will merge all JSONs into one object
         * and return the result.
         *
         * Using example below:
         * Index 0 has a key (statement) with value (statement).
         * Index 1 (context) object is merged into Index 0 (statement) value.
         * Index 2 (team) object is merged into Index 1 (context) value.
         *
         * var array = [
         *   { statement: '{{statements.authority}}' },
         *   { context: '{{contexts.team}}' },
         *   {
         *     team: {
         *       attribute: {
         *         'key': 'value'
         *       }
         *     }
         *   }
         * ];
         * @param {Array} array - Array of objects with on key / value.
         * @returns {Object}
         */
        createTestObject: function(array) {
            var from = {};

            array.reverse();
            array.forEach(function(to, index) {
                if (index === 0) {
                    from = to;
                    return;
                }

                var toKey = to[Object.keys(to)[0]];
                extend(true, toKey, from);
                from = to;
            });
            return from;
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
         * Returns Object whose keys are based on folder structure in templates folder and value is
         * a function which returns JSON data.  For example: getJsonMapping().verbs.default returns
         * the JSON data from the verbs folder in the default.json file.
         * @returns {Object}
         */
        getJsonMapping: function() {
            var mapping = {};

            var folders = fs.readdirSync(TEMPLATE_FOLDER);
            folders.forEach(function (folder) {
                var fileMapping = {};
                mapping[folder] = fileMapping;

                var files = fs.readdirSync(TEMPLATE_FOLDER + '/' + folder);
                files.forEach(function (file) {
                    if (file.indexOf('.json') <= 0) {
                        return;
                    }

                    // This would allow us to select an Agent, modify it, then
                    // select the Agent again and not worry about it being modified
                    var subfolder = TEMPLATE_FOLDER_RELATIVE + '/' + folder;
                    var data = extend(true, {}, require(subfolder + '/' + file));
                    var name = file.substring(0, file.indexOf('.json'));
                    fileMapping[name] = data;
                });
            });
            return mapping;
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
         * Creates test configuration object which combines all configurations into a single object
         * which will be iterated over to run tests dynamically.
         */
        getTestConfiguration: function() {
            var list = [];

            var files = fs.readdirSync(CONFIG_FOLDER);
            files.forEach(function (file) {
                if (file.indexOf('.js') <= 0) {
                    return;
                }

                var configFile = require(CONFIG_FOLDER_RELATIVE + '/' + file);
                var config = configFile.config();
                validateConfiguration(config, '/' + file);

               list = list.concat(config);
            });
            return list;
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

    function createMapping(mapper, string) {
        var object = {};

        var nested = mapper;
        var cleanString = string.substring(2);
        cleanString = cleanString.substring(0, cleanString.length-2);
        var mapping = cleanString.split('.');
        mapping.forEach(function (item) {
            nested = nested[item];
            if (nested) {
                object = nested;
            } else {
                throw (new Error('Not mapped: ' + string));
            }
        })
        return object;
    }

    function validateConfiguration(configurations, location) {
        configurations.forEach(function (configuration) {
            if (!configuration.name) {
                throw (new Error('Invalid configuration "missing name": ' + location));
                return false;
            } else if (!Array.isArray(configuration.config)){
                throw (new Error('Invalid configuration "config not array": ' + location));
            }
        });
    };
}(module, require('fs'), require('extend'), require('node-uuid'), require('lodash-node')));