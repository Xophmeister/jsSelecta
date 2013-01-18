// jsSelecta
// Christopher Harrison (c) 2013
// MIT License

(function(root, undefined) {
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
            where:  function(/* Criteria */) {
                      // TODO
                      return this;
                    },

            order:  function(/* Field list */) {
                      // TODO
                      return this;
                    },

            rewind: function() { // ;)
                      return selecta(this.slice(0).reverse());
                    }
          },

    // Criteria qualifiers
    strong:  function(v) {
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

                 // Use Array.reduce instead?...
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

    // Sorting modifiers
    asc:     function(field) {
               return function(a, b) {
                 // Type safe (i.e., rather than 'a - b')
                 return a[field] < b[field] ? -1:
                        a[field] > b[field] ?  1:
                                               0;
               };
             },

    desc:    function(field) {
               return function(a, b) {
                 return a[field] < b[field] ?  1:
                        a[field] > b[field] ? -1:
                                               0;
               };
             },

    shuffle: function(field) {
               // TODO
               // Randomise is easy; not yet sure how to implement a
               // functional Fisher-Yates in the context of Array.sort,
               // though...
             }
  });

  // Enter selecta!
  if (typeof module !== 'undefined' && module.exports) {
    // CommonJS Module (e.g., for node.js)
    module.exports = selecta;
  } else if (typeof define !== 'undefined' && define.amd) {
    // AMD Module (e.g., for RequireJS)
    define(function() { return selecta; });
  } else {
    // Otherwise instantiate in global namespace
    if (root.hasOwnProperty('selecta')) {
      throw new Error('Cannot instantiate jsSelecta: Namespace collision.');
    } else {
      root.selecta = selecta;
    }
  }
})(this);
