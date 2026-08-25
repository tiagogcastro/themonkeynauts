import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
      
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import axios from 'axios';

import { Button, Input } from '@/components';

import {
  PlayerType,
} from '@/services/api';

import { getValidationErrors } from '@/utils';
import { useAuth, useBoolean } from '@/hooks';
import { COLORS } from '@/theme';

import logo from '@/assets/images/logo.png';

import {
  Container,
  Content,
  MainContent,
  FormContainer
} from './styles';
import { ApiError } from '@/utils/apiError';

export function Register() {
  const { register } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const loadingRegister = useBoolean(false);

  async function handleRegisterPlayer(data: PlayerType.AppRegisterParams) {
    loadingRegister.changeToTrue();

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nickname: Yup.string().required('This field is required'),
        email: Yup.string().required('This field is required').email('Enter a valid email address'),
        password: Yup.string().required('This field is required'),
      });
  
      await schema.validate(data, {
        abortEarly: false
      });
      
      await register(data);
    } catch(error: any) {
      loadingRegister.changeToFalse();

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
    <Container>
      <Content>
        <MainContent>
          <img src={logo} alt="App Logo" className="app_logo"/>
          <FormContainer ref={formRef} onSubmit={handleRegisterPlayer}>
            <h1 className="page_title">Sign up</h1>
            <div className="inputs">
              <Input 
                name="nickname" 
                labelText="Nickname"
                placeholder="Nickname..."
                type="text"
              />
              <Input 
                name="email" 
                labelText="E-mail"
                placeholder="E-mail..."
                type="text"
              />
              <Input
                name="password" 
                labelText="Password"
                placeholder="Password..."
                type="password"
              />
            </div>
            <Button 
              className="button_submit" 
              type="submit"
              text="Sign up"
              loading={{
                state: loadingRegister.state,
              }}
            />

            <footer>
              <span className="to_login">
                Already have an account?
                <Link to="/login">Login</Link>
              </span>

              <span className="app_name">The Monkeynauts</span>
            </footer>
          </FormContainer>
        </MainContent>
      </Content>
    </Container>
  )
}