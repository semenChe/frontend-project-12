import { io } from 'socket.io-client';

import store, { actions } from '../slices/index.js';

const {
  addMessage,
  addChannel,
  deleteChannel,
  channelRename,
} = actions;
const dispacth = store.dispatch;
const socket = io();
socket.on('newMessage', (payload) => {
  dispacth(addMessage(payload));
});
socket.on('newChannel', (payload) => {
  dispacth(addChannel(payload));
});
socket.on('removeChannel', (payload) => {
  dispacth(deleteChannel(payload));
});
socket.on('renameChannel', (payload) => {
  dispacth(channelRename(payload));
});

const chatApi = {
  sendMessage: (message, cb) => {
    socket.emit('newMessage', message, ({ status }) => {
      if (status === 'ok') {
        cb(null);
        return;
      }
      cb(status);
    });
  },
  newChannel: (name, cb) => {
    socket.emit('newChannel', { name }, ({ status }) => {
      if (status === 'ok') {
        cb(null);
        return;
      }
      cb(status);
    });
  },
  removeChannel: (id, cb) => {
    socket.emit('removeChannel', { id }, ({ status }) => {
      if (status === 'ok') {
        cb(null);
        return;
      }
      cb(status);
    });
  },
  renameChannel: ({ name, id }, cb) => {
    socket.emit('renameChannel', { name, id }, ({ status }) => {
      if (status === 'ok') {
        cb(null);
        return;
      }
      cb(status);
    });
  },
};

export default chatApi;
