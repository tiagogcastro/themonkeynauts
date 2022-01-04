import styled from 'styled-components';

import { COLORS } from '@/theme';

export const Container = styled.div`
  padding: 1.6rem;
  max-height: 44rem;
  overflow: auto;
`;

export const Content = styled.div`
  .ship_name {
    margin-bottom: 16px;
  }
`;

export const Details = styled.main`
  display: flex;
  flex-direction: column;

  .ship_image {
    margin: 8px auto 0;
  }
`;

export const PrincipalDetails = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ShipInformation = styled.aside`
  .mist_info {
    display: flex;
    justify-content: flex-start;
    gap: 1.6rem;
    
    margin-bottom: 24px;
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
`;

export const CrewContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  .crew_title {
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
  }
`;

export const CrewContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-top: 16px;
`;

export const CrewSelected = styled.div`
  width: 100%;

  background: #041937;
  border: 1px solid ${COLORS.colors.secondary_50};

  &:not(:first-child) {
    margin-top: 4px;
  }

  .crew_content {
    display: flex;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    img {
      width: 52px;
      height: 52px;

      padding: 4px;
    }

    .crew_name {
      text-align: center;
      padding: 4px 0; 
      word-break: break-word;
    }

    .crew_remove {
      padding: 0 8px;
      background: ${COLORS.colors.secondary_50};
      margin-left: 8px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export const CrewToSelect = styled.div`
  width: 100%;

  background: #041937;
  border: 1px solid ${COLORS.colors.secondary_50};

  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:first-child) {
    margin-top: 4px;
  }

  .crew_content {
    padding: 16px;
  }
`;