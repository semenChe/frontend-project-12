import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';

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

const Rename = ({ closeHandler, changed }) => {
  const { t } = useTranslation();
  const notify = () => toast.info(t('toast.renamedChannel'));
  const refContainer = useRef('');
  useEffect(() => {
    setTimeout(() => {
      refContainer.current.select();
    }, 1);
  }, []);

  const socketApi = useSocketApi();

  const allChannels = useSelector((state) => state.channelsInfo.channels);
  const channelsName = allChannels.map((channel) => channel.name);
  const channel = allChannels.find(({ id }) => id === changed);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: validationChannelsSchema(channelsName, t),
    onSubmit: (values) => {
      const { name } = values;
      const cleanedName = leoProfanity.clean(name);
      try {
        socketApi.renameChannel({ name: cleanedName, id: changed });
        notify();
        closeHandler();
      } catch (e) {
        console.error(e.message);
      }
    },
  });
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormLabel controlId="name" className="visually-hidden" label={t('modals.nameChannel')}>
              <FormControl
                data-testid="input-body"
                ref={refContainer}
                name="name"
                required=""
                onChange={formik.handleChange}
                value={formik.values.name}
                isInvalid={!!formik.errors.name}
              />
            </FormLabel>
            <FormControl.Feedback type="invalid">
              {formik.errors.name}
            </FormControl.Feedback>
          </FormGroup>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <FormControl
          className="btn btn-primary"
          type="submit"
          value={t('modals.cancelButton')}
          onClick={closeHandler}
        />
        <FormControl
          className="btn btn-primary"
          type="submit"
          value={t('modals.rename')}
          onClick={formik.handleSubmit}
        />
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default Rename;
