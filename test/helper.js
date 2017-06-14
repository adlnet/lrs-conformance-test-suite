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
(function (module, fs, extend, uuid, lodash, FormUrlencode, jws, crypto) {


    var oauth;
    if (global.OAUTH) {
        var OAuth = require('oauth');

        oauth = new OAuth.OAuth(
            "",
            "",
            global.OAUTH.consumer_key,
            global.OAUTH.consumer_secret,
            '1.0',
            null,
            'HMAC-SHA1'
        );
    }

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
    var TIME_MARGIN;

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
    var XAPI_VERSION = '1.0.3';

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
         *
         */
        createFromTemplate: (templates) => {
            // convert template mapping to JSON objects
            var converted = module.exports.convertTemplate(templates);
            // this handles if no override
            var mockObject = module.exports.createTestObject(converted);
            return mockObject;
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
        deepSearchObject: function(object, primitive)
        {
            var tested = [];

            var _internal = function(object, primitive)
            {
                tested.push(object);
                var found = false;
                for(var i in object)
                {
                    if(object[i] == primitive)
                        return true;
                    else
                    {
                        if(typeof object[i] == 'object' && tested.indexOf(object[i]))
                            found = found || _internal(object[i],primitive)
                    }
                }
                return found;
            }
            return _internal(object, primitive);
        },
        /**
         * Delays to check for "X-Experience-API-Consistent-Through" header.
         *
         * @param {Number} time - Date value to check aginst determine if we have delayed long enough for the LRS to process any requests we will be using in a given test
         * @param {String} query - parameter to limit the size of get requests to the information we are looking for
         * @param {String} id - check aginst to see if we are able to get the information we are looking for
         */
        genDelay: function (time, query, id)
        {
            // console.log("Checking LRS for Consistency");
            var comb = require('comb'),
                request = require('super-request');

            var delay = function(val)
            {
                var p = new comb.Promise();
                var endP = module.exports.getEndpointStatements();
                if (query) {
                    endP += query;
                }
                var delta, finish;

                function doRequest()
                {
                    if(global.OAUTH)
                        request = module.exports.OAuthRequest(request);
                    var result;
                    request(module.exports.getEndpointAndAuth())
                    .get(endP)
                    .headers(module.exports.addAllHeaders({}))
                    //we don't expect anything, we just want a response
                    .end(function(err, res)
                    {
                        if (err) {
                        //if there was an error, we quit and go home
                            throw err;
                        } else {
                            try {
                            //we parse the result into either a single statement or a statements object
                                result = JSON.parse(res.body);
                            } catch (e) {
                                result = {};
                            }
                            if (id && result.id && (result.id === id)) {
                            //if we find a single statement and the id we are looking for, then we're good we can continue with the testing
                                p.resolve();
                            } else if (id && result.statements && stmtFound(result.statements, id)) {
                            //if we find a block of statements and the id we are looking for, then we're good and we can continue with the testing
                                p.resolve();
                            } else if ((new Date(res.headers['x-experience-api-consistent-through'])).valueOf() + module.exports.getTimeMargin() >= time) {
                            //if the desired statement has not been found, we check the con-thru header to find if the lrs is up to date and we should move on
                                p.resolve();
                            } else {
                            //otherwise we give the lrs a second to catch up and try again
                                if (!delta) {
                                    // first time only - we use the provided headers to calculate a maximum wait time
                                    delta = new Date(res.headers.date).valueOf() - new Date(res.headers['x-experience-api-consistent-through']).valueOf();
                                    finish = Date.now() + 10 * Math.abs(delta);

                                    if (isNaN(finish)) {
                                        throw new TypeError("X-Experience-API-Consistent-Through header was missing or not a number.");
                                    }
                                }

                                if (Date.now() >= finish) {
                                //    console.log('Exceeded the maximum time limit (' + delta * 10 + ')- continue test');
                                    p.resolve()
                                } else //must be careful to never restart this timer if the promise is resolved;
                                    setTimeout(doRequest, 1000);
                            }
                        }
                    });
                }
                doRequest();
                return p;
            }
            return delay();

            function stmtFound (arr, id) {
                var found = false;
                arr.forEach (function (s) {
                    if (s.id === id) {
                        found = true;
                    }
                });
                //if (!found) console.log(id, 'Not found - please continue');
                return found;
            }
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
        /**
         * Creates test configuration object from one configuration file
         *
         */
        getSingleTestConfiguration: function (fileName) {
            var files = fs.readdirSync(CONFIG_FOLDER);
            var fileExists = false;
            files.forEach(function(file){
                if (file === fileName)
                    fileExists = true;
            });

            if (!fileExists) {
                throw (new Error('Invalid configuration "missing name": ' + fileName));
                return false;
            }

            var configFile = require(CONFIG_FOLDER_RELATIVE + '/' + fileName);
            var config = configFile.config();

            return config;
        },
        /**
         * Make the TIME_MARGIN available to tests
         * @returns {integer}
        */
        getTimeMargin: function () {
                return TIME_MARGIN;
        },
        /**
         * Sends an HTTP request using supertest
         * @param {string} type ex. GET, POST, PUT, DELETE and HEAD
         * @param {string} url url to send request too
         * @param {json} params query params to append onto url. Params get urlencoded
         * @param body
         * @param {number} expect the result of the request
         * @returns {*} promise
         */
        sendRequest: function (type, url, params, body, expect) {
            var request = require('supertest-as-promised');
            request = request(module.exports.getEndpointAndAuth())
            var reqUrl = params ? (url + '?' + module.exports.getUrlEncoding(params)) : url;

            var headers = module.exports.addAllHeaders({});
            var pre = request[type](reqUrl);
            //Add the .sign function to the request
            module.exports.extendRequestWithOauth(pre);
            if (body) {
                pre.send(body);
            }
            pre.set('X-Experience-API-Version', headers['X-Experience-API-Version']);
            if (process.env.BASIC_AUTH_ENABLED === 'true') {
                pre.set('Authorization', headers['Authorization']);
            }
            //If we're doing oauth, set it up!
            try {
                if (global.OAUTH) {
                    pre.sign(oauth, global.OAUTH.token, global.OAUTH.token_secret)
                }
            } catch (e) {
                console.log(e);
            }
            return pre.expect(expect);
        },
        //extend the super-test-as-promised with a function to write the oauth headers
         extendRequestWithOauth: function(pre)
        {
            //the sign functions
            pre.sign = function(oa, token, secret) {
                var additionalData = {}; //TODO: deal with body params that need to be encoded into the hash (when the data is a form....)
                additionalData = JSON.parse(JSON.stringify(additionalData));
                additionalData['oauth_verifier'] = global.OAUTH.verifier; //Not sure why the lib does not do is, is required. Jam the verifier in
                var params = oa._prepareParameters(
                    token, secret, pre.method, pre.url, additionalData // XXX: what if there's query and body? merge?
                );

                //Never is Echo, I think?
                var header = oa._isEcho ? 'X-Verify-Credentials-Authorization' : 'Authorization';
                var signature = oa._buildAuthorizationHeaders(params);
                //Set the auth header
                pre.set('Authorization', signature);
            }
        },
        /*
         * Calculates the difference between the lrs time and the suite time and sets a variable for use with since and until requests.
         * Now will repeat the GET request every 2 seconds until it receives a 200 or times out at 15 seconds.
        */
        setTimeMargin: function (done) {
            var request = require('super-request'),
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

            if(global.OAUTH)
                request = module.exports.OAuthRequest(request);

            request(module.exports.getEndpointAndAuth())
            .post(module.exports.getEndpointStatements())
            .headers(module.exports.addAllHeaders({}))
            .json(stmt)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    function redo () {
                        request(module.exports.getEndpointAndAuth())
                        .get(module.exports.getEndpointStatements() + '?' + query)
                        .headers(module.exports.addAllHeaders({}))
                        .end(function (err, res) {
                            if (err) {
                                done(err);
                            } else if (res.statusCode === 200){
                                var result = JSON.parse(res.body);
                                lrsTime = new Date(result.stored);
                                TIME_MARGIN = suiteTime - lrsTime;
                                done(err, TIME_MARGIN);
                            } else {
                                setTimeout(redo, 2000);
                            }
                        });
                    } redo();
                }
            });
        },
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
                'X-Experience-API-Version': '1.0.3',
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

        },
        /**
         *
         */
        parse: function(string, done) {
            var parsed;
            try {
                parsed = JSON.parse(string);
            } catch (error) {
                done(error);
            }
            return parsed;
        },
        // return a buffer containing the statement and signature in multipart format
        signStatement: function(statement, options)
        {
            options = options || {};
            options.privateKey = options.privateKey || [
                '-----BEGIN RSA PRIVATE KEY-----',
                'MIIEpAIBAAKCAQEAvZtrkWAFrUYi8zekTKheDM7tvfNIB7FVbLtkPArlFMQE1kOe',
                '8sBEvENiMKvI8kv1jLuzbd/iSWd1Wqt81ooDAMwcv54b26w0qyk58vKv+ZgNzvUZ',
                'XtpFS3euLcOVPZUyc7O4gMLtDNblNehplFMNUFvd8Yc2jKOi9/URyIHOVzJwhKU0',
                '63CY6S8MEbTjHdhcYa3TpeFFtL8YKoCxR2h4OCtbMe0ub2tOIwZ4jKNhQQ1/N6SJ',
                'VV4gNmq6WVLfRtLDop72r5o8UZyPBwN9S3CxGBPMI2dBFC7waQwQ8zyvL6Kp2ZuA',
                'Q2clHQzGTsDpREGNqzXDdgkUN0bOGJn/JRgU3QIDAQABAoIBABdJbFepdGkIkShP',
                '8CTeFNb73yUSKQmQ1Q4Koc/iAqqfPHzYR0BHLun0WK3jm0Vu4NSNBQd8lL0xMK+X',
                'Gjj7ME07xFggYgmDx+AxqwVUmxpLe36siZYltpcDNug1+jFbDpw5OXLO/fAywGnz',
                'hmwKGzuAXOzaD3AMdOqBNdLrZl09BUlorhugmrXJbJebo/q3f6yxUbjanR70UpMs',
                'youqDH7JEV6FjFofLj32RQWWtkTlOEjQ5QE353v22HEZXvyDuwr50cAGtRS4Sqjw',
                'vXCGoBwJIHX75P5PN+MY3IBo3pjaKHZlNnQDnX7FQw/nxbAObWLEAj8IGlocNsWK',
                'F5QKnp0CgYEA8mJcGK6EotykzX8aBCrka2K7p9l4AVBHnzXNniVCh0OhdrdzcDQO',
                'hbbAm0uM+cIwnPrORY2DhG5hO8vxtsfojI/dFVUiJWXE1D4WDqJ65HdHMNKWu4SR',
                'vf1OHk3bliif5dTvmNOGt0G/Ypu1OkDvQ3zs0VIyM44TWVP+O5nsbxsCgYEAyEIX',
                'gnM460EsYBABZGRrKqcRhI+vNSPCxTV5nJS5MbdDkPiV9VQ3l0+p7IZ2jk91ISWt',
                'VlHLw9QMiOQF1776xJV7J30fSTk2fzz4znLjpnDcflZuyPtElNkQfr1A0LYTCjn8',
                'wfaZ7sA2RbvMHjWaD13qpKEkBlfjkLNn+zLPM2cCgYEAxDSg7o3e6mMHuR1pNvRt',
                'oQv0cgQVI6MTxyprftgUiaBShOItvSc2lkEAmvVGcisi5QAVl7HdQ4eCiEAoM1iR',
                'w671PT6D/JfsBA8aFdCrAGQZqcjeoX7H5260HM3TsjLCdO6w4Rphk9jSDwWSZ0yH',
                'Ii9vGGacIqWgvg/C3gZUoP8CgYBfOSYqrpVjMENkjlfLIADhcD3hNd2PPCjyU2I3',
                'dXS2Ujl7pujPljM07PmU8b9QHjJJB7xrrkthG+S19w9cLoDZl2bPOSz2SZFDYX/B',
                '01mynDoMjRby1KAg0zKHwYAffmSBWV9578P0hkuITytZNg3CvtrDW6hgp8wa02Rf',
                'SyLBgwKBgQCl73rjxN9B55tdKdQUkXSAaYYebYzuDOa9vRcTOW5nbWf21ehUUKlU',
                'w/F6uHl5okTfASEGn8BFQwBnA/npUbbKzz2wIAiPnjC96RIzU7G5fJFjWRMURQi/',
                'Ibbd1wXGedfy4A7+S+Swn2B2fwuBUL0BUkUrqYPvK5X8IZUnM/30RQ==',
                '-----END RSA PRIVATE KEY-----'
            ].join('\n');
            options.algorithm = options.algorithm || 'RS256';
            options.boundary = options.boundary || '-------------'+Math.floor(Math.random() * 0xffffffff);
            options.attachmentInfo = options.attachmentInfo || {};
            options.attachmentInfo.usageType = options.attachmentInfo.usageType || 'http://adlnet.gov/expapi/attachments/signature';
            options.attachmentInfo.contentType = options.attachmentInfo.contentType || 'application/octet-stream';
            options.breakJson = options.breakJson || false;

            // remove any attachments, they're not part of the statement
            delete statement.attachments;



            // sign statement
            var sig = jws.sign({
                header: {'alg': options.algorithm},
                payload: options.breakJson ? JSON.stringify(statement).replace('"', "'") : statement,
                privateKey: options.privateKey
            });
            sig = new Buffer(sig);

            // attach metadata
            statement.attachments = [{
                "usageType": options.attachmentInfo.usageType,
                "display": { "en-US": "Signed by the Test Suite" },
                "description": { "en-US": "Signed by the Test Suite" },
                "contentType": options.attachmentInfo.contentType,
                "length": sig.byteLength,
                "sha2": crypto.createHash('SHA256').update(sig).digest('hex')
            }];

            // build body
            var buffers = [];

            // statement headers
            buffers.push( new Buffer([
                '',
                '--'+options.boundary,
                'Content-Type:application/json',
                '',
                ''
                ].join('\r\n')) );

            // statement
            buffers.push( new Buffer(JSON.stringify(statement), 'utf8') );

            // attachment headers
            buffers.push( new Buffer([
                '',
                '--'+options.boundary,
                'Content-Type:'+statement.attachments[0].contentType,
                'Content-Transfer-Encoding:binary',
                'X-Experience-API-Hash:'+statement.attachments[0].sha2,
                '',
                ''
                ].join('\r\n')) );

            // attachment
            buffers.push( sig );

            // post-amble
            buffers.push( new Buffer(`\r\n--${options.boundary}--`) );

            // combine buffers into body
            var body = Buffer.concat(buffers, buffers.reduce(((s,b) => s+b.byteLength), 0));

            // return a buffer containing the statement and signature in multipart format
            return body;
        },
        verifyStatement: function(statement)
        {
            var publicKey = [
                '-----BEGIN PUBLIC KEY-----',
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvZtrkWAFrUYi8zekTKhe',
                'DM7tvfNIB7FVbLtkPArlFMQE1kOe8sBEvENiMKvI8kv1jLuzbd/iSWd1Wqt81ooD',
                'AMwcv54b26w0qyk58vKv+ZgNzvUZXtpFS3euLcOVPZUyc7O4gMLtDNblNehplFMN',
                'UFvd8Yc2jKOi9/URyIHOVzJwhKU063CY6S8MEbTjHdhcYa3TpeFFtL8YKoCxR2h4',
                'OCtbMe0ub2tOIwZ4jKNhQQ1/N6SJVV4gNmq6WVLfRtLDop72r5o8UZyPBwN9S3Cx',
                'GBPMI2dBFC7waQwQ8zyvL6Kp2ZuAQ2clHQzGTsDpREGNqzXDdgkUN0bOGJn/JRgU',
                '3QIDAQAB',
                '-----END PUBLIC KEY-----'
            ].join('\n');
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
}(module, require('fs'), require('extend'), require('node-uuid'), require('lodash-node'), require('form-urlencoded'), require('jws'), require('crypto')));
