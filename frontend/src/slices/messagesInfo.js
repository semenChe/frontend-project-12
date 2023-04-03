/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import fetchData from '../requests/fetchData.js';
import { actions as channelsInfoActions } from './channelsInfo.js';

const { deleteChannel } = channelsInfoActions;

const slice = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [] },
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      })
      .addCase(deleteChannel, (state, { payload }) => {
        state.messages = state.messages.filter(
          (message) => message.channelId !== payload.id,
        );
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
