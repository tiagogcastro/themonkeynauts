import { Button, Input } from '@/components';
import { UnformTextarea } from '@/components/HTML/UnformTextarea';
import { baseApi } from '@/services/api';
import { Player } from '@/services/app_api/player/types';
import { COLORS } from '@/theme';
import { getValidationErrors } from '@/utils';
import { newApiError } from '@/utils/apiError';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import * as S from './styles';

const banAccountSchema = Yup.object().shape({
  playerIdOrWallet: Yup.string()
    .required('This field is required'),
  reason: Yup.string()
    .required('This field is required'),
});

type GetPlayer = {
  data: Player
}

export function AdminBanAccount() {
  const formRef = useRef<FormHandles>(null);

  async function banAccountSubmit(data: any, reset: any) {
    try {
      await banAccountSchema.validate(data, {
        abortEarly: false
      });

      const response = await baseApi.patch<GetPlayer>('/players/ban-unban-player', data);

      const player = response.data.data;

      const successMessage = player.isBanned 
        ? `Player ${player.nickname} has been banned` 
        : `Player ${player.nickname} has been unbanned`

      toast(successMessage, {
        autoClose: 5000,
        pauseOnHover: true,
        type: 'success',
        style: {
          background: COLORS.global.white_0,
          color: COLORS.global.black_0,
          fontSize: 14,
          fontFamily: 'Orbitron, sans-serif',
        }
      });

      reset.reset();
    } catch (error: any) {
      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        return formRef.current?.setErrors(errors);
      }

      const apiErrorResponse = newApiError(error);

      if(apiErrorResponse) {
        apiErrorResponse.error.messages.map(message => {
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
        })
      }

      const defaultErrorMessage = error.response.data.message;

      return toast(defaultErrorMessage, {
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
    }
  }

  return (
    <S.Container>
      <S.Content>
        <S.MainContent>
          <S.FormContainer ref={formRef} onSubmit={banAccountSubmit}>
            <h1>Ban Account</h1>
            <Input
              name='playerIdOrWallet' 
              labelText='Player ID or Wallet' 
            />
            <UnformTextarea
              name='reason' 
              labelText='Reason' 
            />
            <Button text="Send" type="submit" />
          </S.FormContainer>
        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}