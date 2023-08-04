import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPosting: false,
};

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setIsPosting: (state, action) => {
      state.isPosting = action.payload;
    },
  },
});

export default mainSlice;
