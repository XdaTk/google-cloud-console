import { configureStore, getDefaultMiddleware, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';

const rootReducer = combineReducers({});

const Store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default Store;
