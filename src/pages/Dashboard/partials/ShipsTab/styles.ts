import styled from 'styled-components';

import { COLORS } from '@/theme';

import bg_items from '@/assets/images/bg_items.png';

export const Container = styled.div`
  .tab_title {
    display: none;
  }

  @media(min-width: 1024px) {
    .tab_title {
      display: block;
      
      margin: 6.4rem 0;
      
      font-size: 3.2rem;
    }
  }
`;

export const Content = styled.section`
  overflow: auto;
  max-height: 540px;

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    background: #555;
  }

  ::-webkit-scrollbar-thumb {
    background: #298df1;
  }
`;

export const TableCustom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 32rem;
  width: 100%;

  margin: 1.6rem auto 0;

  @media(min-width: 768px) {
    max-width: 76.8rem;
  }

  @media(min-width: 1024px) {
    display: table;

    max-width: initial;

    margin: 0;
    padding: 0 16px 0 0;
    border-spacing: 0 1.4rem;
  }
`;

export const TheadCustom = styled.div`
  display: none;

  @media(min-width: 1024px) {
    display: table-header-group;
  }
`;

export const TheadTrCustom = styled.div`
  @media(min-width: 1024px) {
    display: table-row;
  }
`;

export const TheadTdCustom = styled.div`
  @media(min-width: 1024px) {
    display: table-cell;
    text-align: center;
    padding: 16px;

    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.3rem;
    letter-spacing: 0;
    text-transform: uppercase;
    color: #AFD7FF;
  }
`;

export const TbodyCustom = styled.div`
  max-height: 42rem;
  overflow: auto;

  padding-bottom: 1.6rem;

  @media(min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.6rem;
  }

  @media(min-width: 1024px) {
    display: table-row-group;
  }
`;

export const TbodyTrCustom = styled.div`
  cursor: pointer;
  
  display: grid;
  grid-template-areas:
    "name name"
    "id id"
    "role rank"
    "crew fuel";
  align-items: center;
  justify-content: center;

  width: 22.9rem;
  height: 184px;
  
  padding: 1.6rem;

  background: url(${bg_items}) no-repeat;

  @media(min-width: 1024px) {
    display: table-row;

    height: initial;

    background: ${COLORS.colors.tertiary_100};

    transition: all 0.2s;

    &:hover {
      background: #0A3876;
    }
  }
`;

export const TbodyTdCustom = styled.div`
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
      font-size: 1.1rem;
    }

    span {
      color: ${COLORS.colors.primary_0}
    }

    strong {
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1.4rem;
      letter-spacing: 0.035em;
      color: ${COLORS.fonts.primary};
      margin-top: 0.4rem;
    }
  }

  &.avatar {
    display: none;
  }

  &.name {
    grid-area: name;
  }

  &.id {
    grid-area: id;
    margin: 6px 0;
  }

  &.role {
    grid-area: role;
    margin-right: 16px;
  }

  &.rank {
    grid-area: rank;
    margin-left: 16px;
  }

  &.crew {
    grid-area: crew;
    margin: 8px 16px 0 0;
  }

  &.fuel {
    grid-area: fuel;
    margin: 8px 0 0 16px;
  }

  @media(min-width: 1024px) {
    display: table-cell;
    vertical-align: middle;
    text-align: center;

    border-top: 2px solid #298df1;
    border-bottom: 2px solid #298df1;

    &:last-child {
      border-right: 4px solid #298df1;
      border-radius: 0 8px 8px 0;
    }

    &:first-child {
      border-radius: 8px 0 0 8px;
      border-left: 4px solid #298df1;
    }

    .info {
      padding: 1.6rem;

      span {
        display: none;
      }

      h1 {
        background: none;
        padding: 0;
      }

      strong {
        text-align: center;
        margin: 0;
      }

      h1, strong {
        font-size: 1.8rem;
        font-weight: bold;
        line-height: 2.3rem;
        letter-spacing: 0;
      }
    }

    &.id {
      display: none;
    }

    &.avatar {
      display: table-cell;
      
      width: 80px;
      margin: 0 auto 0 8px;

      background: #0E112D;
    }
  }
`;
