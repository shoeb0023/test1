/**
 * Custom Polyfill for Array.prototype.filter
 * Specification: ECMA-262 22.1.3.7 Array.prototype.filter(callbackfn [ , thisArg ])
 */

function myFilter(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.myFilter called on null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this);
  const len = O.length >>> 0;
  const result = [];

  for (let k = 0; k < len; k++) {
    if (k in O) {
      const val = O[k];
      if (callback.call(thisArg, val, k, O)) {
        result.push(val);
      }
    }
  }

  return result;
}

Array.prototype.myFilter = myFilter;

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Array.prototype.myFilter ---');

  const numbers = [1, 2, 3, 4, 5, 6];
  const evens = numbers.myFilter(n => n % 2 === 0);
  console.assert(JSON.stringify(evens) === JSON.stringify([2, 4, 6]), 'Filter evens failed');

  // Sparse array handling (skipped empty slots)
  const sparse = [10, , 25, , 30]; // eslint-disable-line no-sparse-arrays
  const filteredSparse = sparse.myFilter(n => n > 15);
  console.assert(JSON.stringify(filteredSparse) === JSON.stringify([25, 30]), 'Sparse filtering failed');

  // Context thisArg validation
  const validator = {
    threshold: 3,
    isAbove(val) { return val > this.threshold; }
  };
  const filteredWithThis = [1, 2, 4, 5].myFilter(function(n) { return this.isAbove(n); }, validator);
  console.assert(JSON.stringify(filteredWithThis) === JSON.stringify([4, 5]), 'thisArg filter failed');

  console.log('✓ All Array.prototype.myFilter tests passed!');
}

module.exports = { myFilter };
