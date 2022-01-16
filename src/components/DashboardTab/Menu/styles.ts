import styled, { css } from 'styled-components';

import { COLORS } from '@/theme';

export type MenuProps = {
  isClosed: boolean;
}

type TabChangeProps = {
  selected: boolean;
}

export const Container = styled.div<MenuProps>`
  display: none;

  ${props => props.isClosed && css`
    display: block;
  `};

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  padding: 7.2rem 3.2rem 0;

  .close_menu {
    position: absolute;
    top: 4.2rem;
    right: 1.2rem;

    svg {
      width: 2.2rem;
      height: 2.2rem;
      
      color: ${COLORS.colors.primary_0}
    }
  }

 
  @media(min-width: 768px) {
    .close_menu {
      position: absolute;
      top: 4.2rem;
      right: 4.2rem;
    }
  }

  @media(min-width: 1400px) {
    display: inline-block;

    position: initial;

    padding: 0;
    margin-top: 3.2rem;

    .close_menu {
      display: none;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 6.4rem;

  @media(min-width: 1400px) {
    max-width: 85%;
    flex-direction: row;

    margin: 0 auto;
  }
`;

export const TabChange = styled.button<TabChangeProps>`
  display: flex;

  @media(min-width: 1400px) {
    max-width: max-content;
    border: 1px solid #1F8EFF;

    background: linear-gradient(180deg, #071D46 0%, #144B97 100%);

    ${props => props.selected && css`
      background: linear-gradient(180deg, #0267C9 0%, #023886 100%);
    `};

      &:not(:first-child) {
        margin-left: 4px;
      }
    }
`;

export const TabTitle = styled.span<TabChangeProps>`
  font-size: 18px;
  font-weight: 700;
  line-height: 2.3rem;
  letter-spacing: 0.035em;
  text-align: left;

  border-bottom: 2px solid transparent;

  margin-bottom: 16px;

  ${props => props.selected && css`
    border-bottom: 2px solid ${COLORS.colors.primary_0};
  `};

  @media(min-width: 1400px) {
    display: inline-block; 

    margin-bottom: 0;

    padding: 1rem 4.8rem;

    text-transform: uppercase;
    font-size: 1.6rem;
    letter-spacing: 0;    
    white-space: nowrap;

    ${props => props.selected && css`
      border-bottom: none;
    `};
  }
`;
