import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
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
    <Modal.Dialog className="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.questionInModal')}</p>
        <form>
          <FormGroup>
            <input
              type="button"
              className="btn btn-secondary"
              value={t('modals.cancelButton')}
              onClick={closeHandler}
            />
            <input
              type="button"
              className="btn btn-danger"
              value={t('modals.removeButton')}
              onClick={deleteChannel}
            />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default Remove;
