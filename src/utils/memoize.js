/**
 * Optimized Closure-based Memoization Utility
 * Supports custom key serialization, cache size limit (LRU eviction), and hit statistics.
 */

function memoize(fn, options = {}) {
  const {
    maxSize = 100,
    resolver = (...args) => {
      if (args.length === 0) return '__empty__';
      if (args.length === 1 && (typeof args[0] === 'number' || typeof args[0] === 'string')) {
        return args[0];
      }
      return JSON.stringify(args);
    }
  } = options;

  // Map maintains insertion order for LRU cache eviction
  const cache = new Map();
  let hits = 0;
  let misses = 0;

  const memoized = function(...args) {
    const key = resolver(...args);

    if (cache.has(key)) {
      hits++;
      const val = cache.get(key);
      // Refresh order for LRU
      cache.delete(key);
      cache.set(key, val);
      return val;
    }

    misses++;
    const result = fn.apply(this, args);

    if (cache.size >= maxSize) {
      // Evict oldest item (first entry in Map)
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }

    cache.set(key, result);
    return result;
  };

  memoized.getStats = () => ({ hits, misses, size: cache.size });
  memoized.clear = () => {
    cache.clear();
    hits = 0;
    misses = 0;
  };

  return memoized;
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Optimized Memoize ---');

  let callCount = 0;
  const fib = memoize((n) => {
    callCount++;
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  });

  const res1 = fib(10);
  console.assert(res1 === 55, 'Fib calculation failed');
  const stats1 = fib.getStats();
  console.assert(stats1.hits > 0, 'Cache hits expected');

  // Test custom serializer and LRU eviction
  let squareCalls = 0;
  const square = memoize((x) => {
    squareCalls++;
    return x * x;
  }, { maxSize: 2 });

  square(2); // miss, size 1 [2]
  square(3); // miss, size 2 [2, 3]
  square(2); // hit, size 2  [3, 2]
  square(4); // miss, size 2 (evicts 3) [2, 4]

  console.assert(squareCalls === 3, 'LRU square calls mismatch');
  console.assert(square.getStats().hits === 1, 'LRU hits mismatch');

  console.log('✓ All Memoize tests passed!');
}

module.exports = { memoize };
