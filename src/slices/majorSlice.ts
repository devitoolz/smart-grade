import { createSlice } from '@reduxjs/toolkit';
import { MajorSliceState } from '../types/slices';

const initialState: MajorSliceState = {
  allMajorList: [],
};

const majorSlice = createSlice({
  name: 'majorSlice',
  initialState,
  reducers: {
    setAllMajorList: (state, action) => {
      state.allMajorList = [...action.payload];
    },
  },
});

export default majorSlice;
