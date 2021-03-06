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

      factory = {
        extensions: {
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

        builder:  function(type) {
                    // Modifier factory
                    return function(fn) {
                      if (typeof fn != 'function') {
                        throw new TypeError(type + ' must be a function.');
                      }
                      this.test = fn;
                    };
                  }
      },

      selecta = function(data) {
        if (Object.prototype.toString.call(data) !== '[object Array]') {
          throw new TypeError('Data source must be an array.');
        }
        
        var output = data.slice(0); // Don't mutate data
        extend(output, factory.extensions);
        return output;
      };

  extend(selecta, {
    // Modifier builders
    WhereBuilder: factory.builder('Criteria qualifier'),
    OrderBuilder: factory.builder('Ordering modifier'),
     
    // Criteria qualifiers
    strong:  function(v) {
               return new this.WhereBuilder(function(fieldValue) {
                 return fieldValue === v;
               });
             },

    weak:    function(v) {
               return new this.WhereBuilder(function(fieldValue) {
                 return fieldValue == v;
               });
             },

    between: function(a, b /* strict */) {
               var strict = arguments.length == 3 ? arguments[2] : true;

               return new this.WhereBuilder(function(fieldValue) {
                 if (strict) {
                   return (fieldValue > a) && (fieldValue < b);
                 } else {
                   return (fieldValue >= a) && (fieldValue <= b);
                 }
               });
             },

    greater: function(v /* strict */) {
               var strict = arguments.length == 2 ? arguments[2] : true;

               return new this.WhereBuilder(function(fieldValue) {
                 if (strict) {
                   return fieldValue > v;
                 } else {
                   return fieldValue >= v;
                 }
               });
             },

    lesser:  function(v /* strict */) {
               var strict = arguments.length == 2 ? arguments[2] : true;

               return new this.WhereBuilder(function(fieldValue) {
                 if (strict) {
                   return fieldValue < v;
                 } else {
                   return fieldValue <= v;
                 }
               });
             },

    any:     function(/* Arguments */) {
               var vals = Array.prototype.slice.call(arguments);

               return new this.WhereBuilder(function(fieldValue) {
                 var matched = false;

                 for (var i = 0; i < vals.length; ++i) {
                   if (fieldValue === vals[i]) {
                     matched = true;
                     break;
                   }
                 }

                 return matched;
               });
             },

    regex:   function(re) {
               return new this.WhereBuilder(function(fieldValue) {
                 return re.test(fieldValue);
               });
             },

    // Negation
    not:     function(v) {
               if (v instanceof this.WhereBuilder) {
                 return new this.WhereBuilder(function(fieldValue) {
                   return !v.test(fieldValue);
                 });
               } else {
                 return this.not(this.strong(v));
               }
             },

    // Ordering modifiers
    asc:     function(field) {
               return new this.OrderBuilder(function(a, b) {
                 // Type safe (i.e., rather than 'a - b')
                 return a[field] < b[field] ? -1:
                        a[field] > b[field] ?  1:
                                               0;
               });
             },

    desc:    function(field) {
               return new this.OrderBuilder(function(a, b) {
                 return a[field] < b[field] ?  1:
                        a[field] > b[field] ? -1:
                                               0;
               });
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
