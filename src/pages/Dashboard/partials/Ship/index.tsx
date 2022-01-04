import { AiOutlineClose } from 'react-icons/ai';

import {
  Title_1
} from '@/styles/global';

import fighter_2 from '@/assets/fighter_2.png';
import notfound from '@/assets/notfound.png';

import {
  Container,
  Content,
  Details,
  PrincipalDetails,
  ShipInformation,
  UniqueInfo,
  PveBonusInfo,

  InfoTitle_1,

  CrewContainer,
  CrewContent,
  CrewSelected,
  CrewToSelect,
} from './styles';

export function Ship() {
  return (
    <Container>
      <Content>
        <Title_1 className="ship_name">Valkyrie</Title_1>
        <Details>
          <PrincipalDetails>
            <img className="ship_image" src={fighter_2} alt="" />
            <ShipInformation>
              <UniqueInfo>
                <span>Ship ID</span>
                <strong>625...dwc</strong>
              </UniqueInfo>

              <UniqueInfo>
                <span>Owner</span>
                <strong>You</strong>
              </UniqueInfo>
              <div className="mist_info">
                <div className="info_left">
                  <UniqueInfo>
                    <span>Role</span>
                    <strong>Fighter</strong>
                  </UniqueInfo>
                  <UniqueInfo>
                    <span>Crew</span>
                    <strong>2/4</strong>
                  </UniqueInfo>
                </div>
                <div className="info_right">
                  <UniqueInfo>
                    <span>Rank</span>
                    <strong>5</strong>
                  </UniqueInfo>
                  <UniqueInfo>
                    <span>Fuel</span>
                    <strong>400/400</strong>
                  </UniqueInfo>
                </div>
              </div>

              <PveBonusInfo>
                <InfoTitle_1>PVE BONUS</InfoTitle_1>
                <p className="pve_detail">
                  + 100% PVE Bonus <br />
                  Bounty Hunting Damage
                </p>
              </PveBonusInfo>
            </ShipInformation>
          </PrincipalDetails>
          <CrewContainer>
            <InfoTitle_1>Crew</InfoTitle_1>

            <CrewContent>
              <CrewSelected>
                <div className="crew_content">
                  <div>
                    <img src={notfound} alt="" />
                    <span className="crew_name">Segundo Engenner Major</span>
                  </div>
                  <button className="crew_remove"><AiOutlineClose /></button>
                </div>
              </CrewSelected>

              <CrewToSelect>
                <div className="crew_content">
                  <span>Select Monkeynaut</span>
                </div>
              </CrewToSelect>
            </CrewContent>
          </CrewContainer>
        </Details>
      </Content>
    </Container>
  );
}