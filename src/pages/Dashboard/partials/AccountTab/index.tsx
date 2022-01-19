import { FaReact } from 'react-icons/fa';

import { useAuth, useBoolean } from '@/hooks';

import { Wallet } from '@/components/modals/Wallet';
import { Button } from '@/components';

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

export function AccountTab() {
  const { user } = useAuth();

  const walletModalIsOpen = useBoolean();
  
  return (
    <Container>
      <Content>
        <Details>
          <InfoTitle_1 className="details_title">Details</InfoTitle_1>

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
            <div className="info_separator">
              <UniqueInfo>
                <span>Wallet</span>
                <Button 
                  className="wallet_button"
                  text="Link"
                  onClick={walletModalIsOpen.changeToTrue}  
                />
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
          <Spc>
            <InfoTitle_1 className="spc_title">WITHDRAW/DEPOSIT SPC</InfoTitle_1>
            <input placeholder="Withdraw/desposit spc" type="text" />
            <Button type="submit" text="Withdraw"/>
            <Button type="submit" text="Deposit"/>
          </Spc>
        </SecondaryDetails>
      </Content>
      <Wallet 
        isOpen={walletModalIsOpen.state} 
        handleClose={walletModalIsOpen.changeToFalse}
      />
    </Container>
  );
}