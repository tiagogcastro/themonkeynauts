import { useContext } from 'react';

import {
  DashboardTabsContext
} from '../contexts';

export function useDashboardTabs() {
  const context = useContext(DashboardTabsContext);

  return context;
}