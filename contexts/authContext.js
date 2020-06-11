import React, {createContext, useState} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [authStatus, setAuthStatus] = useState({
    isAuth: false,
    sessionId: '',
  });

  const login = async (username, password) => {
    const requestToken = await axios.get(
      'https://api.themoviedb.org/3/authentication/token/new?api_key=6911e2f007fccbc5516afc66df11aae9',
    );

    const token = requestToken.data.request_token;

    const validateData = {
      username: username,
      password: password,
      request_token: token,
    };

    const validateToken = await axios.post(
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=6911e2f007fccbc5516afc66df11aae9',
      validateData,
    );

    const validatedToken = validateToken.data.request_token;

    const sessionData = {
      request_token: validatedToken,
    };

    const createSession = await axios.post(
      'https://api.themoviedb.org/3/authentication/session/new?api_key=6911e2f007fccbc5516afc66df11aae9',
      sessionData,
    );

    const sessionID = createSession.data.session_id;
    const success = createSession.data.success;

    setAuthStatus({isAuth: success, sessionId: sessionID});
  };

  const logout = async () => {
    const sessionData = {
      session_id: authStatus.sessionId,
    };

    const deleteSession = await axios.delete(
      'https://api.themoviedb.org/3/authentication/session?api_key=6911e2f007fccbc5516afc66df11aae9',
      {data: sessionData},
    );

    const success = deleteSession.data.success;

    if (success) {
      setAuthStatus({
        isAuth: false,
        session_id: '',
      });
    }
  };

  return (
    <AuthContext.Provider value={{...authStatus, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
