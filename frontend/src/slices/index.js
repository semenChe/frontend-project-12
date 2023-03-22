import { combineReducers } from '@reduxjs/toolkit';

import channelsInfo, { actions as channelsInfoActions } from './channelsInfo.js';
import messagesInfo, { actions as messagesInfoActions } from './messagesInfo.js';
import modalInfo, { actions as modalInfoActions } from './modalInfo.js';

const actions = {
  ...channelsInfoActions,
  ...messagesInfoActions,
  ...modalInfoActions,
};

export {
  actions,
};

export default combineReducers({
  channelsInfo,
  messagesInfo,
  modalInfo,
});
