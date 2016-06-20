'use strict';

const child_process = require('child_process'),
	libpath = require('path'),
	fs = require('fs'),
	EventEmitter = require('events').EventEmitter;

class Test {
	constructor(name){
		this.name = name;
		this.status = 'cancelled'; // in ['cancelled', 'passed', 'failed']
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
		this.uuid = require('uuid').v4();
		this.startTime = null;
		this.endTime = null;
		this.duration = null;

		this.summary = {
			total: null,
			passed: null,
			failed: null
		};

		this.log = [];

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

		// kick off tests when ready
		this.proc.on('message', function(msg)
		{
			if(msg.action === 'ready'){
				this.proc.send({action: 'runTests', payload: options});
			}
		}.bind(this));
	}

	_registerStatusUpdates()
	{
		this.proc.on('message', function(msg)
		{
			var action = msg.action, payload = msg.payload;
			switch(action)
			{
			case 'start':

				// initialize counters
				this.summary.total = payload;
				this.summary.passed = 0;
				this.summary.failed = 0;
				this.startTime = Date.now();
				break;

			case 'end':

				this.endTime = Date.now();
				this.duration = this.endTime - this.startTime;
				break;

			case 'suite start':

				// start a new suite
				var newSuite = new Suite(payload);

				// add to log
				if(this.activeTest)
					this.activeTest.addTest(newSuite);
				else
					this.log.push(newSuite);

				this.activeTest = newSuite;
				break;

			case 'suite end':

				// finish the suite
				if(this.activeTest instanceof Suite && this.activeTest.name === payload)
				{
					// roll up test status
					this.activeTest.status = 'passed';
					for(var i=0; i<this.activeTest.tests.length; i++){
						if(this.activeTest.tests[i].status === 'failed')
							this.activeTest.status = 'failed';
					}

					// move test cursor
					this.activeTest = this.activeTest.parent;
				}
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
					this.log.push(newTest);

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
				this.summary.passed++;
				break;

			case 'test fail':
				this.activeTest.status = 'failed';
				this.activeTest.error = payload.message;
				this.summary.failed++;
				break;
			};

			// pass along the event
			this.emit('message', msg);

		}.bind(this));
	}

	cancel()
	{
		if(this.proc){
			this.proc.kill();
			this.endTime = Date.now();
			this.duration = this.endTime - this.startTime;
			this.emit('message', {action: 'end'});
			this.emit('close');
		}
	}

	getCleanRecord()
	{
		var runRecord = {
			uuid: this.uuid,
			startTime: this.startTime,
			endTime: this.endTime,
			duration: this.duration,
			summary: {
				total: this.summary.total,
				passed: this.summary.passed,
				failed: this.summary.failed
			}
		};

		function cleanLog(log)
		{
			var clean = {
				name: log.name,
				status: log.status,
				error: log.error
			};

			if(log.tests){
				clean.tests = log.tests.map(cleanLog);
			}

			return clean;
		}

		runRecord.log = this.log.map(cleanLog);

		return runRecord;
	}
}


exports.testRunner = TestRunner;
