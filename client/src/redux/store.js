// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import  carsApi  from './features/cars/carsApi';  // Import your API slice

// Configure your store with the necessary reducers
export const store = configureStore({
  reducer: {
    [carsApi.reducerPath]: carsApi.reducer,  // Add your API slice reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carsApi.middleware),  // Add middleware for RTK Query
});
