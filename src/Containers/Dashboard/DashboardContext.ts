import { createContext } from 'react';

export interface DashboardSearchContextEntry {
  status?: boolean;
  handleStatus?: () => void;
  settingStatus?: boolean;
  handleSettingStatus?: () => void;
}
export const DashBoardSearchContext = createContext<DashboardSearchContextEntry>({});
