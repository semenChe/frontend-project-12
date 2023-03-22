import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import {
  Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';

import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';
import imagePath from '../assets/avatar.jpg';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .typeError('Обязательное поле')
        .required('Обязательное поле'),
      password: Yup.string()
        .typeError('Обязательное поле')
        .required('Обязательное поле'),
    }),

    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn(res.data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={imagePath}
                  className="roundedCircle"
                  alt="Log in page"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel controlId="floatingUsername" label="Ваш ник">
                      <Form.Control
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        placeholder="username"
                        name="username"
                        id="username"
                        autoComplete="username"
                        isInvalid={authFailed}
                        required
                        ref={inputRef}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel controlId="floatingPassword" label="Пароль">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        placeholder="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        isInvalid={authFailed}
                        required
                      />
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">Неверные имя пользователя или пароль</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <NavLink to="/login">Регистрация</NavLink>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
