import axios from 'axios';
import React, { useEffect } from 'react';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const authHeader = await getAuthHeader();
      const response = await axios.get(routes.dataPath(), { headers: authHeader });
      console.log('data', response.data);
    };
    fetchData();
  }, []);
  return <p>тут должен быть чат!</p>;
};

export default ChatPage;
