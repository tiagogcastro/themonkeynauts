import { 
  Tab,
  Tabs
} from '@/components/DashboardTab';
import { useBoolean } from '@/hooks';

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
          <Tabs>
            <Tab title="Ships" hasButtonToBack={shipIsShow}>
              <ShipsTab shipIsShow={shipIsShow} />
            </Tab>
            <Tab title="Monkeynauts" hasButtonToBack={monekeynautIsShow}>
              <MonkeynautsTab monkeynautIsShow={monekeynautIsShow} />
            </Tab>
            <Tab title="Equipment" hasButtonToBack={equipamentIsShow}>
              <EquipamentsTab />
            </Tab>
            <Tab title="Account" hasButtonToBack={accountIsShow}>
              <AccountTab />
            </Tab>
          </Tabs>
        </MainContent>
      </Content>
    </Container>
  );
}