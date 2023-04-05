/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import fetchData from '../requests/fetchData.js';

const defaultCurrentChannelId = 1;
const slice = createSlice({
  name: 'channelsInfo',
  initialState: { loading: false, channels: [], currentChannelId: defaultCurrentChannelId },
  reducers: {
    setActualChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.newChannelId = payload.id;
      state.channels.push(payload);
    },
    deleteChannel(state, { payload }) {
      state.channels = state.channels.filter(
        (channel) => channel.id !== payload.id,
      );
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = defaultCurrentChannelId;
      }
    },
    channelRename(state, { payload }) {
      const { id, name } = payload;
      const channel = state.channels.find((chann) => chann.id === id);
      channel.name = name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.channels = payload.channels;
        state.currentChannelId = payload.currentChannelId;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
