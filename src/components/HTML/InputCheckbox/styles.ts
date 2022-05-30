import { COLORS } from '@/theme';
import styled from 'styled-components';

export const Container = styled.label`
  position: relative;

  display: block;

  padding-left: 20px;

  color: #424242;
  font-size: 12px;
  font-weight: 400;

  cursor: pointer;

  .checkmark{
    position: absolute;
    top: 0;
    left: 0;

    height: 16px;
    width: 16px;

    padding: 4px;

    background-color: ${COLORS.global.white_0};

    border: 1px solid gray;
    border-radius: 2px;
  }

  .checkmark::after{
    content: '';
    position: absolute;
    
    display: none;
  }

  .checkmark::after{
    content: '';
    left: 5px;
    top: 0px;

    width: 4px;
    height: 10px;

    transform: rotate(45deg);

    border-right: 3px solid ${COLORS.colors.secondary_50};
    border-bottom: 3px solid ${COLORS.colors.secondary_50};
  }

  input {
    position: absolute;

    opacity: 0;

    height: 0;
    width: 0;

    &:checked ~ .checkmark{
      border: none;
    }

    &:checked ~ .checkmark::after{
      display: block;
    }
  }
`;
