import {
  Tab,
  Tabs
} from '@/components/DashboardTab';
import { DashboardTabsProvider } from '@/contexts/DashboardTabs';
import {
  FiSettings,
  FiShoppingCart,
  FiTag,
  FiUser,
  FiKey,
} from 'react-icons/fi';
import { GiSpaceShuttle, GiMonkey } from 'react-icons/gi';
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

  const playerRolesAccess = ['admin', 'owner'];

  const playerRole = player?.player.role.toLowerCase();

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
              <Tab title="Account" icon={<FiUser />} hasButtonToBack={accountIsShow}>
                <AccountTab />
              </Tab>
              <Tab title="Store" icon={<FiShoppingCart />} hasButtonToBack={storeIsShow}>
                <StoreTab />
              </Tab>
              <Tab title="Monkeynauts" icon={<GiMonkey />} hasButtonToBack={monekeynautIsShow}>
                <MonkeynautsTab monkeynautIsShow={monekeynautIsShow} />
              </Tab>
              <Tab title="Ships" icon={<GiSpaceShuttle />} hasButtonToBack={shipIsShow}>
                <ShipsTab shipIsShow={shipIsShow} />
              </Tab>
              {/* <Tab title="Equipment" hasButtonToBack={equipamentIsShow}>
                <EquipamentsTab />
              </Tab> */}
              <Tab title="Private sale" icon={<FiTag />} hasButtonToBack={privateSaleIsShow}>
                <PrivateSale />
              </Tab>
              <Tab title="Admin" icon={<FiSettings />} render={playerRole ? playerRolesAccess.includes(playerRole): false}>
                <Admin />
              </Tab>
              <Tab title="Owner" icon={<FiKey />} render={playerRole === 'owner'}>
                <Owner />
              </Tab>
            </Tabs>
          </DashboardTabsProvider>
        </MainContent>
      </Content>
    </Container>
  );
}