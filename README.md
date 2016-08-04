LRS Conformance Test Suite
==========================

### Description

This is a NodeJS project that tests the 'MUST' requirements of the [xAPI Spec](https://github.com/adlnet/xAPI-Spec) and is based on the ADL [testing requirements](https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md) repository. This is actively being developed and new tests will be periodically added based on the testing requirements. Currently, this test suite only supports basic authentication. This test suite should also not run against a production LRS endpoint because the data is persisted and never voided.

### Installation  

Dependency  
This requires npm for installation.  NodeJS version 4.x or later.

Clone and install

```bash
$ git clone https://github.com/adlnet/lrs-conformance-test-suite.git
$ cd lrs-conformance-test-suite
$ npm install
```

Verify installation
```bash
$ node bin/console_runner.js --help

  Usage: console_runner [options]

  Options:

    -h, --help                         output usage information
    -V, --version                      output the version number
    -e, --endpoint [url]               xAPI endpoint
    -u, --authUser [string]            Basic Auth Username
    -p, --authPassword [string]        Basic Auth Password
    -a, --basicAuth                    Enable Basic Auth
    -o, --oAuth1                       Enable oAuth 1
    -c, --consumer_key [string]        oAuth 1 Consumer Key
    -s, --consumer_secret [string]     oAuth 1 Consumer Secert
    -r, --request_token_path [string]  Path to OAuth request token endpoint (relative to endpoint)
    -t, --auth_token_path [string]     Path to OAuth authorization token endpoint (relative to endpoint)
    -l, --authorization_path [string]  Path to OAuth user authorization endpoint (relative to endpoint)
    -g, --grep [string]                Only run tests that match the given pattern
    -b, --bail                         Abort the battery if one test fails
    -d, --directory [value]            Specific directories of tests (as a comma seperated list with no spaces)
```

### Running Test Suite

Example:

```bash
$ node bin/console_runner.js -e http://localhost/xapi -a true -u username -p password
-or-
$ node bin/console_runner.js --endpoint http://localhost/xapi --basicAuth true --authUser username --authPass password
```


### License
MIT License

>Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

>The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
