import { Tab, Tabs } from '@/components/DashboardTab';
import { OwnerSendPrivateP2P } from './SendPrivateP2P';

import * as S from './styles';

export function Owner() {
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
          <Tab title="Private P2P">
           <OwnerSendPrivateP2P />
          </Tab>
          
        </Tabs>
      </S.Content>
    </S.Container>
  );
}