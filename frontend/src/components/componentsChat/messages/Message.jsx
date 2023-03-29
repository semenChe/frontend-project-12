import React from 'react';

const Message = ({ message }) => {
  const { id, username, text } = message;
  return (
    <div className="text-break mb-2" key={id}>
      <b>{username}</b>
      :
      {' '}
      {text}
    </div>
  );
};

export default Message;
