import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import { actions } from '../slices/index.js';
import ChannelsComponent from './componentsChat/channelsComponent.jsx';
import MessagesComponent from './componentsChat/messagesComponent.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  // console.log('userId && userId.token ==>', userId, userId.token);
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();

  const channelsInfo = useSelector((s) => s.channelsInfo);

  useEffect(() => {
    const fetchData = async () => {
      const authHeader = await getAuthHeader();
      // console.log('authHeader =!=>', authHeader);
      dispatch(actions.fetchData(authHeader))
        .unwrap()
        .catch(({ status }) => {
          console.error(status);
        });
    };

    fetchData();
  }, [dispatch]);

  if (channelsInfo.loading) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsComponent />
        <MessagesComponent />
      </div>
    </Container>
  );
};

export default ChatPage;
