import { useContext } from 'react';

import { AuthContext, chatApiContext } from '../context/contex.js';

const useAuth = () => useContext(AuthContext);
const useSocketApi = () => {
  const socketApi = useContext(chatApiContext);
  return socketApi;
};

export { useAuth, useSocketApi };
