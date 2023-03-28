import { Provider } from 'react-redux';
import i18next from 'i18next';
import { io } from 'socket.io-client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';

import AuthProvider from './context/AuthProvider.jsx';
import { chatApiContext } from './context/contex.js';
import App from './components/App.jsx';
import resources from './locales/index.js';
import store, { actions } from './slices/index.js';

const {
  addMessage,
  removeMessage,
  addChannel,
  setActualChannel,
  deleteChannel,
  channelRename,
} = actions;

const Init = async () => {
  const dispacth = store.dispatch;

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

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const socketApi = {
    sendMessage: (...args) => socket.emit('newMessage', ...args),
    newChannel: (name, cb) => {
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
    },
    removeChannel: (id) => {
      socket.emit('removeChannel', { id }, (response) => {
        const { status } = response;
        if (status === 'ok') {
          dispacth(removeMessage(id));
        }
      });
    },
    renameChannel: ({ name, id }) => socket.emit('renameChannel', { name, id }),
  };

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  return (
    <Provider store={store}>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <chatApiContext.Provider value={socketApi}>
            <App />
          </chatApiContext.Provider>
        </I18nextProvider>
      </AuthProvider>
    </Provider>
  );
};

export default Init;
