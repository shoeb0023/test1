/**
 * Custom Polyfill for Array.prototype.reduce
 * Specification: ECMA-262 22.1.3.18 Array.prototype.reduce(callbackfn [ , initialValue ])
 */

function myReduce(callback, initialValue) {
  if (this == null) {
    throw new TypeError('Array.prototype.myReduce called on null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0;
  let accumulator;

  // Determine accumulator and start index
  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    let kPresent = false;
    while (k < len && !kPresent) {
      if (k in O) {
        accumulator = O[k];
        kPresent = true;
      }
      k++;
    }
    if (!kPresent) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
  }

  while (k < len) {
    if (k in O) {
      accumulator = callback(accumulator, O[k], k, O);
    }
    k++;
  }

  return accumulator;
}

Array.prototype.myReduce = myReduce;

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Array.prototype.myReduce ---');

  const sum = [1, 2, 3, 4].myReduce((acc, curr) => acc + curr, 0);
  console.assert(sum === 10, 'Basic sum reduce failed');

  const product = [2, 3, 4].myReduce((acc, curr) => acc * curr);
  console.assert(product === 24, 'Reduce without initialValue failed');

  // Object tally accumulation
  const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
  const tally = fruits.myReduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
  }, {});
  console.assert(tally.apple === 3 && tally.banana === 2 && tally.orange === 1, 'Tally reduce failed');

  // Empty array without initial value check
  let threw = false;
  try {
    [].myReduce(x => x);
  } catch (e) {
    threw = e instanceof TypeError;
  }
  console.assert(threw, 'Expected TypeError on empty array with no initial value');

  console.log('✓ All Array.prototype.myReduce tests passed!');
}

module.exports = { myReduce };
