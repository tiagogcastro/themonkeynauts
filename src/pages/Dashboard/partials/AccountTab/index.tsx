import { FaReact } from 'react-icons/fa';

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

  Spc,
} from './styles';
import { Button } from '@/components';
import { useAuth } from '@/hooks';

export function AccountTab() {
  const { user } = useAuth();
  
  return (
    <Container>
      <Content>
        <Details>
          <InfoTitle_1 className="details_title">Details</InfoTitle_1>

          <Info>
            <div className="info_separator">
              <UniqueInfo>
                <span>Rank</span>
                <strong>Text</strong>
              </UniqueInfo>
              <UniqueInfo>
                <span>Your ID</span>
                <strong title={user?.user.id} className="info_id">{user?.user.id}</strong>
              </UniqueInfo>
              <UniqueInfo>
                <span>E-mail</span>
                <strong>{user?.user.email}</strong>
              </UniqueInfo>
            </div>
            <div className="info_separator">
              <UniqueInfo>
                <span>Nickname</span>
                <strong>{user?.user.nickname}</strong>
              </UniqueInfo>
              <UniqueInfo>
                <span>Wallet</span>
                <Button className="wallet_button" text="Link" />
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
                <strong>200</strong>
              </Resource>
              <Resource>
                <img src={gold_ore} />
                <strong>200</strong>
              </Resource>
              <Resource>
                <img src={bronze_ore} />
                <strong>200</strong>
              </Resource>
              <Resource>
                <img src={scrap} />
                <strong>200</strong>
              </Resource>
              <Resource>
                <FaReact />
                <strong>200</strong>
              </Resource>
              <Resource>
                <img src={spc} />
                <strong>200</strong>
              </Resource>
            </Resources>
          </ResourcesDetail>
          <Spc>
            <InfoTitle_1>SPC WITHDRAW</InfoTitle_1>
            <input placeholder="Withdraw" type="text" />
            <Button type="submit" text="Withdraw"/>
          </Spc>
        </SecondaryDetails>
      </Content>
    </Container>
  );
}