import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useAuth, useBoolean, UseBooleanTypes, useDashboardTabs } from '@/hooks';

import { Monkeynaut } from '../Monkeynaut';
import { api, MonkeynautType } from '@/services/api';
import { replaceToShortString, verifyRole } from '@/utils';

import { Loading } from '@/components';

import { COLORS } from '@/theme';

import { Title_1 } from '@/styles/global';
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

import engineer from '@/assets/images/engineer.png';
import scientist from '@/assets/images/scientist.png';
import soldier from '@/assets/images/soldier.png';

export type MonkeynautsTabProps = {
  monkeynautIsShow?: UseBooleanTypes;
}

export function MonkeynautsTab({
  monkeynautIsShow,
}: MonkeynautsTabProps) {
  const { user } = useAuth();
  const { setMonkeynaut } = useDashboardTabs();
  const monkeynautsIsLoading = useBoolean(true);

  const [{monkeynauts}, setMonkeynauts] = useState<MonkeynautType.GetMonkeynauts>({} as MonkeynautType.GetMonkeynauts);

  async function selectMonkeynaut(monkeynaut: MonkeynautType.Monkeynaut) {
    let monkeynautOwnerName = monkeynaut.owner.id === user?.user.id ? 'YOU' : monkeynaut.owner.nickname;

    try {
      const getUniqueShipResponse = await api.ships.geral.getUnique({
        path: {
          ship_id: monkeynaut.shipId,
        }
      });

      setMonkeynaut({
        ...monkeynaut,
        id_short: replaceToShortString(monkeynaut.id),
        ownerName: monkeynautOwnerName,
        crew_in_ship: getUniqueShipResponse.data.ship,
      });
      
    }
    catch(err: any) {
      const error_message = err?.response?.headers['grpc-message'];

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
    } finally {
      monkeynautIsShow?.changeToTrue();
    }
  }

  useEffect(() => {
    async function getMonkeynauts() {
      try {
        const response = await api.monkeynauts.geral.getMonkeynauts();

        setMonkeynauts(response.data);
      } catch(err) {
        
      } finally {
        monkeynautsIsLoading.changeToFalse();
      }
    }

    getMonkeynauts();

    return () => monkeynautsIsLoading.changeToFalse();
  }, []);

  const monkeynautsModified = useMemo(() => {
    if(monkeynauts) {
      return monkeynauts.map(monkeynaut => {
        return {
          ...monkeynaut,
          avatar: verifyRole(monkeynaut.class, {
            engineer,
            soldier,
            scientist
          }),
        }
      });
    }
  }, [monkeynauts]);

  return (
    <Container>
      {!monkeynautIsShow?.state ? (
        <ListMonkeynautsContainer loadingMonkeynauts={monkeynautsIsLoading.state}>
          {monkeynautsIsLoading.state ? (
            <Loading size={6.4} />
          ) : (
            <>
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
                    {monkeynautsModified && monkeynautsModified.map((monkeynaut) => (
                      <TbodyTrCustom onClick={() => selectMonkeynaut(monkeynaut)} key={monkeynaut.id}>
                        <TbodyTdCustom className="avatar">
                          <div className="info">
                            <img src={monkeynaut.avatar} />
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="name">
                          <div className="info">
                            <Title_1>{monkeynaut.firstName} {monkeynaut.lastName}</Title_1>
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="id">
                          <div className="info">
                            <span>Monkeynaut id</span>
                            <strong title={monkeynaut.id}>{replaceToShortString(monkeynaut.id)}</strong>
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="role">
                          <div className="info">
                            <span>Role</span>
                            <strong>{monkeynaut.class}</strong>
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="rank">
                          <div className="info">
                            <span>Rank</span>
                            <strong>{monkeynaut.rank}</strong>
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="energy">
                          <div className="info">
                            <span>Energy</span>
                            <strong>{monkeynaut.attributes.currentEnergy}/{monkeynaut.attributes.maxEnergy}</strong>
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="breed">
                          <div className="info">
                            <span>Breed Count</span>
                            <strong>{monkeynaut.breedCount}</strong>
                          </div>
                        </TbodyTdCustom>
                      </TbodyTrCustom>
                    ))}
                  </TbodyCustom>
                </TableCustom>
              </Content>
            </>
          )}
        </ListMonkeynautsContainer>
      ): (
        <Monkeynaut 
          monkeynautIsShow={monkeynautIsShow} 
        />
      )}
     
    </Container>
  );
}