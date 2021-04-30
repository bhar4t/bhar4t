---
title: "What is prototype in JavaScript?"
date: "2021-04-22"
cover: "prototype-javascript.png"
keywords: "javascript, prototype, inheritance, chain, __proto__"
author: "Bharat Sahu"
description: "We often heard JavaScript is prototype-based language but what is prototype in JavaScript? Why it is known to be as prototype-based language?"
---

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

### What is `__proto__`?

The `__proto__` attribute used to assign the properties and methods from prototype template. Whenver we want to inherit propeties and methods from prototype template we can just assign it into child's `__proto__` attribute, You can directly understand this field by below example:

```js
const human = {
  teeth: 32,
};

const john = {
  __proto__: human,
  leg: 2,
};

console.log(john.teeth);
// 32
```

So, here in the above example we've created a `human` object and it have a field as `teeth` with value `32`, and we've also created another object as `john`, and it have 2 fields first is field `leg` and it have value as `2`, but here we want to inherit properties from `human` object in `john` object, so we've just assigned `human` into `john`'s `__proto__`.

Let's see how it printing the value.. whenever we access `john.teeth`, javascript engine will try to find the `teeth` field inside `john` object and when it didn't find, it will go to `john`'s `__proto__` and if `teeth` available, it will print the value.

So whenver the finding goes on various level, known to be as Prototypical Chain.

We've already seen the example, how to use the `prototype` property, how can we make available other properties and methods for newly created objects in the article [Polyfill for bind()-step-by-step][polyfill_for_bind].

### References:

- [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)

<!-- Links -->

[call_apply_bind]: https://bhar4t.com/articles/bind()-call()-and-apply()-in-JavaScript
[polyfill_for_bind]: https://bhar4t.com/articles/Polyfill-for-bind()-step-by-step
