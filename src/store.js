import { configureStore } from '@reduxjs/toolkit';
import majorSlice from './slices/majorSlice';
import mainSlice from './slices/mainSlice';

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    major: majorSlice.reducer,
  },
});

export default store;
