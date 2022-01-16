import { COLORS } from '@/theme';
import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(180deg, #005BB7 0%, #002A54 121.78%);

  margin: 0 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 16px;

  position: relative;

  svg {
    path {
      color: ${COLORS.global.red_0};
    }
  }

  .texts_container {
    .text {
      font-size: 11px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: 0.035em;
      text-align: center;

      margin-top: 14px;
    }
  }

  .buttons {
    display: flex;
    gap: 8px;

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
`;