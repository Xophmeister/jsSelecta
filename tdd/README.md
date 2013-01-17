# jsSelecta Unit Tests
Unit tests are defined in `tests.json`, which are executed by the `test`
function in `test.js`. Environments are available to run the tests under
different module systems:

* `CommonJS.js` for CommonJS modules (e.g., `node CommonJS`).
* `AMD.html` for AMD modules within the browser, using RequireJS.
* `global.html` for global namespace modules within the browser.
