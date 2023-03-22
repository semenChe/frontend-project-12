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

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader
          activeChannel={activeChannel}
          messagesCount={activeChannelMessages.length}
        />
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {activeChannelMessages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
          <MessageForm activeChannel={activeChannel} />
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;
