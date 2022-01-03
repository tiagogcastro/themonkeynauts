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

  .tab_title {
    font-size: 18px;
    font-weight: 700;
    line-height: 2.3rem;
    letter-spacing: 0.035em;
    text-align: left;

    padding: 1.6rem;
    padding-left: 2.4rem;
  }

  @media(min-width: 768px) {
    .close_menu {
      position: absolute;
      top: 4.2rem;
      right: 4.2rem;
    }
  }

  @media(min-width: 1024px) {
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

  @media(min-width: 1024px) {
    flex-direction: row;
    margin-top: 1.6rem;
  }
`;

export const TabChange = styled.div<TabChangeProps>`
  @media(min-width: 1024px) {
    max-width: max-content;
    border: 3px solid #298DF1;

    transform: skew(21deg);

    background: ${COLORS.colors.quartenary_75};

    .tab_title { 
      display: inline-block; 

      transform: skew(-21deg);

      padding: 0.4rem 4.8rem;

      text-transform: uppercase;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 2.3rem;
      letter-spacing: 0;
    }

    ${props => props.selected && css`
      background: #298DF1;

      &:hover {
        background: #298df1;
      }
    `};

      &:not(:first-child) {
        margin-left: 4px;
      }
    }
`;
