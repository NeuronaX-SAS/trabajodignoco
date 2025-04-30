import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Import the auth slice reducer

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // Add the auth reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // Optional: Add middleware like logger
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];