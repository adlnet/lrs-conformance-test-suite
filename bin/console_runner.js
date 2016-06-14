var program = require('commander');
var testRunner = new(require(__dirname + '/testRunner.js').testRunner)();
var jsonSchema = require('jsonschema');
var validate = jsonSchema.validate;

var colors = require('colors');
require('pretty-error').start();

function clean_dir(val, dir) {
    v = val.split(',')
    // v = val.split(/\s*,\s*/)
    .forEach(function(d){
        dir.push(d);
    });
    return dir;
}

program
    .version('0.0.1')
    .option('-e, --endpoint [url]', 'xAPI endpoint')
    .option('-u, --authUser [string]', 'Basic Auth Username')
    .option('-p, --authPassword [string]', 'Basic Auth Password')
    .option('-a, --basicAuth', 'Enable Basic Auth')
    .option('-o, --oAuth1', 'Enable oAuth 1')
    .option('-c, --consumer_key [string]', 'oAuth 1 Consumer Key')
    .option('-s, --consumer_secret [string]', 'oAuth 1 Consumer Secert')
    .option('-r, --request_token_path [string]', 'Path to OAuth request token endpoint (relative to endpoint)')
    .option('-t, --auth_token_path [string]', 'Path to OAuth authorization token endpoint (relative to endpoint)')
    .option('-l, --authorization_path [string]', 'Path to OAuth user authorization endpoint (relative to endpoint)')
    .option('-g, --grep [string]', 'Only run tests that match the given pattern')
    .option('-b, --bail', 'Abort the battery if one test fails')
    .option('-d, --directory [value]', 'Specific directories of tests (as a comma seperated list with no spaces)', clean_dir, [])
    .parse(process.argv);
console.log(program.directory);
var options = {
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
        directory: program.directory
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

testRunner.on("statusMessage", function(message) {
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
});


//catches ctrl+c event
process.on('SIGINT', function() {
    console.log(colors.white('Closeing'));
    process.exit();
});


process.on('exit', function() {
    console.log(colors.white('Closed'));
})



if (!program.oAuth1)
    testRunner.start(options);
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

        testRunner.start(options);
    });
}
