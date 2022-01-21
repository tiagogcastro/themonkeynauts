import { useEffect, useMemo, useState } from 'react';

import { useAuth, useBoolean, UseBooleanTypes, useDashboardTabs } from '@/hooks';

import { Monkeynaut } from '../Monkeynaut';
import { api, MonkeynautType } from '@/services/api';
import { replaceToShortString } from '@/utils';

import { Loading } from '@/components';

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
  monkeynautIsShow: UseBooleanTypes;
}

export function MonkeynautsTab({
  monkeynautIsShow
}: MonkeynautsTabProps) {
  const { user } = useAuth();
  const { setMonkeynaut } = useDashboardTabs();
  const monkeynautsIsLoading = useBoolean(true);

  const [monkeynauts, setMonkeynauts] = useState<MonkeynautType.GetMonkeynauts>({} as MonkeynautType.GetMonkeynauts);

  function selectMonkeynaut(monkeynaut: MonkeynautType.Monkeynaut) {
    let monkeynautOwnerName = monkeynaut.owner.id === user?.user.id ? 'YOU' : monkeynaut.owner.nickname;

    setMonkeynaut({
      ...monkeynaut,
      id_short: replaceToShortString(monkeynaut.id),
      ownerName: monkeynautOwnerName
    });

    monkeynautIsShow.changeToTrue();
  }

  useEffect(() => {
    async function getMonkeynauts() {
      try {
        const response = await api.monkeynauts.geral.getMonkeynauts();

        setMonkeynauts(response.data);

        monkeynautsIsLoading.changeToFalse();
      } catch(err) {
        monkeynautsIsLoading.changeToFalse();
      }
    }

    getMonkeynauts();
  }, []);

  function verifyMonkeynautRole(type: MonkeynautType.MonkeynautRole) {
    const roles: Record<MonkeynautType.MonkeynautRole, string> = {
      engineer,
      soldier,
      scientist  
    }
  
    return roles[type.toLowerCase() as MonkeynautType.MonkeynautRole];
  }

  const monkeynautsModified = useMemo(() => {
    if(monkeynauts.monkeynauts) {
      return monkeynauts.monkeynauts.map(monkeynaut => {
        return {
          ...monkeynaut,
          avatar: verifyMonkeynautRole(monkeynaut.class),
        }
      });
    }
  }, [monkeynauts]);

  return (
    <Container>
      {!monkeynautIsShow.state ? (
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
                            <strong>{monkeynaut.id}</strong>
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
                            <strong>{monkeynaut.finalAttributes.energy}</strong>
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