import styled from 'styled-components';

import { COLORS } from '@/theme';

export const Container = styled.div`
  margin-top: 32px;

  @media(min-width: 1024px) {
    margin-top: 108px;
  }
`;

export const Content = styled.section`
  overflow: auto;
  overflow-x: hidden;
  max-height: 40rem;

  @media(min-width: 1024px) {
    max-height: 70rem;
  }
`;

export const Equipaments = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 6px;

  max-width: 78%;
  margin: 0 auto;

  @media(min-width: 768px) {
    grid-template-columns: repeat(6, 1fr);

    max-width: max-content;
  }
`;

export const Equipament = styled.div`

  background-color: #0179CA;

  height: 60px;
  width: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  z-index: 10;
  &, &::before, img {
    clip-path: polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 99%, 10% 100%, 0 90%, 0 10%);
  }

  &::before {
    content: "";
    display: block;
    position: relative;

    height: 56px;
    width: 56px;
    
    background: radial-gradient(50% 50% at 50% 50%, #043B69 0%, #012340 100%);
  }

  img {
    width: 56px;
    height: 56px;

    position: absolute;
  }

  @media(min-width: 768px) {
    height: 80px;
    width: 80px;

    &:before {
      height: 76px;
      width: 76px;
    }

    img {
      height: 66px;
      width: 66px;
    }
  }

  @media(min-width: 1024px) {
    height: 110px;
    width: 110px;

    &:before {
      height: 106px;
      width: 106px;
    }

    img {
      height: 96px;
      width: 96px;
    }
  }

  @media(min-width: 1400px) {
    height: 136px;
    width: 136px;

    &:before {
      height: 132px;
      width: 132px;
    }

    img {
      height: 122px;
      width: 122px;
    }
  }
`;