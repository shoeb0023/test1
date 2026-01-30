/**
 * Custom Deep Clone (deepCopy) Utility
 * Handles circular references, Map, Set, Date, RegExp, and primitive types.
 */

function deepClone(value, hash = new WeakMap()) {
  // Primitives and functions
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Circular reference detection
  if (hash.has(value)) {
    return hash.get(value);
  }

  // Dates
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // Regular Expressions
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  // Maps
  if (value instanceof Map) {
    const copyMap = new Map();
    hash.set(value, copyMap);
    value.forEach((val, key) => {
      copyMap.set(deepClone(key, hash), deepClone(val, hash));
    });
    return copyMap;
  }

  // Sets
  if (value instanceof Set) {
    const copySet = new Set();
    hash.set(value, copySet);
    value.forEach((val) => {
      copySet.add(deepClone(val, hash));
    });
    return copySet;
  }

  // Arrays and Plain Objects
  const isArray = Array.isArray(value);
  const copy = isArray ? [] : Object.create(Object.getPrototypeOf(value));
  hash.set(value, copy);

  // Copy Symbols and regular keys
  const keys = [...Object.keys(value), ...Object.getOwnPropertySymbols(value)];
  for (const key of keys) {
    copy[key] = deepClone(value[key], hash);
  }

  return copy;
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing deepClone Utility ---');

  const original = {
    num: 42,
    str: 'hello',
    date: new Date('2026-01-16'),
    regex: /abc/gi,
    nested: { arr: [1, 2, { a: 'b' }] },
    set: new Set([1, 2, 3]),
    map: new Map([['key', { inner: 'val' }]]),
  };

  // Circular reference
  original.self = original;

  const cloned = deepClone(original);

  console.assert(cloned !== original, 'Cloned must have distinct reference');
  console.assert(cloned.self === cloned, 'Circular reference preserved');
  console.assert(cloned.nested.arr !== original.nested.arr, 'Nested array cloned');
  console.assert(cloned.date.getTime() === original.date.getTime(), 'Date copied');
  console.assert(cloned.map.get('key').inner === 'val', 'Map copied');
  console.assert(cloned.map.get('key') !== original.map.get('key'), 'Map inner value deep cloned');

  console.log('✓ All deepClone tests passed!');
}

module.exports = { deepClone };
