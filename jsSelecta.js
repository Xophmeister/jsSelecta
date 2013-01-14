// jsSelecta
// Christopher Harrison (c) 2013
// MIT License

(function(root) {
  var extend = function(base, child) {
        // Shallow copy
        for (var x in child) {
          if (child.hasOwnProperty(x) && !base.hasOwnProperty(x)) {
            base[x] = child[x];
          }
        }
      },

      selecta = function(data) {
        if (Object.prototype.toString.call(data) !== '[object Array]') {
          throw new TypeError('Data source must be an array.');
        }

        extend(data, selecta._obj);
        return data;
      };

  extend(selecta, {
    _obj: {
            where: function(/* Criteria */) {

                   },

            sort:  function(/* Field list */) {
                     
                   }
          },

    // Criteria helpers
    _eq:     function() {

             },

    weak:    function(v) {

             },

    not:     function(v) {

             },

    between: function(a, b) {

             },

    greater: function(v, strict) {

             },

    lesser:  function(v, strict) {

             },

    any:     function(v) {

             },

    regex:   function(re) {

             },

    // Sorting helpers
    _sortBy: function(field, dir) {
               var out = {};
               out[field] = dir;

               return out;
             },

    asc:     function(field) {
               return this._sortBy(field, 1);
             },

    desc:    function(field) {
               return this._sortBy(field, -1);
             },

    shuffle: function(field) {

             }
  });

  root.selecta = selecta;
})(window);
