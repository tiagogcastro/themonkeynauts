import { useEffect, useState } from 'react';

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

import { useBoolean, UseBooleanTypes, useDashboardTabs } from '@/hooks';
import { Monkeynaut } from '../Monkeynaut';
import { Title_1 } from '@/styles/global';
import { api, MonkeynautType } from '@/services/api';
import { Loading } from '@/components';

export type MonkeynautsTabProps = {
  monkeynautIsShow: UseBooleanTypes;
}

export function MonkeynautsTab({
  monkeynautIsShow
}: MonkeynautsTabProps) {
  const { setMonkeynaut } = useDashboardTabs();
  const [monkeynauts, setMonkeynauts] = useState<MonkeynautType.GetMonkeynauts>({} as MonkeynautType.GetMonkeynauts);
  const monkeynautsIsLoading = useBoolean(true);

  function selectMonkeynaut(monkeynaut: MonkeynautType.Monkeynaut) {
    setMonkeynaut(monkeynaut);

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
                    {monkeynauts.monkeynauts && monkeynauts.monkeynauts.map((monkeynaut) => (
                      <TbodyTrCustom onClick={() => selectMonkeynaut(monkeynaut)} key={monkeynaut.id}>
                        <TbodyTdCustom className="avatar">
                          <div className="info">
                            <img src={fighter} />
                          </div>
                        </TbodyTdCustom>
                        <TbodyTdCustom className="name">
                          <div className="info">
                            <Title_1>{monkeynaut.firstName}</Title_1>
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