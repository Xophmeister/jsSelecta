var tests = require('./tests.json'),
    test  = require('./test.js');

console.log('jsSelecta Unit Tests - CommonJS Module');
test(tests, function(id, passed) {
  console.log('\u001b[3' + (passed ? '2mPassed' : '1mFailed') + '\u001b[0m Test ' + id);
});
