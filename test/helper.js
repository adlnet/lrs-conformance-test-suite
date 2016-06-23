/**
 * Description : This is a test suite that tests an LRS endpoint based on the testing requirements document
 * found at https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 * https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md
 *
 */
var path = require('path');
if (!process.env.EB_NODE_COMMAND) {
    (require('node-env-file'))(path.join(__dirname, './.env'));
}
(function (module, fs, extend, uuid, lodash, FormUrlencode) {

    /** Appears to use absolute path */
    var CONFIG_FOLDER = './test/' + process.env.DIRECTORY + '/configs';

    /** Appears to use relative path */
    var CONFIG_FOLDER_RELATIVE = './' + process.env.DIRECTORY + '/configs';

    /** Test directory */
    var DIRECTORY = process.env.DIRECTORY;

    /** Defines endpoint of the LRS you are testing.  Currently assumes authentication is not required */
    var LRS_ENDPOINT = process.env.LRS_ENDPOINT;

    /** Appears to use absolute path */
    var TEMPLATE_FOLDER = './test/' + process.env.DIRECTORY + '/templates';

    /** Appears to use relative path */
    var TEMPLATE_FOLDER_RELATIVE = './' + process.env.DIRECTORY + '/templates';

/* Creating a global variable to calculate the time difference between the test suite and the curent lrs endpoint for use with since and until */
    var TIME_MARGIN;// = new Date();
/* End global time variable */

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
         * Adds all headers.
         * @returns {Object}
         */
        addAllHeaders: function (header, badAuth) {
            badAuth = badAuth || false;
            var newHeader = extend(true, {}, header);
            newHeader = module.exports.addHeaderXapiVersion(newHeader);
            if (badAuth){
                newHeader['Authorization'] = 'Basic ' + new Buffer('foo:bar').toString('base64');
            }
            else{
                newHeader = module.exports.addBasicAuthenicationHeader(newHeader);
            }
            return newHeader;
        },
        /**
         * Adds xAPI header version.
         * @returns {Object}
         */
        addHeaderXapiVersion: function (header) {
            var newHeader = extend(true, {}, header);
            newHeader['X-Experience-API-Version'] = module.exports.getXapiVersion();
            return newHeader;
        },
        /**
         * Adds basic authentication.
         * @returns {Object}
         */
        addBasicAuthenicationHeader: function (header) {
            var newHeader = extend(true, {}, header);
            if (process.env.BASIC_AUTH_ENABLED === 'true') {
                var userPass = new Buffer(process.env.BASIC_AUTH_USER + ':' + process.env.BASIC_AUTH_PASSWORD).toString('base64');
                newHeader['Authorization'] = 'Basic ' + userPass;
            }
            return newHeader;
        },
        /**
         * Convert template mapping to JSON objects.  Assumes there is one key / value and templates
         * are denoted by wrapping the folder.filename (without extension) with double curly braces.
         *
         * @param {Array} list - Array list of converted string mappings to JSON
         * @returns {Object}
         */
        convertTemplate: function (list) {
            var mapper = module.exports.getJsonMapping();

            var templates = [];
            list.forEach(function (item) {
                var key = Object.keys(item)[0];
                var value = item[key];

                var object = {};
                var template;
                if (typeof value === 'string'
                    && value.indexOf('{{') === 0
                    && value.indexOf('}}') === value.length - 2) {
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
        createTestObject: function (array) {
            var from = {};

            array.reverse();
            array.forEach(function (to, index) {
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
        generateUUID: function () {
            return uuid.v4();
        },
        /**
         * Returns endpoint to web application.
         * @returns {String}
         */
        getEndpoint: function () {
            return LRS_ENDPOINT;
        },
        getEndpointAndAuth: function () {
            return LRS_ENDPOINT;
            var urlparams =  {url:LRS_ENDPOINT};

            if(global.OAUTH)
            {
                console.log(global.OAUTH);
              //  urlparams.oauth = global.OAUTH;
            }
            return urlparams;
        },
        /**
         * Returns endpoint to statements.
         * @returns {String}
         */
        getEndpointAbout: function () {
            return URL_ABOUT;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointActivities: function () {
            return URL_ACTIVITIES;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointActivitiesProfile: function () {
            return URL_ACTIVITIES_PROFILE;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointActivitiesState: function () {
            return URL_ACTIVITIES_STATE;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointAgents: function () {
            return URL_AGENTS;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointAgentsProfile: function () {
            return URL_AGENTS_PROFILE;
        },
        /**
         * Returns endpoint to activities.
         * @returns {String}
         */
        getEndpointStatements: function () {
            return URL_STATEMENTS;
        },
        /**
         * Returns Object whose keys are based on folder structure in templates folder and value is
         * a function which returns JSON data.  For example: getJsonMapping().verbs.default returns
         * the JSON data from the verbs folder in the default.json file.
         * @returns {Object}
         */
        getJsonMapping: function () {
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
        getSHA1Sum: function (content) {
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
        getTestConfiguration: function () {
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


/* Make the TIME_MARGIN available to tests */
        getTimeMargin: function () {
console.log('Welcome to the Time Margin function', TIME_MARGIN);
            if (!TIME_MARGIN) {
console.log("there was no Time Margin, but now there will be");
                module.exports.setTimeMargin();
            } else {
console.log('type something', TIME_MARGIN);
                return TIME_MARGIN;
            }
// console.log('This message is a warning - you should never see this message; however I think you are going to see this every time');
        },
/* End get time margin */

/*
Calculates the difference between the lrs time and the suite time and sets a variable for use with since and until requests.
*/

        setTimeMargin: function (done) {
            var request = require('super-request'),
            // module = require('module'),
            fs = require('fs'),
            extend = require('extend'),
            moment = require('moment'),
            requestPromise = require('supertest-as-promised'),
            chai = require('chai'),
            Joi = require('joi'),
            multipartParser = require('./multipartParser'),
            temp = [{statement: '{{statements.default}}'}],
            stmt,
            id = module.exports.generateUUID(),
            query = module.exports.getUrlEncoding({
                statementId: id
            }),
            lrsTime,
            suiteTime;
            stmt = module.exports.createTestObject(module.exports.convertTemplate(temp)).statement;
            stmt.id = id;
            suiteTime = new Date();

            console.log("Pineapple", stmt);
            request(module.exports.getEndpointAndAuth())
            .post(module.exports.getEndpointStatements())
            // .post(module.exports.getEndpointAbout())
            .headers(module.exports.addAllHeaders({}))
            .json(stmt)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log("there has been a mistake", err);
                    // dolog('there has been a mistake', err);
                    return err;
                    // done(err);
                } else {
                    console.log("we have passed the post with flying colors", res.body, 'id', stmt.id);
                    // dolog("Yay, we passed", res.body);
                    console.log("and take a quick look at the query before we use it", query);
                    request(module.exports.getEndpointAndAuth())
                    .get(module.exports.getEndpointStatements() + '?' + query)
                    // .get(module.exports.getEndpointStatements())
                    .headers(module.exports.addAllHeaders({}))
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return err;
                            console.log('Almost there', err);
                            // done(err);
                        } else {
                            console.log("This is a string", res.body);
                            lrsTime = new Date(res.headers.date);
                            TIME_MARGIN = suiteTime - lrsTime;
                            console.log("how bout this!!", lrsTime, suiteTime, TIME_MARGIN);
                            return TIME_MARGIN;
                            // done(err, lrsTime - suiteTime);
                        }
                    });
                }
            });
        },
/* End set time margin function */

        /**
         * Returns query string (does not work for Date object which needs toISOString()).
         * @returns {String}
         */
        getUrlEncoding: function (object) {
            var encoding = '';
            Object.keys(object).forEach(function (key, index) {
                if (index !== 0) {
                    encoding += '&';
                }
                var value = object[key];
                encoding += key + '=' + (typeof value === 'object' ? encodeURIComponent(JSON.stringify(value)) : value);
            });
            return encoding;
        },
        /**
         * Returns xAPI version.
         * @returns {String}
         */
        getXapiVersion: function() {
            return XAPI_VERSION;
        },
        /**
         * Performs deep compare of JSON original / other parameters to determine equivalence.
         * @param {json} original - JSON object
         * @param {other} other - JSON object
         * @returns {boolean}
         */
        isEqual: function (original, other) {
            return lodash.isEqual(original, other);
        },
        /**
         * Returns a string of a form encoded content with headers.
         * @param content content to encode
         * @returns {*}
         */
        buildFormBody: function (content, id) {
            var body = {
                'X-Experience-API-Version': '1.0.2',
                'Content-Type': 'application/json',
                'content': JSON.stringify(content)
            }
            if (id) {
                body.statementId = id;
            }
            return FormUrlencode.encode(body);
        },
        /**
         * Returns an example Activity params.
         * @returns {string}
         */
        buildActivity: function () {
            return {
                activityId: 'http://www.example.com/activityId/hashset'
            };
        },
        /**
         * Returns an example State params.
         * @returns {json} state
         */
        buildState: function () {
            return {
                activityId: 'http://www.example.com/activityId/hashset',
                agent: {
                    "objectType": "Agent",
                    "account": {
                        "homePage": "http://www.example.com/agentId/1",
                        "name": "Rick James"
                    }
                },
                stateId: this.generateUUID()
            }
        },
        /**
         * Returns an example ActivityProfile params.
         * @returns {json} activity profile
         */
        buildActivityProfile: function () {
            return {
                activityId: 'http://www.example.com/activityId/hashset',
                profileId: this.generateUUID()
            };
        },
        /**
         * Returns an example AgentProfile.
         * @returns {json} agent profile
         */
        buildAgentProfile: function () {
            return {
                agent: {
                    "objectType": "Agent",
                    "account": {
                        "homePage": "http://www.example.com/agentId/1",
                        "name": "Rick James"
                    }
                },
                profileId: this.generateUUID()
            };
        },
        /**
         * Returns an example Agent params.
         * @returns {json} agent
         */
        buildAgent: function () {
            return {
                "agent": {
                    "name": "Rick James",
                    "objectType": "Agent",
                    "account": {
                        "homePage": "http://www.example.com/agentId/1",
                        "name": "Rick James"
                    }
                }
            };
        },
        /**
         * Return sample document.
         * @returns {json} document
         */
        buildDocument: function () {
            var document = {
                name: this.generateUUID(),
                location: {
                    name: this.generateUUID()
                }
            };
            document[this.generateUUID()] = this.generateUUID();
            return document;
        },
        /**
         * Return sample statement.
         * @returns {object} statement
         */
        buildStatement: function () {
            return module.exports.clone(require('./' + DIRECTORY + '/templates/statements/default.json'));
        },
        /**
         * Deep clone object.
         * @param obj
         * @returns {*}
         */
        clone: function (obj) {
            return JSON.parse(JSON.stringify(obj));
        },

        //a wrapper for the super-test suite that deals the oauth
        //the request module deep under the hood can do the signing, but we need to access it.
        //because of the chaining of methods, this can get a bit tricky.
        OAuthRequest : function(request)
        {

            //back up the original
            var originalRequest = request;

            //a new request constructor
            function authRequest(e) {

                //call the original constructor
                var r = originalRequest(e);

                //wrap a promise that returns a new test, so that calling .end() does not return a promise to a new request
                //but a promise to a new wrapped request.

                //The meta-ness here has grown stupidly complex... maybe better just to patch the underlying library instead of
                //writing code that changes the basic structure of other code at runtime....
                function wrapPromise(p)
                {
                    if(p.__wrapped === true) return;
                    p.__wrapped = true;
                    for (var i in p) {
                        //little closure to keep the i var in scope
                        (function(i) {
                            //for all functions in the object, if they return a test, wrap the test
                            if(typeof p[i] !== "function") return;
                            p[i+'_preAuth_']= p[i];
                            p[i] = function (url) {
                                var test = p[i+'_preAuth_'].apply(p,arguments);
                                if(test)
                                {
                                    if(i == "end")
                                    {
                                        wrapPromise(test);
                                    }else
                                    {
                                        wrapMethods(test);
                                    }
                                }
                                return test;
                            };
                        })(i)
                    }
                }
                //for every method that returns a Test, wrap all the methods
                function wrapMethods(r) {
                    if(r.__wrapped === true) return;
                    r.__wrapped = true;
                    if(r._options)
                        r._options.oauth = global.OAUTH
                    for (var i in r) {
                        //little closure to keep the i var in scope
                        (function(i) {
                            //for all functions in the object
                            if(typeof r[i] !== "function") return;

                            //back up the original
                            r["_preAuth_" + i] = r[i];


                            r[i] = function() {
                            //calls the original function
                            var test = r["_preAuth_" + i].apply(r, arguments);
                            //then checks that the original function returned a Test with an options structure
                            //that we had not touched before
                            //NOTE: some of the functions return the `this`, so we need to prevent infinite
                            //recursion. Currently, checking to see if we already set the oauth values prevents it.
                            if(test && test._options && !test._options.oauth)
                            {
                                //since this is a new Test, it has a new Request inside, that needs to be set up
                                //set the oauth values so the underlying request library can sign the http
                                test._options.oauth = global.OAUTH;

                                //if this object retuned a new Test that we have not seen before, then we need to
                                //wrap all its methods, so that when chainin method calls, each object in the chain sets
                                //up the oauth on the next
                                wrapMethods(test);
                                return test;
                            }
                            //the .end call works differently. The above if block won't catch it because it does not have a
                            //_options member. Thats because it does not return a test, but a promise to a new test. The promise
                            //has the same interface, but queues up and does not fire until the first request finishes. This requires
                            //different wrapping logic.
                            if(i == 'end')
                            {
                                wrapPromise(test);
                            }

                            return test;
                        }


                        })(i) // call the closure with the current i

                    }
                }

                //wrap all the methods of the test given by the original constructor
                wrapMethods(r,e);

                //Ok, now we have a new object that has the auth set, and whos methods return Tests that have the auth set, and whos
                //methods return Tests that have the auth set, and whos
                //methods return Tests that have the auth set, and whos
                //methods return Tests that have the auth set, and whos
                //methods return Test.....
                return r;
            }
            //return the new constructor
            return authRequest;

        }

    };

    function createMapping(mapper, string) {
        var object = {};

        var nested = mapper;
        var cleanString = string.substring(2);
        cleanString = cleanString.substring(0, cleanString.length - 2);
        var mapping = cleanString.split('.');
        mapping.forEach(function (item) {
            nested = nested[item];
            if (nested) {
                object = nested;
            } else {
                throw (new Error('Not mapped: ' + string));
            }
        });
        return object;
    }


    function validateConfiguration(configurations, location) {
        configurations.forEach(function (configuration) {
            if (!configuration.name) {
                throw (new Error('Invalid configuration "missing name": ' + location));
                return false;
            } else if (!Array.isArray(configuration.config)) {
                throw (new Error('Invalid configuration "config not array": ' + location));
            }
        });
    }
}(module, require('fs'), require('extend'), require('node-uuid'), require('lodash-node'), require('form-urlencoded')));
