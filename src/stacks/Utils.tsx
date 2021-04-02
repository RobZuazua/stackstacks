import { accountsApi, infoApi } from './Constants';
import { BigNumber } from 'bignumber.js';

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
 * returns the stacks balance object with property `balance` in decimal.
 */
 export function fetchAssets(addressAsString) {
  console.log(`Checking account "${addressAsString}"`);
  if (addressAsString) {
    return accountsApi
      .getAccountAssets({ principal: addressAsString })
      .then(response => response);
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

export function fetchPoxInfo() {
  console.log(`Getting pox info`)
  return infoApi
  .getPoxInfo()
  .then(response => response)
}

interface CalcBurnHeightBlockFromCyclesArgs {
  cycles: number;
  rewardCycleLength: number;
  currentCycleId: number;
  genesisBurnBlockHeight: number;
}

export function calculateUntilBurnHeightBlockFromCycles(args: CalcBurnHeightBlockFromCyclesArgs) {
  const { cycles, rewardCycleLength, genesisBurnBlockHeight, currentCycleId } = args;
  return new BigNumber(genesisBurnBlockHeight)
    .plus(new BigNumber(currentCycleId).plus(1).multipliedBy(rewardCycleLength))
    .plus(new BigNumber(cycles).multipliedBy(rewardCycleLength))
    .toNumber();
}