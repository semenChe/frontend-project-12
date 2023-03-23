import { useTranslation } from 'react-i18next';

import getRoutes from '../routes.js';
import imagePath from '../assets/notFound.jpg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={imagePath} />
      <h1 className="h4 text-muted">{t('notFound')}</h1>
      <p className="text-muted">
        {t('youCanGo')}
        {' '}
        <a href={getRoutes.chatPagePath()}>{t('toHomePage')}</a>
      </p>
    </div>
  );
};

export default NotFound;
