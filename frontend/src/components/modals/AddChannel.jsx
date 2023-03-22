import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useSocketApi } from '../../hooks/index.jsx';

const validationChannelsSchema = (channels, text) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(text('required'))
    .min(3, text('min'))
    .max(20, text('max'))
    .notOneOf(channels, text('duplicate')),
});

const Add = ({ closeHandler }) => {
  const { t } = useTranslation();
  const allChannels = useSelector((state) => state.channelsInfo.channels);
  const socketApi = useSocketApi();
  const channelsName = allChannels.map((channel) => channel.name);
  // console.log('channelsName ===>', channelsName);
  const refContainer = useRef('');
  useEffect(() => {
    refContainer.current.focus();
  }, []);
  const notify = () => toast.success(t('toast.createChannel'));

  const close = () => {
    closeHandler();
    notify();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationChannelsSchema(channelsName, t),
    onSubmit: (values) => {
      const { name } = values;
      const cleanedName = leoProfanity.clean(name);
      try {
        socketApi.newChannel(cleanedName, close);
        values.name = '';
      } catch (e) {
        console.error(e.message);
      }
    },
  });
  // console.log('formik.errors===>', formik.errors.name);
  return (
    <Modal.Dialog>
      <Modal.Header closeButton={closeHandler}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              data-testid="input-body"
              ref={refContainer}
              name="name"
              required=""
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
            />
            <FormControl.Feedback type="invalid" className="invalid-feedback">
              {formik.errors.name}
            </FormControl.Feedback>
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <FormControl
          className="me-2 btn btn-secondary"
          type="button"
          value={t('modals.cancelButton')}
          onClick={closeHandler}
        />
        <FormControl
          className="btn btn-primary"
          type="submit"
          value={t('modals.addButton')}
          onClick={formik.handleSubmit}
        />
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default Add;
