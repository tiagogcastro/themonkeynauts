import { AiFillHeart } from 'react-icons/ai';
import { GiBroadsword } from 'react-icons/gi';
import { BiRun, BiShieldQuarter, BiPlus } from 'react-icons/bi';

import { UseBooleanTypes, useDashboardTabs } from '@/hooks';

import { capitalize } from '@/utils';

import {
  Title_1
} from '@/styles/global';

import * as S from './styles';
import { useEffect } from 'react';
import { baseApi } from '@/services/api';

export type MonkeynautProps = {
  monkeynautIsShow: UseBooleanTypes;
}

export function Monkeynaut({
  monkeynautIsShow,
}: MonkeynautProps) { 
  const { monkeynaut, setMonkeynaut } = useDashboardTabs();

  async function getCrew() {
    const getUniqueShipCrewResponse = await baseApi.get('/crews/list-by-monkeynaut', {
      params: {
        monkeynautId: monkeynaut.id,
      }
    });

    setMonkeynaut({
      ...monkeynaut,
      ...getUniqueShipCrewResponse.data.data,
    });
  }

  useEffect(() => {
    getCrew();
  }, []);

  return (
    <S.Container>
      <S.Content>
        <Title_1 className="monkeynaut_name">{monkeynaut.name}</Title_1>
        <S.Details>
          <S.PrincipalDetails>
            <img className="monkeynaut_image" src={monkeynaut?.avatar} alt={`Monkeynaut name: ${monkeynaut.name}`} />
            <S.MonkeynautInformation>
              <S.InfoTitle_1 className="details_title">Details</S.InfoTitle_1>
              <S.UniqueInfo>
                <span>Monkeynaut ID</span>
                <strong title={monkeynaut.id} className="monkeynaut_id">{monkeynaut.id_short}</strong>
              </S.UniqueInfo>

              <S.UniqueInfo>
                <span>Owner</span>
                <strong>{capitalize(String(monkeynaut.ownerName))}</strong>
              </S.UniqueInfo>
              <div className="mist_info">
                <div className="info_left">s
                  <S.UniqueInfo>
                    <span>Role</span>
                    <strong>{monkeynaut.role}</strong>
                  </S.UniqueInfo>
                  <S.UniqueInfo>
                    <span>Energy</span>
                    <strong>{monkeynaut.energy}/{monkeynaut.maxEnergy}</strong>
                  </S.UniqueInfo>
                </div>
                <div className="info_right">
                  <S.UniqueInfo>
                    <span>Rank</span>
                    <strong>{monkeynaut.rank}</strong>
                  </S.UniqueInfo>

                  <S.UniqueInfo>
                    <span>Breed Count</span>
                    <strong>{monkeynaut.breedCount}</strong>
                  </S.UniqueInfo>
                </div>
              </div>
              <S.UniqueInfo className={`${!monkeynaut.crews && 'none_crew'}`}>
                <span>Crew in Ship</span>
                <S.CrewInShipContainer>
                  {monkeynaut?.crews ? (
                    <S.CrewInShip>
                      <div>
                        <strong>{monkeynaut.crews.name}</strong>
                        <p>{monkeynaut.crews.role}</p>
                      </div>
                    </S.CrewInShip>
                  ) : (
                    <p>None</p>
                  )}
                </S.CrewInShipContainer>
              </S.UniqueInfo>
            </S.MonkeynautInformation>
          </S.PrincipalDetails>
          <S.OthersDetails>
            <S.AttributesContainer>
              <S.InfoTitle_1>Attributes</S.InfoTitle_1>
              <S.Attributes>
                <S.Attribute>
                  <GiBroadsword />
                  <strong>{monkeynaut.power}</strong>
                </S.Attribute>
                <S.Attribute>
                  <BiRun />
                  <strong>{monkeynaut.speed}</strong>
                </S.Attribute>
                <S.Attribute>
                  <BiShieldQuarter />
                  <strong>{monkeynaut.resistence}</strong>
                </S.Attribute>
                <S.Attribute>
                  <AiFillHeart />
                  <strong>{monkeynaut.health}</strong>
                </S.Attribute>
              </S.Attributes>
            </S.AttributesContainer>
            <S.PveBonusInfo>
              <S.InfoTitle_1>PVE BONUS</S.InfoTitle_1>
              <p className="pve_detail">
                + {monkeynaut.bonusValue}% <br />
                {monkeynaut.bonusDescription}
              </p>
            </S.PveBonusInfo>
            <S.EquipamentsContainer>
              <S.InfoTitle_1 className="equipament_title">Equipments</S.InfoTitle_1>

              <S.EquipamentsContent>
                <S.EquipamentToSelect>
                  <div className="equipament_content">
                    <BiPlus />
                  </div>
                </S.EquipamentToSelect>
                <S.EquipamentToSelect>
                  <div className="equipament_content">
                    <BiPlus />
                  </div>
                </S.EquipamentToSelect>
                <S.EquipamentToSelect>
                  <div className="equipament_content">
                    <BiPlus />
                  </div>
                </S.EquipamentToSelect>
              </S.EquipamentsContent>
            </S.EquipamentsContainer>
          </S.OthersDetails>
        </S.Details>
        <button 
          onClick={monkeynautIsShow.changeToFalse}
          className="back_page"
        >
          Back
        </button>
      </S.Content>
    </S.Container>
  );
}