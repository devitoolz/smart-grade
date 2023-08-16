import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allMajorList: [],
};

const majorSlice = createSlice({
  name: 'majorSlice',
  initialState,
  reducers: {
    setAllMajorList: (state, action) => {
      state.allMajorList = action.payload;
    },
  },
});

export default majorSlice;
