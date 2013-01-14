# jsSelecta
Provides (yet another) LINQ-like interface to JavaScript arrays of
objects, to allow you to query them using a straightforward syntax.

## Usage
The `selecta` function takes one parameter: namely, an array of objects
(e.g., JSON data). It returns an augmented JavaScript array, so normal
array properties (e.g., `length`, `map()`, etc.) still apply; the only
exception is `sort`, which has been replaced with a custom method.

## Querying Data
jsSelecta augments the data array with a `where` method, which takes a
list of *disjunctive* criteria as arguments to the query and returns the
filtered augmented array. That is, if we have:

    selecta(data).where(a, b, c);

...our query will filter by `a || b || c`; where `a`, `b` and `c` are
plain objects that define *conjunctive* criteria. For example, if we
have:

    selecta(data).where({
      name: 'John Doe',
      age:  25
    });

...our query will return records where the `name` field is equal to
`John Doe` and the `age` field equals `25`. (Note that the type safe
equality operator (`===`) is used, unless specified otherwise.)
       
We can combine these arbitrarily. So, for example, if we want to search
for all males who are 25 and all females who are 22, we might write:

    selecta(data).where({gender: 'male', age: 25},
                        {gender: 'female', age: 22});

We can also use qualifiers with our conjunctive criteria for additional
fidelity. For example:

    selecta(data).where({age: selecta.between(18, 35)});

The following qualifiers (which are properties of the `selecta` object)
are available:

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
As mentioned, `Array.sort()` (but not `Array.prototype.sort()`) is
overridden by jsSelecta. The new `sort` function sorts based upon the
arguments, which denote field names, in ascending order. Modifiers are
available to change the sort order, by field:

    selecta(data).where(someCriteria).sort(selecta.desc('age',
                                           'surname');

The following modifiers (which are properties of the `selecta` object)
are available:

### `asc(field)`
Sort ascending; this is the default, so does not need to be specified
explicitly.

### `desc(field)`
Sort descending.

### `shuffle(field)`
Uniformly shuffle field values using the Fisher-Yates algorithm.
