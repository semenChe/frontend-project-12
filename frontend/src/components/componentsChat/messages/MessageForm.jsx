/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import * as yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import { useAuth, useSocketApi } from '../../../hooks/hooks.js';

const MessageForm = ({ activeChannel }) => {
  const { user } = useAuth();
  const socketApi = useSocketApi();
  const messageRef = useRef(null);
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    message: yup.string().trim().required('Required'),
  });

  useEffect(() => {
    messageRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      const cleanedMessage = leoProfanity.clean(values.body);
      const message = {
        text: cleanedMessage,
        channelId: activeChannel.id,
        username: user.username,
      };
      try {
        await socketApi.sendMessage(message);
        values.body = '';
      } catch (e) {
        console.error(e.message);
      }
    },
    validateOnChange: validationSchema,
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <Form.Group className="input-group">
          <Form.Control
            name="body"
            ref={messageRef}
            aria-label={t('newMessage')}
            placeholder={t('messageFormPlaceholder')}
            className="border-0 p-0 ps-2"
            value={formik.values.body}
            onChange={formik.handleChange}
            id="body"
          />
          <Button
            style={{ border: 'none' }}
            variant="group-vertical"
            type="submit"
            disabled={formik.isSubmitting || !formik.values.body}
            onClick={formik.handleSubmit}
          >
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('send')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
