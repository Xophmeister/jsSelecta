// Unit Tester for jsSelecta
// Christopher Harrison

/* 
 
  Test Definitions JSON Syntax:

  [
    {
      "id":        String (optional),
      "input":     Array of objects,
      "transform": [
                     {
                       "fn":   String,
                       "args": Array of function arguments
                     },
                     ...
                   ],
      "expected":  Array of objects
    },
    ...
  ]

*/

(function(root, undefined) {
  var contains = function(a, b) {
        var passed = true;

        for (var x in a) {
          if (a.hasOwnProperty(x)) {
            passed = passed && b.hasOwnProperty(x)
                            && (a[x] === b[x]);
          }
        }

        return passed;
      },
      
      equals = function(a, b) {
        var passed = true,
            i, n = a.length;

        if (n == b.length) {
          for (i = 0; i < n; ++i) {
            passed = passed && contains(a[i], b[i])
                            && contains(b[i], a[i]);
          }
        } else {
          passed = false;
        }

        return passed;
      },

      test = function(tests, callback) {
        var i, n = tests.length;

        for (i = 0; i < n; ++i) {
          // Create jsSelecta object
          var output = selecta(tests[i].input),
              j, m = tests[i].transform.length;

          // Perform transformations
          for (j = 0; j < m; ++j) {
            output = output[tests[i].transform[j].fn].apply(output, tests[i].transform[j].args);
          }

          // Callback with comparison result
          callback(tests[i].id || i, equals(output, tests[i].expected));
        }
      };

  // Instantiate
  if (typeof module !== 'undefined' && module.exports) {
    // CommonJS Module (e.g., for node.js)
    var selecta = require('../jsSelecta');
    module.exports = test;
  } else if (typeof define !== 'undefined' && define.amd) {
    // AMD Module (e.g., for RequireJS)
    define('test', ['../jsSelecta'], function() { return test; });
  } else {
    // Otherwise instantiate in global namespace
    if (root.hasOwnProperty('test')) {
      throw new Error('Cannot instantiate unit tester: Namespace collision.');
    } else if (!root.hasOwnProperty('selecta')) {
      throw new Error('Cannot instantiate unit tester: Dependencies not available.');
    } else {
      var selecta = root.selecta;
      root.test = test;
    }
  }
})(this);
