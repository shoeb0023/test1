/**
 * Closures with Practical Data Privacy: Bank Account Module Pattern
 */

function createBankAccount(initialBalance, accountHolder) {
  // Private variables encapsulated within the outer lexical scope
  let balance = Math.max(0, initialBalance || 0);
  const owner = accountHolder;
  const transactionHistory = [];

  function recordTransaction(type, amount) {
    transactionHistory.push({
      timestamp: new Date().toISOString(),
      type,
      amount,
      balanceAfter: balance,
    });
  }

  recordTransaction('OPEN_ACCOUNT', balance);

  // Return public interface (revealing module pattern)
  return {
    getAccountHolder() {
      return owner;
    },
    getBalance() {
      return balance;
    },
    deposit(amount) {
      if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Deposit amount must be a positive number');
      }
      balance += amount;
      recordTransaction('DEPOSIT', amount);
      return balance;
    },
    withdraw(amount) {
      if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Withdrawal amount must be a positive number');
      }
      if (amount > balance) {
        throw new Error('Insufficient funds');
      }
      balance -= amount;
      recordTransaction('WITHDRAW', amount);
      return balance;
    },
    getTransactions() {
      // Return a defensive copy to prevent external mutation
      return [...transactionHistory];
    }
  };
}

// Test cases & Demonstrations
if (require.main === module) {
  console.log('--- Testing Closures & Data Privacy ---');

  const account = createBankAccount(100, 'Alice');

  // Verify internal variables are completely inaccessible
  console.assert(account.balance === undefined, 'balance should be private');
  console.assert(account.owner === undefined, 'owner should be private');
  console.assert(account.transactionHistory === undefined, 'transactionHistory should be private');

  // Test transactions
  account.deposit(50);
  console.assert(account.getBalance() === 150, 'Deposit failed');

  account.withdraw(30);
  console.assert(account.getBalance() === 120, 'Withdraw failed');

  let failedWithdraw = false;
  try {
    account.withdraw(500);
  } catch (err) {
    failedWithdraw = true;
  }
  console.assert(failedWithdraw, 'Overdraft should fail');

  const txs = account.getTransactions();
  console.assert(txs.length === 3, 'Transaction count mismatch');

  console.log('✓ All Closure data privacy tests passed!');
}

module.exports = { createBankAccount };
