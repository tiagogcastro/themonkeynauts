import { 
  Tab,
  Tabs
} from '@/components/DashboardTab';
import { DashboardTabsProvider } from '@/contexts/DashboardTabs';
import { useBoolean } from '@/hooks';
import { MetaMaskProvider } from 'metamask-react';

import { 
  ShipsTab,
  MonkeynautsTab,
  EquipamentsTab,
  AccountTab
} from './partials';

import {
  Container,
  Content,
  MainContent,
} from './styles';

export function Dashboard() {
  const shipIsShow = useBoolean(false);
  const monekeynautIsShow = useBoolean(false);
  const equipamentIsShow = useBoolean(false);
  const accountIsShow = useBoolean(false);

  return (
    <Container>
      <Content>
        <MainContent>
          <MetaMaskProvider>
            <DashboardTabsProvider>
              <Tabs>
                <Tab title="Account" hasButtonToBack={accountIsShow}>
                  <AccountTab />
                </Tab>
                <Tab title="Founder's Packs" hasButtonToBack={accountIsShow}>
                  <AccountTab />
                </Tab>
                <Tab title="Monkeynauts" hasButtonToBack={monekeynautIsShow}>
                  <MonkeynautsTab monkeynautIsShow={monekeynautIsShow} />
                </Tab>
                <Tab title="Ships" hasButtonToBack={shipIsShow}>
                  <ShipsTab shipIsShow={shipIsShow} />
                </Tab>
                <Tab title="Equipment" hasButtonToBack={equipamentIsShow}>
                  <EquipamentsTab />
                </Tab>
              </Tabs>
            </DashboardTabsProvider>
          </MetaMaskProvider>
        </MainContent>
      </Content>
    </Container>
  );
}