import { AiFillHeart } from 'react-icons/ai';
import { GiBroadsword } from 'react-icons/gi';
import { BiRun, BiShieldQuarter, BiPlus } from 'react-icons/bi';

import { UseBooleanTypes } from '@/hooks';

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

export type MonkeynautProps = {
  monkeynautIsShow: UseBooleanTypes;
}

export function Monkeynaut({
  monkeynautIsShow
}: MonkeynautProps) {
  return (
    <Container>
      <Content>
        <Title_1 className="monkeynaut_name">Monkeynaut</Title_1>
        <Details>
          <PrincipalDetails>
            <img className="monkeynaut_image" src={fighter_2} alt="" />
            <MonkeynautInformation>
              <InfoTitle_1 className="details_title">Details</InfoTitle_1>
              <UniqueInfo>
                <span>Monkeynaut ID</span>
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
                    <strong>Text</strong>
                  </UniqueInfo>
                  <UniqueInfo>
                    <span>Rank</span>
                    <strong>Text</strong>
                  </UniqueInfo>
                </div>
                <div className="info_right">
                  <UniqueInfo>
                    <span>Energy</span>
                    <strong>Text</strong>
                  </UniqueInfo>
                  <UniqueInfo>
                    <span>Breed Count</span>
                    <strong>Text</strong>
                  </UniqueInfo>
                </div>
              </div>
              <UniqueInfo>
                <span>Crew in Ship</span>
                <CrewInShipContainer>
                  <CrewInShip>
                    <div>
                      <strong>Valikirye</strong>
                      <p>Fighter</p>
                    </div>
                    <button><img src={btn_delete} /></button>
                  </CrewInShip>
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
                  <strong>20</strong>
                </Attribute>
                <Attribute>
                  <BiRun />
                  <strong>20</strong>
                </Attribute>
                <Attribute>
                  <AiFillHeart />
                  <strong>20</strong>
                </Attribute>
                <Attribute>
                  <BiShieldQuarter />
                  <strong>20</strong>
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
              <InfoTitle_1 className="equipament_title">Equipaments</InfoTitle_1>

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