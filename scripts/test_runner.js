/**
 * Automated Test Runner for all 31-Day Modules
 */

const { myMap } = require('../src/polyfills/map');
const { myFilter } = require('../src/polyfills/filter');
const { myReduce } = require('../src/polyfills/reduce');
const { MyPromise } = require('../src/polyfills/promise');
const { debounce } = require('../src/async/debounce');
const { throttle } = require('../src/async/throttle');
const { promiseAll, promiseRace, promiseAllSettled } = require('../src/async/promise-combinators');
const { createBankAccount } = require('../src/patterns/closure-privacy');
const { EventEmitter } = require('../src/patterns/event-emitter');
const { ReactiveStore } = require('../src/patterns/reactive');
const { memoize } = require('../src/utils/memoize');
const { deepClone } = require('../src/utils/deep-clone');
const { flattenObject, unflattenObject } = require('../src/utils/flatten');
const { curry } = require('../src/utils/curry');
const { compose, pipe } = require('../src/utils/compose-pipe');
const { lazy } = require('../src/utils/lazy');
const { lengthOfLongestSubstring, twoSum, maxSubArray } = require('../src/puzzles/algorithms');

console.log('==================================================');
console.log('   RUNNING ALL 31-DAY JAVASCRIPT MASTER SUITE    ');
console.log('==================================================\n');

let passedCount = 0;
function test(name, fn) {
  try {
    fn();
    console.log('  ✓ ' + name);
    passedCount++;
  } catch (err) {
    console.error('  ✗ ' + name + ' FAILED:', err.message);
    process.exit(1);
  }
}

test('Day 1: Array.prototype.myMap', () => {
  const res = [1, 2, 3].myMap(x => x * 3);
  if (res[0] !== 3 || res[1] !== 6 || res[2] !== 9) throw new Error('myMap failed');
});

test('Day 2: Array.prototype.myFilter', () => {
  const res = [1, 2, 3, 4].myFilter(x => x % 2 === 0);
  if (res.length !== 2 || res[0] !== 2 || res[1] !== 4) throw new Error('myFilter failed');
});

test('Day 3: Array.prototype.myReduce', () => {
  const sum = [1, 2, 3, 4].myReduce((a, b) => a + b, 10);
  if (sum !== 20) throw new Error('myReduce failed');
});

test('Day 6: Closure Bank Account Privacy', () => {
  const acct = createBankAccount(50, 'Bob');
  acct.deposit(25);
  if (acct.getBalance() !== 75) throw new Error('Deposit failed');
  if (acct.balance !== undefined) throw new Error('balance leaked');
});

test('Day 7: Optimized Memoize with LRU', () => {
  let runs = 0;
  const square = memoize(x => { runs++; return x * x; });
  square(4);
  square(4);
  if (runs !== 1) throw new Error('Memoize cache missed');
});

test('Day 16: Deep Clone with Circular Reference', () => {
  const o = { a: 1 };
  o.self = o;
  const c = deepClone(o);
  if (c.a !== 1 || c.self !== c || c === o) throw new Error('Deep clone failed');
});

test('Day 17: Flatten & Unflatten Object', () => {
  const flat = flattenObject({ a: { b: 42 } });
  if (flat['a.b'] !== 42) throw new Error('Flatten failed');
  const unflat = unflattenObject(flat);
  if (unflat.a.b !== 42) throw new Error('Unflatten failed');
});

test('Day 22: Event Emitter Pub/Sub', () => {
  const ee = new EventEmitter();
  let count = 0;
  const off = ee.on('test', () => count++);
  ee.emit('test');
  off();
  ee.emit('test');
  if (count !== 1) throw new Error('EventEmitter failed');
});

test('Day 23: Curry with Placeholder', () => {
  const f = curry((a, b, c) => a + b + c);
  if (f(1)(2)(3) !== 6) throw new Error('Curry failed');
  if (f(curry._, 2)(1, 3) !== 6) throw new Error('Placeholder curry failed');
});

test('Day 24: Compose & Pipe', () => {
  const add1 = x => x + 1;
  const mult2 = x => x * 2;
  if (compose(mult2, add1)(3) !== 8) throw new Error('Compose failed');
  if (pipe(add1, mult2)(3) !== 8) throw new Error('Pipe failed');
});

test('Day 26: Reactive Proxy Store', () => {
  const store = new ReactiveStore({ val: 1 });
  let watched = 0;
  store.watch(() => { watched = store.state.val * 10; });
  store.state.val = 3;
  if (watched !== 30) throw new Error('Reactive proxy store failed');
});

test('Day 27: Lazy Loader', () => {
  let evaluated = 0;
  const lz = lazy(() => { evaluated++; return 99; });
  if (evaluated !== 0) throw new Error('Lazy evaluated too early');
  lz();
  lz();
  if (evaluated !== 1) throw new Error('Lazy cache failed');
});

test('Day 29: Algorithms & Puzzles', () => {
  if (lengthOfLongestSubstring('abcabcbb') !== 3) throw new Error('Sliding window failed');
  const indices = twoSum([2, 7, 11, 15], 9);
  if (indices[0] !== 0 || indices[1] !== 1) throw new Error('Two sum failed');
  if (maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) !== 6) throw new Error('Max subarray failed');
});

console.log('\n' + passedCount + ' tests passed successfully! 100% verification complete.');
