import styled from 'styled-components';
import { COLORS } from '@/theme';

export const Container = styled.div`
`;

export const Content = styled.div`
  padding-left: 24px;
  margin-right: 16px;
`;

export const MainContent = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 24px;

  @media(max-width: 1399px) {
    flex-direction: column;
    align-items: center;
    padding-right: 16px;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;

  .groups {
    display: grid;
    grid-template-columns: 1fr;

    gap: 16px 24px;

    @media(min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media(min-width: 1200px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  button {
    margin-top: 8px;
    max-width: 320px;
  }
`;
