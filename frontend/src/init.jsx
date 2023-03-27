import React, { useCallback, useMemo } from 'react';
import { Provider, useDispatch } from 'react-redux';
import i18next from 'i18next';
import { io } from 'socket.io-client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { configureStore } from '@reduxjs/toolkit';

import { socketContext } from './context/index.jsx';
import App from './components/App.jsx';
import resources from './locales/index.js';
import reducer, { actions } from './slices/index.js';

const {
  addMessage,
  removeMessage,
  addChannel,
  setActualChannel,
  deleteChannel,
  channelRename,
} = actions;

const Init = async () => {
  const dispacth = useDispatch();

  const socket = io();
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

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  const store = configureStore({
    reducer,
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <socketContext.Provider value={socketApi}>
          <App />
        </socketContext.Provider>
      </I18nextProvider>
    </Provider>
  );
};

export default Init;
