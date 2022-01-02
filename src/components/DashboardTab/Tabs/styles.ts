import { COLORS } from '@/theme';
import styled from 'styled-components';

export const Container = styled.div`

`;

export const Menu = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  padding: 8.4rem 3.2rem 0;

  .close_menu {
    position: absolute;
    top: 6.4rem;
    right: 4.2rem;

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
    padding: 1.6rem 1.6rem 1.6rem 2.4rem;

    &:not(:first-child) {
    }
  }
`;

export const MenuContent = styled.div`
 display: flex;
  flex-direction: column;

  margin-top: 6.4rem;
`;