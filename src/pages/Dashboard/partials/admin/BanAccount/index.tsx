import { Button, Input } from '@/components';
import { UnformTextarea } from '@/components/HTML/UnformTextarea';
import { useAuth } from '@/hooks';
import { getValidationErrors } from '@/utils';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import * as Yup from 'yup';

import * as S from './styles';

const banAccountSchema = Yup.object().shape({
  player_id: Yup.string()
    .required('This field is required'),
  reason: Yup.string()
    .required('This field is required'),
});

export function AdminBanAccount() {
  const { player } = useAuth();
  const formRef = useRef<FormHandles>(null);

  async function banAccountSubmit(data: any) {
    try {
      await banAccountSchema.validate(data, {
        abortEarly: false
      });

      console.log(data);
    } catch (error: any) {
      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        return formRef.current?.setErrors(errors);
      }
    }
  }

  return (
    <S.Container>
      <S.Content>
        <S.MainContent>
          <S.FormContainer ref={formRef} onSubmit={banAccountSubmit}>
            <h1>Ban Account</h1>
            <Input
              name='player_id' 
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