---
title: "What is prototype in JavaScript?"
date: "2021-04-22"
cover: "prototype-javascript.png"
keywords: "javascript, js, prototype, inheritance, chain"
author: "Bharat Sahu"
description: "We often heard JavaScript is prototype-based language but what is prototype in JavaScript? Why it is known to be as prototype-based language?"
---

[DRAFT]

The entire inheritance concept in JavaScript is based on prototype, prototype inheritence is whenever we create any `object` or `function` in JavaScript it automatically inherit properties and methods from certain template object or prototype object.

Here you can understand better, there are number of prototype objects in JavaScript (eg: `Array.prototype`, `Function.prototype`, `Object.prototype` etc.). So whenever we create any `array`, `function` or `object` JavaScript engine internally attaches the prototype template's properties and methods into your newly created object. that is why we can access in-built functionality of certain objects like when we create any `array` we get method like `push`, `map`, similarly for functions we get [`call`, `apply` and `bind`][call_apply_bind] and for objects we get `toString`, `hasOwnProperty` and etc.

In JavaScript everything is object, and every object has a property as `__proto__`, in this property you can see all properties and methods that acquired from another object or template object.

```js
let object = {};

console.log(object.__proto__);

// constructor: ƒ Object()
// hasOwnProperty: ƒ hasOwnProperty()
// isPrototypeOf: ƒ isPrototypeOf()
// propertyIsEnumerable: ƒ propertyIsEnumerable()
// toLocaleString: ƒ toLocaleString()
// toString: ƒ toString()
// valueOf: ƒ valueOf()
// __defineGetter__: ƒ __defineGetter__()
// __defineSetter__: ƒ __defineSetter__()
// __lookupGetter__: ƒ __lookupGetter__()
// __lookupSetter__: ƒ __lookupSetter__()
// get __proto__: ƒ __proto__()
// set __proto__: ƒ __proto__()
```

The output you are seeing here will be the same as `Object.prototype`.

<!-- Links -->

[call_apply_bind]: /articles/bind()-call()-and-apply()-in-JavaScript
