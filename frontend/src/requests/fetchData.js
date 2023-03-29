import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

export default fetchData;
