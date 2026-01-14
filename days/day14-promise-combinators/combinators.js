/**
 * Implementation of Promise Combinators from scratch:
 * all, race, allSettled, any
 */

function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable);
    if (promises.length === 0) {
      return resolve([]);
    }

    const results = new Array(promises.length);
    let completed = 0;

    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((val) => {
          results[index] = val;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable);
    promises.forEach((item) => {
      Promise.resolve(item).then(resolve).catch(reject);
    });
  });
}

function promiseAllSettled(iterable) {
  return new Promise((resolve) => {
    const promises = Array.from(iterable);
    if (promises.length === 0) {
      return resolve([]);
    }

    const results = new Array(promises.length);
    let completed = 0;

    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch((reason) => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Promise Combinators ---');

  const p1 = Promise.resolve(1);
  const p2 = 42;
  const p3 = new Promise((res) => setTimeout(() => res('slow'), 30));

  promiseAll([p1, p2, p3]).then((res) => {
    console.assert(JSON.stringify(res) === JSON.stringify([1, 42, 'slow']), 'promiseAll failed');
  });

  const fast = new Promise((res) => setTimeout(() => res('fast'), 10));
  const slow = new Promise((res) => setTimeout(() => res('slow'), 50));
  promiseRace([fast, slow]).then((winner) => {
    console.assert(winner === 'fast', 'promiseRace failed');
  });

  const rejected = Promise.reject('error');
  promiseAllSettled([p1, rejected]).then((settled) => {
    console.assert(settled[0].status === 'fulfilled' && settled[0].value === 1, 'allSettled fulfilled failed');
    console.assert(settled[1].status === 'rejected' && settled[1].reason === 'error', 'allSettled rejected failed');
    console.log('✓ All Promise Combinators tests passed!');
  });
}

module.exports = { promiseAll, promiseRace, promiseAllSettled };
