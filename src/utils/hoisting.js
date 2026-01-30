/**
 * Hoisting Demonstration: var vs let/const & Functions
 */

function demonstrateVarHoisting() {
  // var is hoisted and initialized to undefined
  console.log('var before declaration:', hoistedVar); // undefined
  var hoistedVar = 'I am var';
  console.log('var after declaration:', hoistedVar);   // 'I am var'
  return hoistedVar;
}

function demonstrateTDZ() {
  // let and const are hoisted but uninitialized (in TDZ)
  let result = 'TDZ Active';
  try {
    // Attempting to access tdzLet here throws ReferenceError
    // console.log(tdzLet);
    eval('console.log(tdzLet)');
  } catch (err) {
    result = err.name; // ReferenceError
  }
  let tdzLet = 'Safe now';
  return { result, tdzLet };
}

function demonstrateFunctionHoisting() {
  // Function declarations are hoisted completely with body
  const fnResult = declaredFunction(); // works!

  function declaredFunction() {
    return 'Function declaration hoisted!';
  }

  // Function expressions with var are hoisted as undefined
  let expressionError = null;
  try {
    expressionFunction(); // TypeError: expressionFunction is not a function
  } catch (err) {
    expressionError = err.name;
  }

  var expressionFunction = function() {
    return 'Function expression';
  };

  return { fnResult, expressionError, expressionFunction: expressionFunction() };
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Hoisting Scenarios ---');

  const varRes = demonstrateVarHoisting();
  console.assert(varRes === 'I am var', 'Var hoisting test failed');

  const tdzRes = demonstrateTDZ();
  console.assert(tdzRes.result === 'ReferenceError', 'TDZ ReferenceError test failed');
  console.assert(tdzRes.tdzLet === 'Safe now', 'TDZ post declaration failed');

  const fnRes = demonstrateFunctionHoisting();
  console.assert(fnRes.fnResult === 'Function declaration hoisted!', 'Function declaration hoisting failed');
  console.assert(fnRes.expressionError === 'TypeError', 'Function expression error failed');

  console.log('✓ All Hoisting demonstrations passed!');
}

module.exports = {
  demonstrateVarHoisting,
  demonstrateTDZ,
  demonstrateFunctionHoisting,
};
