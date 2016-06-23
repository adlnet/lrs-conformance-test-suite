'use strict';

const child_process = require('child_process'),
	libpath = require('path'),
	fs = require('fs'),
	EventEmitter = require('events').EventEmitter;

class Suite {
	constructor(name){
		this.name = name;
		this.status = 'running'; // in ['running', 'cancelled', 'passed', 'failed']
		this.parent = null;
		this.tests = [];
	}
	addTest(test){
		this.tests.push(test);
		test.parent = this;
	}
}

class TestRunner extends EventEmitter
{
	constructor(name, owner, config, configUUID)
	{
		super();

		this.proc = null;

		this.name = name;
		this.owner = owner;
		this.config = config;
		this.configUUID = configUUID;

		this.uuid = require('uuid').v4();
		this.startTime = null;
		this.endTime = null;
		this.duration = null;
		this.state = 'notStarted'; // in ["notStarted", "started", "finished", "cancelled"]

		this.summary = {
			total: null,
			passed: null,
			failed: null
		};

		this.log = null;

		this.activeTest = null;
	}

	start()
	{
		if(this.state !== 'notStarted') return;
		this.state = 'started';

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
				this.proc.send({action: 'runTests', payload: this.config});
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
				this.state = 'finished';
				break;

			case 'suite start':

				// start a new suite
				var newSuite = new Suite(payload);

				// add to log
				if(this.activeTest)
					this.activeTest.addTest(newSuite);
				else
					this.log = newSuite;

				this.activeTest = newSuite;
				break;

			case 'suite end':

				// finish the suite
				if(this.activeTest.name === payload)
				{
					// roll up test status
					this.activeTest.status = 'passed';
					for(var i=0; i<this.activeTest.tests.length; i++){
						if(this.activeTest.tests[i].status === 'failed'){
							this.activeTest.status = 'failed';
							break;
						}
					}

					// move test cursor
					this.activeTest = this.activeTest.parent;
				}
				else
					console.error('Dangling suite end!', this.activeTest.name);
				break;
				
			case 'test start':

				// start a new test
				var newTest = new Suite(payload);

				// add to log
				if(this.activeTest)
					this.activeTest.addTest(newTest);
				else
					this.log = newTest;

				this.activeTest = newTest;
				break;

			case 'test end':

				if(this.activeTest.name === payload)
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
		if(this.proc)
		{
			this.proc.kill();
			this.endTime = Date.now();
			this.duration = this.endTime - this.startTime;

			// evaluate all in-progress suites to "cancelled"
			while(this.activeTest){
				this.activeTest.status = 'cancelled';
				this.activeTest = this.activeTest.parent;
			}

			this.emit('message', {action: 'end'});
			this.emit('close');
		}
	}

	getCleanRecord()
	{
		var runRecord = {
			name: this.name || null,
			owner: this.owner || null,
			config: {
				endpoint: this.config.endpoint,
				basicAuth: this.config.basicAuth,
				authUser: this.config.authUser,
				oAuth1: this.config.oAuth1,
				consumer_key: this.config.consumer_key
			},
			configUUID: this.configUUID,

			uuid: this.uuid,
			startTime: this.startTime,
			endTime: this.endTime,
			duration: this.duration,
			state: this.state,
			summary: {
				total: this.summary.total,
				passed: this.summary.passed,
				failed: this.summary.failed
			}
		};

		function cleanLog(log)
		{
			if(!log) return null;

			return {
				name: log.name,
				status: log.status,
				error: log.error,
				tests: log.tests.map(cleanLog)
			};
		}

		runRecord.log = cleanLog(this.log);
		return runRecord;
	}
}


exports.testRunner = TestRunner;
