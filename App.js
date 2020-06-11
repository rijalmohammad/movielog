/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import AuthContextProvider, {AuthContext} from './contexts/authContext';
import AuthenticatedApp from './AuthenticatedApp';
import LoginApp from './LoginApp';

const MiddleApp = () => {
  const authStatus = useContext(AuthContext);

  return authStatus.isAuth ? <AuthenticatedApp /> : <LoginApp />;
};

const App: () => React$Node = () => {
  return (
    <AuthContextProvider>
      <MiddleApp />
    </AuthContextProvider>
  );
};

export default App;
