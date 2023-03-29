import { combineReducers, configureStore } from '@reduxjs/toolkit';

import channelsInfo, { actions as channelsInfoActions } from './channelsInfo.js';
import messagesInfo, { actions as messagesInfoActions } from './messagesInfo.js';
import modalInfo, { actions as modalInfoActions } from './modalInfo.js';

const reducer = combineReducers({
  channelsInfo,
  messagesInfo,
  modalInfo,
});
export const actions = {
  ...channelsInfoActions,
  ...messagesInfoActions,
  ...modalInfoActions,
};

export default configureStore({
  reducer,
});
