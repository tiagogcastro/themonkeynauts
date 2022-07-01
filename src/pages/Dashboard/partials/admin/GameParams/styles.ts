import { COLORS } from '@/theme';
import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
`;

export const Content = styled.div`
  overflow: auto;
  overflow-x: hidden;
  max-height: 40rem;

  padding-left: 24px;
  margin-right: 16px;

  @media(min-width: 1024px) {
    max-height: 64rem;
  }

  @media(max-width: 1023px) {
    max-height: 32rem;
  }
`;

export const MainContent = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 48px;

  @media(max-width: 1399px) {
    flex-direction: column;
    align-items: center;
    padding-right: 16px;
  }
`;

export const FormContainer = styled(Form)`
  display: grid;
  grid-template-columns: 1fr;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;

  button {
    margin-top: 16px;
  }

  @media(min-width: 768px) {
    max-width: 560px;
    grid-template-columns: 1fr 1fr;
  }
`;
