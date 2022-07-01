import { InputCheckbox } from '@/components/HTML/InputCheckbox';
import { baseApi } from '@/services/api';
import { COLORS } from '@/theme';
import { replaceToShortString } from '@/utils';
import { ApiError } from '@/utils/apiError';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import * as S from './styles';

type Log = {
  id: string;
  action: string;
  txHash: string;

  playerId: string;

  createdAt: string;
  updatedAt: string;
}

export function AdminLog() {
  const [logs, setLogs] = useState<Log[]>([]);

  async function getLogs() {
    try {
      const response = await baseApi.get('/admins/logs/list-logs');

      setLogs(response.data.data);
    } catch (error: any) {
      const apiErrorResponse = ApiError(error);

      apiErrorResponse.messages.map(message => {
        return toast(message, {
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
      });
    }
  }

  useEffect(() => {
    getLogs();
  }, []);

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
                    <S.TdCustom>Action</S.TdCustom>
                    <S.TdCustom>Hash</S.TdCustom>
                    <S.TdCustom>Timestamp</S.TdCustom>
                  </tr>
                </thead>
                <tbody>
                  {logs && logs.map(log => (
                    <tr key={log.id}>
                      <S.TdCustom title={log.playerId}>{log.playerId ? replaceToShortString(log.playerId) : 'Undefined'}</S.TdCustom>
                      <S.TdCustom 
                        title={log.action}
                        style={{
                          maxWidth: '250px',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >{log.action}</S.TdCustom>
                      <S.TdCustom title={log.txHash}>{log.txHash ? replaceToShortString(log.txHash) : 'Undefined'}</S.TdCustom>
                      <S.TdCustom>{getFormattedDate(log.createdAt)}</S.TdCustom>
                    </tr>
                  ))}
                </tbody>
              </S.TableCustom>
            </div>
          </S.LogContainer>

        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}