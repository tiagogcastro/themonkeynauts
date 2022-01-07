import { 
  Tab,
  Tabs
} from '@/components/DashboardTab';
import { useBoolean } from '@/hooks';

import { 
  ShipsTab,
  MonkeynautsTab
} from './partials';

import {
  Container,
  Content,
  MainContent,
} from './styles';

export function Dashboard() {
  const shipIsShow = useBoolean(false);
  const monekeynautIsShow = useBoolean(false);

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
            <Tab title="Equipament">
              <div>Equipament</div>
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