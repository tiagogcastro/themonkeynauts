import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px;

  @media(max-width: 1399px) {
    padding: 32px 0;
  }
`;

export const Content = styled.div`
  display: flex;
  padding: 16px 48px;

  .tab_item {
    width: 100%;
  }

  .tabcontainerclasse {
    display: flex;
    width: 100%;
  }
    
  @media(max-width: 1399px) {
    padding: 16px 0;

    .tabcontainerclasse .tabmenuclasse {
      top: 10%;
    }

    .tabcontainerclasse {
      flex-direction: column;

      .tab_list {
        margin-bottom: 32px;
        padding-top: 0;

        button {
          top: 10px;
        }
      }
    }
  }

  @media(min-width: 1400px) {
    .tab_list {
      width: 320px;
    }
    button.tab_title_btn {
      margin: 0;
      max-width: 100%;

      display: flex;
      justify-content: center;

      &:not(:first-child) {
        margin-top: 12px;
      }
    }
  }
`;
