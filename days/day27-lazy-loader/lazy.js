/**
 * Custom Lazy Loading Utilities for Heavy Computations and Resources
 */

// 1. Lazy evaluation wrapper (thunk with memoized return)
function lazy(fn) {
  let evaluated = false;
  let cachedResult;

  return function() {
    if (!evaluated) {
      cachedResult = fn.apply(this, arguments);
      evaluated = true;
    }
    return cachedResult;
  };
}

// 2. Define lazy property on an object that evaluates once upon first property access
function defineLazyProperty(target, propertyName, getterFn) {
  Object.defineProperty(target, propertyName, {
    configurable: true,
    enumerable: true,
    get() {
      const value = getterFn.call(this);
      // Replace accessor with concrete value to avoid future getter overhead
      Object.defineProperty(this, propertyName, {
        value,
        writable: true,
        configurable: true,
        enumerable: true,
      });
      return value;
    }
  });
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Lazy Loading Utilities ---');

  let computationCount = 0;
  const heavyCalculation = lazy(() => {
    computationCount++;
    return 42 * 100;
  });

  console.assert(computationCount === 0, 'Should not evaluate before call');
  console.assert(heavyCalculation() === 4200, 'Calculation mismatch');
  console.assert(computationCount === 1, 'Evaluated once');
  console.assert(heavyCalculation() === 4200, 'Second call mismatch');
  console.assert(computationCount === 1, 'Should not re-evaluate on subsequent calls');

  // Test lazy property
  const service = {};
  let propComputeCount = 0;
  defineLazyProperty(service, 'databaseConnection', () => {
    propComputeCount++;
    return { connected: true, id: 'db-101' };
  });

  console.assert(propComputeCount === 0, 'Property should not compute eagerly');
  console.assert(service.databaseConnection.connected === true, 'Property access failed');
  console.assert(propComputeCount === 1, 'Property should compute once');
  console.assert(service.databaseConnection.id === 'db-101', 'Cached property access failed');
  console.assert(propComputeCount === 1, 'Property should remain cached');

  console.log('✓ All Lazy Loader tests passed!');
}

module.exports = { lazy, defineLazyProperty };
