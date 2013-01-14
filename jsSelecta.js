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
                     /* TODO */
                   },

            sort:  function(/* Field list */) {
                     /* TODO */
                   }
          },

    // Criteria helpers
    _eq:     function(v) {
               return function(fieldValue) {
                 return fieldValue === v;
               };
             },

    weak:    function(v) {
               return function(fieldValue) {
                 return fieldValue == v;
               };
             },

    not:     function(v) {
               return function(fieldValue) {
                 return fieldValue !== v;
               };
             },

    between: function(a, b /* strict */) {
               var strict = arguments.length == 3 ? arguments[2] : true;

               return function(fieldValue) {
                 if (strict) {
                   return (fieldValue > a) && (fieldValue < b);
                 } else {
                   return (fieldValue >= a) && (fieldValue <= b);
                 }
               };
             },

    greater: function(v /* strict */) {
               var strict = arguments.length == 2 ? arguments[2] : true;

               return function(fieldValue) {
                 if (strict) {
                   return fieldValue > v;
                 } else {
                   return fieldValue >= v;
                 }
               };
             },

    lesser:  function(v /* strict */) {
               var strict = arguments.length == 2 ? arguments[2] : true;

               return function(fieldValue) {
                 if (strict) {
                   return fieldValue < v;
                 } else {
                   return fieldValue <= v;
                 }
               };
             },

    any:     function(/* Arguments */) {
               var vals = Array.prototype.slice.call(arguments);

               return function(fieldValue) {
                 var matched = false;

                 // Use Array.reduce instead?
                 for (var i = 0; i < vals.length; ++i) {
                   if (fieldValue === vals[i]) {
                     matched = true;
                     break;
                   }
                 }

                 return matched;
               };
             },

    regex:   function(re) {
               return function(fieldValue) {
                 return re.test(fieldValue);
               };
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
               /* TODO */
             }
  });

  root.selecta = selecta;
})(window);
