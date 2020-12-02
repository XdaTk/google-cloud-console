import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DashboardSearchStatusType = 'close' | 'open' | 'setting';

interface DashboardSearchState {
  status: DashboardSearchStatusType;
}

const initialState: DashboardSearchState = {
  status: 'close',
};

const dashboardSearchSlice = createSlice({
  name: 'ContainerDashboardSearch',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<DashboardSearchStatusType>) {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = dashboardSearchSlice.actions;

export default dashboardSearchSlice.reducer;
