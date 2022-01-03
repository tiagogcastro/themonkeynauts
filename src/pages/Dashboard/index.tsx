import { 
  Tab,
  Tabs
} from '@/components/DashboardTab';
import { useBoolean } from '@/hooks';

import { ShipsTab } from './partials';

import {
  Container,
  Content,
  MainContent,
} from './styles';

export function Dashboard() {
  const shipIsShow = useBoolean(false);

  return (
    <Container>
      <Content>
        <MainContent>
          <Tabs>
            <Tab title="Ships" hasButtonToBack={shipIsShow}>
              <ShipsTab shipIsShow={shipIsShow} />
            </Tab>
            <Tab title="Monkeynauts">
              <div>Monkeynauts</div>
            </Tab>
            <Tab title="Equipament">
              <div>Equipament</div>
            </Tab>
            <Tab title="Resources">
              <div>Resources</div>
            </Tab>
          </Tabs>
        </MainContent>
      </Content>
    </Container>
  );
}