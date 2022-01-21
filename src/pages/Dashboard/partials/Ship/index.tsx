import { useMemo } from 'react';

import { UseBooleanTypes, useDashboardTabs } from '@/hooks';

import { verifyRole } from '@/utils';

import {
  Title_1
} from '@/styles/global';
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
} from './styles';

import engineer from '@/assets/images/engineer.png';
import scientist from '@/assets/images/scientist.png';
import soldier from '@/assets/images/soldier.png';

export type ShipProps = {
  shipIsShow: UseBooleanTypes;
}

export function Ship({
  shipIsShow,
}: ShipProps) {
  const { ship } = useDashboardTabs();

  const shipModified = useMemo(() => {
    return {
      ...ship,
      crew: ship.crew && ship.crew.map(crew => {
        return {
          ...crew,
          avatar: verifyRole(crew.class, {
            engineer,
            scientist,
            soldier
          })
        }
      })
    }
  }, [ship]);

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
                    <strong>2/2</strong>
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
              {shipModified && shipModified.crew.map(crew => (
                <CrewSelected>
                  <div className="crew_content">
                    <img src={crew.avatar} alt={`${crew.firstName} ${crew.lastName}`} />
                    <div className="crew_infos">
                      <span>{crew.firstName} {crew.lastName}</span>
                      <span>{crew.class}</span>
                      <span>{crew.rank}</span>
                      <span>Energy: 2/2</span>
                    </div>
                  </div>
                </CrewSelected>
              ))}
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