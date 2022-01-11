import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
      
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Button, Input } from '@/components';

import {
  UserType,
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

export function Register() {
  const { register } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const loadingRegister = useBoolean(false);

  async function handleRegisterUser(data: UserType.AppRegisterParams) {
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
      
      loadingRegister.changeToFalse();

      await register(data);
    } catch(err) {
      loadingRegister.changeToFalse();

      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        
        formRef.current?.setErrors(errors);

        return;
      }

      formRef.current?.setErrors({
        nickname: 'E-mail/Nickname invalid. Please change them'
      });
    }
  }

  return (
    <Container>
      <Content>
        <MainContent>
          <img src={logo} alt="App Logo" className="app_logo"/>
          <FormContainer ref={formRef} onSubmit={handleRegisterUser}>
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