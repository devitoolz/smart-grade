import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  isPosting: false,
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
  },
});

export default mainSlice;
