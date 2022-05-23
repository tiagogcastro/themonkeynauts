import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-height: 42rem;
  overflow: auto;

  padding: 32px;

  @media(min-width: 768px) {
    max-height: 96rem;
  }

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

export const tabContainerCss = {

}