import { Form } from '@unform/web';
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

export const FormContainer = styled(Form)`
  .textarea_label {
    max-width: 380px;
    min-width: 380px;

    textarea {
      max-width: 380px;
      min-width: 378px;

      max-height: 280px;
      min-height: 280px;
      height: 280px;
      resize: none;
    }
  }

  .input_label {
    max-width: 300px;
  }

  label {
    :not(:first-child) {
      margin-top: 16px;
    }
  }

  button {
    margin-top: 16px;
  }

  @media(max-width: 768px) {
    max-width: 210px;
    margin: 0 auto;

    .textarea_label {
      max-width: 200px;
      min-width: 200px;

    textarea {
      max-width: 200px;
      min-width: 198px;
    }
  }
  }
`;