import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  majorList: [],
};

const majorSlice = createSlice({
  name: 'majorSlice',
  initialState,
  reducers: {
    setMajorList: (state, action) => {
      state.majorList = action.payload;
    },
  },
});

export default majorSlice;
