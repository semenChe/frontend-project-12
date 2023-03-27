import React, { useState, useCallback, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';

import { AuthContext } from '../context/index.jsx';
import NotFound from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';
import SignUp from './SignUp.jsx';
import { useAuth } from '../hooks/index.jsx';
import getRoutes from '../routes.js';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const savedUserData = JSON.parse(localStorage.getItem('userId'));
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

  const providedData = useMemo(
    () => ({
      loggedIn,
      logIn,
      logOut,
      user,
    }),
    [loggedIn, logIn, logOut, user],
  );

  return (
    <AuthContext.Provider value={providedData}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : (
      <Navigate
        to={getRoutes.loginPagePath()}
        state={{ from: location }}
      />
    )
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('exitButton')}</Button>
      : null
  );
};

const App = () => {
  const { t } = useTranslation();

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <div className="d-flex flex-column h-100">
            <Router>
              <Navbar bg="white" expand="lg" className="shadow-sm">
                <Container>
                  <Navbar.Brand as={Link} to={getRoutes.chatPagePath()}>{t('chatLogo')}</Navbar.Brand>
                  <AuthButton />
                </Container>
              </Navbar>
              <Routes>
                <Route
                  path={getRoutes.chatPagePath()}
                  element={(
                    <PrivateRoute>
                      <ChatPage />
                    </PrivateRoute>
            )}
                />
                <Route path={getRoutes.loginPagePath()} element={<LoginPage />} />
                <Route path={getRoutes.signupPagePath()} element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </Router>
          </div>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
