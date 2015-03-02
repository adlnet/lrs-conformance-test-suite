#!/usr/bin/env node
(function (process, require, program, exit, packageJson, Q, Joi, fs, path, Mocha) {
    'use strict';

    program
        .version(packageJson.version)
        .usage('[options]')
        .option('-e, --endpoint <path>', 'The LRS connection string')
        .parse(process.argv);

    var deferred = Q.defer(),
        optionsValidator = Joi.object({
            /* See [RFC-3986](http://tools.ietf.org/html/rfc3986#page-17) */
            endpoint: Joi.string().regex(/^[a-zA-Z][a-zA-Z0-9+\.-]*:.+/, 'URI').required()
        }).unknown(false),
        mocha = new Mocha({
            uii: 'bdd',
            reporter: 'nyan'
        });

    process.nextTick(function () {
        var options = {
                endpoint: program.endpoint
            },
            validOptions = Joi.validate(options, optionsValidator);

        if (validOptions.error) {
            return deferred.reject(validOptions.error);
        }

        process.env.LRS_ENDPOINT = options.endpoint;

        mocha.addFile(
            path.join(__dirname, '../test/v1_0_2/document.js')
        );

        mocha.run(function (failures) {
            process.on('exit', function () {
                if (failures) {
                    deferred.reject(failures);
                } else {
                    deferred.resolve();
                }
            });
        });
    });

    deferred.promise.then(function () {
        console.log('Done!');
        exit(0);
    }, function (err) {
        console.log(err);
        exit(1);
    });

}(process, require, require('commander'), require('exit'), require('../package.json'), require('q'), require('joi'), require('fs'), require('path'), require('mocha')));