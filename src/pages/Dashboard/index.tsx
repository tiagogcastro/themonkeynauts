import { 
  Tab,
  Tabs
} from '@/components/DashboardTab';
import { useBoolean } from '@/hooks';

import { 
  ShipsTab,
  MonkeynautsTab,
  EquipamentsTab
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
            <Tab title="Equipament" hasButtonToBack={equipamentIsShow}>
              <EquipamentsTab />
            </Tab>
            <Tab title="Account">
              <div>Account</div>
            </Tab>
          </Tabs>
        </MainContent>
      </Content>
    </Container>
  );
}