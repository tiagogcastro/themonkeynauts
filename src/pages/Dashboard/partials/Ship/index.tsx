import { useEffect, useMemo } from 'react';

import { UseBooleanTypes, useDashboardTabs } from '@/hooks';

import { capitalize, verifyRole } from '@/utils';

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
import { baseApi } from '@/services/api';
import { toast } from 'react-toastify';
import { COLORS } from '@/theme';

export type ShipProps = {
  shipIsShow: UseBooleanTypes;
}

export function Ship({
  shipIsShow,
}: ShipProps) {
  const { ship, setShip } = useDashboardTabs();

  async function getCrew() {
    try {
      const getCrewsResponse = await baseApi.get('/crews/list-by-ship', {
        params: {
          shipId: ship.id,
        }
      });

      setShip({
        ...ship,
        crews: getCrewsResponse.data,
      });

    } catch(error: any) {
      const error_message = error?.response?.data.message;

      toast(error_message, {
        autoClose: 5000,
        pauseOnHover: true,
        type: 'error',
        style: {
          background: COLORS.global.white_0,
          color: COLORS.global.red_0,
          fontSize: 14,
          fontFamily: 'Orbitron, sans-serif',
        }
      });
    }
  }

  useEffect(() => {
    getCrew();
  }, []);

  const shipModified = useMemo(() => {
    return {
      ...ship,
      crews: ship?.crews && ship.crews.map(crew => {
        return {
          ...crew,
          rank: capitalize(crew.rank),
          class: capitalize(crew.class),
          avatar: verifyRole(crew.class, {
            engineer,
            scientist,
            soldier
          })
        };
      }),
    };
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
                <strong>{capitalize(String(ship.ownerName))}</strong>
              </UniqueInfo>
              <div className="mist_info">
                <div className="info_left">
                  <UniqueInfo>
                    <span>Role</span>
                    <strong>{capitalize(ship.class)}</strong>
                  </UniqueInfo>
                  <UniqueInfo>
                    <span>Crew</span>
                    <strong>{shipModified.crews?.length}/{shipModified.crewCapacity}</strong>
                  </UniqueInfo>
                </div>
                <div className="info_right">
                  <UniqueInfo>
                    <span>Rank</span>
                    <strong>{capitalize(ship.rank)}</strong>
                  </UniqueInfo>
                  <UniqueInfo>
                    <span>Durability</span>
                    <strong>{ship.fuel}/{ship.tankCapacity}</strong>
                  </UniqueInfo>
                </div>
              </div>

              <PveBonusInfo>
                <InfoTitle_1>PVE BONUS</InfoTitle_1>
                <p className="pve_detail">
                  {ship.class.toLowerCase() !== 'explorer' && '+ '}{ship.bonusValue}% <br />
                  {ship.bonusDescription}
                </p>
              </PveBonusInfo>
            </ShipInformation>
          </PrincipalDetails>
          <CrewContainer>
            <InfoTitle_1 className={`crew_title ${shipModified.crews?.length === 0 && 'none_crew_list'}`}>Crew</InfoTitle_1>

            <CrewContent>
              {shipModified.crews && shipModified.crews?.length > 0 ? shipModified.crews?.map(crew => (
                <CrewSelected key={crew.id}>
                  <div className="crew_content">
                    <img src={crew.avatar} alt={`Image from monkeynaut name: ${crew.name}`} />
                    <div className="crew_infos">
                      <span className="crew_name">{crew.name}</span>
                      <span>{crew.class}</span>
                      <span>{crew.rank}</span>
                      <span>Energy: {crew.energy}/{crew.maxEnergy}</span>
                    </div>
                  </div>
                </CrewSelected>
              )) : (
                <p>None</p>
              )}
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