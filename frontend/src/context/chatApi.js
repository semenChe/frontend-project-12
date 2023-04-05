import { io } from 'socket.io-client';

import store, { actions } from '../slices/index.js';

const {
  addMessage,
  addChannel,
  deleteChannel,
  channelRename,
} = actions;
const { dispatch } = store;
const socket = io();
socket.on('newMessage', (payload) => {
  dispatch(addMessage(payload));
});
socket.on('newChannel', (payload) => {
  dispatch(addChannel(payload));
});
socket.on('removeChannel', (payload) => {
  dispatch(deleteChannel(payload));
});
socket.on('renameChannel', (payload) => {
  dispatch(channelRename(payload));
});

const chatApi = {
  sendMessage: (message) => new Promise((resolve, reject) => {
    socket.emit('newMessage', message, (response) => {
      if (response.error) {
        console.error(response.error);
        reject();
      } else {
        resolve();
      }
    });
  }),
  newChannel: (name) => new Promise((resolve, reject) => {
    socket.emit('newChannel', { name }, (response) => {
      if (response.error) {
        console.error(response.error);
        reject();
      } else {
        resolve(response.data.id);
      }
    });
  }),
  removeChannel: (id) => new Promise((resolve, reject) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.error) {
        console.error(response.error);
        reject();
      } else {
        resolve();
      }
    });
  }),
  renameChannel: ({ name, id }) => new Promise((resolve, reject) => {
    socket.emit('renameChannel', { name, id }, (response) => {
      if (response.error) {
        console.error(response.error);
        reject();
      } else {
        resolve();
      }
    });
  }),
};

export default chatApi;
