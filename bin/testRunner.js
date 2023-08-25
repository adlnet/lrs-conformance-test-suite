'use strict';

const child_process = require('child_process');	
const libpath = require('path');
const EventEmitter = require('events').EventEmitter;
const rollup = require('./rollupRules.js');
const version = require('../version.js');
const SpecRefs = require('../test/references.json');

class Suite {
	constructor(title) {
		var match;
		this.log = "";
		this.title = title;
		if (match = /\(([^\)]*\d[^\)]*)\)/.exec(title)) {
			this.name = title.slice(0, match.index).trim();
			if (SpecRefs[this.name]) {
				var data = SpecRefs[this.name];
				this.requirement = data['1.0.3_link'] || data['1.0.3_ref'] || data['1.0.2_ref_text'];
			}
			else
				this.requirement = match[1];
		}
		else {
			this.name = title;
			this.requirement = '';
		}

		this.status = ''; // in ['cancelled', 'passed', 'failed']
		this.parent = null;
		this.tests = [];
	}
	addTest(test) {
		this.tests.push(test);
		test.parent = this;
	}
	_log(data) {
		this.log += data;
	}
}

class TestRunner extends EventEmitter {
	constructor(name, owner, flags, lrsSettingsUUID, options, rollupRule) {
		super();

		this.proc = null;

		this.name = name;
		this.owner = owner;
		this.flags = flags;
		this.options = options || {};
		this.lrsSettingsUUID = lrsSettingsUUID;
		this.rollupRule = rollup[rollupRule] ? rollupRule : 'mustPassAll';

		this.xapiVersion = (flags.xapiVersion || version.versionNumber);

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

	start() {
		if (this.state !== 'notStarted') return;
		this.state = 'started';

		// Spin up the child process.
		this.proc = child_process.fork(libpath.join(__dirname, "lrs-test.js"),
			["--debug"],
			{
				execArgv: [/*"--debug-brk=5959"*/],
				cwd: libpath.join(__dirname, "/../")
			}
		);

		// Hook up listeners.
		this._registerStatusUpdates();

		// Kick off tests when ready.
		this.proc.on('message', function (msg) {
			if (msg.action === 'ready') {
				//this is still a bit of a mess - we'll build the actual settings from this.flags and this.options
				var flags = JSON.parse(JSON.stringify(this.flags));
				if (this.options && this.options.grep)
					flags.grep = this.options.grep;
				if (this.options && this.options.optional)
					flags.optional = this.options.optional;

				this.proc.send({ action: 'runTests', payload: flags });
			}
		}.bind(this));
	}

	_registerStatusUpdates() {


		this.proc.on('message', function (msg) {

			var action = msg.action, payload = msg.payload;
			switch (action) {
				case 'start':

					// initialize counters
					this.summary.total = payload;
					this.summary.passed = 0;
					this.summary.failed = 0;
					this.startTime = Date.now();
					this.summary.version = this.xapiVersion;
					break;

				case 'data':

					if (this.activeTest)
						this.activeTest._log(payload);
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
					if (this.activeTest)
						this.activeTest.addTest(newSuite);
					else
						this.log = newSuite;

					this.activeTest = newSuite;
					break;

				case 'suite end':

					if (this.activeTest) {
						// finish the suite
						if (this.activeTest.title === payload) {
							// roll up test status
							this.activeTest.status = rollup[this.rollupRule](this.activeTest);

							// move test cursor
							this.activeTest = this.activeTest.parent;
						}
						else
							console.error('Dangling suite end!', this.activeTest.title);
					}
					break;

				case 'test start':

					// start a new test
					var newTest = new Suite(payload);

					// add to log
					if (this.activeTest)
						this.activeTest.addTest(newTest);
					else
						this.log = newTest;

					this.activeTest = newTest;
					break;

				case 'test end':

					if (this.activeTest) {
						if (this.activeTest.title === payload)
							this.activeTest = this.activeTest.parent;
						else
							console.error('Dangling test end!', this.activeTest.title);
						break;
					}

				case 'test pass':
					if (this.activeTest) {
						this.activeTest.status = 'passed';
						this.summary.passed++;
					}
					break;

				case 'test fail':
					if (this.activeTest) { //careful - cancel can blank this, then the message comes in
						this.activeTest.status = 'failed';
						this.activeTest.error = payload.message;
						this.summary.failed++;
					}
					break;
			};

			// pass along the event
			this.emit('message', msg);

		}.bind(this));

		this.proc.on("close", function (w) {
			if (this.state == "cancelled" || this.state == "finished") {
				return;
			}
			else {
				this.state = "error";
				this.emit('message', { action: 'end' });
				this.emit('close');
			}
		}.bind(this));
	}

	cancel() {
		if (this.proc) {

			this.endTime = Date.now();
			this.duration = this.endTime - this.startTime;

			// Evaluate all in-progress suites to "cancelled".
			this.state = 'cancelled';
			this.proc.kill();
			if (this.activeTest) {
				this.activeTest.status = 'cancelled';
				this.activeTest = this.activeTest.parent;
			}
			while (this.activeTest) {
				this.activeTest.status = rollup[this.rollupRule](this.activeTest);
				this.emit('message', { action: 'suite end', payload: this.activeTest.title });
				this.activeTest = this.activeTest.parent;
			}

			this.emit('message', { action: 'end' });
			this.emit('close');
		}
	}

	getCleanRecord() {
		var runRecord = {
			name: this.name || null,
			owner: this.owner || null,
			flags: {
				endpoint: this.flags.endpoint,
				basicAuth: this.flags.basicAuth,
				authUser: this.flags.authUser,
				oAuth1: this.flags.oAuth1,
				consumer_key: this.flags.consumer_key,
				grep: this.flags.grep,
				optional: this.flags.optional
			},
			options: this.options,
			lrsSettingsUUID: this.lrsSettingsUUID,
			rollupRule: this.rollupRule,

			uuid: this.uuid,
			startTime: this.startTime,
			endTime: this.endTime,
			duration: this.duration,
			state: this.state,
			summary: {
				total: this.summary.total,
				passed: this.summary.passed,
				failed: this.summary.failed,
				version: this.xapiVersion
			}
		};

		function cleanLog(log) {
			if (!log) return undefined;

			return {
				title: log.title,
				name: log.name,
				requirement: log.requirement,
				log: log.log,
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
