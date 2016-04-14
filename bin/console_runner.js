var program = require('commander');
var testRunner = new (require(__dirname +'/testRunner.js').testRunner)();
var jsonSchema = require('jsonschema');
var validate = jsonSchema.validate;

var colors = require('colors');
require('pretty-error').start();
program
  .version('0.0.1')
  .option('-e, --endpoint [url]', 'xAPI endpoint')
  .option('-u, --authUser [string]', 'Basic Auth Username')
  .option('-p, --authPassword [string]', 'Basic Auth Password')
  .parse(process.argv);

var options = {
	endpoint:program.endpoint,
	authUser:program.authUser,
	authPass:program.authPassword
}

var valid = validate(options,{
	type:"object",
	properties:{
		endpoint:{
			type:"string",
			format:"uri"
		},
		authUser:{
			type:"string"
		},
		authPass:{
			type:"string"
		}
	},
	required:["endpoint","authPass","authUser"]
})



if(valid.errors.length)
{
	program.help();
}

testRunner.on("statusMessage",function(message)
{
	if(message.action == 'log')
		console.log(colors.white.bold(message.action) + ": " + message.payload);
	if(message.action == 'test fail')
		console.log(colors.red.bold(message.action) + ": " + message.payload);
	if(message.action == 'test pass')
		console.log(colors.green.bold(message.action) + ": " + message.payload);
	if(message.action == 'suite')
		console.log("\n" + colors.white.bold(message.action) + ": " , colors.white.bold(message.payload) + "\n");
});


//catches ctrl+c event
process.on('SIGINT',function()
{
	console.log(colors.white('Closeing'));
});


process.on('exit',function()
{
	console.log(colors.white('Closed'));
})

testRunner.start(options);