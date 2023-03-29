import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import AuthProvider from './context/AuthProvider.jsx';
import { chatApiContext } from './context/contex.js';
import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import socketApi from './socket/socket.js';
import rollbarConfig from './rollbar/rollbarConfig.js';

const Init = async () => {
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
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <I18nextProvider i18n={i18n}>
              <chatApiContext.Provider value={socketApi}>
                <App />
              </chatApiContext.Provider>
            </I18nextProvider>
          </AuthProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
};

export default Init;
