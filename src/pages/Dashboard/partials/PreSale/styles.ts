import { COLORS } from '@/theme';
import styled from 'styled-components';

export const Container = styled.div`
  max-height: 42rem;
  overflow: auto;

  margin-top: 16px;
  padding: 0 16px 16px;

  @media(min-width: 1024px) {
    max-height: 72rem;
  }
`;

export const Content = styled.form`
  max-width: 320px;
  width: 100%;
  margin: 128px auto 0;

  input {
    background: ${COLORS.colors.tertiary_100};
    
    width: 100%;
    max-width: 320px;
    
    padding: 1.2rem;
    margin: 24px 0 8px;

    color: ${COLORS.fonts.primary};
    caret-color: ${COLORS.fonts.primary};
    border: 2px solid #2697FF;
    
    font-size: 1.1rem;
    line-height: 14px;
    letter-spacing: 0.035em;

    &::placeholder {
      color: #51779A;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px ${COLORS.colors.tertiary_100} inset;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${COLORS.fonts.primary} !important;
    }
  }
`;

export const InfoTitle_1 = styled.h1`
  font-size: 1.4rem;
  color: ${COLORS.colors.primary_0};
  text-transform: uppercase;
  line-height: 1.8rem;
  letter-spacing: 0.035em;
  text-align: center;
  
  width: 100%;

  padding: 4px;

  background: 
  linear-gradient(90deg, 
    rgba(0, 146, 249, 0) 5.52%, 
    #041937 50.86%, 
    rgba(0, 146, 249, 0) 91.71%
  );

  position: relative;

  &:before, &:after {
    content: '';
    position: absolute;
    left: 0;

    width: 100%;
    height: 2px;

    background: 
    linear-gradient(90deg, 
      rgba(0, 146, 249, 0) 5.52%, 
      #0092F9 50.86%, 
      rgba(0, 146, 249, 0) 91.71%
    );
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }

  @media(min-width: 1400px) {
    font-size: 2.4rem;
    line-height: 30px;
  }
`;