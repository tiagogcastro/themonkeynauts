import { FaReact } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from '@/hooks';

import bronze_ore from '@/assets/images/bronze_ore.png';
import iron_ore from '@/assets/images/iron_ore.png';
import gold_ore from '@/assets/images/gold_ore.png';
import scrap from '@/assets/images/scrap.png';
import spc from '@/assets/images/spc.png';

import {
  Container,
  Content,
  InfoTitle_1,
  Details,
  Info,
  UniqueInfo,

  SecondaryDetails,
  ResourcesDetail,
  Resources,
  Resource,
} from './styles';

export type HandleChange = {
  event: React.ChangeEvent<HTMLInputElement>;
}

export function AccountTab() {
  const { user, signOut } = useAuth();
    
  return (
    <Container>
      <Content>
        <Details>
          <header className="detail_header">
            <InfoTitle_1 className="details_title">Details</InfoTitle_1>
            <button 
              className="signout_button"
              onClick={signOut}
            >
              <FiLogOut /> Signout
            </button>
          </header>

          <Info>
            <div className="info_separator">
              <UniqueInfo>
                <span>Your ID</span>
                <strong title={user?.user.id} className="info_id">{user?.user.id_short}</strong>
              </UniqueInfo>
              <UniqueInfo>
                <span>Nickname</span>
                <strong>{user?.user.nickname}</strong>
              </UniqueInfo>
              <UniqueInfo>
                <span>E-mail</span>
                <strong>{user?.user.email}</strong>
              </UniqueInfo>
            </div>
          </Info>
        </Details>
        <SecondaryDetails>
          <ResourcesDetail>
            <InfoTitle_1 className="resources_title">Resources</InfoTitle_1>

            <Resources>
              <Resource>
                <img src={iron_ore} />
                <strong>0</strong>
              </Resource>
              <Resource>
                <img src={gold_ore} />
                <strong>0</strong>
              </Resource>
              <Resource>
                <img src={bronze_ore} />
                <strong>0</strong>
              </Resource>
              <Resource>
                <img src={scrap} />
                <strong>0</strong>
              </Resource>
              <Resource>
                <FaReact />
                <strong>0</strong>
              </Resource>
              <Resource>
                <img src={spc} />
                <strong>0</strong>
              </Resource>
            </Resources>
          </ResourcesDetail>
          
        </SecondaryDetails>
      </Content>
    </Container>
  );
}