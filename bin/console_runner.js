var program = require('commander');
var TestRunner = require('./testRunner.js').testRunner;
var jsonSchema = require('jsonschema');
var validate = jsonSchema.validate;
var colors = require('colors');
var libpath = require('path');
var fs = require('fs');
const specConfig = require("../specConfig");

require('pretty-error').start();

function clean_dir(val, dir) {
    v = val.split(',')
    .forEach(function(d){
        dir.push(d);
    });
    return dir;
}

program
    .version('0.0.1')
    .option('-x, --xapiVersion [string]', '🌟 New: Version of the xAPI spec to test against')
    .option('-e, --endpoint [url]', 'xAPI endpoint')
    .option('-u, --authUser [string]', 'Basic Auth Username')
    .option('-p, --authPassword [string]', 'Basic Auth Password')
    .option('-a, --basicAuth', 'Enable Basic Auth')
    .option('-o, --oAuth1', 'Enable oAuth 1')
    .option('-c, --consumer_key [string]', 'oAuth 1 Consumer Key')
    .option('-s, --consumer_secret [string]', 'oAuth 1 Consumer Secret')
    .option('-r, --request_token_path [string]', 'Path to OAuth request token endpoint (relative to endpoint)')
    .option('-t, --auth_token_path [string]', 'Path to OAuth authorization token endpoint (relative to endpoint)')
    .option('-l, --authorization_path [string]', 'Path to OAuth user authorization endpoint (relative to endpoint)')
    .option('-g, --grep [string]', 'Only run tests that match the given pattern')
    .option('-b, --bail', 'Abort the battery if one test fails')
    .option('-d, --directory [value]', 'Specific directories of tests (as a comma seperated list with no spaces)', clean_dir, [...[]])
    .option('-z, --errors', 'Results log of failing tests only')
    .parse(process.argv);

var options = {
    xapiVersion: program.xapiVersion,
    endpoint: program.endpoint,
    authUser: program.authUser,
    authPass: program.authPassword,
    basicAuth: program.basicAuth,
    oAuth1: program.oAuth1,
    consumer_key: program.consumer_key,
    consumer_secret: program.consumer_secret,
    request_token_path: program.request_token_path,
    auth_token_path: program.auth_token_path,
    authorization_path: program.authorization_path,
    grep: program.grep,
    bail: program.bail,
    directory: program.directory,
    errors: program.errors
}

/*
var valid = validate(options, {
    type: "object",
    properties: {
        endpoint: {
            type: "string",
            format: "uri"
        },
        authUser: {
            type: "string"
        },
        authPass: {
            type: "string"
        }
    },
    required: ["endpoint", "authPass", "authUser"]
})


if (valid.errors.length) {
    program.help();
}*/

/*testRunner.on("statusMessage", function(message) {
    if (message.action == 'log')
        console.log(colors.white.bold(message.action) + ": " + message.payload);
    if (message.action == 'test fail')
    {
        console.log(colors.red.bold(message.action) + ": " + message.payload.title);
        console.log(colors.red.bold(message.payload.message));
    }
    if (message.action == 'test pass')
        console.log(colors.green.bold(message.action) + ": " + message.payload);
    if (message.action == 'suite')
        console.log("\n" + colors.white.bold(message.action) + ": ", colors.white.bold(message.payload) + "\n");
});*/

var testRunner = null;

//catches ctrl+c event
process.on('SIGINT', function() {
    console.log(colors.white('Aborting tests'));
	testRunner.cancel();
});

process.on('exit', function() {
    console.log(colors.white('Closed'));
})

function start(options)
{
    //These are already used to fetch the access token, and are not needed by the runer
    delete options.request_token_path;
    delete options.auth_token_path;
    delete options.authorization_path;

    let endpointSpecified = options.endpoint != undefined;
    let versionSpecified = options.xapiVersion != undefined;
    let directorySpecified = options.directory.length > 0;

    let defaultDirectory = specConfig.specToFolder[specConfig.defaultVersion]

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
        let versionFolder = specConfig.specToFolder[options.xapiVersion];
        if (versionFolder != undefined)
            options.directory = [versionFolder];
        
        else {
            console.error(`Unknown version of the xAPI spec: ${options.xapiVersion}.  Unable to find appropriate test suite.`); 
            process.exit(1);
        }
    }

    if (!versionSpecified && !directorySpecified) {
        options.xapiVersion = specConfig.defaultVersion
        options.directory = [defaultDirectory]
        console.warn(`No xAPI version or manual path specified -- defaulting to ${specConfig.defaultVersion}.`); 
    }

    console.log(`
    \r\bAttempting xAPI Conformance Suite Against:
    \r\r    xAPI Version: ${options.xapiVersion}
    \r\r    Test Path(s): ${options.directory}
    \r\r    LRS Endpoint: ${options.endpoint}
    `)

	testRunner = new TestRunner('console', null, options);
    testRunner.start();

	var interval = setInterval(function(){
		console.log(JSON.stringify(testRunner.summary));
	}.bind(this), 2000);

	testRunner.on('message', function(msg)
	{

		if(msg.action === 'log'){
			console.log(msg.payload);
		}
		else if(msg.action === 'end')
		{
			clearInterval(interval);
			console.log(JSON.stringify(testRunner.summary));
			console.log(`Tests completed in ${testRunner.duration/1000} seconds`);

			function removeNulls (log)
			{
				var temp;

				if (log && log.status === 'failed')
				{
					temp = {
						title: log.title,
						name: log.name,
						requirement: log.requirement,
						log:log.log,
						status: log.status,
						error: log.error
					};
					var t = log.tests.map(removeNulls);
					if (t) temp.tests = t.filter(function(v){return v != undefined});
				}
				return temp;
			}

			// write log to file
			var cleanLog = testRunner.getCleanRecord();
			var output;
			if (options.errors) {
				var errOnly = {
					name: cleanLog.name,
					owner: cleanLog.owner,
					flags: cleanLog.flags,
					options: cleanLog.options,
					rollupRule: cleanLog.rollupRule,
					uuid: cleanLog.uuid,
					startTime: cleanLog.startTime,
					endTime: cleanLog.endTime,
					duration: cleanLog.duration,
					state: cleanLog.state,
					summary: cleanLog.summary,
					log: removeNulls(cleanLog.log)
				};
				output = JSON.stringify(errOnly, null, '    ');
			} else {
				output = JSON.stringify(cleanLog, null, '    ');
			}

			var outDir = libpath.join(__dirname, '../logs');

            // console.log(require("util").inspect(JSON.parse(JSON.stringify(cleanLog,function(k,v){if(k=="log" && v && v.constructor == String) return undefined; return v})),{depth:10}));

			fs.mkdir(outDir, 0o775, function(){
				var outPath = libpath.join(outDir, testRunner.uuid+'.log');
				fs.writeFile(outPath, output, (err, data) => {
					if (err) {
						console.log(err);
						return process.exit(1);
					}
					console.log('Full run log written to', outPath);
					return process.exit(testRunner.summary.failed);
				});
			});
		}
	});
}

if (!program.oAuth1)
	start(options);
else {


    var config = {};
    config.consumer_key = options.consumer_key;
    config.consumer_secret = options.consumer_secret;

    //defaults for the ADL LRS
    config.request_token_path = options.request_token_path || '/OAuth/initiate';
    config.auth_token_path = options.auth_token_path ||'/OAuth/token';
    config.authorization_path = options.authorization_path || "/../accounts/login?next=/XAPI/OAuth/authorize";

    config.endpoint = options.endpoint;
    require("./OAuth.js").auth(config, function(err, oAuth) {

        if (err) {
            console.log(err);
            process.exit();
        }
        options.consumer_key = options.consumer_key;
        options.consumer_secret = options.consumer_secret;
        options.token = oAuth.token;
        options.token_secret = oAuth.token_secret;
        options.verifier = oAuth.verifier;


        var OAUTH = {

            consumer_key: options.consumer_key,
            consumer_secret: options.consumer_secret,
            token: options.token,
            token_secret: options.token_secret,
            verifier: options.verifier
        }

		start(options);
    });
}
