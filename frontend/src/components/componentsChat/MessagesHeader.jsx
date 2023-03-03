import React from 'react';

const MessagesHeader = ({ activeChannel, messagesCount }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0">
      #
      {activeChannel ? activeChannel.name : ''}
    </p>
    <span className="text-muted">
      {messagesCount}
      {' '}
      сообщений
    </span>
  </div>
);

export default MessagesHeader;
