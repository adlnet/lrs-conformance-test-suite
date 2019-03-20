"use strict";
var comb = require("comb"),
    isString = comb.isString,
    merge = comb.merge,
    http = require("http"),
    https = require("https"),
    methods = require("methods"),
    util = require('util'),
    request = require("request");


var port = 3234, Test;

var getCookie = function (name, jar, url) {
    return jar["_jar"].getCookiesSync(url).filter(function (cookie) {
        return cookie.key === name;
    })[0];
};

var promiseInstance = {
    constructor: function (test) {
        this._super(arguments);
        this._test = test;
    }
};

methods.forEach(function (method) {
    var name = 'delete' === method ? 'del' : method;
    method = method.toUpperCase();
    promiseInstance[name] = function (url) {
        var test = this._test;
        return new Test(test.app, method, url).wait(this).jar(test._jar);
    };
});


var TestPromise = comb.define(comb.Promise, {
    instance: promiseInstance
});

Test = comb.define(null, {
    instance: {

        _wait: null,

        constructor: function (app, method, path) {
            this.method = method;
            var self = this._static;
            this.app = app;
            if (isString(app)) {
                this._baseUrl = app;
            } else {
                var addr = app.address();
                var portno = addr ? addr.port : self.PORT++;
                if (!addr) {
                    app.listen(portno);
                }
                var protocol = app instanceof https.Server ? 'https' : 'http';
                this._baseUrl = protocol + '://127.0.0.1:' + portno;
            }
            this._url = this._baseUrl + path;
            this._expects = [];
            this._options = {};
            this._jar = request.jar();
            self.REQUEST_OPTIONS.forEach(function (opt) {
                if (!(opt in this)) {
                    this[opt] = function (value) {
                        this._options[opt] = value;
                        return this;
                    };
                }
            }, this);
        },

        jar: function (jar) {
            this._jar = jar;
            return this;
        },

        upload: function (file) {
            this._upload = merge({}, file);
            return this;
        },

        wait: function (promise) {
            this._wait = promise;
            return this;
        },

        expect: function (field, val, cb) {
            var self = this;
            var dummyObject = {};
            Error.captureStackTrace(dummyObject, self.expect);

            var v8Handler = Error.prepareStackTrace;
            Error.prepareStackTrace = function (dummyObject, v8StackTrace) {
                return v8StackTrace;
            };

            var dummyObjectStack = dummyObject.stack;

            Error.prepareStackTrace = v8Handler;
          
            var stack = "can't capture errors";
            if(dummyObject.stack && dummyObjectStack[0].getFileName)
            {
                stack = "at (" + dummyObjectStack[0].getFileName() + ":" + dummyObjectStack[0].getLineNumber() + ":" + dummyObjectStack[0].getColumnNumber() + ")";
            }
           
            var args = comb.argsToArray(arguments);
            cb = comb.isFunction(args[args.length - 1]) ? args.pop() : null;
            if (field === cb) {
                cb = null;
                args.push(cb);
            }
            if (args.length === 2 && ["cookie", "!cookie"].indexOf(field) === -1) {
                if (comb.isNumber(field)) {
                    this._expects.push(["status", field, stack]);
                    this._expects.push(["body", val, stack]);
                } else {
                    this._expects.push(["header", field, val, stack]);
                }
            } else if (args.length === 1) {
                this._expects.push([comb.isNumber(field) ? "status" : "body", field, stack]);
            } else {
                args.push(stack);
                this._expects.push(args);
            }

            if (cb) {
                return this.end(cb);
            }
            return this;
        },

        _parseExpect: function (res, body, promise) {
            var headers = res.headers;

            comb.async.array(this._expects).forEach(function (expect) {
                switch (expect[0]) {
                case "cookie":
                    //testing for cookies
                    var key = expect[1], val = expect[2], cookie = getCookie(key, this._jar, this._baseUrl);
                    if (comb.isUndefined(cookie)) {
                        throw new Error("expected cookie " + key + " to be present");
                    }
                    if (val) {
                        if (comb.isHash(val) && !comb.deepEqual(cookie, val)) {
                            throw new Error("expected cookie " + key + " to equal " + JSON.stringify(val) + "\n" + expect[3]);
                        } else if (cookie.value === val) {
                            throw new Error("expected cookie " + key + " value to equal " + val);
                        }
                    }
                    break;
                case "!cookie":
                    //testing for cookies
                    key = expect[1];
                    if (!comb.isUndefinedOrNull(getCookie(key, this._jar, this._baseUrl))) {
                        throw new Error("expected cookie " + key + " to be null or undefined " + "\n" + expect[2]);
                    }
                    break;
                case "header":
                    //it is a header test
                    var header = expect[1].toLowerCase();
                    val = expect[2];
                    if (header in headers) {
                        if (comb.isRexExp(val)) {
                            if (!val.test(headers[header])) {
                                throw new Error('Expected "' + expect[1] + '" matching ' + val + ', got "' + headers[header] + '"' + "\n" + expect[3]);
                            }
                        } else {
                            if (header === "location") {
                                var actual = headers[header];
                                if (!comb.deepEqual(actual, val)
                                    && !comb.deepEqual(actual, this._baseUrl + val)
                                    && !comb.deepEqual(actual, this._baseUrl.replace(/^http[s]?:/, "") + val)) {
                                    throw new Error([
                                        'Expected "', expect[1], '" of "' + val, '", got "', headers[header], '"'
                                    ].join("") + "\n" + expect[3]);
                                }
                            } else if (!comb.deepEqual(headers[header.toLowerCase()], val)) {
                                throw new Error([
                                    'Expected "', expect[1], '" of "' + val, '", got "', headers[header], '"'
                                ].join("") + "\n" + expect[3]);
                            }
                        }
                    } else {
                        throw new Error('Expected "' + expect[1] + '" header field' + "\n" + expect[3]);
                    }
                    break;
                case "body":
                    val = expect[1];
                    if (comb.isHash(val)) {
                        //the body should be json
                        var json;
                        try {
                            json = comb.isString(body) ? JSON.parse(body.replace(/\\n/g, "")) : body;
                        } catch (e) {
                            throw new Error("Unable to parse " + body + " to json");
                        }
                        if (!comb.deepEqual(json, val)) {
                            throw new Error(['Expected', util.inspect(val), 'response body, got', util.inspect(json)].join(" ") + "\n" + expect[2]);
                        }
                    } else if (comb.isFunction(val)) {
                        return val(body);
                    } else if (comb.isRegExp(val)) {
                        if (!val.test(body)) {
                            throw new Error(['Expected body', util.inspect(body), 'to match', util.inspect(val)].join(" ") + "\n" + expect[2]);
                        }
                    } else if (!comb.deepEqual(body, val)) {
                        //just assert the body
                        throw new Error(['Expected', util.inspect(val), 'response body, got', util.inspect(body)].join(" ") + "\n" + expect[2]);
                    }
                    break;
                case "status":
                    if (res.statusCode !== expect[1])
                        throw new Error(["Expected response status code to be", expect[1], "got", res.statusCode].join(" ") + "\n" + expect[2]);
                    break;

                }
            }, this, 1).then(function () {
                promise.callback(res, body);
            }, promise);

        },

        end: function (cb) {
            var ret = new TestPromise(this).classic(cb);
            var opts = comb.deepMerge({}, {jar: this._jar, method: this.method, url: this._url}, this._options);
            comb.when(this._wait).chain(function () {
                var r = request(opts, function (err, res, body) {

                    if(res && res.request)
                    {
                        var data = "";
                        if(err)
                        {
                            data += err + "\n";
                        }
                        data += ("REQUEST SUPERREQUEST")+ "\n";
                        data += ("_______________________________________")+ "\n";
                        
                       
                        data += (res.req._header)
                        if(res.request.body){
                                           
                            data += (res.request.body.toString("utf8"))+ "\n";
                            data += "\n";
                        }
                        
                        data += ("RESPONSE SUPERREQUEST")+ "\n";
                        data += ("_______________________________________")+ "\n";
                        data += ("HTTP/"+res.httpVersion +" "+ res.statusCode +" "+ res.statusMessage)+ "\n";
                        for(var i in res.headers)
                        {
                            data += (i + ": " +res.headers[i])+ "\n";
                        }
                        data += "\n";
                        data += (body) + "\n";
                        data += ("=======================================")+ "\n";
                        if(process.postMessage)
                        {
                            process.postMessage("data",data);
                        }

                        if (err) {
                            return ret.errback(err);
                        } else {
                            return this._parseExpect(res, body, ret);
                        }
                    }
                }.bind(this));
                r.setMaxListeners(0);
                var upload = this._upload;
                if (upload && !comb.isEmpty(upload)) {
                    var form = r.form();
                    comb(upload).forEach(function (value, key) {
                        form.append(key, value);
                    });
                }
            }.bind(this), ret.errback.bind(ret));
            return ret;
        }

    },

    "static": {
        PORT: 3234,
        REQUEST_OPTIONS: ["uri", "url", "qs", "headers", "body", "form", "json", "multipart", "followRedirect",
            "followAllRedirects", "maxRedirects", "encoding", "pool", "timeout", "oauth", "strictSSL", "jar", "aws", "auth", "rejectUnauthorized"]
    }

});


module.exports = function (app) {
    if (comb.isFunction(app)) {
        app = http.createServer(app);
    }
    var ret = {};
    methods.forEach(function (method) {
        var name = 'delete' === method ? 'del' : method;
        method = method.toUpperCase();
        ret[name] = function (url) {
            return new Test(app, method, url);
        };
    });
    return ret;

};


