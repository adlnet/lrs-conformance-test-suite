LRS Conformance Tests
=====================

### Description

This is a NodeJS project that tests the 'MUST' requirements of an LRS and is based on the ADL [testing requirements](https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md) repository. This is not mean to be a comprehensive test. Currently, this test suite does not support authenticated LRS endpoints.

### Installation

Install NodeJS testing dependencies.

```bash
$ npm install
```

### Configuration

Modify the LRS endpoint variable in test/test.js, to point to the LRS you are testing.

```js
var LRS_ENDPOINT = 'http://testclient.elmnts-test.com/lrs';
```

#### Test Reports
The testing framework used in this project is [Mocha](http://visionmedia.github.io/mocha/). Add additional testing and reporting features by modifying the package.json test command.

```js
"scripts": {
  "test": "node_modules/mocha/bin/mocha test/test.js --reporter nyan"
}
```

List of [Mocha commands](http://visionmedia.github.io/mocha/#mocha.opts)

### Running Tests

At command line type:

```bash
$ npm test
```

### License
MIT License
>Copyright (c) Riptide Software

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
