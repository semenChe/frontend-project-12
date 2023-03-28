import React, { useEffect, useRef } from 'react';
import {
  Button, Nav, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actions } from '../../slices/index.js';
import ChatModal from '../Modal.jsx';

const ChannelsComponent = () => {
  const channelsInfo = useSelector((s) => s.channelsInfo);
  const { setActualChannel, openModal } = actions;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openAddChannelWindow = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const handleClick = (id) => {
    dispatch(setActualChannel(id));
  };

  const { currentChannelId } = channelsInfo;

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
          {channelsInfo.channels.map((channel) => {
            const { id, name } = channel;
            const openRemoveChannelWindow = () => {
              dispatch(openModal({ type: 'removing', id }));
            };
            const openRenameChannelWindow = () => {
              dispatch(openModal({ type: 'renaming', id }));
            };
            if (!channel.removable) {
              return (
                <Nav.Item key={id} className="w-100" as="li">
                  <Button
                    variant={id === currentChannelId ? 'secondary' : 'light'}
                    className="w-100 rounded-0 text-start"
                    onClick={() => handleClick(id)}
                  >
                    <span className="me-1">#</span>
                    {name}
                  </Button>
                </Nav.Item>
              );
            }
            return (
              <Nav.Item key={id} className="w-100" as="li">
                <Dropdown className="d-flex btn-group" as={ButtonGroup}>
                  <Button
                    variant={id === currentChannelId ? 'secondary' : 'light'}
                    className="w-100 rounded-0 text-start text-truncate"
                    onClick={() => handleClick(id)}
                  >
                    <span className="me-1">#</span>
                    {name}
                  </Button>
                  <Dropdown.Toggle variant={id === currentChannelId ? 'secondary' : 'light'} className="flex-grow-0 dropdown-toggle-split">
                    <span className="visually-hidden">{t('channelControl')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => openRemoveChannelWindow(e)}>{t('remove')}</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => openRenameChannelWindow(e)}>{t('rename')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            );
          })}
        </Nav>
      </div>
    </>
  );
};

export default ChannelsComponent;
