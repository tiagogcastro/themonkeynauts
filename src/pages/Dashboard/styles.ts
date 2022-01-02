import styled from 'styled-components';

import { COLORS } from '@/theme';

import dashboard_bg_1 from '@/assets/svg/dashboard_bg_1.svg';
import dashboard_bg_2 from '@/assets/svg/dashboard_bg_2.svg';
import dashboard_bg_3 from '@/assets/svg/dashboard_bg_3.svg';
import dashboard_bg_4 from '@/assets/svg/dashboard_bg_4.svg';

import background_1 from '@/assets/images/background_1.png';
import bg_items from '@/assets/images/bg_items.png';
import bg_item_title from '@/assets/images/bg_item_title.png';

export const Container = styled.div`
  height: 100vh;
  
  background: url(${background_1}) no-repeat center;
  background-size: cover;
  
  padding-top: 2.4rem;
`;

export const Content = styled.div`
  height: 100%;
  max-height: 53rem;

  max-width: 32rem;
  width: 100%;

  padding: 0 3.2rem;
  margin: 0 auto;

  background: url(${dashboard_bg_1}) no-repeat center top;

  @media(min-width: 768px) {
    max-width: 76.8rem;
    background: url(${dashboard_bg_2}) no-repeat center;
  }

  @media(min-width: 1024px) {
    max-width: 102.4rem;
    max-height: 900px;

    margin: 0 auto;
    padding: 32px;
    
    background: url(${dashboard_bg_3}) no-repeat center;
  }

  @media(min-width: 1400px) {
    max-width: 140rem;
    background: url(${dashboard_bg_4}) no-repeat center;
  }
`;

export const MainContent = styled.main`
  height: 100%;
  max-height: 50rem;
  position: relative;

  @media(min-width: 768px) {
    padding: 0 32px;
  }

  @media(min-width: 1024px) {
    max-height: 100%;
    
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
    max-height: 900px;
  }
`;

export const TheadCustom = styled.div`
  display: none;

  tr {

  }

  th {

  }
`;

export const TbodyCustom = styled.div`
  max-height: 42rem;
  overflow: auto;

  padding-bottom: 1.6rem;

  .custom_tr {
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

    background: url(${bg_items}) no-repeat ;
  }

  @media(min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.6rem;
  }

  @media(min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.6rem;
    max-height: 720px;
  }
`;

export const TdCustom = styled.div`
  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
      font-size: 1.1rem;
      padding: 0.8rem;
      width: 100%;
      text-align: center;

      background: url(${bg_item_title}) no-repeat center;
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
`;