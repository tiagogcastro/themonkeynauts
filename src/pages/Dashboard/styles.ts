import styled from 'styled-components';

import dashboard_bg_1 from '@/assets/svg/dashboard_bg_1.svg';
import dashboard_bg_2 from '@/assets/svg/dashboard_bg_2.svg';
import dashboard_bg_3 from '@/assets/svg/dashboard_bg_3.svg';
import dashboard_bg_4 from '@/assets/svg/dashboard_bg_4.svg';

import background_1 from '@/assets/images/background_1.png';

export const Container = styled.div`
  height: 100vh;
  
  background: url(${background_1}) no-repeat center;
  background-size: cover;
  
  padding-top: 2.4rem;
`;

export const Content = styled.div`
  height: 100%;
  max-height: 53rem;

  max-width: 32rem;
  width: 100%;

  padding: 0 3.2rem;
  margin: 0 auto;

  background: url(${dashboard_bg_1}) no-repeat center top;

  @media(min-width: 768px) {
    max-width: 76.8rem;
    background: url(${dashboard_bg_2}) no-repeat center;
  }

  @media(min-width: 1024px) {
    max-width: 102.4rem;
    max-height: 90rem;

    padding: 3.2rem;
    
    background: url(${dashboard_bg_3}) no-repeat center;
  }

  @media(min-width: 1400px) {
    max-width: 140rem;
    background: url(${dashboard_bg_4}) no-repeat center;
  }
`;

export const MainContent = styled.main`
  height: 100%;
  max-height: 50rem;
  position: relative;

  @media(min-width: 768px) {
    padding: 0 32px;
  }

  @media(min-width: 1024px) {
    max-height: 100%;
  }

  @media(min-width: 1400px) {
    max-width: 80%;
    margin: 0 auto;
  }
`;
