var selecta = require('../jsSelecta'),
    tests   = require('./tests.json'),
    test    = require('./test.js');

console.log('jsSelecta Unit Tests: node.js');
test(tests, function(id, passed) {
  console.log('Test ' + id + ': ' + (passed ? 'Passed' : 'Failed'));
});
