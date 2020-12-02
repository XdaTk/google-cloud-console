import { combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';

import ContainerDashboardSearchReducer from 'Containers/Dashboard/DashboardSearchSlice';
import ContainerDashboardProjectReducer from 'Containers/Dashboard/DashboardProjectSlice';

const Reducers = combineReducers({
  ContainerDashboardSearchReducer: ContainerDashboardSearchReducer,
  ContainerDashboardProjectReducer: ContainerDashboardProjectReducer,
});

export type RootState = ReturnType<typeof Reducers>;

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default Reducers;
