import { 
  Tab,
  Tabs
} from '@/components/DashboardTab';
import { Link } from 'react-router-dom';
import {
  Container,
  Content,
  MainContent,
  TableCustom,
  TbodyCustom,
  TdCustom,
  TheadCustom
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Content>
        <MainContent>
          <Tabs>
            <Tab title="Ships">
              <TableCustom>
                <TheadCustom>
                  <div className="thead_tr_custom">
                    <span className="thead_th_custom">Ship</span>
                    <span className="thead_th_custom">Name</span>
                    <span className="thead_th_custom">Role</span>
                    <span className="thead_th_custom">Rank</span>
                    <span className="thead_th_custom">Crew</span>
                    <span className="thead_th_custom">Fuel</span>
                  </div>
                </TheadCustom>
                <TbodyCustom>
                  <Link to={`/ships/:id`} className="custom_tr">
                    {/* <div className="custom_td avatar">
                      <div className="info">
                        <div className="avatar_bg">
                          <img src={img} />
                        </div>
                      </div>
                    </div> */}
                    <TdCustom className="custom_td name">
                      <div className="info">
                        <h1>Valkyrie</h1>
                      </div>
                    </TdCustom>
                    <TdCustom className="custom_td id">
                      <div className="info">
                        <span>Ship id</span>
                        <strong>6423...4</strong>
                      </div>
                    </TdCustom>
                    <TdCustom className="custom_td role">
                      <div className="info">
                        <span>Role</span>
                        <strong>fighter</strong>
                      </div>
                    </TdCustom>
                    <TdCustom className="custom_td rank">
                      <div className="info">
                        <span>Rank</span>
                        <strong>5</strong>
                      </div>
                    </TdCustom>
                    <TdCustom className="custom_td crew">
                      <div className="info">
                        <span>Crew</span>
                        <strong>2/5</strong>
                      </div>
                    </TdCustom>
                    <TdCustom className="custom_td fuel">
                      <div className="info">
                        <span>Fuel</span>
                        <strong>400/400</strong>
                      </div>
                    </TdCustom>
                  </Link>
                </TbodyCustom>
              </TableCustom>
            </Tab>



            <Tab title="Monkeynauts">
              <div>Monkeynauts</div>
            </Tab>
            <Tab title="Equipament">
              <div>Equipament</div>
            </Tab>
            <Tab title="Resources">
              <div>Resources</div>
            </Tab>
          </Tabs>
        </MainContent>
        {/* <header>
          <h1>Ships</h1>
          <button>
            =
          </button>
        </header>
        <TabContentMain>
          <MonkeynautsContainer>

          </MonkeynautsContainer>
        </TabContentMain> */}
      </Content>
    </Container>
  );
}