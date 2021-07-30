class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    //calculate the balance using the transaction objects.
    let balance = 0;
    for (const num of this.transactions) {
      balance += num.value; //this was the point of error for me, it didn't work unless i specified .value after.. this is due to how the setter works..
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("itsBritneyBetch");
//console.log("Initial balance:", myAccount.balance);
//console.log(myAccount);
//const t1 = new Deposit(120.0, myAccount);
//console.log(t1.commit());
////console.log("Transaction 1:", t1);

//// const t2 = new Withdrawal(15.99, myAccount);
//// t2.commit();
//// console.log("Transaction 2:", t2);
//// console.log(myAccount);
//console.log("Final balance:", myAccount.balance);
console.log("Starting Account Balance: ", myAccount.balance);

console.log("Attempting to withdraw should fail...");
const t1 = new Withdrawal(100.0, myAccount);
console.log("Commit result:", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Depositing some paycheck");
const t2 = new Deposit(74500.0, myAccount);
console.log("Commit result:", t2.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Withdrawal - gotta buy a car!");
const t3 = new Withdrawal(25999.0, myAccount);
console.log("Commit result:", t3.commit());

console.log("Ending Account Balance: ", myAccount.balance);

console.log("Account Transaction History: ", myAccount.transactions);
