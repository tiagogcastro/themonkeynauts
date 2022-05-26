import { COLORS } from '@/theme';
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
  max-width: 220px;

  label {
    :not(:first-child) {
      margin-top: 16px;
    }
  }

  button {
    margin-top: 16px;
  }
`;

export const OpenSalesContainer = styled.section`
  flex: 1;
  padding-right: 16px;
  width: 100%;

  @media(max-width: 1399px) {
    overflow-x: auto;
  }

  @media(min-height: 900px) {
    .opensales_content {
      margin-top: 8px;
      max-height: 920px;
      overflow: auto;
      position: relative;
    }
  }  
`;

export const TableCustom = styled.table`
  display: table;
  color: #111;
  width: 100%;
  border-collapse:separate; 
  border-spacing: 0;

  thead {
    tr {
      td {
        border-bottom: 1px solid ${COLORS.colors.gray_blue};
      }
    }
  }

  tbody {
    tr {
      transition: all 0.2s;

      &:not(:first-child) {
        td {
          border-top: 1px solid ${COLORS.colors.gray_blue};
        }
      }

      &:last-child {
        td {
          border-bottom: 1px solid ${COLORS.colors.gray_blue};
        }
      }

      td {
        color: #fff;

        &:first-child {
          border-left: 1px solid ${COLORS.colors.gray_blue};
        }

        &:last-child {
          border-right: 1px solid ${COLORS.colors.gray_blue};
        }

        &.stop {
          padding: 2px;
        }

        button {
          background: ${COLORS.global.red_0};
          padding: 6px;
          margin: 0 auto;
            
          width: 60%;

          border-radius: 4px;
          transition: filter 0.2s;

          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            filter: brightness(80%);
          }

          svg {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
`;

export const TdCustom = styled.td`
  padding: 8px;
  
  text-align: center;
  white-space: nowrap;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 2.3rem;
  letter-spacing: 0;
  text-transform: uppercase;
  color: #AFD7FF;
`;

export const LastSalesContainer = styled.section`
  margin-top: 32px;
  padding-right: 16px;
`;
