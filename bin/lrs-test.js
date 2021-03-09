#!/usr/bin/env node
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
            directory: Joi.array().items(Joi.string().required()),
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

        var DIRECTORY = ['v1_0_3'];
        var options = {
            directory: _options.directory || DIRECTORY,
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

        console.log("Grep is " + grep);
        process.env.DIRECTORY = options.directory[0];

        // Adds optional tests to the front in ascending order.
        if (options.optional){
          options.optional.reverse().forEach(function(dir) {
              options.directory.unshift(dir);
          });
        }

        console.log("directory is ", options.directory);


        process.env.LRS_ENDPOINT = options.endpoint;
        process.env.BASIC_AUTH_ENABLED = options.basicAuth;
        process.env.BASIC_AUTH_USER = options.authUser;
        process.env.BASIC_AUTH_PASSWORD = options.authPass;
        process.env.OAUTH1_ENABLED = options.oAuth1;


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
