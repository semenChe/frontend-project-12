import { useContext } from 'react';

import { AuthContext, chatApiContext } from '../context/contex.js';

const useAuth = () => useContext(AuthContext);
const useChatApi = () => {
  const chatApi = useContext(chatApiContext);
  return chatApi;
};

export { useAuth, useChatApi };
