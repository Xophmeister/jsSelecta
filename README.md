# jsSelecta
Provides (yet another) LINQ-like interface to JavaScript arrays of
objects, to allow you to query them using a straightforward syntax.

## Usage
The `selecta` function takes one parameter: namely, an array of objects
(e.g., JSON data). It returns an augmented JavaScript array, so normal
array properties (e.g., `length`, `map()`, etc.) still apply; the
extensions are documented herein.

## Querying Data
jsSelecta augments the data array with a `where` method, which takes a
list of *disjunctive* criteria as arguments to the query and returns the
filtered augmented array. That is, if we have:

    selecta(data).where(a, b, c);

...our query will filter by `a OR b OR c`; where `a`, `b` and `c` are
plain objects that define *conjunctive* criteria. For example, if we
have:

    selecta(data).where({
      name: 'John Doe',
      age:  25
    });

...our query will return records where the `name` field is equal to
`John Doe` and the `age` field equals `25`. (Note that the type safe
equality operator (`===`) is used, unless specified otherwise.)
       
We can combine these arbitrarily and jsSelecta will assess the logic
using short-circuit evaluation. So, for example, if we want to return
all males who are 25 and all females who are 22, we might write:

    selecta(data).where({gender: 'male', age: 25},
                        {gender: 'female', age: 22});

We can also use qualifiers with our conjunctive criteria for additional
fidelity. For example:

    selecta(data).where({age: selecta.between(18, 35)});

The following qualifiers (which are properties of the `selecta` object)
are available:

### `strong(value)`
Matches on type safe equality; this is the default, so does not need to
be specified explicitly.

### `weak(value)`
Matches on non type safe equality (i.e., reverts to `==`).

### `not(value)`
Matches against the negation.

### `between(a, b, [strict = true])`
Matches values between `a` and `b`, exclusive. If `strict` is false,
then we perform an inclusive match.

### `greater(a, [strict = true])`, `lesser(a, [strict = true])`
Matches values greater than, or less than `a`, respectively. If `strict`
is false, then we match `>=` and `<=`, respectively.

### `any(values...)`
Matches values equal to any value passed as an argument (cf., SQL `in`).

### `regex(regular expression)`
Matches strings that pass the regular expression.

### Custom Qualifiers
Custom qualifiers can also be easily defined: They are just functions
that take one argument (the field value being tested) and return a
Boolean denoting the success of the match. For example:

    var isType = function(type) {
      return function(fieldValue) {
        return Object.prototype.toString.call(fieldValue).match(/\[object (\w+)\])[1] === type;
      }
    };

    selecta(data).where({someField: isType('Array')});

## Sorting Data
As well as `Array.prototype.sort()`, jsSelecta defines a new sorting
method called `order`. This function sorts based upon its arguments,
which denote field names, in (by default) ascending order. Modifiers are
available to change the sort order, by field:

    selecta(data).where(someCriteria).order(selecta.desc('age'),
                                            'surname');

The following modifiers (which are properties of the `selecta` object)
are available:

### `asc(field)`
Sort ascending; this is the default, so does not need to be specified
explicitly.

### `desc(field)`
Sort descending.

### *TODO* `shuffle(field)`
Uniformly shuffle field values using the Fisher-Yates algorithm.

### Custom Ordering
Custom orders can also be easily defined: They are just functions that
take two [?...] arguments -- consecutive values of the field, for
comparison, say `a` and `b` -- and return the following:

* `0`, if the values are equal;
* `1` (or any positive number), if `a > b`;
* `-1` (or any negative number), if `a < b`.

For example:

    var ascNumeric = function(field) {
      return function(a, b) {
        return a[field] - b[field];
      };
    };

    selecta(data).order(ascNumeric('someField'));

## Miscellaneous
jsSelecta also provides the following functionality:

### Asynchronous Module Definition
AMD loading as a CommonJS/RequireJS module.

### Environmental Independence
Equivalent functionality in both the browser and node.js.

*TODO* NPM package

### Unit Testing
Unit test harnesses available for the browser (inline and AMD based) and
node.js. The same tests are done in each environment using a quick and
dirty comparator: Nothing fancy!

Note that the browser-based testers use jQuery. This is just for the
sake of DOM manipulation (i.e., updating the view) and, in the case of
the inline version, loading the tests from a JSON file.

### `selecta.rewind()`
This is a (shallow copying) synonym for `Array.reverse()`, it has no
real value beyond providing the ability to call:

    selecta(data).rewind();
