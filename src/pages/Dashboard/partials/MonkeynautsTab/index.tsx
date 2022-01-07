import { 
  Container,
  ListMonkeynautsContainer,
  Content, 
  TableCustom, 
  TheadCustom, 
  TheadTrCustom, 
  TheadTdCustom, 
  TbodyCustom, 
  TbodyTrCustom, 
  TbodyTdCustom,
} from './styles';

import fighter from '@/assets/fighter.png';

import { UseBooleanTypes } from '@/hooks';
import { Monkeynaut } from '../Monkeynaut';
import { Title_1 } from '@/styles/global';

export type MonkeynautsTabProps = {
  monkeynautIsShow: UseBooleanTypes;
}

export function MonkeynautsTab({
  monkeynautIsShow
}: MonkeynautsTabProps) {
  
  return (
    <Container>
      {!monkeynautIsShow.state ? (
        <ListMonkeynautsContainer>
          <Content>
            <TableCustom className="table_custom">
              <TheadCustom>
                <TheadTrCustom>
                  <TheadTdCustom>Monkeynaut</TheadTdCustom>
                  <TheadTdCustom>Name</TheadTdCustom>
                  <TheadTdCustom>Role</TheadTdCustom>
                  <TheadTdCustom>Rank</TheadTdCustom>
                  <TheadTdCustom>Energy</TheadTdCustom>
                  <TheadTdCustom>Breed COunt</TheadTdCustom>
                </TheadTrCustom>
              </TheadCustom>
                
              <TbodyCustom>
                <TbodyTrCustom onClick={monkeynautIsShow.changeToTrue}>
                  <TbodyTdCustom className="avatar">
                    <div className="info">
                      <img src={fighter} />
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="name">
                    <div className="info">
                      <Title_1>Monkeynaut</Title_1>
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="id">
                    <div className="info">
                      <span>Monkeynaut id</span>
                      <strong>6423...4</strong>
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="role">
                    <div className="info">
                      <span>Role</span>
                      <strong>Text</strong>
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="rank">
                    <div className="info">
                      <span>Rank</span>
                      <strong>5</strong>
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="energy">
                    <div className="info">
                      <span>Energy</span>
                      <strong>Text</strong>
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="breed">
                    <div className="info">
                      <span>Breed Count</span>
                      <strong>Text</strong>
                    </div>
                  </TbodyTdCustom>
                </TbodyTrCustom>
              </TbodyCustom>
            </TableCustom>
          </Content>
        </ListMonkeynautsContainer>
      ): (
        <Monkeynaut monkeynautIsShow={monkeynautIsShow} />
      )}
     
    </Container>
  );
}