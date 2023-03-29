import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import modalsWindow from './index.js';
import { actions } from '../../../slices/index.js';

const { closeModal } = actions;

const ChatModal = () => {
  const isOpened = useSelector((state) => state.modalInfo.isOpened);
  const type = useSelector((state) => state.modalInfo.type);
  const changed = useSelector((state) => state.modalInfo.changed);
  const allChannels = useSelector((state) => state.channelsInfo.channels);
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(closeModal());
  };

  const ActyalModal = modalsWindow(type);

  return (
    <Modal show={isOpened} onHide={closeHandler} centered>
      {ActyalModal && (
      <ActyalModal
        closeHandler={closeHandler}
        changed={changed}
        allChannels={allChannels}
      />
      )}
    </Modal>
  );
};

export default ChatModal;
