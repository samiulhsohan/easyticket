import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
// import logger from './middleware/logger';

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware()],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
