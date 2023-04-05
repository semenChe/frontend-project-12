import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, FormLabel, Button, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';

import { useChatApi } from '../../../hooks/hooks.js';

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
  const refContainer = useRef('');
  useEffect(() => {
    setTimeout(() => {
      refContainer.current.select();
    }, 1);
  }, []);
  const chatApi = useChatApi();

  const allChannels = useSelector((state) => state.channelsInfo.channels);
  const channelsName = allChannels.map((channel) => channel.name);
  const channel = allChannels.find(({ id }) => id === changed);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: validationChannelsSchema(channelsName, t),
    onSubmit: async (values) => {
      const { name } = values;
      const cleanedName = leoProfanity.clean(name);
      await chatApi.renameChannel({ name: cleanedName, id: changed })
        .then(() => {
          closeHandler();
          toast.info(t('toast.renamedChannel'));
        })
        .catch(() => {
          toast.error(t('toast.dataLoadingError'));
        });
    },
  });
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2"
              ref={refContainer}
              name="name"
              id="name"
              required=""
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
            />
            <FormLabel htmlFor="name" className="visually-hidden">{t('modals.nameChannel')}</FormLabel>
            <FormControl.Feedback type="invalid">
              {formik.errors.name}
            </FormControl.Feedback>
            <Modal.Footer>
              <Button variant="secondary" type="button" onClick={closeHandler}>{t('modals.cancelButton')}</Button>
              <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('modals.rename')}</Button>
            </Modal.Footer>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
