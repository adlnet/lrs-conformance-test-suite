'use strict';

const child_process = require('child_process'),
	libpath = require('path'),
	EventEmitter = require('events').EventEmitter;

class Test {
	constructor(name){
		this.name = name;
		this.status = ''; // in ['pending', 'passed', 'failed']
		this.parent = null;
	}
}

class Suite extends Test {
	constructor(name){
		super(name);
		this.tests = [];
	}
	addTest(test){
		this.tests.push(test);
		test.parent = this;
	}
}

class TestRunner extends EventEmitter
{
	constructor()
	{
		super();

		this.proc = null;
		this.running = false;
		this.uuid = require('uuid').v4();

		this.stats = {
			total: null,
			passed: null,
			failed: null,
			pending: null
		};

		this.log = {'tests': []};
		this.log.stats = this.stats;

		this.activeTest = null;
	}

	start(options)
	{
		// spin up the child process
		this.proc = child_process.fork( libpath.join(__dirname, "lrs-test.js"),
			["--debug"],
			{
				execArgv:[/*"--debug-brk=5959"*/],
				cwd: libpath.join(__dirname,"/../")
			}
		);
	
		// hook up listeners
		this._registerStatusUpdates();

		var interval = setInterval(function(){
			console.log(JSON.stringify(this.stats));
		}.bind(this), 2000);

		// kick off tests when ready
		this.proc.on('message', function(msg){
			if(msg.action === 'ready')
				this.send({action: 'runTests', payload: options});
			else if(msg.action === 'log'){
				console.log(msg.payload);
			}
		});

		this.proc.on('close', function(){
			clearInterval(interval);
			console.log(JSON.stringify(this.stats));

			//this.emit('close');
		}.bind(this));
	}

	_registerStatusUpdates()
	{
		this.proc.on('message', function(msg)
		{
			// pass along the event
			this.emit('message', msg);

			var action = msg.action, payload = msg.payload;
			switch(action)
			{
			case 'start':

				// initialize counters
				this.stats.total = payload;
				this.stats.passed = 0;
				this.stats.failed = 0;
				break;

			case 'end':

				// do nothing
				break;

			case 'suite start':

				// start a new suite
				var newSuite = new Suite(payload);

				// add to log
				if(this.activeTest)
					this.activeTest.addTest(newSuite);
				else
					this.log.tests.push(this.activeTest);

				this.activeTest = newSuite;
				break;

			case 'suite end':

				// finish the suite
				if(this.activeTest instanceof Suite && this.activeTest.name === payload)
					this.activeTest = this.activeTest.parent;
				else
					console.error('Dangling suite end!', this.activeTest.name);
				break;
				
			case 'test start':

				// start a new test
				var newTest = new Test(payload);

				// add to log
				if(this.activeTest)
					this.activeTest.addTest(newTest);
				else
					this.log.tests.push(newTest);

				this.activeTest = newTest;
				break;

			case 'test end':

				if(this.activeTest instanceof Test && this.activeTest.name === payload)
					this.activeTest = this.activeTest.parent;
				else
					console.error('Dangling test end!', this.activeTest.name);
				break;

			case 'test pass':
				this.activeTest.status = 'passed';
				this.stats.passed++;
				break;

			case 'test fail':
				this.activeTest.status = 'failed';
				this.stats.failed++;
				break;
			};

		}.bind(this));
	}

	cancel()
	{
		if(this.proc)
			this.proc.kill();
	}

	getCleanLog()
	{
	
	}
}


exports.testRunner = TestRunner;
