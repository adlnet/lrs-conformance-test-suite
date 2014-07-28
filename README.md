#lrs-conformance-tests
=====================

### Description

This project tests the 'MUST' requirements of an LRS and is based on the ADL [testing requirements](https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md) repository.

### Installation

Install NodeJS testing dependencies.

```bash
$ npm install
```

### Configuration

The testing framework used in this project is [Mocha](http://visionmedia.github.io/mocha/). Add additional testing and reporting features by modifying the package.json test command.

```js
"scripts": {
  "test": "node_modules/mocha/bin/mocha test/test.js --reporter nyan"
}
```

### Running

At command line type:

```bash
$ npm test
```
