import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import ButtonBootstrap from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import FormBootstrap from 'react-bootstrap/Form';
import { Nav } from 'react-bootstrap';

import './Login.css';

const Login = () => {
  const schema = yup.object().shape({
    username: yup.string().min(3, 'от 3 до 20 символов').max(20, 'от 3 до 20 символов').required('обязательное поле'),
    password: yup.string().min(5, 'от 5 символов').required('обязательное поле'),
  });

  const initialUserValues = {
    username: '',
    password: '',
  };

  const handleOnSubmit = () => {};

  return (
    <Card className="text-center Login-card">

      <Row>
        <Col>
          картинка
        </Col>

        <Col>
          <Row><Card.Title>Авторизация</Card.Title></Row>
          <Formik
            validationSchema={schema}
            onSubmit={handleOnSubmit}
            initialValues={initialUserValues}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
            }) => (
              <FormBootstrap onSubmit={handleSubmit}>
                <FormBootstrap.Group as={Col} md="11" className="Login-input-item">
                  <FormBootstrap.Label>Ваш ник</FormBootstrap.Label>
                  <FormBootstrap.Control
                    required
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isValid={touched.username && !errors.username}
                    isInvalid={!!errors.username}
                  />
                  <FormBootstrap.Control.Feedback type="valid">Looks good!</FormBootstrap.Control.Feedback>
                  <FormBootstrap.Control.Feedback type="invalid">{errors.username}</FormBootstrap.Control.Feedback>
                </FormBootstrap.Group>

                <FormBootstrap.Group as={Col} md="11" className="Login-input-item">
                  <FormBootstrap.Label>Пароль</FormBootstrap.Label>
                  <FormBootstrap.Control
                    required
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <FormBootstrap.Control.Feedback type="valid">Looks good!</FormBootstrap.Control.Feedback>
                  <FormBootstrap.Control.Feedback type="invalid">{errors.password}</FormBootstrap.Control.Feedback>
                </FormBootstrap.Group>
                {errors.authNotCorrect && (<div>not correct</div>)}
                <FormBootstrap.Group as={Col} md="11">
                  <ButtonBootstrap variant="outline-primary" className="Login-button" type="submit">Войти</ButtonBootstrap>
                </FormBootstrap.Group>
              </FormBootstrap>
            )}
          </Formik>
        </Col>
      </Row>
      <Card.Footer className="text-muted">
        Нет аккаунта?
        <Nav.Link as={Link} to="/signup">авторизация</Nav.Link>
      </Card.Footer>
    </Card>
  );
};

export default Login;
