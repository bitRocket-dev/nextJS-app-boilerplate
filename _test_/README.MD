# Jest Test Folder

This folder contains tests written using Jest (https://jestjs.io/).

## Running Tests

To run the tests, first install the required dependencies:

````
yarn
````
Then, run the following command:

````
yarn jest
````

This will run all tests in the `test` directory.

## Example Test


Here's an example test that checks that a function called `add` correctly adds two numbers:


```javascript
// example.test.js
const add = require('../add');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
````
This test assumes that there is a file called add.js in the parent directory that exports a function called add that adds two numbers.

You can modify this example test to test your own code. Make sure to update the require statement to point to the correct file.

Writing Tests
To write your own tests, create a new file in the test directory that ends with .test.js. Inside the file, use the test function provided by Jest to define a new test. You can use various matchers to check that your code produces the expected output.

```

**For more information on how to write tests using Jest, see the official documentation at [https://jestjs.io/docs/en/getting-started.](https://jestjs.io/docs/en/getting-started.) ***
