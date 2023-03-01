import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'channelsInfo/setInitialState',
  async (authHeader, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.dataPath(), { headers: authHeader });
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
    // reducers
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

const actions = {
  ...slice.actions,
  fetchData,
};
export { actions };
export default slice.reducer;
