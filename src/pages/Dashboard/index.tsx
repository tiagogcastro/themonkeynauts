import { 
  Tab,
  Tabs
} from '@/components/DashboardTab';
import {
  Container,
  Content
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Content>
        <Tabs>
          <Tab title="Ships">
            <div>Ships</div>
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
        {/* <header>
          <h1>Ships</h1>
          <button>
            =
          </button>
        </header>
        <TabContentMain>
          <MonkeynautsContainer>

          </MonkeynautsContainer>
        </TabContentMain> */}
      </Content>
    </Container>
  );
}