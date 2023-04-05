/* eslint-disable no-param-reassign */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import {
  Modal, FormGroup, FormControl, FormLabel, Button, Form,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useChatApi } from '../../../hooks/hooks.js';
import { actions } from '../../../slices/index.js';

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
  const channelsInfo = useSelector((state) => state.channelsInfo);
  const { newChannelId, channels } = channelsInfo;
  const chatApi = useChatApi();
  const channelsName = channels.map((channel) => channel.name);

  const refContainer = useRef('');
  const { setActualChannel, setNewChannelId } = actions;
  const dispatch = useDispatch();

  useEffect(() => {
    refContainer.current.focus();
  }, []);

  const callback = (error) => {
    if (error) {
      toast.error(t('toast.dataLoadingError'));
    }
    closeHandler();
    toast.success(t('toast.createChannel'));
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationChannelsSchema(channelsName, t),
    onSubmit: (values) => {
      const { name } = values;
      const cleanedName = leoProfanity.clean(name);
      const promise = chatApi.newChannel(cleanedName, callback);
      promise.then((id) => dispatch(setActualChannel(id)));
      // dispatch(setActualChannel(newChannelId));
      values.name = '';
    },
  });

  return (
    <>
      <Modal.Header closeButton={closeHandler}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-2"
              ref={refContainer}
              id="name"
              name="name"
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
              <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('modals.addButton')}</Button>
            </Modal.Footer>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Add;
