LRS Conformance Test Suite
==========================

### Description

This is a NodeJS project that tests the 'MUST' requirements of the [xAPI Spec](https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-About.md#experience-api) and is based on the ADL [testing requirements](https://adl.gitbooks.io/xapi-lrs-conformance-requirements/content/) repository. This is actively being developed and new tests will be periodically added based on the testing requirements. Currently, this test suite only supports basic authentication. This test suite should also not run against a production LRS endpoint because the data is persisted and never voided.

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
    -z, --errors                       Results log of failing tests only
```

### Running the Test Suite

Example Basic Authentication:

```bash
$ node bin/console_runner.js -e <http://localhost/xapi> -a -u <username> -p <password>
-or-
$ node bin/console_runner.js --endpoint <http://localhost/xapi> --basicAuth --authUser <username> --authPass <password>
```

Example OAuth1 Authentication:

```bash
$ node bin/console_runner.js -e <http://localhost/xapi> -o -c <consumer_key> -s <consumer_secret> -r <request_token_path> -t <auth_token_path> -l <authorization_path>
-or-
$ node bin/console_runner.js --endpoint <http://localhost/xapi> --oAuth1 --consumer_key <consumer_key> --consumer_secret <consumer_secret> --request_token_path <request_token_path> --auth_token_path <auth_token_path> --authorization_path <authorization_path>
```

Example with Grep:

```bash
$ node bin/console_runner.js -a -e <http://localhost/xapi> -a -u <username> -p <password> -g "<string or pattern to match>"
-or-
$ node bin/console_runner.js --endpoint <http://localhost/xapi> --basicAuth --authUser <username> --authPass <password> --grep "<string or pattern to match>"
```

**Note:** Grep is a useful tool to run only specific tests or a group of tests which meet a specific pattern.  For example using a specific requirement number (XAPI-00113) or a specific section of the spec (Data 2.4.1).

Example using Option for Log Containing Only Errors:

```bash
$ node bin/console_runner.js -e <http://localhost/xapi> -a -u <username> -p <password> -z
-or-
$ node bin/console_runner.js --endpoint <http://localhost/xapi> --basicAuth --authUser <username> --authPass <password> --errors
```

**Note:** The default log contains results from every test run in the suite both passed and failed.  The --errors option filters the log to contain only tests which have failed.

## Contributing to the project
We welcome contributions to this project. Fork this repository, make changes, and submit pull requests. If you're not comfortable with editing the code, please [submit an issue](mailto:adlhelpdesk@adlnet.gov) and we'll be happy to address it.

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
