/**
 * Currying Utility with Placeholder Support
 */

const _ = Symbol('curry_placeholder');

function curry(fn, arity = fn.length) {
  return function curried(...args) {
    // Count real (non-placeholder) arguments
    const complete = args.length >= arity &&
      args.slice(0, arity).every((arg) => arg !== _);

    if (complete) {
      return fn.apply(this, args.slice(0, arity));
    }

    return function(...nextArgs) {
      // Merge previous args and nextArgs, filling placeholders
      const combinedArgs = [];
      let nextIndex = 0;

      for (let i = 0; i < args.length; i++) {
        if (args[i] === _ && nextIndex < nextArgs.length) {
          combinedArgs.push(nextArgs[nextIndex++]);
        } else {
          combinedArgs.push(args[i]);
        }
      }

      while (nextIndex < nextArgs.length) {
        combinedArgs.push(nextArgs[nextIndex++]);
      }

      return curried.apply(this, combinedArgs);
    };
  };
}

curry._ = _;

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Curry with Placeholder ---');

  function calculate(a, b, c) {
    return a + (b * c);
  }

  const curriedCalc = curry(calculate);

  console.assert(curriedCalc(2)(3)(4) === 14, 'Standard curry failed');
  console.assert(curriedCalc(2, 3, 4) === 14, 'Direct call failed');

  // Placeholder tests
  const withPlaceholder = curriedCalc(curry._, 3)(2)(4);
  console.assert(withPlaceholder === 14, 'Single placeholder failed');

  const multiPlaceholder = curriedCalc(curry._, curry._, 5)(10, 2);
  console.assert(multiPlaceholder === 20, 'Multi placeholder failed');

  console.log('✓ All Curry tests passed!');
}

module.exports = { curry, _ };
