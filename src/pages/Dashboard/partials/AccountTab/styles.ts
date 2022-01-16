import { COLORS } from '@/theme';
import styled from 'styled-components';

export const Container = styled.div`
  max-height: 42rem;
  overflow: auto;

  padding: 32px;

  @media(min-width: 768px) {
    max-height: 96rem;
  }
`;

export const Content = styled.div`

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

export const Details = styled.div`

  @media(min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    .details_title {
      max-width: 300px;
      margin-bottom: 16px;
    }
  }

  @media(min-width: 1400px) {
    margin-top: 80px;
  }
`;

export const Info = styled.div`
  .wallet_button {
    width: 100px;

    font-size: 1.1rem;
    line-height: 14px;
    letter-spacing: 0.035em;
    padding: 0;

    margin-top: 8px;
  }

  @media(min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    max-width: max-content;
    width: 100%;

    .info_separator {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 72px;
    }

    .wallet_button {
      width: 180px;
      padding: 16px;
      margin-top: 0;
    }
  }

  @media(min-width: 1024px) {
    .info_separator:first-child {
      gap: 114px;
    }

    .info_separator:last-child {
      gap: 72px;
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
  }

  .info_id {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    line-height: 18px;
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

export const SecondaryDetails = styled.div`
  margin-top: 32px;

  @media(min-width: 768px) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 96px;
  }

  @media(min-width: 1024px) {
    margin-top: 80px;
  }
`;

export const ResourcesDetail = styled.div`
  .resources_title {
    margin-bottom: 8px;
  }
`;

export const Resources = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const Resource = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  margin-top: 16px;

  img, svg {
    width: 26px;
    height: 26px;
  }

  img {
    object-fit: contain;
  }

  svg {
    color: #0BFFB3;
  }

  strong {
    color: ${COLORS.fonts.primary};
    font-weight: 700;
    font-size: 1.1rem;
  }

  @media(min-width: 768px) {
    margin: 16px 16px 0;

    strong {
      font-size: 2.2rem;
    }
      
    img, svg {
      width: 30px;
      height: 30px;
    } 
  }
`;

export const Spc = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  max-width: 146px;
  width: 100%;

  margin: 32px auto 0;

  input {
    background: ${COLORS.colors.tertiary_100};
    
    width: 100%;
    max-width: 146px;
    
    padding: 0.5rem;
    margin: 24px 0 2px;

    color: ${COLORS.fonts.primary};
    caret-color: ${COLORS.fonts.primary};
    border: 2px solid #2697FF;
    
    font-size: 1.1rem;
    line-height: 14px;
    letter-spacing: 0.035em;

    &::placeholder {
      color: #51779A;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px ${COLORS.colors.tertiary_100} inset;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${COLORS.fonts.primary} !important;
    }
  }

  button {
    padding: 8px 0;
  }

  @media(min-width: 768px) {
    margin: 0;
    
    max-width: 160px;

    input {
      max-width: 160px;
    }
  } 

  @media(min-width: 1024px) {
    max-width: 300px;

    input {
      max-width: 204px;
      margin-bottom: 8px;
      padding: 0.8rem;
    }

    button:last-child {
      margin-top: 8px;
    }
  } 
`;