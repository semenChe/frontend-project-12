import React, { useEffect, useRef } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actions } from '../../../slices/index.js';
import Channel from './Channel.jsx';
import ChatModal from '../modals/Modal.jsx';

const ChannelsComponent = () => {
  const channelsInfo = useSelector((s) => s.channelsInfo);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { openModal } = actions;
  const openAddChannelWindow = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const channelsView = useRef(null);
  useEffect(() => {
    channelsView.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [channelsInfo.channels.length]);

  return (
    <>
      <ChatModal />
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels')}</b>
          <Button
            variant="group-vertical"
            className="p-0 text-primary"
            onClick={openAddChannelWindow}
          >
            <BsPlusSquare />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <Nav
          defaultActiveKey={t('general')}
          className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          as="ul"
          ref={channelsView}
        >
          {channelsInfo.channels.map((channel) => (
            <Channel channel={channel} key={channel.id} />
          ))}
        </Nav>
      </div>
    </>
  );
};

export default ChannelsComponent;
