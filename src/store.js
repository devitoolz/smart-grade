import { configureStore } from '@reduxjs/toolkit';
import majorSlice from './slices/majorSlice';

const store = configureStore({
  reducer: {
    major: majorSlice.reducer,
  },
});

export default store;
