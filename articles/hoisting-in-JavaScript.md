---
title: "Hoisting in JavaScript"
date: "2021-04-05"
cover: "hoisting.png"
keywords: "javascript, js, hoisting, let, const, var"
author: "Bharat Sahu"
description: "When you use variables and functions before declaration without getting any error known to be as `Hoisting`."
---

Can you call any function before declaration? or can you use any variable before declaration?

If you coming from another programming language background like C, C++, or Java you will probably say *No*, but in the case of JavaScript, you can definitely access those variables and functions because of `Hoisting`.

When you use variables and functions before declaration without getting any error known to be as `Hoisting`.
See below:

```js
    greet() // Hello World!

    function greet() {
        console.log('Hello, World!')
    }
```
Similarly for variables

```js
    console.log(name) // undefined

    var name = 'John Doe'
```

Or

```js
    name = 'John Doe';
    console.log(name); //John Doe
    var name;
```

Yes! In the case of functions, it executing what should be executed, but for variables, it printing a special value `undefined`.

Maybe you're thinking it will show any variable which is written or not written in the current script but when you see below, We're trying to use a variable that is nowhere defined in our script, it's actually throwing an error:

```js
    console.log(noWhereDefinedVar) // ReferenceError: noWhereDefinedVar is not defined
```

Actually, it's happening because of JavaScript's execution behavior, whenever we start the execution of the current script or current function is executed in two phases first is the *Memory Creation Phase*, and another one is the *Code Execution Phase*.

So, in the *Memory Creation Phase* means before execution of code, memory allocated for all the variables and for the functions. The variables get special value i.e. `undefined` and functions literally copied in its allocated memory space and whenever *Memory Creation Phase* completed then only execution starts.

### What happens in the case of `let` and `const`?

The `let` and `const` also hoisted, but it behaves differently, we cannot use variable declared with `let` and `const` before initialization, cause `let` or `const` have a block level scope it is created in special memory space, example with let:

```js
    num = 1; // initialization.

    let num;
    // Throws ReferenceError: Cannot access 'a' before initialization
```

Example with const:

```js
    NUM = 1; // initialization.

    const NUM;
    // Throws SyntaxError: Missing initializer in const declaration
```

Best Practices:

- Use `let`/`const` over `var`. try to use these in priority is like `const` > `let` > `var`.
- Declare variable always on the top of the script/function, Try to avoid the use of variables before initialization.

Practice with the below code and answer me what will be the answer:

```js
    sayHello()

    var sayHello = function greet() { 
        console.log('Hello, World!')
    }
```

### References:
- https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
- https://en.wikipedia.org/wiki/JavaScript_syntax


<!-- 

for (var i = 0; i < 10; i++) {
  // do something
}

console.log(window.i)
// 10, its on the global object

Solution: IIFE

 -->