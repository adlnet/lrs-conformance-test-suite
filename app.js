var express = require('express');
var async = require('async');
var app = express();
var hoganExpress = require('hogan-express');
var child_process = require('child_process');
require('pretty-error').start();
//an object to hold the reference to the child process, manage communication with it, and store the outputs
function runnerOutputMessage(type, message)
{
	this.time = Date.now().toString();
	this.type = type;
	this.message = message;
	if(type == "test pass")
		this.pass = true;
	if(type == "test fail")
		this.fail = true;
}

function testRunner()
{
	this.uuid = require('uuid').v4();
	//storage for the output
	this.messages = [];
	var self = this;
	//currently in progress?
	this.running = false;
	this.start = function(options)
	{
		//create the child process
		var test_runner_process = child_process.fork("./bin/lrs-test.js");
		this.running = true;
		self.test_runner_process = test_runner_process;
		//hook up the messaging
		test_runner_process.postMessage = function(action, payload)
		{
			test_runner_process.send(
			{
				action: action,
				payload: payload
			})
		}
		test_runner_process.on('message', function(message)
		{
			//if (message.action == "test start")
			//{
			//		self.messages.push(new runnerOutputMessage("test start", message.payload))
			//		}
			if (message.action == "test pass")
			{
				self.messages.push(new runnerOutputMessage("test pass", message.payload))
			}
			if (message.action == "test fail")
			{
				self.messages.push(new runnerOutputMessage("test fail", message.payload))
			}
			if (message.action == "ready")
			{
				test_runner_process.postMessage("runTests", options);
			}
		});
		//test communication
		test_runner_process.postMessage("ping");
		//mark on close
		test_runner_process.on('close', function()
		{
			self.running = false;
		})
	}
}
//dumb in-memory storage for running tests. Replace with a real DB;
var testRunners = [];
//startup, in future might contain more steps
async.series([], function startServer()
{
	//serve static files
	app.use('/static', express.static('public'));
	app.use(require("body-parser").json());
	app.use(require("body-parser").urlencoded(
	{
		extended: true
	}));
	app.use(require("cookie-parser")());
	//use mustache templating
	app.engine('html', hoganExpress);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');
	app.set('partials',
	{
		header: 'header',
		footer: 'footer',
		scripts: 'scripts'
	});
	app.set('layout', 'layout');
	app.get("/", function(req, res, next)
	{
		res.render("home");
	})
	app.get("/tests/start", function(req, res, next)
	{
		res.render("runTests");
	});
	//launch the test suite. TODO: Auth, creds, validate inputs
	app.post("/tests/run", function(req, res, next)
		{
			var options = {};
			options.authUser = req.body.user;
			options.authPass = req.body.password;
			options.endpoint = req.body.url;
			//create, store, run
			var runner = new testRunner();
			testRunners.push(runner);
			res.status(200).send(runner.uuid);
			runner.start(options);
		})
		//get a list of running tests 
	app.get("/tests/running", function(req, res, next)
	{
		var ids = [];
		for (var i = 0; i < testRunners.length; i++)
		{
			ids.push(testRunners[i].uuid);
		}
		res.render('runningTests',
		{
			tests: ids
		})
	});
	//print the logs from the tests
	app.get("/tests/:testRunnerID/status", function(req, res, next)
	{
		for (var i = 0; i < testRunners.length; i++)
		{
			if (testRunners[i].uuid == req.params.testRunnerID)
			{
				res.render('testStatus',
				{
					messages: testRunners[i].messages
				})
			}
		}
	});
	app.listen(3000, function() {})
});