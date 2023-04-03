/* eslint-disable no-param-reassign */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useChatApi } from '../../../hooks/hooks.js';

const Remove = ({ closeHandler, changed }) => {
  const { t } = useTranslation();
  const callback = (error) => {
    if (error) {
      toast.error(t('toast.dataLoadingError'));
    }
    closeHandler();
    toast.warn(t('toast.removeChannel'));
  };
  const chatApi = useChatApi();
  const deleteChannel = async (e) => {
    e.preventDefault();
    await chatApi.removeChannel(changed, callback);
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
