import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import * as yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';

// import useAuth from '../../hooks/index.jsx';

const MessageForm = ({ activeChannel }) => {
  const messageRef = useRef(null);
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
        username: 'user.username', // нужно найти имя
      };
      try {
        console.log(message);
        values.body = '';
      } catch (e) {
        console.log(e.message);
      }
    },
    validateOnChange: validationSchema,
  });
  return (
    <div className="mt-auto px-3 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <Form.Group className="input-group">
          <Form.Control
            name="body"
            ref={messageRef}
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2"
            value={formik.values.body}
            onChange={formik.handleChange}
            id="body"
          />
          <Button
            variant="group-vertical"
            disabled={formik.isSubmitting}
            onClick={formik.handleSubmit}
          >
            <ArrowRightSquare size={20} />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
