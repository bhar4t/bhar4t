---
title: "Polyfill for bind(), step-by-step"
date: "2021-03-28"
cover: "implement-bind-polyfill.png"
tags: "Javascript, JS, Polyfill"
author: "Bharat Sahu"
---

Polyfill is nothing but support to older browsers which doesn't have new methods. In this tutorial, you'll learn how to write the Polyfill for the `bind()` method in step by step.

first of all, you need to see the `bind()` method, and how it works. look at the snippet below:

```js
    let name = {
        firstName: "John",
        lastName: "Doe"
    }

    function printFullName () {
        console.log(this.firstName + ' ' + this.lastName)
    }

    let printName = printFullName.bind(name)
```

If you need to create your own `bind()` method, you've to breakdown the above-mentioned snippet.

First, you need to make it available for all the method so we're going to take help from the `prototype` of `Function`, The snippet will be like:


```js
    Function.prototype.polyfill_bind = function () {
        //...
    }
```

Now `polyfill_bind()` will be available for any method you define in your code like other methods `toString()`, `toLocaleString()` etc.

And now we're able to make a call similar to the original `bind()` method:

```js
    printFullName.polyfill_bind(name)
```

Wait it is not completed yet! need to implement logic so it can work exactly like the `bind()` method. As we know the `bind()` method returns a method after creating a new copy of the original method so we make a function call later so we need to return a function whenever we make a call to our `polyfill_bind()`.

```js
    Function.prototype.polyfill_bind = function () {
        return function () {
            // ...
        }
    }

    let showName = printFullName.polyfill_bind(name);
    showName();
```

We have created the basic skeleton for our `polyfill_bind()` but, still we haven't implemented actual logic on how `bind()` works. So first we need to manage the function call we're trying to bind with the particular object.

```js
    Function.prototype.polyfill_bind = function () {
        let context = this;
        return function () {
            context.call(/* Need to pass arguments */)
        }
    }
```

As we know, the first argument for the `bind()` method is always an object for which the callee bind to be and it can be any number of argument so we can take it as [Rest parameter  or `varargs`][rest_parameters], then the above can be written as:

```js
    Function.prototype.polyfill_bind = function (...args) {
        let context = this;
        return function () {
            context.call(args[0])
        }
    }
```

We're almost there, we also need to take care of other arguments that can be passed with our `polyfill_bind()` and the method which copied using the `polyfill_bind()` method, and it can be any number of arguments so I'm converting it to `apply()` cause it is similar to `call() ` method but it takes an array as in argument:

```js
    Function.prototype.polyfill_bind = function (...args) {
        let context = this;
        let params = args.slice(1)
        return function (...args2) {
            context.apply(args[0], [...params, ...args2] )
        }
    }
```

Don't confuse here, we're using [Spread operator or the three-dot notation][spread_operator] to concat two arrays here. The first array is `param`, we sliced out the first element from it, and the second array is `args2`, which we're taking as the argument from the method, i.e. `showName(value1, value2, …valueN)`.

Or we can make it with `call()` method version by replacing line `context.apply(args[0], [...params, ...args2] )` with:

```js
    context.call(args[0], ...params, ...args2)
```

So the full implementation of our polyfill for `bind()` is which works exactly like the `bind()` method:

```js
    let name = {
        firstName: "John",
        lastName: "Doe"
    }

    function printFullName (city, country) {
        console.log(this.firstName + ' ' + this.lastName + ' from ' + city + ', ' + country)
    }

    Function.prototype.polyfill_bind = function (...args) {
        let context = this;
        let params = args.slice(1)
        return function (...args2) {
            context.apply(args[0], [...params, ...args2] )
            // Or
            // context.call(args[0], ...params, ...args2)
        }
    }

    let showName = printFullName.polyfill_bind(name, 'Jabari village')
    showName('Wakanda');

    // Output: John Doe from Jabari village, Wakanda
```

### References:

[Function.prototype.apply()][apply]
<br>
[Function.prototype.bind()][bind]
<br>
[Function.prototype.call()][call]

<!-- Links -->
[rest_parameters]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
[spread_operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[apply]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
[call]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
[bind]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind