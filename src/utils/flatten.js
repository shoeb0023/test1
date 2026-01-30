/**
 * Object Flattening and Unflattening Utility for Deeply Nested Objects
 */

function flattenObject(obj, prefix = '', result = {}) {
  if (obj === null || typeof obj !== 'object') {
    if (prefix) result[prefix] = obj;
    return result;
  }

  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const newKey = prefix ? prefix + '.' + key : key;

    if (val !== null && typeof val === 'object' && !(val instanceof Date) && !(val instanceof RegExp)) {
      flattenObject(val, newKey, result);
    } else {
      result[newKey] = val;
    }
  }

  return result;
}

function unflattenObject(flatObj) {
  const result = {};

  for (const [keyPath, value] of Object.entries(flatObj)) {
    const keys = keyPath.split('.');
    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k] = value;
      } else {
        const nextKey = keys[i + 1];
        const isNextArray = !isNaN(Number(nextKey));
        if (!current[k]) {
          current[k] = isNextArray ? [] : {};
        }
        current = current[k];
      }
    }
  }

  return result;
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Object Flattening ---');

  const nested = {
    user: {
      profile: {
        name: 'Alex',
        address: {
          city: 'San Francisco',
          zip: '94105'
        }
      },
      tags: ['engineer', 'javascript']
    }
  };

  const flattened = flattenObject(nested);
  console.assert(flattened['user.profile.name'] === 'Alex', 'Name flatten failed');
  console.assert(flattened['user.profile.address.city'] === 'San Francisco', 'City flatten failed');
  console.assert(flattened['user.tags.0'] === 'engineer', 'Array index flatten failed');

  const unflattened = unflattenObject(flattened);
  console.assert(unflattened.user.profile.name === 'Alex', 'Unflatten name failed');
  console.assert(unflattened.user.tags[0] === 'engineer', 'Unflatten array failed');

  console.log('✓ All Object Flattening tests passed!');
}

module.exports = { flattenObject, unflattenObject };
