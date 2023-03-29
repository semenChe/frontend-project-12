import { io } from 'socket.io-client';

import store, { actions } from '../slices/index.js';

const {
  addMessage,
  removeMessage,
  addChannel,
  setActualChannel,
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
  dispacth(deleteChannel(payload.id));
});
socket.on('renameChannel', (payload) => {
  dispacth(channelRename(payload));
});

const socketApi = {
  sendMessage: (...args) => socket.emit('newMessage', ...args),
  newChannel: (name, cb) => {
    socket.emit('newChannel', { name }, (response) => {
      const {
        status,
        data: { id },
      } = response;

      if (status === 'ok') {
        dispacth(setActualChannel(id));
        cb();
        return response.data;
      }
      return status;
    });
  },
  removeChannel: (id) => {
    socket.emit('removeChannel', { id }, (response) => {
      const { status } = response;
      if (status === 'ok') {
        dispacth(removeMessage(id));
      }
    });
  },
  renameChannel: ({ name, id }) => socket.emit('renameChannel', { name, id }),
};

export default socketApi;
