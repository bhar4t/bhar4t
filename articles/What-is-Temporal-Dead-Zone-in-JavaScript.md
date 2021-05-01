---
title: "What is Temporal Dead Zone in JavaScript?"
date: "2021-05-01"
cover: "tdz.png"
keywords: "javascript, js, temporal, dead, zone, let, const, var, tdz"
author: "Bharat Sahu"
description: "The Temporal Dead Zone (TDZ) is a specific time between whenever we declare any variable using `let` keyword and initializing declared variable a value, the time span between these two events known to be as temporal dead zone."
---

Before starting this blog, I would recommend to read blog on [Hoisting in JavaScript][hoisting_in_javascript].

The Temporal Dead Zone (TDZ) is a specific time between whenever we declare any variable using `let` keyword and initializing declared variable a value, the time span between these two events known to be as temporal dead zone, whenever we try to use variable in between temporal dead zone state, we get `Reference Error` because it will be always unreachable for the particular time being till it gets initialized.

```js
console.log(num);

let num = 10;
```

In memory creation phase of the `num` will be hoisted inside the special memory area of Javascript engine, and in the second phase or code execution phase if engine try to execute above code value of num will be unreachable because the initialization happens in second line. so the line number 1st will give us an `Reference Error`.

### Why TDZ not with `const` and `var`?

Because of hoisting we can access any variable created using `var` even before it gets declared, and we get an special value as `undefined` because it attached to global object.

It doesn't mean variable created with `const` and `let` are not hoisted but in the case of `const` the initialization must be in the same line while declaring the variable.

### References:

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

<!-- Links -->

[hoisting_in_javascript]: https://bhar4t.com/articles/hoisting-in-JavaScript
