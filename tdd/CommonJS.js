var tests = require('./tests.json'),
    test  = require('./test.js');

console.log('jsSelecta Unit Tests (CommonJS Module)');
test(tests, function(id, passed) {
  console.log('Test ' + id + ': ' + (passed ? 'Passed' : 'Failed'));
});
