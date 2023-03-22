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
  const { setActualChannel, openWindow } = actions;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openAddChannelWindow = () => {
    dispatch(openWindow({ type: 'addChannel' }));
  };

  const handleClick = (id) => {
    dispatch(setActualChannel(id));
  };

  const { currentChannelId } = channelsInfo;

  return (
    <>
      <ChatModal />
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>{t('channels')}</span>
          <Button
            variant="light"
            className="p-0 text-primary btn btn-group-vertical"
            onClick={openAddChannelWindow}
          >
            <BsPlusSquare />
          </Button>
        </div>
        <Nav
          defaultActiveKey={t('general')}
          className="flex-column nav-pills nav-fill px-2"
          as="ul"
        >
          {channelsInfo.channels.map((channel) => {
            const { id, name } = channel;
            const openRemoveChannelWindow = () => {
              dispatch(openWindow({ type: 'removing', id }));
            };
            const openRenameChannelWindow = () => {
              dispatch(openWindow({ type: 'renaming', id }));
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
                    className="w-100 rounded-0 text-start"
                    onClick={() => handleClick(id)}
                  >
                    <span className="me-1">#</span>
                    {name}
                  </Button>
                  <Dropdown.Toggle variant={id === currentChannelId ? 'secondary' : 'light'} />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => openRemoveChannelWindow(e)}>
                      {t('remove')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => openRenameChannelWindow(e)}>
                      {t('rename')}
                    </Dropdown.Item>
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
