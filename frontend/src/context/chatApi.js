import { io } from 'socket.io-client';

import store, { actions } from '../slices/index.js';

const {
  addMessage,
  addChannel,
  deleteChannel,
  channelRename,
  // setNewChannelId,
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
  sendMessage: (message, cb) => {
    socket.emit('newMessage', message, ({ status }) => {
      if (status === 'ok') {
        cb(null);
        return;
      }
      cb(status);
    });
  },
  // newChannel: (name, cb) => {
  //   socket.emit('newChannel', { name }, (res) => {
  //     if (status === 'ok') {
  //       cb(null, res);
  //       return;
  //     }
  //     cb(status);
  //   });
  // },
  newChannel: (name, cb) => new Promise((resolve, reject) => {
    socket.emit('newChannel', { name }, (response) => {
      if (response.error) {
        console.error(response.error);
        reject(response.error);
      } else {
        resolve(response.data.id);
      }
      cb(response.error);
    });
  }),
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
