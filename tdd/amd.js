require(['jquery', 'test'], function ($, test) {
  $(document).ready(function() {
    var results = $('#results');

    $.getJSON('./tests.json', function(tests) {
      test(tests, function(id, passed) {
        var li = $('<li />').text('Test ' + id + ': ' + (passed ? 'Passed' : 'Failed'));
        results.append(li);
      });
    });
  });
});
