---
title: "Function currying in JavaScript"
date: "2021-03-29"
cover: "apply-bind-call.png"
tags: "javascript, currying, bind, closure"
author: "Bharat Sahu"
---

In Mathematics and Computer Science, currying is the technique of converting a function that takes multiple arguements into a sequence of functions that each take a single argument.

For example, Given a function with 3 parameters, The curried version will take one argument and returns a function that takes the next argument, which return a function that takes the third argument. The last function returns the result of applying function to all of the arguments. we can do it for more or fewer parameters.

To see the benefit of currying we are going to write an example that is useful for logging, for now we're going to only `console.log`, you can further implement it for actual loggings like in server, or in any log file.

```js
    function log (date) {
        return function (mode) {
            return function (message) {
                console.log(`[${date.getHours()}:${date.getMinutes()}] [${mode}] ${message}`)
            }
        }
    }
```

We can make it call like this

```js
    log(new Date())("DEBUG")("some debug")
    // [HH:mm] [DEBUG] some debug
```

`logNow()` will be the partial of log with fixed first argument

```js
    let logNow = log(new Date())
```

We can use it as

```js
    logNow("INFO")("message")
    // [HH:mm] [INFO] message
```

Or

```js
    let debugNow = logNow("DEBUG")

    debugNow("message")
    // [HH:mm] [DEBUG] message
```

See, we can easily generate a partial function for today's log when called with one argument (like `log(date)`) or two arguments (like `logNow(mode)(message)`).

The `logNow` function takes one arguement, and then returns a partial application of itself with `date` fixed in the `Closure scope`.

A Closure is a function bundled with its lexical scope. The Closures created at runtime while function creation.

Let's see another simple and beautiful example of currying using `bind()` method. we're going define a method which will add two numbers.

```js
    function add (a, b) {
        console.log(a + b)
    }
```
Now we're going to create an increment method by using `bind()`, means any number we pass and it will increment it by 1.

```js
    let increment = add.bind(this, 1)
    increment(5)
    // 6
```
See we didn’t lose anything after currying: `add` is still callable normally.

Similarly we can specialize number of method using currying, The method below will increment any number by 10.

```js
    add.bind(this, 10)(5)
    // 15
```

### References:
- https://en.wikipedia.org/wiki/Currying
- https://javascript.info/currying-partials
- https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983