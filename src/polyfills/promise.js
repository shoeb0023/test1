/**
 * Custom Polyfill for Promise (Promises/A+ Spec Compliant Core)
 */

const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MyPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver ' + executor + ' is not a function');
    }

    this.state = STATE.PENDING;
    this.value = undefined;
    this.handlers = [];

    const resolve = (val) => {
      if (this.state !== STATE.PENDING) return;

      // Unwrapping thenables / nested promises
      if (val && (typeof val === 'object' || typeof val === 'function') && typeof val.then === 'function') {
        val.then(resolve, reject);
        return;
      }

      this.state = STATE.FULFILLED;
      this.value = val;
      this._executeHandlers();
    };

    const reject = (reason) => {
      if (this.state !== STATE.PENDING) return;

      this.state = STATE.REJECTED;
      this.value = reason;
      this._executeHandlers();
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  _executeHandlers() {
    if (this.state === STATE.PENDING) return;

    // Must be executed asynchronously via microtask
    queueMicrotask(() => {
      for (const { onFulfilled, onRejected, resolve, reject } of this.handlers) {
        try {
          if (this.state === STATE.FULFILLED) {
            if (typeof onFulfilled === 'function') {
              resolve(onFulfilled(this.value));
            } else {
              resolve(this.value);
            }
          } else if (this.state === STATE.REJECTED) {
            if (typeof onRejected === 'function') {
              resolve(onRejected(this.value));
            } else {
              reject(this.value);
            }
          }
        } catch (err) {
          reject(err);
        }
      }
      this.handlers = [];
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.handlers.push({ onFulfilled, onRejected, resolve, reject });
      this._executeHandlers();
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (val) => MyPromise.resolve(callback()).then(() => val),
      (err) => MyPromise.resolve(callback()).then(() => { throw err; })
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((res) => res(value));
  }

  static reject(reason) {
    return new MyPromise((_, rej) => rej(reason));
  }
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing MyPromise Polyfill ---');

  const p = new MyPromise((resolve) => {
    setTimeout(() => resolve(100), 20);
  });

  p.then((val) => {
    console.assert(val === 100, 'Initial resolve value failed');
    return val * 2;
  })
  .then((val2) => {
    console.assert(val2 === 200, 'Chaining value failed');
    console.log('✓ All MyPromise tests passed!');
  });
}

module.exports = { MyPromise };
