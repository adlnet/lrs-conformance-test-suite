var program = require('commander');
var testRunner = new(require(__dirname + '/testRunner.js').testRunner)();
var jsonSchema = require('jsonschema');
var validate = jsonSchema.validate;

var colors = require('colors');
require('pretty-error').start();
program
    .version('0.0.1')
    .option('-e, --endpoint [url]', 'xAPI endpoint')
    .option('-u, --authUser [string]', 'Basic Auth Username')
    .option('-p, --authPassword [string]', 'Basic Auth Password')
    .option('-a, --basicAuth', 'Enable Basic Auth')
    .option('-o, --oAuth1', 'Enable oAuth 1')
    .parse(process.argv);


var options = {
        endpoint: program.endpoint,
        authUser: program.authUser,
        authPass: program.authPassword,
        basicAuth: program.basicAuth,
        oAuth1: program.oAuth1
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
        console.log(colors.red.bold(message.action) + ": " + message.payload);
    if (message.action == 'test pass')
        console.log(colors.green.bold(message.action) + ": " + message.payload);
    if (message.action == 'suite')
        console.log("\n" + colors.white.bold(message.action) + ": ", colors.white.bold(message.payload) + "\n");
});


//catches ctrl+c event
process.on('SIGINT', function() {
    console.log(colors.white('Closeing'));
});


process.on('exit', function() {
    console.log(colors.white('Closed'));
})



if (!program.oAuth1)
    testRunner.start(options);
else {

    var config = {};
    config.consumer_key = '489004739a2a44bf8541607e5d87a5e8';
    config.consumer_secret = 'TPXFKQaElAPLc2TK';
    config.request_token_path = '/OAuth/initiate';
    config.auth_token_path = '/OAuth/token';
    config.authorization_path = "/../accounts/login?next=/XAPI/OAuth/authorize";
    config.endpoint = options.endpoint;
    require("./OAuth.js").auth(config, function(err, oAuth) {

        if (err) {
            console.log(err);
            process.exit();
        }
        options.oAuthConsumerKey = config.consumer_key;
        options.oAuthConsumerSecret = config.consumer_secret;
        options.oAuthToken = oAuth.oAuthToken;
        options.oAuthTokenSecret = oAuth.oAuthTokenSecret;
        options.oAuthVerifier = oAuth.oAuthVerifier;


        var OAUTH = {

            consumer_key: options.oAuthConsumerKey,
            consumer_secret: options.oAuthConsumerSecret,
            token: options.oAuthToken,
            token_secret: options.oAuthTokenSecret,
            verifier: options.oAuthVerifier
        }
        require("request")({
            url: config.endpoint + "/statements",
            oauth: OAUTH,
            method: "POST",
            body:'{"verb":{"id":"http://adlnet.gov/expapi/verbs/experienced","display":{"en-US":"experienced"}},"object":{"definition":{"type":"http://activitystrea.ms/schema/1.0/page","name":{"en-US":"Google"}},"id":"https://www.google.co.il/?gws_rd=ssl","objectType":"Activity"},"actor":{"mbox":"mailto:dkaplan@example.com","name":"Dorit K","objectType":"Agent"},"context":{"contextActivities":{"category":[{"definition":{"type":"http://id.tincanapi.com/activitytype/recipe"},"id":"http://id.tincanapi.com/recipe/bookmarklet/base/1","objectType":"Activity"}]}}}',
            headers: {
                "x-experience-api-version": "1.0.1",
                "content-type":"application/JSON"
            }
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // Show the HTML for the Google homepage.
            }
            else
            	console.log(body,err)
        })


        //testRunner.start(options);
    });
}