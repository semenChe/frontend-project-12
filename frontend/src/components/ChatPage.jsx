import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { actions } from '../slices/index.js';
import { useAuth } from '../hooks/index.jsx';
import ChannelsComponent from './componentsChat/ChannelsComponent.jsx';
import MessagesComponent from './componentsChat/MessagesComponent.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();

  const channelsInfo = useSelector((s) => s.channelsInfo);

  useEffect(() => {
    const notify = () => toast.error(t('toast.dataLoadingError'));

    const fetchData = async () => {
      dispatch(actions.fetchData(auth.getAuthHeader()))
        .unwrap()
        .catch(({ status }) => {
          notify();
          console.error(status);
        });
    };
    fetchData();
  }, [dispatch, auth, t]);

  if (channelsInfo.loading) {
    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <h1>{t('loading')}</h1>
        </div>
      </Container>
    );
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
