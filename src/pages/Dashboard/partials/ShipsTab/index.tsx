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

export function ShipsTab() {
  return (
    <Container>
      <h1 className="tab_title">My Ships</h1>

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
            <TbodyTrCustom to={`/ships/:id`}>
              <TbodyTdCustom className="avatar">
                <div className="info">
                  <img src={fighter} />
                </div>
              </TbodyTdCustom>
              <TbodyTdCustom className="name">
                <div className="info">
                  <h1>Valkyrie</h1>
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
    </Container>
  );
}