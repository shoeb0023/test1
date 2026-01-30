/**
 * Custom Polyfills for call, apply, and bind
 */

Function.prototype.myCall = function(thisArg, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not callable');
  }

  // Handle null/undefined thisArg
  thisArg = thisArg == null ? globalThis : Object(thisArg);

  const fnSymbol = Symbol('fn');
  thisArg[fnSymbol] = this;

  const result = thisArg[fnSymbol](...args);
  delete thisArg[fnSymbol];

  return result;
};

Function.prototype.myApply = function(thisArg, argsArray) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not callable');
  }

  thisArg = thisArg == null ? globalThis : Object(thisArg);

  const fnSymbol = Symbol('fn');
  thisArg[fnSymbol] = this;

  let result;
  if (!argsArray) {
    result = thisArg[fnSymbol]();
  } else {
    result = thisArg[fnSymbol](...argsArray);
  }

  delete thisArg[fnSymbol];
  return result;
};

Function.prototype.myBind = function(thisArg, ...boundArgs) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not callable');
  }

  const originalFn = this;

  function boundFunction(...callArgs) {
    // If called as constructor with 'new', 'this' should be the new instance
    const isNew = this instanceof boundFunction;
    const context = isNew ? this : thisArg;
    return originalFn.apply(context, [...boundArgs, ...callArgs]);
  }

  // Maintain prototype chain for 'new'
  if (originalFn.prototype) {
    boundFunction.prototype = Object.create(originalFn.prototype);
    boundFunction.prototype.constructor = boundFunction;
  }

  return boundFunction;
};

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing call, apply, and bind Polyfills ---');

  function greet(greeting, punctuation) {
    return greeting + ', ' + this.name + punctuation;
  }

  const user = { name: 'Sarah' };

  console.assert(greet.myCall(user, 'Hello', '!') === 'Hello, Sarah!', 'myCall failed');
  console.assert(greet.myApply(user, ['Hi', '?']) === 'Hi, Sarah?', 'myApply failed');

  const bound = greet.myBind(user, 'Hey');
  console.assert(bound('.') === 'Hey, Sarah.', 'myBind failed');

  // Test constructor with bound function
  function Person(age) {
    this.age = age;
  }
  const BoundPerson = Person.myBind({ dummy: true });
  const pInstance = new BoundPerson(25);
  console.assert(pInstance.age === 25, 'myBind constructor age failed');
  console.assert(pInstance instanceof Person, 'myBind constructor instanceof failed');

  console.log('✓ All call, apply, and bind tests passed!');
}

module.exports = {};
