import React from 'react';
import { Connect, useConnect, AppConfig, UserSession } from '@stacks/connect-react';
import { Button } from '@material-ui/core';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

const authOptions = {
    appDetails: {
      name: 'My App',
      icon: window.location.origin + '/my-app-logo.svg',
    },
    redirectTo: '/',
    finished: () => {
      let userData = userSession.loadUserData();
      // Save or otherwise utilize userData post-authentication
    },
    userSession: userSession,
  }

const Auth = () => {
  return <Connect authOptions={authOptions}>
        <AuthInner/>
        </Connect>
};

const AuthInner = () => {
    const { doOpenAuth } = useConnect();
    return <Button onClick={() => doOpenAuth()}>Authenticate</Button>
  };
 
 export default Auth;