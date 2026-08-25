import styled, { css } from 'styled-components';
import { COLORS } from '@/theme';

export type ButtonContainerProps = {
  isLoading?: boolean;
}

export const Container = styled.button<ButtonContainerProps>`
  background: ${COLORS.ui.button_gradient};
  border: 1px solid ${COLORS.ui.border};
  border-radius: 0.8rem;

  padding: 1.6rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 1.3rem;
  line-height: 1.5rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;

  transition:
    filter 0.15s ease,
    border-color 0.15s ease,
    transform 0.05s ease;

  &:hover:not(:disabled) {
    background: ${COLORS.ui.button_gradient_hover};
    border-color: ${COLORS.ui.border_hover};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  ${props => props.isLoading && css`
    cursor: no-drop;
    opacity: 0.6;
  `};

  &:disabled {
    cursor: no-drop;
    opacity: 0.6;
  }
`;
