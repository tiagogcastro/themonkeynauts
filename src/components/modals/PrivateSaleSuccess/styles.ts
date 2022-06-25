import { COLORS } from '@/theme';
import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(180deg, #005BB7 0%, #002A54 121.78%);

  margin: 0 16px;

  max-width: max-content;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 16px;

  position: relative;

  svg {
    width: 32px;
    height: 32px;

    path {
      color: #53E658;
    }
  }

  .texts_container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .text {
      font-size: 11px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: 0.035em;
      text-align: center;

      margin-top: 16px;
    }

    a {
      background: #002A54;

      padding: 1.6rem;
      width: 220px;
      
      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: bold;
      line-height: 1.5rem;
      letter-spacing: 0.035em;
      text-align: center;

      transition: all 0.3s;

      &:hover {
        filter: brightness(120%);
      }
    }
  }

  .buttons {
    display: flex;

    gap: 8px;

    padding-top: 32px;

    width: 100%;
  }
  
  .cubic {
    background: ${COLORS.colors.primary_0};
    width: 50px;
    height: 50px;

    position: absolute;
    z-index: -1;
  }

  .cubic1 {
    top: -2px;
    left: -2px;
  }

  .cubic2 {
    top: -2px;
    right: -2px;
  }

  .cubic3 {
    bottom: -2px;
    left: -2px;
  }

  .cubic4 {
    bottom: -2px;
    right: -2px;
  }

  @media(min-width: 1024px) {
    padding: 32px 48px;

    svg {
      width: 48px;
      height: 48px;
    }

    .texts_container {
      .text {
        font-size: 18px;
      }
    }

    .buttons {
      margin-top: 16px;
    }
  }
`;