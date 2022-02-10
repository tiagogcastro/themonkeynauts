import { AiFillHeart } from 'react-icons/ai';
import { GiBroadsword } from 'react-icons/gi';
import { BiRun, BiShieldQuarter, BiPlus } from 'react-icons/bi';

import { UseBooleanTypes, useDashboardTabs } from '@/hooks';

import {
  Title_1
} from '@/styles/global';

import fighter_2 from '@/assets/fighter_2.png';
import btn_delete from '@/assets/images/btn_delete.png';

import {
  Container,
  Content,
  Details,
  PrincipalDetails,
  MonkeynautInformation,
  
  OthersDetails,

  UniqueInfo,
  CrewInShipContainer,
  CrewInShip,

  AttributesContainer,
  Attributes,
  Attribute,

  PveBonusInfo,

  InfoTitle_1,

  EquipamentsContainer,
  EquipamentsContent,
  EquipamentToSelect,
} from './styles';

import { capitalize } from '@/utils';

export type MonkeynautProps = {
  monkeynautIsShow: UseBooleanTypes;
}

export function Monkeynaut({
  monkeynautIsShow,
}: MonkeynautProps) { 
  const { monkeynaut } = useDashboardTabs();
  return (
    <Container>
      <Content>
        <Title_1 className="monkeynaut_name">{monkeynaut.firstName} {monkeynaut.lastName}</Title_1>
        <Details>
          <PrincipalDetails>
            <img className="monkeynaut_image" src={monkeynaut.avatar} alt={`${monkeynaut.firstName} ${monkeynaut.lastName}`} />
            <MonkeynautInformation>
              <InfoTitle_1 className="details_title">Details</InfoTitle_1>
              <UniqueInfo>
                <span>Monkeynaut ID</span>
                <strong title={monkeynaut.id} className="monkeynaut_id">{monkeynaut.id_short}</strong>
              </UniqueInfo>

              <UniqueInfo>
                <span>Owner</span>
                <strong>{capitalize(String(monkeynaut.ownerName))}</strong>
              </UniqueInfo>
              <div className="mist_info">
                <div className="info_left">
                  <UniqueInfo>
                    <span>Role</span>
                    <strong>{capitalize(monkeynaut.class)}</strong>
                  </UniqueInfo>
                  <UniqueInfo>
                    <span>Energy</span>
                    <strong>{monkeynaut.attributes.currentEnergy}/{monkeynaut.attributes.maxEnergy}</strong>
                  </UniqueInfo>
                </div>
                <div className="info_right">
                  <UniqueInfo>
                    <span>Rank</span>
                    <strong>{capitalize(monkeynaut.rank)}</strong>
                  </UniqueInfo>

                  <UniqueInfo>
                    <span>Breed Count</span>
                    <strong>{monkeynaut.breedCount}</strong>
                  </UniqueInfo>
                </div>
              </div>
              <UniqueInfo>
                <span>Crew in Ship</span>
                <CrewInShipContainer>
                  {monkeynaut.crew_in_ship && (
                    <CrewInShip>
                      <div>
                        <strong>{monkeynaut.crew_in_ship.name}</strong>
                        <p>{capitalize(monkeynaut.crew_in_ship.class)}</p>
                      </div>
                    </CrewInShip>
                  )}
                </CrewInShipContainer>
              </UniqueInfo>
            </MonkeynautInformation>
          </PrincipalDetails>
          <OthersDetails>
            <AttributesContainer>
              <InfoTitle_1>Attributes</InfoTitle_1>
              <Attributes>
                <Attribute>
                  <GiBroadsword />
                  <strong>{monkeynaut.attributes.skill}</strong>
                </Attribute>
                <Attribute>
                  <BiRun />
                  <strong>{monkeynaut.attributes.speed}</strong>
                </Attribute>
                <Attribute>
                  <BiShieldQuarter />
                  <strong>{monkeynaut.attributes.resistance}</strong>
                </Attribute>
                <Attribute>
                  <AiFillHeart />
                  <strong>{monkeynaut.attributes.life}</strong>
                </Attribute>
              </Attributes>
            </AttributesContainer>
            <PveBonusInfo>
              <InfoTitle_1>PVE BONUS</InfoTitle_1>
              <p className="pve_detail">
                + 100% PVE Bonus <br />
                Bounty Hunting Damage
              </p>
            </PveBonusInfo>
            <EquipamentsContainer>
              <InfoTitle_1 className="equipament_title">Equipments</InfoTitle_1>

              <EquipamentsContent>
                <EquipamentToSelect>
                  <div className="equipament_content">
                    <BiPlus />
                  </div>
                </EquipamentToSelect>
                <EquipamentToSelect>
                  <div className="equipament_content">
                    <BiPlus />
                  </div>
                </EquipamentToSelect>
                <EquipamentToSelect>
                  <div className="equipament_content">
                    <BiPlus />
                  </div>
                </EquipamentToSelect>
              </EquipamentsContent>
            </EquipamentsContainer>
          </OthersDetails>
        </Details>
        <button 
          onClick={monkeynautIsShow.changeToFalse}
          className="back_page"
        >
          Back
        </button>
      </Content>
    </Container>
  );
}