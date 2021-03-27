import { accountsApi } from './Constants';

/**
 * Uses the AccountsApi of the stacks blockchain api client library,
 * returns the stacks balance object with property `balance` in decimal.
 */
 export function fetchAccount(addressAsString) {
  console.log(`Checking account "${addressAsString}"`);
  if (addressAsString) {
    return accountsApi
      .getAccountBalance({ principal: addressAsString })
      .then(response => response.stx);
  } else {
    return Promise.reject();
  }
}

/**
 * Uses the AccountsApi of the stacks blockchain api client library,
 * returns an array of transactions
 */
export function fetchAccountTransactions(addressAsString) {
  console.log(`Getting transactions for account "${addressAsString}"`)
  if(addressAsString) {
    return accountsApi
    .getAccountTransactions({principal:addressAsString})
    .then(response => response.results)
  } else {
    return Promise.reject();
  }
}