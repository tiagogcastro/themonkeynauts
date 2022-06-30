import { 
  Tab,
  Tabs
} from '@/components/DashboardTab';
import { DashboardTabsProvider } from '@/contexts/DashboardTabs';
import { useAuth, useBoolean } from '@/hooks';

import { 
  ShipsTab,
  MonkeynautsTab,
  // EquipamentsTab,
  AccountTab,
  PrivateSale,
  StoreTab
} from './partials';
import { Admin } from './partials/admin';
import { Owner } from './partials/owner';

import {
  Container,
  Content,
  MainContent,
} from './styles';

export function Dashboard() {
  const { player } = useAuth();
  
  const shipIsShow = useBoolean(false);
  const monekeynautIsShow = useBoolean(false);
  // const equipamentIsShow = useBoolean(false);
  const accountIsShow = useBoolean(false);
  const storeIsShow = useBoolean(false);
  const privateSaleIsShow = useBoolean(false);

  return (
    <Container>
      <Content>
        <MainContent>
          <DashboardTabsProvider>
            <Tabs
              menuContentProps={{
                style: {
                  overflow: 'auto',
                }
              }}
            >
              <Tab title="Account" hasButtonToBack={accountIsShow}>
                <AccountTab />
              </Tab>
              <Tab title="Store" hasButtonToBack={storeIsShow}>
                <StoreTab />
              </Tab>
              <Tab title="Monkeynauts" hasButtonToBack={monekeynautIsShow}>
                <MonkeynautsTab monkeynautIsShow={monekeynautIsShow} />
              </Tab>
              <Tab title="Ships" hasButtonToBack={shipIsShow}>
                <ShipsTab shipIsShow={shipIsShow} />
              </Tab>
              {/* <Tab title="Equipment" hasButtonToBack={equipamentIsShow}>
                <EquipamentsTab />
              </Tab> */}
              <Tab title="Private sale" hasButtonToBack={privateSaleIsShow}>
                <PrivateSale />
              </Tab>
              <Tab title="Admin" render={player?.player.role.toLowerCase() === 'admin'}>
                <Admin />
              </Tab>
              <Tab title="Owner" render={player?.player.role.toLowerCase() === 'owner'}>
                <Owner />
              </Tab>
            </Tabs>
          </DashboardTabsProvider>
        </MainContent>
      </Content>
    </Container>
  );
}