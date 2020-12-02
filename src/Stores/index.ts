import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import Reducers from './reducers';

const Store = configureStore({
  reducer: Reducers,
  middleware: [...getDefaultMiddleware()],
});

export default Store;
