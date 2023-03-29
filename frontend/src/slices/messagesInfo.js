/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import fetchData from '../requests/fetchData.js';

const slice = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [] },
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
    removeMessage(state, { payload }) {
      state.messages = state.messages.filter(
        (message) => message.channelId !== payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
