/**
 * Caution: Consider this file when using react-scripts
 * 
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or NextJS version
 */
import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';
import { Connect, AppConfig, UserSession } from '@stacks/connect-react';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'leaflet/dist/leaflet.css';
import 'assets/css/index.css';

import 'swiper/css/swiper.min.css';
import 'aos/dist/aos.css';

const browserHistory = createBrowserHistory();

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });
export const UserContext = React.createContext('');


const App = (): JSX.Element => {

  const authOptions = {
    appDetails: {
      name: 'neptune',
      icon: 'https://crashcodeexamples.s3.us-east-2.amazonaws.com/neptune.svg',
    },
    redirectTo: '/',
    onFinish: () => {
      let userData = userSession.loadUserData();
      console.log(userData);
      setUserState(userData.authResponseToken);
      localStorage.setItem('id', userData.authResponseToken);
      // window.location.href = '/wallet'
  
    },
    userSession: userSession,
  }

  const [userState, setUserState] = useState(
    localStorage.getItem('id') || ''
  ); 

  return (
    <UserContext.Provider value={userState}>
      <Connect authOptions={authOptions}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </Connect>
    </UserContext.Provider>

  );
}

export default App;
