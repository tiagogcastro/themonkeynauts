import { COLORS } from '@/theme';
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
  gap: 16px;

  @media(max-width: 1399px) {
    align-items: center;
    padding-right: 16px;
  }
`;

export const FilterTable = styled.section`
  display: flex;
  align-items: center;
  gap: 16px;

  .filter_by_text {
    display: flex;
    align-items: center;
    gap: 12px;

    cursor: pointer;

    span {
      margin-bottom: 4px;
      font-weight: bold;
      line-height: 1.5rem;
      letter-spacing: 0;
      text-align: left;

      color: #60B2FF;
    }

    input {
      background: ${COLORS.colors.tertiary_100};
      padding: 8px;
      letter-spacing: 1px;
      color: ${COLORS.fonts.primary};
      caret-color: ${COLORS.fonts.primary};

      border: 1px solid ${COLORS.colors.secondary_50};

      &::placeholder {
        color: ${COLORS.global.input};
      }

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px ${COLORS.colors.tertiary_100} inset;
      }

      &:-webkit-autofill {
        -webkit-text-fill-color: ${COLORS.fonts.primary} !important;
      }
    }

  }

  .checkbox_container {
    display: flex;
    gap: 16px;
  }

  @media(max-width: 1024px) {
    flex-direction: column;
  }

  @media(max-width: 768px) {
    .filter_by_text {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }

    .checkbox_container {
      flex-direction: column;
    }
  }
`;

export const LogContainer = styled.section`
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
