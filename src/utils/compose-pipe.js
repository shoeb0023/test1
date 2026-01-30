/**
 * Function Composition (Right-to-Left) and Piping (Left-to-Right)
 */

function compose(...fns) {
  if (fns.length === 0) return (arg) => arg;
  if (fns.length === 1) return fns[0];

  return function(initialValue) {
    return fns.reduceRight((acc, fn) => fn(acc), initialValue);
  };
}

function pipe(...fns) {
  if (fns.length === 0) return (arg) => arg;
  if (fns.length === 1) return fns[0];

  return function(initialValue) {
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
}

// Asynchronous pipe for Promise chains
function pipeAsync(...fns) {
  return function(initialValue) {
    return fns.reduce(
      (promiseChain, fn) => promiseChain.then(fn),
      Promise.resolve(initialValue)
    );
  };
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Compose and Pipe ---');

  const add5 = (x) => x + 5;
  const multiply2 = (x) => x * 2;
  const square = (x) => x * x;

  // compose executes right-to-left: square(multiply2(add5(2))) -> (2+5)=7 -> 7*2=14 -> 14^2=196
  const composed = compose(square, multiply2, add5);
  console.assert(composed(2) === 196, 'Compose failed');

  // pipe executes left-to-right: square(2)=4 -> add5(4)=9 -> multiply2(9)=18
  const piped = pipe(square, add5, multiply2);
  console.assert(piped(2) === 18, 'Pipe failed');

  // Async pipe
  const asyncAdd = async (x) => x + 10;
  const asyncDouble = async (x) => x * 2;
  pipeAsync(asyncAdd, asyncDouble)(5).then((val) => {
    console.assert(val === 30, 'Async pipe failed');
    console.log('✓ All Compose & Pipe tests passed!');
  });
}

module.exports = { compose, pipe, pipeAsync };
