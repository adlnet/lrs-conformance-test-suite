var child_process = require('child_process');
//an object to hold the reference to the child process, manage communication with it, and store the outputs
function runnerOutputMessage(type, message)
{
	this.time = Date.now().toString();
	this.type = type;
	this.message = message;
	if (type == "test pass")
		this.pass = true;
	if (type == "test fail")
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
		var test_runner_process = child_process.fork(__dirname +"/lrs-test.js");
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
			if (message.action == "test start")
			{
				self.messages.push(new runnerOutputMessage("test start", message.payload))
			}
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
			self.emit(message.action,message);
			self.emit("statusMessage",message);
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
var EventEmitter = require('events').EventEmitter;
require('util').inherits(testRunner, EventEmitter);
exports.testRunner = testRunner;