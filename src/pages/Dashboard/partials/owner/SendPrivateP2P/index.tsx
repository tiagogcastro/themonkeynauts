import { useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { getValidationErrors } from '@/utils';

import { Button, Input } from '@/components';

import * as S from './styles';
import { baseApi } from '@/services/api';
import { toast } from 'react-toastify';
import { COLORS } from '@/theme';
import { ApiError } from '@/utils/apiError';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('This field is required'),
  hash: Yup.string()
    .required('This field is required'),
});

type SendPrivateP2P = {
  email: string;
  txHash: string;
}

export function OwnerSendPrivateP2P() {
  const formRef = useRef<FormHandles>(null);

  async function sendPrivateP2P(data: SendPrivateP2P, rest: any) {
    try {
      await schema.validate(data, {
        abortEarly: false
      });

      await baseApi.post('/owners/send-private-p2p', data);

      rest.reset();

      toast(`Private P2P sent to ${data.email} successfully`, {
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

    } catch (error: any) {
      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        return formRef.current?.setErrors(errors);
      }

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

  return (
    <S.Container>
      <S.Content>
        <S.MainContent>

          <S.FormContainer ref={formRef} onSubmit={sendPrivateP2P}>
            <h1>Send Private P2P</h1>
            
            <Input 
              name="email"
              type="text"
              labelText='E-mail'
            />
            <Input 
              name="txHash"
              type="text"
              labelText='Tx hash'
              containerProps={{
                className: "tx_hash"
              }}
            />
            
            <Button text="Send" type="submit" />
          </S.FormContainer>
        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}