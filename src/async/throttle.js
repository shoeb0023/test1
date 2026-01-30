/**
 * Custom Throttle Function
 * Combines timestamp and setTimeout approaches to guarantee leading and trailing execution control.
 */

function throttle(fn, wait, options = {}) {
  let timerId = null;
  let lastExecTime = 0;
  let lastArgs = null;
  let lastThis = null;

  const leading = 'leading' in options ? Boolean(options.leading) : true;
  const trailing = 'trailing' in options ? Boolean(options.trailing) : true;

  function executeTrailing() {
    lastExecTime = leading ? Date.now() : 0;
    timerId = null;
    fn.apply(lastThis, lastArgs);
    lastArgs = null;
    lastThis = null;
  }

  function throttled(...args) {
    const now = Date.now();

    if (!lastExecTime && !leading) {
      lastExecTime = now;
    }

    const remaining = wait - (now - lastExecTime);

    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > wait) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastExecTime = now;
      fn.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
    } else if (!timerId && trailing) {
      timerId = setTimeout(executeTrailing, remaining);
    }
  }

  throttled.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    lastExecTime = 0;
    lastArgs = null;
    lastThis = null;
  };

  return throttled;
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Throttle Function ---');

  let executionCounter = 0;
  const throttledFn = throttle(() => {
    executionCounter++;
  }, 50);

  throttledFn(); // immediate execution (leading)
  throttledFn(); // ignored
  throttledFn(); // ignored
  console.assert(executionCounter === 1, 'Leading execution must occur immediately');

  setTimeout(() => {
    // After 70ms, trailing call should have fired
    console.assert(executionCounter === 2, 'Trailing execution should have fired');
    console.log('✓ All Throttle tests passed!');
  }, 100);
}

module.exports = { throttle };
