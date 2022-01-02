import styled from 'styled-components';

import dashboard_bg_1 from '@/assets/svg/dashboard_bg_1.svg';
import background_1 from '@/assets/images/background_1.png';

export const Container = styled.div`
  height: 100vh;
  
  background: url(${background_1}) no-repeat center;

  padding-top: 2.4rem;
`;

export const Content = styled.div`
  height: 100%;
  
  background: url(${dashboard_bg_1}) no-repeat center top;
  padding: 0 3.2rem;
`;