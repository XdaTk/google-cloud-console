import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardProjectState {
  status: boolean;
}

const initialState: DashboardProjectState = {
  status: false,
};

const dashboardProjectSlice = createSlice({
  name: 'ContainerDashboardProject',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<boolean>) {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = dashboardProjectSlice.actions;

export default dashboardProjectSlice.reducer;
