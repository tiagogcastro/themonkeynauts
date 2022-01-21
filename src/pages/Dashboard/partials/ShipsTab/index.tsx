import { useEffect, useMemo, useState } from 'react';

import { api, ShipType } from '@/services/api';

import { useAuth, useBoolean, UseBooleanTypes, useDashboardTabs } from '@/hooks';

import { Loading } from '@/components';

import { replaceToShortString, verifyRole } from '@/utils';

import fighter from '@/assets/images/fighter.png';
import explorer from '@/assets/images/explorer.png';
import miner from '@/assets/images/miner.png';

import { Ship } from '../Ship';

import { Title_1 } from '@/styles/global';
import { 
  Container,
  ListShipsContainer,
  Content, 
  TableCustom, 
  TheadCustom, 
  TheadTrCustom, 
  TheadTdCustom, 
  TbodyCustom, 
  TbodyTrCustom, 
  TbodyTdCustom,
} from './styles';

export type ShipsTabProps = {
  shipIsShow?: UseBooleanTypes;
}

export function ShipsTab({
  shipIsShow,
}: ShipsTabProps) {
  const { user } = useAuth();

  const loadingShips = useBoolean(true);
  const { setShip } = useDashboardTabs();

  const [{ships}, setShips] = useState<ShipType.GetShip>({} as ShipType.GetShip);

  function selectShip(ship: ShipType.Ship) {
    let shipOwnerName = ship.owner.id === user?.user.id ? 'YOU' : ship.owner.nickname;

    setShip({
      ...ship,
      id_short: replaceToShortString(ship.id),
      ownerName: shipOwnerName
    });

    shipIsShow?.changeToTrue();
  }

  useEffect(() => {
    async function getShips() {
      try {
        const response = await api.ships.geral.getShips();

        setShips(response.data);

        loadingShips.changeToFalse();
      } catch(err) {
        loadingShips.changeToFalse();
      }
    }

    getShips();
  }, []);

  const shipsModified = useMemo(() => {
    if(ships) {
      return ships.map(ship => {
        return {
          ...ship,
          avatar: verifyRole(ship.class, {
            explorer,
            fighter,
            miner
          }),
        }
      });
    }
  }, [ships]);

  return (
    <Container>
      {!shipIsShow?.state ? (
        <ListShipsContainer loadingShips={loadingShips.state}>
          {loadingShips.state ? (
            <Loading size={6.4} />
          ) : (
            <>
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
                    {shipsModified && shipsModified.map(ship => (
                      <TbodyTrCustom onClick={() => selectShip(ship)} key={ship.id}>
                        <TbodyTdCustom className="avatar">
                          <div className="info">
                            <img src={ship.avatar} alt={ship.name} />
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="name">
                          <div className="info">
                            <Title_1>{ship.name}</Title_1>
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="id">
                          <div className="info">
                            <span>Ship id</span>
                            <strong>{ship.id}</strong>
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="role">
                          <div className="info">
                            <span>Role</span>
                            <strong>{ship.class}</strong>
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="rank">
                          <div className="info">
                            <span>Rank</span>
                            <strong>{ship.rank}</strong>
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
                            <strong>{ship.finalAttributes.fuel}</strong>
                          </div>
                        </TbodyTdCustom>
                      </TbodyTrCustom>
                    ))}
                  </TbodyCustom>
                </TableCustom>
              </Content>
            </>
          )}
        </ListShipsContainer>
      ): (
        <Ship 
          shipIsShow={shipIsShow} 
        />
      )}
     
    </Container>
  );
}