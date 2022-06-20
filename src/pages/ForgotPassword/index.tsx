import { useRef } from 'react';
import { Link } from 'react-router-dom';
      
import { FormHandles } from '@unform/core';
// import * as Yup from 'yup';
// import axios from 'axios';

import { Button, Input } from '@/components';

// import { getValidationErrors } from '@/utils';

import logo from '@/assets/images/logo.png';

import {
  Container,
  Content,
  MainContent,
  FormContainer
} from './styles';
// import { toast } from 'react-toastify';
// import { COLORS } from '@/theme';

// const schema = Yup.object().shape({
//   email: Yup.string().required('This field is required').email('Enter a valid email address'),
// });

export function ForgotPassword() {
  const formRef = useRef<FormHandles>(null);

  async function handleForgotPassword() {}

  return (
    <Container>
      <Content>
        <MainContent>
          <img src={logo} alt="App Logo" className="app_logo"/>
          <FormContainer ref={formRef} onSubmit={handleForgotPassword}>
            <h1 className="page_title">Forgot password</h1>
            <div className="inputs">
              <Input 
                name="email" 
                labelText="E-mail"
                placeholder="E-mail..."
                type="text"
              />
            </div>
            <Button 
              className="button_submit" 
              type="submit"
              text="Forgot password"
              // loading={{
              //   state: loadingSignIn.state,
              // }}
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