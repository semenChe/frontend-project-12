import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Nav, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { actions } from '../../../slices/index.js';

const Channel = ({ channel }) => {
  const { name, id, removable } = channel;
  const { setActualChannel, openModal } = actions;
  const channelsInfo = useSelector((s) => s.channelsInfo);
  const { currentChannelId } = channelsInfo;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = (idChannel) => {
    dispatch(setActualChannel(idChannel));
  };
  const openRemoveChannelWindow = () => {
    dispatch(openModal({ type: 'removing', id }));
  };
  const openRenameChannelWindow = () => {
    dispatch(openModal({ type: 'renaming', id }));
  };
  if (!removable) {
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
};

export default Channel;
