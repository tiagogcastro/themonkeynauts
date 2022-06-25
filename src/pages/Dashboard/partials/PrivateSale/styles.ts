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
  max-width: 560px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .texts_container_private {
    .text {
      font-size: 11px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: 0.035em;
      text-align: center;

      margin-top: 14px;

      span {
        font-size: 11px;
        font-weight: 400;
        line-height: 14px;
        letter-spacing: 0.035em;
        text-align: center;

        margin-top: 14px;

        color: ${COLORS.colors.primary_0}
      }
    }
  }

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

  @media(min-width: 768px) {
    .texts_container_private {
      margin-top: 64px;

      .text {
        font-size: 18px;
        line-height: 21px;

        span {
          font-size: 18px;
          line-height: 21px;
        }
      }
    }
  }
`;