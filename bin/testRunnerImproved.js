'use strict';

const child_process = require('child_process'),
	libpath = require('path'),
	EventEmitter = require('events').EventEmitter,
	util = require('util');

function TestRunner()
{
	this.proc = null;
	this.running = false;
	this.uuid = require('uuid').v4();

	this.stats = {
		total: 0,
		passed: 0,
		failed: 0,
		pending: 0
	};
}
TestRunner.prototype.constructor = TestRunner;

TestRunner.prototype.start = function(options)
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
	this.proc.on('message', function(msg){
		console.log(this);
		if(msg.action === 'ready')
			this.send({action: 'runTests', payload: options});
	});

}

TestRunner.prototype._registerStatusUpdates = function()
{
	this.proc.on('message', function(msg)
	{
		var action = msg.action, payload = msg.payload;

		switch(action)
		{
		case 'start':
		case 'end':
		case 'suite start':
		case 'suite end':
		case 'test start':
		case 'test end':
		case 'pass':
		case 'fail':
		
		};

	}.bind(this));
}

TestRunner.prototype.cancel = function()
{
	
}

TestRunner.prototype.getStatus = function()
{
	
}

TestRunner.prototype.getLog = function()
{
	
}

exports.testRunner = TestRunner;
