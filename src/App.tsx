/**
 * Caution: Consider this file when using react-scripts
 * 
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or NextJS version
 */
import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';
import { Connect, AppConfig, UserSession, useConnect } from '@stacks/connect-react';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'leaflet/dist/leaflet.css';
import 'assets/css/index.css';

import 'swiper/css/swiper.min.css';
import 'aos/dist/aos.css';

const browserHistory = createBrowserHistory();

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

const authOptions = {
    appDetails: {
      name: 'neptune',
      icon: 'https://crashcodeexamples.s3.us-east-2.amazonaws.com/neptune.svg',
    },
    redirectTo: '/wallet',
    finished: () => {
      let userData = userSession.loadUserData();
      console.log(userData);
      // Save or otherwise utilize userData post-authentication
    },
    userSession: userSession,
  }

const App = (): JSX.Element => {

  return (
    <Connect authOptions={authOptions}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </Connect>
  );
}

export default App;