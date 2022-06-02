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
  PrivateSale
} from './partials';
import { Admin } from './partials/admin';
import { FoundersPackTab } from './partials/FoundersPackTab';

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
  const foundersPackIsShow = useBoolean(false);
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
              <Tab title="Founder's Packs" hasButtonToBack={foundersPackIsShow}>
                <FoundersPackTab />
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
              <Tab title="Admin">
                <Admin />
              </Tab>
            </Tabs>
          </DashboardTabsProvider>
        </MainContent>
      </Content>
    </Container>
  );
}