import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './peopleSlice';

const store = configureStore({
  reducer: {
    people: peopleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
