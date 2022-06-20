import styled from 'styled-components';
import { Form } from '@unform/web';

import { COLORS } from '@/theme';

import background_1 from '@/assets/images/background_1.png';
import panel_character_attribute_1 from '@/assets/images/panel_character_attribute_1.png';
import panel_character_attribute_2 from '@/assets/images/panel_character_attribute_2.png';
import panel_character_attribute_3 from '@/assets/images/panel_character_attribute_3.png';

export const Container = styled.div`
  background: url(${background_1}) no-repeat center;
  background-size: cover;
  padding: 2.4rem 0;

  height: 100vh;
`;

export const Content = styled.div`
  padding: 0 1.4rem;
  margin: 0 1.4rem;

  height: 563px;

  display: flex;
  align-items: center;  
  justify-content: center;

  background: url(${panel_character_attribute_1}) no-repeat center center;

  @media(min-width: 960px) {
    background: url(${panel_character_attribute_2}) no-repeat center center;
    height: 831px;
  }

  @media(min-width: 1300px) {
    background: url(${panel_character_attribute_3}) no-repeat center center;
  }
`;

export const MainContent = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .app_logo {
    display: none;
    width: 24rem;
    margin-top: 6.4rem;
  }

  @media(min-width: 960px) {
    flex-direction: row;
    gap: 14rem;

    margin-bottom: 7.2rem;

    .app_logo {
      display: block;
      width: initial;
      margin-top: 9.2rem;
    }
  }
`;

export const FormContainer = styled(Form)`
  .page_title {
    line-height: 3rem;
    
    text-align: center;
    margin-top: 3.8rem;

    color: ${COLORS.colors.primary_0};
    text-shadow: 0 0 1.2rem ${COLORS.colors.primary_0};
  }

  .inputs {
    margin-top: 2.4rem;

    label:not(:first-child) {
      margin-top: 2.4rem;
    }
  }

  .button_submit {
    margin: 2.4rem 0;
  }

  footer {
    display: flex;
    align-items: center;
    flex-direction: column;

    .to_login, a {
      font-weight: 400;
      line-height: 1.4rem;
      letter-spacing: 0.035em;
    }

    .to_login {
      text-align: center;

      a {
        margin-left: 0.6rem;
        color: ${COLORS.colors.primary_0};

        border-bottom: 1px solid transparent;

        &:hover {
          border-bottom: 1px solid ${COLORS.colors.primary_0};
        }
      }
    }

    .forgot_password {
      margin-top: 1.6rem;
    }

    .app_name {
      margin: 2.8rem 0 3.8rem;

      font-weight: 700;
      line-height: 1.4rem;
      letter-spacing: 0.035em;

      color: ${COLORS.colors.primary_0};

    }
  }

  @media(min-width: 960px) {
    .page_title {
      margin-bottom: 6.4rem;
    }
  }

  @media(min-width: 960px) {
    footer {
      .app_name {
        display: none;
      }
    }
  }
`;