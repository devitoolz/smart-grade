import { configureStore } from '@reduxjs/toolkit';
import majorSlice from './slices/majorSlice';
import mainSlice from './slices/mainSlice';

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    major: majorSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
