import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  majorList: [],
};

const majorSlice = createSlice({
  name: 'majorSlice',
  initialState,
  reducers: {
    loadMajorList: (state, action) => {
      state.majorList = action.payload;
    },
  },
});

export default majorSlice;
