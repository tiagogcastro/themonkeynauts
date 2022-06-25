import { useEffect, useMemo, useState } from 'react';

import { api, baseApi, ShipType } from '@/services/api';

import { useAuth, useBoolean, UseBooleanTypes, useDashboardTabs } from '@/hooks';

import { Loading } from '@/components';

import { capitalize, replaceToShortString, verifyRole } from '@/utils';

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
  const { player } = useAuth();

  const loadingShips = useBoolean(true);
  const { setShip } = useDashboardTabs();

  const [ships, setShips] = useState<ShipType.Ship[]>([]);

  async function selectShip(ship: ShipType.Ship) {
    let shipOwnerName = 'YOU';

    if(ship.ownerId !== player?.player.id) {
      const response = await baseApi.get('/players/show', {
        params: {
          playerId: ship.ownerId
        }
      });

      shipOwnerName = response.data.nickname;
    }

    setShip({
      ...ship,
      id_short: replaceToShortString(ship.id),
      ownerName: shipOwnerName
    });

    shipIsShow?.changeToTrue();
  }

  async function getShips() {
    try {
      const response = await baseApi.get('/ships/list', {
        params: {
          playerId: player?.player.id
        }
      });

      setShips(response.data);
    } catch(err) {
    } finally {
      loadingShips.changeToFalse();
    }
  }

  useEffect(() => {
    getShips();

    return () => loadingShips.changeToFalse();
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
                      <TheadTdCustom>Class</TheadTdCustom>
                      <TheadTdCustom>Rank</TheadTdCustom>
                      <TheadTdCustom>Crew</TheadTdCustom>
                      <TheadTdCustom>Durability</TheadTdCustom>
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
                            <strong>{replaceToShortString(ship.id)}</strong>
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="role">
                          <div className="info">
                            <span>Class</span>
                            <strong>{capitalize(ship.class)}</strong>
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
                            <strong>{ship.crew}/{ship.crewCapacity}</strong>
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="fuel">
                          <div className="info">
                            <span>Durability</span>
                            <strong>{ship.fuel}/{ship.tankCapacity}</strong>
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