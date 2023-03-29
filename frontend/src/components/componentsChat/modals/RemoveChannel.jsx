/* eslint-disable no-param-reassign */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useSocketApi } from '../../../hooks/hooks.js';

const Remove = ({ closeHandler, changed }) => {
  const { t } = useTranslation();
  const notify = () => toast.warn(t('toast.removeChannel'));
  const sockedApi = useSocketApi();
  const deleteChannel = (e) => {
    e.preventDefault();
    sockedApi.removeChannel(changed);
    notify();
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
