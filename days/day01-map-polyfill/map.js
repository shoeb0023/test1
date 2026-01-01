/**
 * Custom Polyfill for Array.prototype.map
 * Specification: ECMA-262 22.1.3.16 Array.prototype.map(callbackfn [ , thisArg ])
 */

function myMap(callback, thisArg) {
  if (this == null) {
    throw new TypeError('Array.prototype.myMap called on null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const O = Object(this);
  const len = O.length >>> 0; // Unsigned 32-bit integer conversion
  const A = new Array(len);

  for (let k = 0; k < len; k++) {
    // Only invoke callback if index k exists in O (sparse array handling)
    if (k in O) {
      A[k] = callback.call(thisArg, O[k], k, O);
    }
  }

  return A;
}

Array.prototype.myMap = myMap;

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Array.prototype.myMap ---');
  
  const numbers = [1, 2, 3, 4];
  const doubled = numbers.myMap((num, idx) => num * 2 + idx);
  console.assert(JSON.stringify(doubled) === JSON.stringify([2, 5, 8, 11]), 'Basic mapping failed');

  // Sparse array handling
  const sparse = [1, , 3]; // eslint-disable-line no-sparse-arrays
  const sparseMapped = sparse.myMap(x => x * 2);
  console.assert(0 in sparseMapped && !(1 in sparseMapped) && 2 in sparseMapped, 'Sparse mapping failed');
  console.assert(sparseMapped[0] === 2 && sparseMapped[2] === 6, 'Sparse values mismatch');

  // thisArg binding
  const multiplier = {
    factor: 10,
    multiply(n) { return n * this.factor; }
  };
  const scaled = [2, 3].myMap(function(n) { return this.multiply(n); }, multiplier);
  console.assert(JSON.stringify(scaled) === JSON.stringify([20, 30]), 'thisArg binding failed');

  console.log('✓ All Array.prototype.myMap tests passed!');
}

module.exports = { myMap };
