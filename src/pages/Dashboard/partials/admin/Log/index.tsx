import { Button, Input } from '@/components';
import { InputCheckbox } from '@/components/HTML/InputCheckbox';
import { InputSelect } from '@/components/HTML/InputSelect';
import { useAuth } from '@/hooks';
import { replaceToShortString } from '@/utils';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import { AiOutlineStop } from 'react-icons/ai';

import * as S from './styles';

export type HandleChange = {
  event: React.ChangeEvent<HTMLInputElement>;
}

export function AdminLog() {
  const { player } = useAuth();
  const formRef = useRef<FormHandles>(null);

  return (
    <S.Container>
      <S.Content>
        <S.MainContent>
          <S.FilterTable>
            <label className="filter_by_text">
              <span>Filter by</span>
              <input type="text" />
            </label>
            <div className="checkbox_container">
              <InputCheckbox>
                <span>Player id</span>
              </InputCheckbox>
              <InputCheckbox>
                <span>Wallet</span>
              </InputCheckbox>
              <InputCheckbox>
                <span>Transaction hash</span>
              </InputCheckbox>
            </div>
          </S.FilterTable>
          <S.LogContainer>
            <h1>Log</h1>
            <div className="log_content">
              <S.TableCustom>
                <thead>
                  <tr>
                    <S.TdCustom>Player id</S.TdCustom>
                    <S.TdCustom>Wallet</S.TdCustom>
                    <S.TdCustom>Action</S.TdCustom>
                    <S.TdCustom>Hash</S.TdCustom>
                    <S.TdCustom>Timestamp</S.TdCustom>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <S.TdCustom title='ai0sd2812asjd784'>{replaceToShortString('ai0sd2812asjd784')}</S.TdCustom>
                    <S.TdCustom title='ai0sd2812asjd784'>{replaceToShortString('ai0sd2812asjd784')}</S.TdCustom>
                    <S.TdCustom>Bought a character</S.TdCustom>
                    <S.TdCustom title='ai0sd2812asjd784'>{replaceToShortString('ai0sd2812asjd784')}</S.TdCustom>
                    <S.TdCustom>01/02/2023 00:00 UTC</S.TdCustom>
                  </tr>
                </tbody>
              </S.TableCustom>
            </div>
          </S.LogContainer>

        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}