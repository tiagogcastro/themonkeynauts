import { useAuth } from '@/hooks';
import { MonkeynautType, ShipType } from '@/services/app_api';
import { createContext, useEffect, useMemo, useState } from 'react';

export type DashboardTabsContextData = {
  ship: ShipType.Ship;
  setShip: React.Dispatch<React.SetStateAction<ShipType.Ship>>;

  monkeynaut: MonkeynautType.Monkeynaut;
  setMonkeynaut: React.Dispatch<React.SetStateAction<MonkeynautType.Monkeynaut>>;
}

export const DashboardTabsContext = createContext({} as DashboardTabsContextData);

export type DashboardTabProviderProps = {
  children:React.ReactNode;
};

export function DashboardTabsProvider({children}: DashboardTabProviderProps) {
  const [ship, setShip] = useState<ShipType.Ship>({} as ShipType.Ship);
  const [monkeynaut, setMonkeynaut] = useState<MonkeynautType.Monkeynaut>({} as MonkeynautType.Monkeynaut);

  return (
    <DashboardTabsContext.Provider 
      value={{
        ship,
        setShip,

        monkeynaut,
        setMonkeynaut
      }}
    >
      {children}
    </DashboardTabsContext.Provider>
  )
}