#!/usr/bin/env node
/**
 * Description : This is the command line interface for running the lrs conformance test suite.
 *
 */
(function (process, require, program, exit, packageJson, Q, Joi, fs, path, Mocha) {
    'use strict';

    program
        .version(packageJson.version)
        .usage('[options]')
        .option('-d, --directory [path]', 'test directory, default: test/v1_0_2')
        .option('-e, --endpoint <path>', 'LRS connection string')
        .parse(process.argv);

    var deferred = Q.defer(),
        optionsValidator = Joi.object({
            directory: Joi.string(),
            /* See [RFC-3986](http://tools.ietf.org/html/rfc3986#page-17) */
            endpoint: Joi.string().regex(/^[a-zA-Z][a-zA-Z0-9+\.-]*:.+/, 'URI').required()
        }).unknown(false),
        mocha = new Mocha({
            uii: 'bdd',
            reporter: 'nyan',
            timeout: '15000'
        });

    process.nextTick(function () {
        var options = {
                directory: program.directory || 'test/v1_0_2',
                endpoint: program.endpoint
            },
            validOptions = Joi.validate(options, optionsValidator);

        if (validOptions.error) {
            deferred.reject(validOptions.error);
        } else {
            process.env.LRS_ENDPOINT = options.endpoint;
            var testDirectory = options.directory;
            fs.readdirSync(testDirectory).filter(function (file) {
                return file.substr(-3) === '.js';
            }).forEach(function (file) {
                mocha.addFile(
                    path.join(testDirectory, file)
                );
            });
            mocha.run(function (failures) {
                if (failures) {
                    deferred.reject(failures);
                } else {
                    deferred.resolve();
                }
            });
        }
    });

    deferred.promise.then(function () {
        console.log('Done!');
        exit(0);
    }, function (err) {
        console.log('Failed tests: ' + err);
        exit(1);
    });

}(process, require, require('commander'), require('exit'), require('../package.json'), require('q'), require('joi'), require('fs'), require('path'), require('mocha')));
