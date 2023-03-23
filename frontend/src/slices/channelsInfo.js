/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import getRoutes from '../routes.js';

const fetchData = createAsyncThunk(
  'channelsInfo/setInitialState',
  async (authHeader, { rejectWithValue }) => {
    try {
      const response = await axios.get(getRoutes.dataPath(), { headers: authHeader });
      return response.data;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: err.status });
    }
  },
);

const slice = createSlice({
  name: 'channelsInfo',
  initialState: { loading: false, channels: [], currentChannelId: null },
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setActualChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    deleteChannel(state, { payload }) {
      state.channels = state.channels.filter(
        (channel) => channel.id !== payload,
      );
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

export const actions = {
  ...slice.actions,
  fetchData,
};
export default slice.reducer;
