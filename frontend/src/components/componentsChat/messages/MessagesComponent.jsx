import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import MessageForm from './MessageForm.jsx';
import MessagesHeader from './MessagesHeader.jsx';
import Message from './Message.jsx';

const MessagesComponent = () => {
  const channels = useSelector((s) => s.channelsInfo.channels);
  const messages = useSelector((s) => s.messagesInfo.messages);
  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId,
  );
  const [activeChannel] = channels.filter(
    ({ id }) => id === currentChannelId,
  );
  const activeChannelMessages = messages.filter(
    (message) => message.channelId === currentChannelId,
  );
  const messagesView = useRef(null);
  useEffect(() => {
    messagesView.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChannelMessages]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader
          activeChannel={activeChannel}
          messagesCount={activeChannelMessages.length}
        />
        <div ref={messagesView} id="messages-box" className="chat-messages overflow-auto px-5">
          {activeChannelMessages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </div>
        <MessageForm activeChannel={activeChannel} />
      </div>
    </div>
  );
};

export default MessagesComponent;
