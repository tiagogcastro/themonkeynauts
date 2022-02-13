import styled from 'styled-components';

import { COLORS } from '@/theme';

export const Container = styled.div`
  padding: 1.6rem;
  max-height: 40rem;
  overflow: auto;

  @media(min-width: 1024px) {
    max-height: 100%;
  }
`;

export const Content = styled.div`
  .back_page {
    display: none;
  }

  .monkeynaut_name {
    margin-bottom: 16px;
  }

  @media(min-width: 1024px) {
    .monkeynaut_name {
      margin: 32px 0 40px;

      font-size: 3.2rem;
      line-height: 40px;
    }

    .back_page {
      display: block;

      margin: 32px auto 0;
      padding: 8px 14px;

      background: #072347;
      border: 1px solid #2A72B3;
      color: ${COLORS.fonts.primary};

      font-size: 1.8rem;
      font-weight: 700;
      line-height: 23px;
      text-align: center;
    }
  }
`;

export const Details = styled.main`
  display: flex;
  flex-direction: column;

  .monkeynaut_image {
    margin: 8px auto 0;
    
    max-width: 170px;
    max-height: 100px;
    width: 100%;

    object-fit: contain;
  }

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;

    .monkeynaut_image {
      margin: 64px 24px 0;

      max-height: 170px;
    }
  }
   
  @media(min-width: 1024px) {
    .monkeynaut_image {
      max-width: 300px;
      max-height: 260px;
      margin: 0 126px 0 0;
    }
  }

  @media(min-width: 1400px) {
    max-width: 85%;
    margin: 0 auto;

    .monkeynaut_image {
      margin: 0 178px 0 0;
    }
  }
`;

export const PrincipalDetails = styled.section`
  display: flex;
  flex-direction: column;

  @media(min-width: 768px) {
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 24px;

    width: 100%;
    }

  @media(min-width: 1024px) {
    width: 100%;

    align-items: center;
    justify-content: flex-end;
    gap: 0;
  }
`;

export const OthersDetails = styled.section`

`;

export const MonkeynautInformation = styled.aside`
  .mist_info {
    display: flex;
    justify-content: flex-start;
    gap: 1.6rem;
  }

  .details_title {
    display: none;
  }

  @media(min-width: 1024px) {
    max-width: 400px;
    width: 100%;

    .details_title {
      display: block;
      margin-bottom: 50px;
    }
  }
`;

export const UniqueInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  margin-top: 16px;

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

    &.monkeynaut_id {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
      line-height: 18px;
    }
  }

  @media(min-width: 1024px) {
    margin-top: 24px;
    
    span {
      font-size: 1.2rem;
    }

    strong {
      font-size: 1.8rem;
      margin-top: 0.8rem;
    }
  }

  @media(min-width: 1400px) {
    span {
      font-size: 1.4rem;
    }

    strong {
      font-size: 2.4rem;
    }
  }
`;

export const CrewInShipContainer = styled.div`

`;

export const CrewInShip = styled.div`
  display: flex;
  align-items: flex-end;

  div {
    margin-top: 4px;

    p {
      font-size: 8px;
      font-weight: 700;
      margin-top: 4px;
      line-height: 10px;
    }
  }

  @media(min-width: 1024px) {
    div {
      margin-top: 12px;

      p {
        font-size: 1.8rem;
        margin-top: 12px;
      }
    }
  }
`;

export const AttributesContainer = styled.div`
  margin: 24px 0 32px;
`;

export const Attributes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  margin-top: 24px;
`;

export const Attribute = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  justify-content: center;

  gap: 16px;
  svg {
    color: #60B2FF;

    width: 24px;
    height: 24px;
  }

  strong {
    font-size: 1.8rem;
    line-height: 23px;
    color: ${COLORS.fonts.primary};
  }
`;

export const PveBonusInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 16px;

  .pve_detail {
    margin: 8px 0 24px;
    text-align: center;
    color: #0BFFB3;

    font-size: 1.1rem;
    line-height: 1.6rem;
    letter-spacing: 0.035em;
  }

  @media(min-width: 1024px) {
    margin-top: 42px;

    .pve_detail {
      font-size: 1.8rem;
      line-height: 23px;
      
      margin-top: 24px;
    }
  }
`;

export const InfoTitle_1 = styled.h1`
  font-size: 1.4rem;
  color: ${COLORS.colors.primary_0};
  text-transform: uppercase;
  line-height: 1.8rem;
  letter-spacing: 0.035em;
  text-align: center;
  
  width: 100%;

  padding: 4px;

  background: 
  linear-gradient(90deg, 
    rgba(0, 146, 249, 0) 5.52%, 
    #041937 50.86%, 
    rgba(0, 146, 249, 0) 91.71%
  );

  position: relative;

  &:before, &:after {
    content: '';
    position: absolute;
    left: 0;

    width: 100%;
    height: 2px;

    background: 
    linear-gradient(90deg, 
      rgba(0, 146, 249, 0) 5.52%, 
      #0092F9 50.86%, 
      rgba(0, 146, 249, 0) 91.71%
    );
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }

  @media(min-width: 1400px) {
    font-size: 2.4rem;
    line-height: 30px;
  }
`;

export const EquipamentsContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  .equipament_title {
    margin-bottom: 16px;
  }
  
  @media(min-width: 768px) {
    margin: 0 0 0 auto;
    max-width: 220px;
  }

  @media(min-width: 1400px) {
    max-width: 300px;
  }
`;

export const EquipamentsContent = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;

  margin-top: 16px;
`;

export const EquipamentToSelect = styled.div`
  width: 100%;

  background: #041937;
  border: 1px solid ${COLORS.colors.secondary_50};

  display: flex;
  align-items: center;
  justify-content: center;
  
  transform: rotate(45deg);
  border-radius: 6px;

  .equipament_content {
    padding: 8px;
      
    transform: rotate(-45deg);

    svg {
      width: 18px;
      height: 18px;
      color: ${COLORS.fonts.primary};
    }
  }
`;