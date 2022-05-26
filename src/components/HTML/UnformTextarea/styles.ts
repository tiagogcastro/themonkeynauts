import { COLORS } from '@/theme';
import styled, { css } from 'styled-components';

export type TextareaContainerTagProps = {
  isError: boolean;
}

export const Container = styled.label<TextareaContainerTagProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  .textarea_text {
    margin-bottom: 4px;
    font-weight: bold;
    line-height: 1.5rem;
    letter-spacing: 0;
    text-align: left;

    color: #60B2FF;
  }

  ${props => props.isError && css`
    .textarea_error {
      color: ${COLORS.global.red_0};
      margin-top: 0.6rem;
      font-size: 1rem;
    }
  `};
`;

export type TextareaContentTagProps = {
  isFocused: boolean;
  isError: boolean;
}

export const Content = styled.div<TextareaContentTagProps>`
  background: ${COLORS.colors.tertiary_100};
  border: 1px solid ${COLORS.colors.gray_blue};

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.1rem;

  width: 100%;

  ${props => props.isFocused && css`
    border: 1px solid ${COLORS.colors.secondary_50};
  `};

  ${props => props.isError && css`
    border: 1px solid ${COLORS.global.red_0};
  `};

  textarea {
    background: ${COLORS.colors.tertiary_100};
    padding: 1.4rem;
    width: 100%;
    letter-spacing: 1px;
    color: ${COLORS.fonts.primary};
    caret-color: ${COLORS.fonts.primary};

    border: none;
    outline: 0;

    &::placeholder {
      color: ${COLORS.global.input};
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px ${COLORS.colors.tertiary_100} inset;
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