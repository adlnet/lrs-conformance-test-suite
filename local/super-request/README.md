[![build status](https://secure.travis-ci.org/doug-martin/super-request.png)](http://travis-ci.org/doug-martin/super-request)

# Super Request

`super-request` is a [`supertest`](https://github.com/visionmedia/supertest) inspired HTTP assertion tester.

## About

`super-request` is very similar to `supertest` except that it leverages the [`request`](https://github.com/mikeal/request) module and supports sessions and chaining of HTTP requests.

## Installation

`npm install super-request`

## Example

```javascript

var request = require('super-request'),
	express = require('express');

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
	//after we logged in perform this request in the same session!
	.get("/")
	.expect(200, "loggedIn")
	.end(function(err){
		if(err){
			throw err;
		}
	});
```

## Using with testing frameworks

### Mocha

Here is an example using with `mocha`.

```javascript
describe('GET /users', function(){
  it('respond with json', function(done){
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})
```

`super-request` also returns a promise so you can use it with promise based test frameworks here is an an example using `it` and returning a promise.

```javascript

it.describe('GET /users', function(it){
  it.should('respond with json', function(){
    return request(app)
      	.get('/user')
      	.set('Accept', 'application/json')
      	.expect('Content-Type', /json/)
      	.expect(200)
      	.end();
  });
});

```


## API

**`.expect(status[, fn])`**

Assert response status code.

**`.expect(status, body[, fn])`**

Assert response status code and body.

**`.expect(body[, fn])`**

Assert response body text with a string, regular expression, or parsed body object.

**`.expect(field, value[, fn])`**

Assert header field value with a string or regular expression.

**`.end(fn)`**

Perform the request and invoke fn(err, res).

`super-request` is a wrapper on top of `request` so any options you can specify with request you can also set using the chainable api, by invoking a function with the same name as the option you wish to set.

**Methods** (see [`request`](https://github.com/mikeal/request))

* `uri` || `url` - fully qualified uri or a parsed url object from url.parse()
* `qs` - object containing querystring values to be appended to the uri
* `method` - http method, defaults to GET
* `headers` - http headers, defaults to {}
* `body` - entity body for POST and PUT requests. Must be buffer or string.
* `form` - when passed an object this will set `body` but to a querystring representation of value and adds `Content-type: application/x-www-form-urlencoded; charset=utf-8` header. When passed no option a FormData instance is returned that will be piped to request.
* `json` - sets `body` but to JSON representation of value and adds `Content-type: application/json` header.  Additionally, parses the response body as json.
* `multipart` - (experimental) array of objects which contains their own headers and `body` attribute. Sends `multipart/related` request. See example below.
* `followRedirect` - follow HTTP 3xx responses as redirects. defaults to true.
* `followAllRedirects` - follow non-GET HTTP 3xx responses as redirects. defaults to false.
* `maxRedirects` - the maximum number of redirects to follow, defaults to 10.
* `encoding` - Encoding to be used on `setEncoding` of response data. If set to `null`, the body is returned as a Buffer.
* `pool` - A hash object containing the agents for these requests. If omitted this request will use the global pool which is set to node's default maxSockets.
* `pool.maxSockets` - Integer containing the maximum amount of sockets in the pool.
* `timeout` - Integer containing the number of milliseconds to wait for a request to respond before aborting the request	
* `proxy` - An HTTP proxy to be used. Support proxy Auth with Basic Auth the same way it's supported with the `url` parameter by embedding the auth info in the uri.
* `oauth` - Options for OAuth HMAC-SHA1 signing, see documentation above.
* `strictSSL` - Set to `true` to require that SSL certificates be valid. Note: to use your own certificate authority, you need to specify an agent that was created with that ca as an option.
* `jar` - Set to `false` if you don't want cookies to be remembered for future use or define your custom cookie jar (see examples section)
* `aws` - object containing aws signing information, should have the properties `key` and `secret` as well as `bucket` unless you're specifying your bucket as part of the path, or you are making a request that doesn't use a bucket (i.e. GET Services)

```javascript
request(app)
	.post("/login")
	.form({username : "username", password : "password"})
	.expect(200)
	.expect({loggedIn : true})
	.end(function(err){
		if(err){
			throw err;
		}
	});

```

To upload data to a server 

```javascript
request(app)
	.post("/upload/csv")
	.headers({'content-type': 'multipart/form-data'})
	.multipart([
		{
			'Content-Disposition': 'form-data; name="file"; filename="my.csv"',
			'Content-Type': 'text/csv',
			body: fs.readFileSync(path.resolve(__dirname, "./assets/my.csv"))
		}
	])
	.expect(200)
	.expect("content-type", "text/plain")
	.end(function(err){
		if(err){
			throw err;
		}
	});
                
```

### Chaining requests

`super-request` supports chaining of requests, this is particularly useful if you need to login to your server and then perform a request.

```javascript
request(app)
	.post("/login")
	.form({username : "username", password : "password"})
	.expect(200)
	.expect({loggedIn : true})
	.end() //this request is done
	//now start a new one in the same session
	.get("/some/protected/route")
	.expect(200, {hello : "world"})
	.end(function(err){
		if(err){
			throw err;
		}
	});

```

**Note** You must call end on the current request before you can start a new one.

