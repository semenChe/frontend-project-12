import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsInfoActions } from './channelsInfo.js';

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
      .addCase(channelsInfoActions.fetchData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
