LRS Conformance Tests

### Description

This is a NodeJS project that tests the 'MUST' requirements of the [xAPI Spec](https://github.com/adlnet/xAPI-Spec) and is based on the ADL [testing requirements](https://github.com/adlnet/xAPI_LRS_Test/blob/master/TestingRequirements.md) repository. This is actively being developed and new tests will be periodically added based on the testing requirements. Currently, this test suite does not support authenticated LRS endpoints. This test suite should also not run against a production LRS endpoint because the data is persisted and never voided.

### Installation

In the project working directory run the following commands.

```bash
$ npm install
$ npm link
```

Verify installation
```bash
$ lrs-test --help

Usage: lrs-test [options]

Options:

  -h, --help             output usage information
  -V, --version          output the version number
  -e, --endpoint <path>  The LRS connection string
```

### Running Test Suite

Example:

```bash
$ lrs-test --endpoint http://localhost/lrs
```

### Creating/Exending Test Suite

Everything within the config array defines a test that validates the requirement.
* The 'name' key describes the test.
* The 'json' key is used to pass in a JSON object without templating.
* The 'expect' key is an array with values that are applied to super-request expect().
* The 'template' key is an array of JSON objects (Currently only supporting JSON objects with one key).
    * Items in template use a single key with a reference to the JSON file to construct the template object.  Then values are overriden by subsequent items in array.  Template JSON files are referenced with a prefix of '{{' folder of template (period) filename <without extension> and suffix '}}' i.e. '{{statements.default}}'.  Templates mappings are replaced with their JSON object.  The easiest way to create a JSON without a property is to create another template.

Examples how JSON objects are merged with subsequent items in array (Currently only supporting JSON objects with one key):

* Example 1 shows how the second item in array can modify a specific attribute's value in the first item's JSON value -

```
templates: [
    {
        statement: {
           actor: { key: 'value' },
           verb: { key: 'value' },
           object: { key: 'value' }
       }
    },
    {
        actor: { key: 'another_value' }
    }
]
```
The result are merged with the key 'actor' from the second item in array referencing the first item's value of 'actor' and the value is replaced -
```
{
    statement: {
       actor: { key: 'another_value' },
       verb: { key: 'value' },
       object: { key: 'value' }
   }
}
```
* Example 2 shows how the second item in array can add a specific attribute in the first item's JSON value -
```
templates: [
    {
        statement: {
           actor: { key: 'value' },
           verb: { key: 'value' },
           object: { key: 'value' }
       }
    },
    {
        actor: { another_key: 'value' }
    }
]
```
The result are merged with the key 'actor' from the second item in array referencing the first item's value of 'actor' and the their attributes are merged -
```
{
    statement: {
       actor: { key: 'value', another_key: 'value' },
       verb: { key: 'value' },
       object: { key: 'value' }
   }
}
```
* Example 3 shows how the second item in array is added to first item's JSON value -
```
templates: [
    {
        statement: {
           actor: { key: 'value' },
           verb: { key: 'value' },
           object: { key: 'value' }
       }
    },
    {
        another_key: 'value'
    }
]
```
The result are merged with the key from the second item in array is not found in the first item's value so default behavior is to merge -
```
{
    statement: {
       actor: { key: 'value' },
       verb: { key: 'value' },
       object: { key: 'value' },
       another_key: 'value'
   }
}
```

### License
MIT License
>Copyright (c) 2015 Riptide Software

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
