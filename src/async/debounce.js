/**
 * Custom Debounce Implementation with Leading and Trailing Options
 */

function debounce(fn, wait = 0, options = {}) {
  let timerId = null;
  let lastArgs = null;
  let lastThis = null;
  let result;

  const leading = Boolean(options.leading);
  const trailing = 'trailing' in options ? Boolean(options.trailing) : true;

  function invoke(time) {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = null;
    lastThis = null;
    result = fn.apply(thisArg, args);
    return result;
  }

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;

    const isInvokingLeading = leading && !timerId;

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      timerId = null;
      if (trailing && !isInvokingLeading) {
        invoke();
      }
    }, wait);

    if (isInvokingLeading) {
      return invoke();
    }

    return result;
  }

  debounced.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    lastArgs = null;
    lastThis = null;
  };

  debounced.flush = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
      return invoke();
    }
    return result;
  };

  debounced.pending = () => Boolean(timerId);

  return debounced;
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Debounce Function ---');

  let callCount = 0;
  const increment = debounce(() => {
    callCount++;
  }, 50);

  increment();
  increment();
  increment();
  console.assert(callCount === 0, 'Should not have fired synchronously');

  setTimeout(() => {
    console.assert(callCount === 1, 'Should fire exactly once after wait');

    // Test leading option
    let leadingCalls = 0;
    const leadingFn = debounce(() => leadingCalls++, 50, { leading: true, trailing: false });
    leadingFn();
    leadingFn();
    console.assert(leadingCalls === 1, 'Leading call must fire immediately');

    console.log('✓ All Debounce tests passed!');
  }, 100);
}

module.exports = { debounce };
