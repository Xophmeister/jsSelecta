/*
   jsSelecta

   Christopher Harrison (c) 2013
   MIT License

   Provides (yet another) LINQ-like interface to JavaScript arrays of
   objects, to allow you to query them using a straightforward syntax.

   selecta([Data Source])

     where([Criteria, ...])

       Filter the data source with the arguments, which defines a
       disjunctive list of conjunctive criteria. That is, if we have:

         .where(a, b, c)

       ...our query is "a OR b OR c"; whereby a, b and c are JavaScript
       objects that are all considered. For example, if we have:

         {name: 'John Doe', age: 25}

       ...our query is "name = 'John Doe' AND age = 25". (Note that,
       internally, the type safe equality operator (===) is used, unless
       specified otherwise.)
       
       Thus, for example, if we want to search for all males who are 25
       and all females who are 22, we would write:

         .where({gender: 'male', age: 25}, {gender: 'female', age: 22})

       We can also use modifiers with the conjunctive criteria for
       additional fidelity. For example:

         .where({age: selecta.between(18, 35)})

       These modifiers (properties of the selecta object) are documented
       herein:

         weak(value)
         Reverts to the non type safe equality operator (==)

         not(value)
         Matches the negation of value

         between(a, b, [strict = true])
         Matches values between a and b, exclusive; if strict is false,
         then performs an inclusive match

         greater(a, [strict = true]), lesser(a, [strict = true])
         Matches values greater than, or less than a, respectively; if
         strict is false, then we match >= and <=, respectively

         any(values...)
         Matches values equal to any value in the parameter list

         regex(regular expression)
         Matches strings that pass the regular expression

     sort([Field list])

       Sorts the returned data by the passed list of fields, in
       ascending order. Modifiers are available to change the sort order
       by field:

         .sort(selecta.desc('age'), 'surname')

       These modifiers (properties of the selecta object) are documented
       herein:

         asc(field)
         Sort ascending (default)

         desc(field)
         Sort descending

         shuffle(field)
         Uniformly shuffle field using the Fisher-Yates algorithm

     Note that what's returned by jsSelecta is an augmented array, thus
     the usual array methods (e.g., length, .map(), etc.) are available.

*/

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
    _criteria: function() {

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
