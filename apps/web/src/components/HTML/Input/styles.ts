import { COLORS } from '@/theme';
import styled, { css } from 'styled-components';

export type InputContainerTagProps = {
  isError: boolean;
}

export const Container = styled.label<InputContainerTagProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  .input_text {
    margin-bottom: 4px;
    font-weight: bold;
    line-height: 1.5rem;
    letter-spacing: 0;
    text-align: left;

    color: #60B2FF;
  }

  ${props => props.isError && css`
    .input_error {
      color: ${COLORS.global.red_0};
      margin-top: 0.6rem;
      font-size: 1rem;
    }
  `};
`;

export type InputContentTagProps = {
  isFocused: boolean;
  isError: boolean;
}

export const Content = styled.div<InputContentTagProps>`
  background: rgba(10, 56, 118, 0.28);
  border: 1px solid ${COLORS.ui.border};

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.8rem;

  width: 100%;

  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  ${props => props.isFocused && css`
    border-color: ${COLORS.colors.secondary_50};
    box-shadow: 0 0 0 3px rgba(38, 151, 255, 0.18);
  `};

  ${props => props.isError && css`
    border-color: ${COLORS.global.red_0};
  `};

  input {
    background: transparent;
    padding: 1.4rem;
    width: 100%;
    letter-spacing: 1px;
    font-size: 1.6rem;
    font-weight: 500;
    color: ${COLORS.fonts.primary};
    caret-color: ${COLORS.fonts.primary};

    &::placeholder {
      color: ${COLORS.global.input};
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px #0a2c58 inset;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${COLORS.fonts.primary} !important;
    }
  }

  button.change_visible_password {
    padding: 0 1.6rem;
    display: flex;
    align-items: center;

    svg {
      width: 2.2rem;
      height: 2.2rem;
      color: #14A8FC;
    }
  }
`;