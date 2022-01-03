import { 
  Tab,
  Tabs
} from '@/components/DashboardTab';

import { ShipsTab } from './partials';

import {
  Container,
  Content,
  MainContent,
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Content>
        <MainContent>
          <Tabs>
            <Tab title="Ships">
              <ShipsTab />
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