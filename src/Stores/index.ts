import { configureStore, getDefaultMiddleware, ThunkAction, Action } from '@reduxjs/toolkit';

import rootReducer from './reducers';

const Store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default Store;
