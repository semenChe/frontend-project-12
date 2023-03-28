/* eslint-disable no-param-reassign */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { actions } from '../../slices/index.js';
import { useSocketApi } from '../../hooks/index.jsx';

const { setActualChannel } = actions;

const Remove = ({ closeHandler, changed }) => {
  const { t } = useTranslation();
  const notify = () => toast.warn(t('toast.removeChannel'));
  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId,
  );
  const dispatch = useDispatch();
  const sockedApi = useSocketApi();
  const deleteChannel = (e) => {
    e.preventDefault();
    sockedApi.removeChannel(changed);
    notify();
    if (changed === currentChannelId) {
      dispatch(setActualChannel(1));
    }
    closeHandler();
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.questionInModal')}</p>
        <Modal.Footer>
          <Button variant="secondary" className="me-2" type="button" onClick={closeHandler}>{t('modals.cancelButton')}</Button>
          <Button variant="danger" type="button" onClick={deleteChannel}>{t('modals.removeButton')}</Button>
        </Modal.Footer>
      </Modal.Body>
    </>
  );
};

export default Remove;
