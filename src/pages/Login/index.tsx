import { useRef } from 'react';
import { Link } from 'react-router-dom';
      
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import axios from 'axios';

import { Button, Input } from '@/components';

import {
  PlayerType,
} from '@/services/api';

import { getValidationErrors } from '@/utils';
import { useAuth, useBoolean } from '@/hooks';

import logo from '@/assets/images/logo.png';

import {
  Container,
  Content,
  MainContent,
  FormContainer
} from './styles';
import { toast } from 'react-toastify';
import { COLORS } from '@/theme';

const schema = Yup.object().shape({
  email: Yup.string().required('This field is required').email('Enter a valid email address'),
  password: Yup.string().required('This field is required'),
});

export function Login() {
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const loadingSignIn = useBoolean(false);

  async function handleSignInPlayer(data: PlayerType.AppLoginParams) {
    loadingSignIn.changeToTrue();

    try {
      formRef.current?.setErrors({});
  
      await schema.validate(data, {
        abortEarly: false
      });

      await signIn(data);
    } catch(err: any) {
      loadingSignIn.changeToFalse();

      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        
        return formRef.current?.setErrors(errors);
      }

      if(axios.isAxiosError(err)) {
        const error_message = err?.response?.data.message;

        toast(error_message, {
          autoClose: 5000,
          pauseOnHover: true,
          type: 'error',
          style: {
            background: COLORS.global.white_0,
            color: COLORS.global.black_0 ,
            fontSize: 14,
            fontFamily: 'Orbitron, sans-serif',
          }
        });
      }
    }
  }

  return (
    <Container>
      <Content>
        <MainContent>
          <img src={logo} alt="App Logo" className="app_logo"/>
          <FormContainer ref={formRef} onSubmit={handleSignInPlayer}>
            <h1 className="page_title">Login</h1>
            <div className="inputs">
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
              text="Login"
              loading={{
                state: loadingSignIn.state,
              }}
            />

            <footer>
              <span className="to_login">
                Don't have an account?
                <Link to="/register">Sign up</Link>
              </span>
              <span className="forgot_password">
                <Link to="/forgot">Forgot Password</Link>
              </span>

              <span className="app_name">The Monkeynauts</span>
            </footer>
          </FormContainer>
        </MainContent>
      </Content>
    </Container>
  )
}