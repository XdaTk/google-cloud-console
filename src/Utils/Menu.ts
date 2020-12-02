import { ReactElement } from 'react';

export interface SideBarSubMenuEntry {
  icon?: ReactElement;
  title: string;
}

export interface SideBarMenuItemEntry {
  icon?: ReactElement;
  title: string;
  children?: SideBarSubMenuEntry[];
}

export interface SideBarMenuEntry {
  subHeader?: string;
  items: SideBarMenuItemEntry[];
}
