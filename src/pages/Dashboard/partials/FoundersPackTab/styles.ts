import { COLORS } from '@/theme';
import styled from 'styled-components';

export const Container = styled.div`
  max-height: 42rem;
  overflow: auto;

  margin-top: 16px;
  padding: 0 16px 16px;

  @media(min-width: 1024px) {
    max-height: 72rem;
  }
`;

export const Content = styled.section`
  
  @media(min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 64px;
  }

  @media(min-width: 1400px) {
    padding: 0 64px;
    margin-top: 108px;
  }
`;

export const Card = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #062043;

  border: 1px solid ${COLORS.colors.primary_0};

  &:hover {
    border: 1px solid rgba(38, 151, 255, 0.4);
  }

  &:not(:first-child) {
    margin-top: 24px;
  }
  
  .stock {
    text-align: center;

    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.035em;

    color: ${COLORS.colors.primary_0};

    margin: 8px 0;
  }

  @media(min-width: 768px) {
    &:not(:first-child) {
      margin-top: 0;
    }
  }
`;

export const CardContainer = styled.div`
  position: relative;
  
  .card_title {
    width: 100%;
    border-bottom: 1px solid ${COLORS.colors.primary_0};

    padding: 8px;

    font-size: 13px;
    font-weight: 700;
    line-height: 17px;
    text-align: center;
    text-transform: uppercase;
  }
  
  .description {
    display: none;

    color: ${COLORS.fonts.primary};
  }

  .price {
    display: block;

    margin: 32px 0 0 8px;

    font-size: 16px;
    text-align: center;
    color: ${COLORS.colors.primary_0};
  }

  .more_info_text {
    display: block;

    margin-top: 24px;
    
    opacity: 0.9;
    text-align: center;
  }

  &:hover {
    .card_title {
      opacity: 0.4;
      border-bottom: 1px solid rgba(38, 151, 255, 0.4);
    }

    .description {
      display: flex;
      justify-content: center;

      font-size: 1.4rem;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.035em;
      text-align: center;
    }

    .price {
      display: none;
    }

    .more_info_text {
      display: none;
    }

    img {
      display: none;
    }
  }

  @media(min-width: 768px) {
    width: 250px;
    height: 390px;
  }
`;

export const CardContent = styled.div`
  padding: 12px;

  img {
    height: 200px;
    width: 100%;

    object-fit: contain;
  }

  @media(min-width: 768px) {
    .buy_pack {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 90%;
      transform: translateX(-50%);
    }
  }
`;