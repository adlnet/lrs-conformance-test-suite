var express = require('express');
var async = require('async');
var app = express();
var hoganExpress = require('hogan-express');

var testRunner = require('./bin/testRunner.js').testRunner;
require('pretty-error').start();


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
			runner.on("statusMessage",function(message)
			{
				console.log(message);
			})
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