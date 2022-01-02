import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  position: relative;

  width: 100%;

  padding-top: 4.2rem;

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

  .open_menu {
    position: absolute;
    top: 4.8rem;
    right: 1rem;
  }
`;
