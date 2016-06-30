'use strict';

const request = require('request'),
	fs = require('fs'),
	crypto = require('crypto');

var statement = {
    "actor": {
        "mbox": "mailto:sample.agent@example.com",
        "name": "Sample Agent",
        "objectType": "Agent"
    },
    "verb": {
        "id": "http://adlnet.gov/expapi/verbs/answered",
        "display": {
            "en-US": "answered"
        }
    },
    "object": {
        "id": "http://www.example.com/tincan/activities/multipart",
        "objectType": "Activity",
        "definition": {
            "name": {
                "en-US": "Multi Part Activity"
            },
            "description": {
                "en-US": "Multi Part Activity Description"
            }
        }
    },
    "attachments": [
        {
            "usageType": "http://example.com/attachment-usage/test",
            "display": { "en-US": "A test attachment" },
            "description": { "en-US": "A test attachment (description)" },
            "contentType": "text/plain; charset=ascii",
            "length": 27,
            "sha2": "495395e777cd98da653df9615d09c0fd6bb2f8d4788394cd53c56a3bfdcd848a"
        }
    ]
};

// attachment data
var attachmentData = new Buffer('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', 'base64');

statement.attachments[0].contentType = 'image/jpeg';
statement.attachments[0].length = attachmentData.byteLength;
statement.attachments[0].sha2 = crypto.createHash('SHA256').update(attachmentData).digest('hex');


// build body
var buffers = [];
var boundary = 'testsetestset';

// statement headers
buffers.push( new Buffer([
	'',
	'--'+boundary,
	'Content-Type:application/json',
	'',
	''
	].join('\r\n')) );

// statement
buffers.push( new Buffer(JSON.stringify(statement), 'utf8') );

// attachment headers
buffers.push( new Buffer([
	'',
	'--'+boundary,
	'Content-Type:'+statement.attachments[0].contentType,
	'Content-Transfer-Encoding:binary',
	'X-Experience-API-Hash:'+statement.attachments[0].sha2,
	'',
	''
	].join('\r\n')) );

// attachment
buffers.push( attachmentData );

// post-amble
buffers.push( new Buffer(`\r\n--${boundary}--`) );

// combine buffers into body
var body = Buffer.concat(buffers, buffers.reduce(((s,b) => s+b.byteLength), 0));
console.log(body.toString('ascii'));

// send request
request(
	{
		method: 'POST',
		url: 'http://192.168.56.101:8000/xapi/statements',
		headers: {
			'Authorization': 'Basic cm9vdDpyb290',
			'Content-Type': 'multipart/mixed; boundary='+boundary,
			'X-Experience-API-Version': '1.0.2'
		},
		body: body
	},

	function(err, res, body)
	{
		if(err)
			console.error(err);
		else
			console.log(res.statusCode, body);
	}
);
