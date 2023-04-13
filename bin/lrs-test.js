#!/usr/bin/env node

const specConfig = require('../specConfig');

/**
 * Description : This is the command line interface for running the lrs conformance test suite.
 *
 */
(function (process, require, program, exit, packageJson, Q, Joi, fs, path, Mocha) {
    'use strict';

    function processMessageReporter(p) {
        return function(runner) {
            runner.on('test', function(test) {
                p.postMessage("test start", test.title);
            })
            runner.on('test end', function(test) {
                p.postMessage("test end", test.title);
            })
            runner.on('pass', function(test) {
                p.postMessage("test pass", test.title);
            })
            runner.on('fail', function(test, err) {
                p.postMessage("test fail", {title:test.title,message:err.toString()});
            })
            runner.on('end', function() {
                p.postMessage("end", 'All done');
            });
            runner.on('pending', function(test) {
                p.postMessage("pending", test.title);
            });
            runner.on('start', function() {
                p.postMessage("start", runner.total);
            });
            runner.on('suite', function(suite) {
                p.postMessage("suite start", suite.title);
            });
            runner.on('suite end', function(suite) {
                p.postMessage('suite end', suite.title);
            });
        }
    }

    function runTests(_options) {
        var optionsValidator = Joi.object({
            xapiVersion: Joi.string(),
            directory: Joi.array().items(Joi.string()),
            /* See [RFC-3986](http://tools.ietf.org/html/rfc3986#page-17) */
            endpoint: Joi.string().regex(/^[a-zA-Z][a-zA-Z0-9+\.-]*:.+/, 'URI').required(),
            grep: Joi.string(),
            optional: Joi.array().items(Joi.string().required()),
            basicAuth: Joi.any(true, false),
            oAuth1: Joi.any(true, false),
            authUser: Joi.string().when('basicAuth', {
                is: 'true',
                then: Joi.required()
            }),
            authPass: Joi.string().when('basicAuth', {
                is: 'true',
                then: Joi.required()
            }),
            consumer_key: Joi.string().when('oAuth1', {
                is: 'true',
                then: Joi.required()
            }),
            consumer_secret: Joi.string().when('oAuth1', {
                is: 'true',
                then: Joi.required()
            }),
            token: Joi.string().when('oAuth1', {
                is: 'true',
                then: Joi.required()
            }),
            token_secret: Joi.string().when('oAuth1', {
                is: 'true',
                then: Joi.required()
            }),
            verifier: Joi.string().when('oAuth1', {
                is: 'true',
                then: Joi.required()
            }),
            reporter: Joi.string().regex(/^((dot)|(spec)|(nyan)|(tap)|(List)|(progress)|(min)|(doc))$/).default('nyan'),
            bail: Joi.boolean(),
            errors: Joi.boolean()
        }).unknown(false);

        var validOptions = Joi.validate(_options, optionsValidator);
        if (validOptions.error) {
            process.postMessage("log", "Options not valid " + validOptions.error);
            process.exit();
        }

        let endpointSpecified = _options.endpoint != undefined;
        let versionSpecified = _options.xapiVersion != undefined;

        let directorySpecified = Array.isArray(_options.directory) && _options.directory.length > 0;
        let defaultDirectory = specConfig.specToFolder[specConfig.defaultVersion];

        if (!endpointSpecified) {
            console.error(`You must specify an endpoint (-e or --endpoint) for your LRS.`); 
            console.error(`LRS endpoints typically have the form: https://lrs.net/xapi.`); 
            process.exit(1);
        }

        if (versionSpecified && directorySpecified) {
            console.error(`Cannot specify both an xAPI Version and a Directory.`); 
            process.exit(1);
        }

        // Set up a directory based on whether or not we provided an xAPI version
        if (versionSpecified) {
            let versionFolder = specConfig.specToFolder[_options.xapiVersion];
            if (versionFolder != undefined)
                _options.directory = [versionFolder];

            else {
                console.error(`Unknown version of the xAPI spec: ${_options.xapiVersion}.  Unable to find appropriate test suite.`); 
                process.exit(1);
            }
        }

        else if (directorySpecified) {
            let matchingSpec = undefined;
            for (let dir of _options.directory) {
                let spec = specConfig.getSpecFromFolder(dir);
                if (spec != matchingSpec) {
                    if (matchingSpec == undefined)
                        matchingSpec = spec;
                    else {
                        console.error(`Multiple directories specified which refer to different versions of the xAPI spec: ${spec} vs. ${matchingSpec}`); 
                        process.exit(1);
                    }
                }
            }

            if (matchingSpec == undefined) {
                console.error(`Unable to determine which version of xAPI to test against with diectories: ${_options.directory.join(", ")}`); 
                process.exit(1);
            }

            _options.xapiVersion = matchingSpec;
        }

        if (!versionSpecified && !directorySpecified) {
            _options.xapiVersion = specConfig.defaultVersion;
            _options.directory = [defaultDirectory];
            console.warn(`No xAPI version or manual path specified -- defaulting to ${specConfig.defaultVersion}.`); 
        }

        var options = {
            xapiVersion: _options.xapiVersion,
            directory: _options.directory,
            endpoint: _options.endpoint,
            basicAuth: _options.basicAuth,
            authUser: _options.authUser,
            authPass: _options.authPass,
            reporter: _options.reporter,
            grep: _options.grep,
            optional: _options.optional,
            bail: _options.bail,
            consumer_key: _options.consumer_key,
            consumer_secret: _options.consumer_secret,
            token: _options.token,
            token_secret: _options.token_secret,
            verifier: _options.verifier,
            oAuth1: _options.oAuth1,
            errors: _options.errors
        };

        var grep;
        if (options.grep){
          grep = new RegExp(options.grep);
        }

        var mocha = new Mocha({
            uii: 'bdd',
            reporter: processMessageReporter(process),
            timeout: '15000',
            grep: grep,
            bail: options.bail
        });

        console.log(`
            \r\bAttempting xAPI Conformance Suite Against:
            \r\r    xAPI Version: ${options.xapiVersion}
            \r\r    Test Path(s): ${options.directory}
            \r\r    LRS Endpoint: ${options.endpoint}
        `);

        console.log("Grep is " + grep);
        process.env.DIRECTORY = options.directory[0];

        // Adds optional tests to the front in ascending order.
        if (options.optional){
          options.optional.reverse().forEach(function(dir) {
              options.directory.unshift(dir);
          });
        }

        // console.log("directory is ", options.directory);


        process.env.LRS_ENDPOINT = options.endpoint;
        process.env.BASIC_AUTH_ENABLED = options.basicAuth;
        process.env.BASIC_AUTH_USER = options.authUser;
        process.env.BASIC_AUTH_PASSWORD = options.authPass;
        process.env.OAUTH1_ENABLED = options.oAuth1;
        process.env.XAPI_VERSION = options.xapiVersion;

        if(options.oAuth1)
        {
           // console.log("USING OAUTH");
            global.OAUTH = {

                consumer_key: _options.consumer_key,
                consumer_secret: _options.consumer_secret,
                token: _options.token,
                token_secret: _options.token_secret,
                verifier: _options.verifier
            }
        }

        options.directory.forEach(function(dir) {
            //process.postMessage("log", (JSON.stringify(global.OAUTH)));
            var testDirectory = __dirname + '/../test/' + dir;
            fs.readdirSync(testDirectory).filter(function(file) {
                return file.substr(-3) === '.js';
            }).forEach(function(file) {
                mocha.addFile(
                    path.join(testDirectory, file)
                );
            });
        });

        mocha.run(function(failures) {
            if (failures) {} else {}

            process.postMessage("log", "Test Suite Complete");
            process.exit();
        })
    }

    function hookupIPC() {
        process.postMessage = function(action, payload) {
            process.send({
                action: action,
                payload: payload
            })
        }
        process.on('message', function(message) {
            if (message.action == "ping") {
                process.postMessage("log", "pong");
            }
            else if (message.action == "runTests") {
                process.postMessage("log", "runTests starting");
                runTests(message.payload);
            }
        })
        process.postMessage("ready");
    }
    hookupIPC();
}(process, require, require('commander'), require('exit'), require('../package.json'), require('q'), require('joi'), require('fs'), require('path'), require('mocha')));
