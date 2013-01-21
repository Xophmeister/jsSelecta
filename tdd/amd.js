require(['jquery', 'test'], function ($, test) {
  $(document).ready(function() {
    var results = $('#results');

    $.getJSON('./tests.json', function(tests) {
      test(tests, function(id, passed) {
        var li = $('<li />').html('<span class="' + (passed ? 'pass">\u2714' : 'fail">\u2718') + '</span>Test ' + id);
        results.append(li);
      });
    });
  });
});
