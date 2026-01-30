/**
 * Tracing Asynchronous Execution Order: Promises, Microtasks, and Macrotasks
 */

function runExecutionOrderQuiz() {
  const output = [];

  output.push('1: Synchronous Start');

  setTimeout(() => {
    output.push('2: setTimeout 0ms');
  }, 0);

  Promise.resolve()
    .then(() => {
      output.push('3: Microtask 1 (Promise)');
      return 'Microtask 2 Chained';
    })
    .then((val) => {
      output.push('4: ' + val);
    });

  queueMicrotask(() => {
    output.push('5: queueMicrotask');
  });

  output.push('6: Synchronous End');

  return output;
}

// Trace simulation helper for verification
function simulateOrder() {
  return new Promise((resolve) => {
    const trace = [];

    trace.push('sync 1');

    setTimeout(() => {
      trace.push('macro timeout');
      resolve(trace);
    }, 0);

    Promise.resolve().then(() => {
      trace.push('micro promise 1');
    }).then(() => {
      trace.push('micro promise 2');
    });

    trace.push('sync 2');
  });
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Asynchronous Execution Order ---');

  const syncLog = runExecutionOrderQuiz();
  console.assert(syncLog[0] === '1: Synchronous Start', 'Start order failed');
  console.assert(syncLog[1] === '6: Synchronous End', 'Sync end order failed');

  simulateOrder().then((trace) => {
    console.assert(
      JSON.stringify(trace) === JSON.stringify([
        'sync 1',
        'sync 2',
        'micro promise 1',
        'micro promise 2',
        'macro timeout'
      ]),
      'Async execution trace failed'
    );
    console.log('Final Execution Trace:', trace);
    console.log('✓ All Execution Order tests passed!');
  });
}

module.exports = { runExecutionOrderQuiz, simulateOrder };
