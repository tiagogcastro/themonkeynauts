import styled, { css } from 'styled-components';

import button_background_1 from '@/assets/svg/button_background_1.svg';

export type ButtonContainerProps = {
  isLoading?: boolean;
}

export const Container = styled.button<ButtonContainerProps>`
  background: url(${button_background_1}) no-repeat center;
  background-size: contain;

  padding: 1.6rem;
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  line-height: 1.5rem;
  letter-spacing: 0.035em;
  text-align: center;

  ${props => props.isLoading && css`
    cursor: no-drop;
    opacity: 0.6;
  `};

  &:disabled {
    cursor: no-drop;
    opacity: 0.6;
  }
`;