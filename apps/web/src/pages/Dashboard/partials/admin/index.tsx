import { Tab, Tabs } from '@/components/DashboardTab';
import { AdminAirDropNft } from './AirDropNft';
import { AdminBanAccount } from './BanAccount';
import { AdminCreateSale } from './CreateSale';
import { AdminGameParams } from './GameParams';
import { AdminLog } from './Log';

import * as S from './styles';

export function Admin() {
  return (
    <S.Container>
      <S.Content>
        <Tabs
          menuContentProps={{
            className:"menucontainerclasse",
            style: {
              flexDirection: 'column',
              marginTop: 0,
            }
          }}
          tabContainerProps={{
            className: "tabcontainerclasse",
          }}
          menuContainerProps={{
            style: {
              marginTop: 0,
              maxWidth: 'max-content',
            }
          }}
        >
          <Tab title="Sales">
            <AdminCreateSale />
          </Tab>
          <Tab title="Air Drop NFTS">
            <AdminAirDropNft />
          </Tab>
          <Tab title="Ban Account">
            <AdminBanAccount />
          </Tab>
          <Tab title="Log">
            <AdminLog />
          </Tab>
          <Tab title="Game Params">
            <AdminGameParams />
          </Tab>
        </Tabs>
      </S.Content>
    </S.Container>
  );
}