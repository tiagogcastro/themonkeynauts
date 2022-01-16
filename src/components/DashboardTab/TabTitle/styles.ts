import { COLORS } from '@/theme';
import styled, { css } from 'styled-components';

type ContainerProps = {
  isShow: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;

  position: relative;

  width: 100%;

  padding-top: 4.2rem;

  ${props => props.isShow && css`
    display: none;
  `}

  @media(min-width: 1400px) {
    display: none;
  }
`;

export const Content = styled.div`
  .tab_title {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.8;
    letter-spacing: 0.035em;
    text-align: center;

    width: 100%;
  } 

  .back_page {
    position: absolute;
    top: 3rem;
    left: 0;
    padding: 1.4rem 1.4rem 0 1.4rem;

    svg {
      width: 2.2rem;
      height: 2.2rem;

      color: ${COLORS.colors.secondary_50};
    }
  }

  .open_menu {
    position: absolute;
    top: 4.8rem;
    right: 1rem;
  }

  @media(min-width: 1024px) {
    .tab_title {
      font-size: 1.8rem;
    }
  }
`;
