import { createSlice } from '@reduxjs/toolkit';
import { MainSliceState } from '../types/slice';

const initialState: MainSliceState = {
  title: '',
  isPosting: false,
  user: null,
};

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setIsPosting: (state, action) => {
      state.isPosting = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default mainSlice;
