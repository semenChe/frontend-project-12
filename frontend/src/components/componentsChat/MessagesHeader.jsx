import React from 'react';
import { useTranslation } from 'react-i18next';

const MessagesHeader = ({ activeChannel, messagesCount }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {activeChannel ? activeChannel.name : ''}
        </b>
      </p>
      <span className="text-muted">
        {t('messages', { count: messagesCount })}
      </span>
    </div>
  );
};

export default MessagesHeader;
