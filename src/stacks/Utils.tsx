import React from 'react';
import { Connect, useConnect, AppConfig, UserSession } from '@stacks/connect-react';
import { Button } from '@material-ui/core';
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