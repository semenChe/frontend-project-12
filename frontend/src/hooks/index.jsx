import { useContext } from 'react';

import { AuthContext, socketContext } from '../context/index.jsx';

const useAuth = () => useContext(AuthContext);
const useSocketApi = () => {
  const socketApi = useContext(socketContext);
  return socketApi;
};

export { useAuth, useSocketApi };
