import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/hooks.js';
import getRoutes from '../routes.js';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('exitButton')}</Button>
      : null
  );
};

const Header = () => {
  const { t } = useTranslation();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={getRoutes.chatPagePath()}>{t('chatLogo')}</Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Header;
