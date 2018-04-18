"use strict";

var request = require('..'),
    https = require('https'),
    fs = require('fs'),
    path = require('path'),
    express = require('express'),
    assert = require("assert"),
    it = require("it");

it.describe("request", function (it) {

    it.describe('request(url)', function (it) {
        it.should('should be supported', function (done) {
            var app = express(), s;

            app.get('/', function (req, res) {
                res.send('hello');
            });

            s = app.listen(function () {
                var url = 'http://localhost:' + s.address().port;
                request(url)
                    .get('/')
                    .expect("hello", done);
            });
        });
    });

    it.describe('request(app)', function (it) {
        it.should('should fire up the app on an ephemeral port', function (done) {
            var app = express();

            app.get('/', function (req, res) {
                res.send('hey');
            });

            request(app)
                .get('/')
                .end(function (err, res) {
                    assert.equal(res.statusCode, 200);

                    assert.equal(res.body, 'hey');
                    done();
                });
        });

        it.should('should work with an active server', function (done) {
            var app = express(), server;

            app.get('/', function (req, res) {
                res.send('hey');
            });

            server = app.listen(4000, function () {
                request(server)
                    .get('/')
                    .end(function (err, res) {
                        assert.equal(res.statusCode, 200);
                        assert.equal(res.body, 'hey');
                        done();
                    });
            });
        });

        it.should('should work with remote server', function (done) {
            var app = express();

            app.get('/', function (req, res) {
                res.send('hey');
            });

            app.listen(4001, function () {
                request('http://localhost:4001')
                    .get('/')
                    .end(function (err, res) {
                        assert.equal(res.statusCode, 200);
                        assert.equal(res.body, 'hey');
                        done();
                    });
            });
        });

        it.should('should work with a https server', function (done) {
            var app = express(), fixtures = path.join(__dirname, 'fixtures'), server;

            app.get('/', function (req, res) {
                res.end('hey');
            });

            server = https.createServer({
                key: fs.readFileSync(path.join(fixtures, 'test_key.pem')),
                cert: fs.readFileSync(path.join(fixtures, 'test_cert.pem'))
            }, app);

            request(server)
                .get('/')
                .rejectUnauthorized(false)
                .expect(200)
                .end(function (err, res) {
                    assert.isNull(err);
                    assert.equal(res.statusCode, 200);
                    assert.equal(res.body, 'hey');
                    done();
                });
        });

        it.should('should work with .form() etc', function (done) {
            var app = express();

            app.use(express.bodyParser());

            app.post('/', function (req, res) {
                res.send(req.body.name);
            });

            request(app)
                .post('/')
                .form({ name: 'tobi' })
                .expect('tobi', done);
        });

        it.should('should work when unbuffered', function (done) {
            var app = express();

            app.get('/', function (req, res) {
                res.end('Hello');
            });

            request(app)
                .get('/')
                .expect('Hello', done);
        });

        it.should('should default redirects to 0', function (done) {
            var app = express();

            app.get('/', function (req, res) {
                res.redirect('/login');
            });

            request(app)
                .get('/')
                .followRedirect(false)
                .expect(302, done);
        });

        it.should("support chaining of requests", function (done) {
            var app = express();

            app.get('/hello', function (req, res) {
                res.end('Hello');
            });

            app.get('/world', function (req, res) {
                res.end('World');
            });

            request(app)
                .get('/hello')
                .expect('Hello')
                .end()
                .get("/world")
                .expect("World", done);
        });

        it.should("support sessions", function (done) {
            var app = express();
            app.use(express.cookieParser());
            app.use(express.cookieSession({secret: "super-request123"}));

            app.get('/login', function (req, res) {
                req.session.loggedIn = true;
                res.send("logged in");
            });

            app.get('/', function (req, res) {
                if (req.session.loggedIn) {
                    req.session.loggedIn = true;
                    res.send("loggedIn");
                } else {
                    res.send("notLoggedIn");
                }
            });

            request(app)
                .get('/login')
                .expect(200, "logged in")
                .end()
                .get("/")
                .expect(200)
                .expect("loggedIn")
                .end(done);
        });

        it.describe('.expect(status[, fn])', function (it) {
            it.should('should assert the response status', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send('hey');
                });

                request(app)
                    .get('/')
                    .expect(404)
                    .end(function (err) {
                        var expectedMessage = "Expected response status code to be 404 got 200";
                        if (err.message.indexOf(expectedMessage) < 0) {
                            assert.fail(err.message, expectedMessage);
                        }
                        done();
                    });
            })
        });

        it.describe('.expect(status)', function (it) {
            it.should('should assert only status', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send('hey');
                });

                request(app)
                    .get('/')
                    .expect(200)
                    .end(done)
            })
        });

        it.describe('.expect(status, body[, fn])', function (it) {
            it.should('should assert the response body and status', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send('foo');
                });

                request(app)
                    .get('/')
                    .expect(200, 'foo', done)
            });

            it.describe("when the body argument is an empty string", function (it) {
                it.should("should not quietly pass on failure", function (done) {
                    var app = express();

                    app.get('/', function (req, res) {
                        res.send('foo');
                    });

                    request(app)
                        .get('/')
                        .strictSSL(false)
                        .expect(200, '')
                        .end(function (err) {
                            var expectedMessage = 'Expected \'\' response body, got \'foo\'';
                            if (err.message.indexOf(expectedMessage) < 0) {
                                assert.fail(err.message, expectedMessage);
                            }
                            done();
                        });
                });
            });
        });

        it.describe('.expect(body[, fn])', function (it) {
            it.should('should assert the response body', function (done) {
                var app = express();

                app.set('json spaces', 0);

                app.get('/', function (req, res) {
                    res.send({ foo: 'bar' });
                });

                request(app)
                    .get('/')
                    .expect('hey')
                    .end(function (err) {
                        var expectedMessage = 'Expected \'hey\' response body, got \'{"foo":"bar"}\'';
                        if (err.message.indexOf(expectedMessage) < 0) {
                            assert.fail(err.message, expectedMessage);
                        }
                        done();
                    });
            });

            it.should('should assert the response text', function (done) {
                var app = express();

                app.set('json spaces', 0);

                app.get('/', function (req, res) {
                    res.send({ foo: 'bar' });
                });

                request(app)
                    .get('/')
                    .expect('{"foo":"bar"}', done);
            });

            it.should('should assert the parsed response body', function (done) {
                var app = express();

                app.set('json spaces', 0);

                app.get('/', function (req, res) {
                    res.send({ foo: 'bar' });
                });

                request(app)
                    .get('/')
                    .expect({ foo: 'baz' })
                    .end(function (err) {
                        var expectedMessage = 'Expected { foo: \'baz\' } response body, got { foo: \'bar\' }';
                        if (err.message.indexOf(expectedMessage) < 0) {
                            assert.fail(err.message, expectedMessage);
                        }
                        request(app)
                            .get('/')
                            .expect({ foo: 'bar' })
                            .end(done);
                    });
            });

            it.should('should support regular expressions', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send('foobar');
                });

                request(app)
                    .get('/')
                    .expect(/^bar/)
                    .end(function (err) {
                        var expectedMessage = 'Expected body \'foobar\' to match /^bar/';
                        if (err.message.indexOf(expectedMessage) < 0) {
                            assert.fail(err.message, expectedMessage);
                        }
                        done();
                    });
            });

            it.should('should assert response body multiple times', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send('hey tj');
                });

                request(app)
                    .get('/')
                    .expect(/tj/)
                    .expect('hey')
                    .expect('hey tj')
                    .end(function (err) {
                        var expectedMessage = "Expected 'hey' response body, got 'hey tj'";
                        if (err.message.indexOf(expectedMessage) < 0) {
                            assert.fail(err.message, expectedMessage);
                        }
                        done();
                    });
            });

            it.should('should assert response body multiple times with no exception', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send('hey tj');
                });

                request(app)
                    .get('/')
                    .expect(/tj/)
                    .expect(/^hey/)
                    .expect('hey tj', done);
            });
        });

        it.describe('.expect(field, value[, fn])', function (it) {
            it.should('should assert the header field presence', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send({ foo: 'bar' });
                });

                request(app)
                    .get('/')
                    .expect('Content-Foo', 'bar')
                    .end(function (err) {
                        var expectedMessage = 'Expected "Content-Foo" header field';
                        if (err.message.indexOf(expectedMessage) < 0) {
                            assert.fail(err.message, expectedMessage);
                        }
                        done();
                    });
            });

            it.should('should assert the header field value', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send({ foo: 'bar' });
                });

                request(app)
                    .get('/')
                    .expect('Content-Type', 'text/html')
                    .end(function (err) {
                        var expectedMessage = 'Expected "Content-Type" of "text/html", got "application/json; charset=utf-8"';
                        if (err.message.indexOf(expectedMessage) < 0) {
                            assert.fail(err.message, expectedMessage);
                        }
                        done();
                    });
            });

            it.should('should assert the header location value', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.redirect('/test');
                });

                request(app)
                    .get('/')
                    .expect("header", "location", "/test1")
                    .followRedirect(false)
                    .end(function (err) {
                        var expectedMessage = 'Expected "location" of "/test1", got "/test"';
                        if (err.message.indexOf(expectedMessage) < 0) {
                            assert.fail(err.message, expectedMessage);
                        }
                        done();
                    });
            });

            it.should('should assert multiple fields', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send('hey');
                });

                request(app)
                    .get('/')
                    .expect('Content-Type', 'text/html; charset=utf-8')
                    .expect('Content-Length', '3')
                    .end(done);
            });

            it.should('should support regular expressions', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send('hey');
                });

                request(app)
                    .get('/')
                    .expect('Content-Type', /^text\/html/)
                    .end(done);
            });

            it.should('should support failing regular expressions', function (done) {
                var app = express();

                app.get('/', function (req, res) {
                    res.send('hey');
                });

                request(app)
                    .get('/')
                    .expect('Content-Type', /^application/)
                    .end(function (err) {
                        var expectedMessage = 'Expected "Content-Type" matching /^application/, got "text/html; charset=utf-8"';
                        if (err.message.indexOf(expectedMessage) < 0) {
                            assert.fail(err.message, expectedMessage);
                        }
                        done();
                    });
            });
        });

        it.describe('.expect(cookie, name)', function (it) {
            it.should('should assert the cookie presence', function (done) {
                var app = express();
                app.use(express.cookieParser());
                app.use(express.cookieSession({secret: "super-request123"}));

                app.get('/login', function (req, res) {
                    req.session.loggedIn = true;
                    res.send("logged in");
                });

                app.get('/', function (req, res) {
                    if (req.session.loggedIn) {
                        req.session.loggedIn = true;
                        res.send("loggedIn");
                    } else {
                        res.send("notLoggedIn");
                    }
                });

                request(app)
                    .get('/')
                    .expect('cookie', 'connect.sess')
                    .end(done);
            });

            it.should('should return an error if the cookie is not present', function (done) {
                var app = express();
                app.use(express.cookieParser());
                app.use(express.cookieSession({secret: "super-request123"}));

                app.get('/login', function (req, res) {
                    req.session.loggedIn = true;
                    res.send("logged in");
                });

                app.get('/', function (req, res) {
                    if (req.session.loggedIn) {
                        req.session.loggedIn = true;
                        res.send("loggedIn");
                    } else {
                        res.send("notLoggedIn");
                    }
                });

                request(app)
                    .get('/')
                    .expect('cookie', 'connect.sid')
                    .end(function (err) {
                        assert.equal(err.message, "expected cookie connect.sid to be present");
                        done();
                    });
            });

            it.should('return an error if the cookie is not present', function (done) {
                var app = express();

                app.get('/login', function (req, res) {
                    res.send("logged in");
                });

                request(app)
                    .get('/login')
                    .expect('cookie', 'connect.sess')
                    .end(function (err) {
                        assert.equal(err.message, "expected cookie connect.sess to be present");
                        done();
                    });
            });

            it.should('should assert the cookie absence', function (done) {
                var app = express();

                app.get('/login', function (req, res) {
                    res.send("logged in");
                });

                request(app)
                    .get('/login')
                    .expect('!cookie', 'connect.sess')
                    .end(done);
            });
        });

    });

});