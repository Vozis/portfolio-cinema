import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@/store/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type TypeRootState = ReturnType<typeof store.getState>;
