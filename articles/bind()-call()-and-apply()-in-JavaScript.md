---
title: "bind(), call() and apply() in JavaScript"
date: "2021-03-27"
cover: "apply-bind-call.png"
keywords: "Javascript, JS, bind, call, apply"
author: "Bharat Sahu"
---

The `this` keyword in JavaScript is not like other programming language's `this`, it behaves differently in different scenario.

Let's see this in example:

```js
    const name = {
        firstName: 'John',
        lastName: 'Doe',
        showFullName: function() {
                console.log(this.firstName + ' ' + this.lastName);
        }
    };
```

Try to execute `showFullName()` method

```js
    name.showFullName()
```

The outpout will be

```js
    John Doe
```

Calling the showFullName() method with the `name` object, so the this keyword refers to the `name` object.

Let’s assign the name object's `showFullName()` method to any identifier to use it without the `name` object.

```js
    const printName = name.showFullName
    printName()
```

So if we execute the above-mentioned code, the output:

```js
    undefined undefined
```

Shocked! Why this happening?

Here, we are storing a reference of `name.showFullName()` to `printName` variable. After that, we are calling it without an object reference, so this will now refer to the window (global) object or undefined (in strict mode).

Similarly, other examples are:

```js
    function DemoFunction() {
        console.log(this);
    }
    // Constructor invocation
    new DemoFunction(); // logs an instance of DemoFunction
```

```js
    const demoObject = {
        demoMethod() {
            console.log(this);
        }
    };
    // Method invocation
    demoObject.demoMethod(); // logs demoObject
```

```js
    function demoFunction() {
        console.log(this);
    }
    // Simple invocation
    demoFunction(); // logs global object (window)
```

So, The apply(), bind() and, call() is saviour here. Here the value of `this` equals to the first argument.

Now we define another name object as `name2`:

```js
    let name2 = {
        firstName: "Bharat",
        lastName: "Sahu"
    }
```

and define a separate `showFullName()` method:

```js
    let showFullName = function (city, state) {
        console.log(this.firstName + " " + this.lastName + " from " + city + ", " + state);
    }
```

### call()

The `call()` method calls a function with a given this value and arguments provided individually.

and we make call with call()  method:

```js
    showFullName.call(name2, 'Raipur', 'Chhattisgarh');
    // output: Bharat Sahu from Raipur, Chhattisgarh
```

### apply()

similar to `call()`, but expects an array of all of our parameters.

```js
    showFullName.apply(name2, ['Raipur', 'Chhattisgarh']);
    // output: Bharat Sahu from Raipur, Chhattisgarh
```

### bind()

The `bind()` method creates a new function that, when called, has its this keyword set to the provided value. 

```js
    // bind, when we need to call method later
    const showMyName = showFullName.bind(name2, 'Raipur', 'Chhattisgarh');
    showMyName();
    // output: Bharat Sahu from Raipur, Chhattisgarh
```

The full code snippets will be:

```js
    let name2 = {
        firstName: "Bharat",
        lastName: "Sahu"
    }

    let showFullName = function (city, state) {
        console.log(this.firstName + " " + this.lastName + " from " + city + ", " + state);
    }

    showFullName.call(name2, 'Raipur', 'Chhattisgarh');
    // output: Bharat Sahu from Raipur, Chhattisgarh

    showFullName.apply(name2, ['Raipur', 'Chhattisgarh']);
    // output: Bharat Sahu from Raipur, Chhattisgarh

    const showMyName = showFullName.bind(name2, 'Raipur', 'Chhattisgarh');
    showMyName();
    // output: Bharat Sahu from Raipur, Chhattisgarh
```



### References:
- [Function.prototype.apply()][apply]
- [Function.prototype.bind()][bind]
- [Function.prototype.call()][call]

<!-- Links -->
[apply]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
[call]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
[bind]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind