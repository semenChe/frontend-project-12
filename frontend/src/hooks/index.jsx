import { useContext } from 'react';

import authContext from '../contexts/index.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
