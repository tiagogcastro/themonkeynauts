import { 
  Container,
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
import { Ship } from '../Ship';
import { Title_1 } from '@/styles/global';

export type ShipsTabProps = {
  shipIsShow: UseBooleanTypes;
}

export function ShipsTab({
  shipIsShow
}: ShipsTabProps) {
  
  return (
    <Container>
      {!shipIsShow.state ? (
        <>
          <Title_1 className="tab_title">My Ships</Title_1>

          <Content>
            <TableCustom className="table_custom">
              <TheadCustom>
                <TheadTrCustom>
                  <TheadTdCustom>Ship</TheadTdCustom>
                  <TheadTdCustom>Name</TheadTdCustom>
                  <TheadTdCustom>Role</TheadTdCustom>
                  <TheadTdCustom>Rank</TheadTdCustom>
                  <TheadTdCustom>Crew</TheadTdCustom>
                  <TheadTdCustom>Fuel</TheadTdCustom>
                </TheadTrCustom>
              </TheadCustom>
                
              <TbodyCustom>
                <TbodyTrCustom onClick={shipIsShow.changeToTrue}>
                  <TbodyTdCustom className="avatar">
                    <div className="info">
                      <img src={fighter} />
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="name">
                    <div className="info">
                      <Title_1>Valkyrie</Title_1>
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="id">
                    <div className="info">
                      <span>Ship id</span>
                      <strong>6423...4</strong>
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="role">
                    <div className="info">
                      <span>Role</span>
                      <strong>fighter</strong>
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="rank">
                    <div className="info">
                      <span>Rank</span>
                      <strong>5</strong>
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="crew">
                    <div className="info">
                      <span>Crew</span>
                      <strong>2/5</strong>
                    </div>
                  </TbodyTdCustom>
                  <TbodyTdCustom className="fuel">
                    <div className="info">
                      <span>Fuel</span>
                      <strong>400/400</strong>
                    </div>
                  </TbodyTdCustom>
                </TbodyTrCustom>
              </TbodyCustom>
            </TableCustom>
          </Content>
        </>
      ): (
        <Ship />
      )}
     
    </Container>
  );
}