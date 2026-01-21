# JavaScript 'this' Keyword Behavior Comprehensive Guide

## The 4 Rules of 'this' Binding

The value of `this` in JavaScript is NOT determined by where a function is declared, but **how the function is invoked**.

---

### 1. Default Binding (Standalone Function Call)
When a function is called without any context object:
- In **non-strict mode**: `this` points to the global object (`window` in browsers, `global` in Node.js).
- In **strict mode (`'use strict'`)**: `this` is `undefined`.

```javascript
function show() {
  'use strict';
  return this; // undefined
}
```

---

### 2. Implicit Binding (Object Method Call)
When a function is called with a preceding context object (`obj.fn()`), `this` binds to that object:

```javascript
const user = {
  name: 'Marcus',
  getName() { return this.name; }
};
user.getName(); // 'Marcus'

// Pitfall: Losing implicit binding!
const detached = user.getName;
detached(); // undefined (or error in strict mode)
```

---

### 3. Explicit Binding (`call`, `apply`, `bind`)
Forces a function to execute with an explicitly chosen `thisArg`:

```javascript
function printRole() { return this.role; }
const admin = { role: 'Administrator' };
printRole.call(admin); // 'Administrator'
```

---

### 4. `new` Binding (Constructor Call)
When invoked with `new Constructor()`:
1. A brand new empty object is created.
2. Its `[[Prototype]]` is set to `Constructor.prototype`.
3. `this` is bound to the new object.
4. Returns the object (unless constructor explicitly returns another object).

---

### 5. Arrow Functions: Lexical `this`
Arrow functions do **NOT** have their own `this`. They inherit `this` lexically from the enclosing execution context at definition time:

```javascript
const timer = {
  seconds: 0,
  start() {
    setTimeout(() => {
      this.seconds++; // 'this' reliably refers to timer object
    }, 100);
  }
};
```
