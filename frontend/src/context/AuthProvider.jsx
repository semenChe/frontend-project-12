import React, { useState, useCallback, useMemo } from 'react';
import { AuthContext } from './context.js';

const AuthProvider = ({ children }) => {
  const savedUserData = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(Boolean(savedUserData));
  const [user, setUser] = useState(
    savedUserData ? { username: savedUserData.username } : null,
  );

  const logIn = useCallback((userData) => {
    setLoggedIn(true);
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUser(null);
    setLoggedIn(false);
  }, []);

  const getAuthHeader = useCallback(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    logOut();
    return {};
  }, [logOut]);

  const providedData = useMemo(
    () => ({
      loggedIn,
      logIn,
      logOut,
      getAuthHeader,
      user,
    }),
    [loggedIn, logIn, logOut, getAuthHeader, user],
  );

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
