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
    margin-bottom: 1.2rem;
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

export const Content = styled.select<InputContentTagProps>`
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
`;