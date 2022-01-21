import { AiOutlineClose } from 'react-icons/ai';
import { UseBooleanTypes, useDashboardTabs } from '@/hooks';

import {
  Title_1
} from '@/styles/global';

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

export type ShipProps = {
  shipIsShow: UseBooleanTypes;
}

export function Ship({
  shipIsShow,
}: ShipProps) {
  const { ship } = useDashboardTabs();

  return (
    <Container>
      <Content>
        <Title_1 className="ship_name">{ship.name}</Title_1>
        <Details>
          <PrincipalDetails>
            <img className="ship_image" src={ship.avatar} alt={ship.name} />
            <ShipInformation>
              <InfoTitle_1 className="details_title">Details</InfoTitle_1>
              <UniqueInfo>
                <span>Ship ID</span>
                <strong title={ship.id} className="ship_id">{ship.id_short}</strong>
              </UniqueInfo>

              <UniqueInfo>
                <span>Owner</span>
                <strong>{ship.ownerName}</strong>
              </UniqueInfo>
              <div className="mist_info">
                <div className="info_left">
                  <UniqueInfo>
                    <span>Role</span>
                    <strong>{ship.class}</strong>
                  </UniqueInfo>
                  <UniqueInfo>
                    <span>Crew</span>
                    <strong>Text</strong>
                  </UniqueInfo>
                </div>
                <div className="info_right">
                  <UniqueInfo>
                    <span>Rank</span>
                    <strong>{ship.rank}</strong>
                  </UniqueInfo>
                  <UniqueInfo>
                    <span>Fuel</span>
                    <strong>{ship.finalAttributes.fuel}</strong>
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
            <InfoTitle_1 className="crew_title">Crew</InfoTitle_1>

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
        <button 
          onClick={shipIsShow.changeToFalse}
          className="back_page"
        >
          Back
        </button>
      </Content>
    </Container>
  );
}