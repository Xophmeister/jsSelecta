require(['jquery', 'test'], function ($, test) {
  $(document).ready(function() {
    var results = $('#results');

    $.getJSON('./tests.json', function(tests) {
      test(tests, function(id, passed) {
        var li = $('<li />').html('Test ' + id + ': <span class="' + (passed ? 'pass">Passed' : 'fail">Failed') + '</span>');
        results.append(li);
      });
    });
  });
});
