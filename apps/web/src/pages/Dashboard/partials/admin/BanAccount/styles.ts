import styled from 'styled-components';

export const Container = styled.div`
`;

export const Content = styled.div`
  padding-left: 24px;
  margin-right: 16px;

  @media(max-width: 1023px) {
    overflow: auto;
    overflow-x: hidden;
    max-height: 32rem;
  }
`;

export const MainContent = styled.main`
  width: 100%;
  display: flex;
  gap: 48px;

  @media(max-width: 1399px) {
    flex-direction: column;
    align-items: center;
    padding-right: 16px;
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  max-width: 560px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  .textarea_label textarea {
    min-height: 200px;
    height: 200px;
    resize: none;
  }

  button {
    margin-top: 8px;
    max-width: 320px;
  }
`;
