import React, { useState, useCallback, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { socketContext, AuthContext } from '../context/index.jsx';
import { actions } from '../slices/index.js';
import NotFound from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';
import SignUp from './SignUp.jsx';
import { useAuth } from '../hooks/index.jsx';

const {
  addMessage,
  removeMessage,
  addChannel,
  setActualChannel,
  deleteChannel,
  channelRename,
} = actions;

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
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
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
  const socket = io();
  const dispacth = useDispatch();
  const { t } = useTranslation();

  socket.on('newMessage', (payload) => {
    dispacth(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispacth(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    dispacth(deleteChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    dispacth(channelRename(payload));
  });

  const sendMessage = useCallback((...args) => socket.emit('newMessage', ...args), [socket]);
  const newChannel = useCallback((name, cb) => {
    socket.emit('newChannel', { name }, (response) => {
      const {
        status,
        data: { id },
      } = response;

      if (status === 'ok') {
        dispacth(setActualChannel(id));
        cb();
        return response.data;
      }
      return status;
    });
  }, [dispacth, socket]);
  const removeChannel = useCallback((id) => {
    socket.emit('removeChannel', { id }, (response) => {
      const { status } = response;
      if (status === 'ok') {
        return dispacth(removeMessage(id));
      }
      return status;
    });
  }, [dispacth, socket]);
  const renameChannel = useCallback(({ name, id }) => socket.emit('renameChannel', { name, id }), [socket]);
  const socketApi = useMemo(
    () => ({
      sendMessage,
      newChannel,
      removeChannel,
      renameChannel,
    }),
    [sendMessage, newChannel, removeChannel, renameChannel],
  );

  return (
    <socketContext.Provider value={socketApi}>
      <AuthProvider>
        <div className="d-flex flex-column h-100">
          <Router>
            <Navbar bg="white" expand="lg" className="shadow-sm">
              <Container>
                <Navbar.Brand as={Link} to="/">{t('chatLogo')}</Navbar.Brand>
                <AuthButton />
              </Container>
            </Navbar>
            <Routes>
              <Route
                path="/"
                element={(
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
            )}
              />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUp />} />
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
    </socketContext.Provider>
  );
};

export default App;
