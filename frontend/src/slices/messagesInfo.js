import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsInfoActions } from './channelsInfo.js';

const slice = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [] },
  reducers: {
    // reducers
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
