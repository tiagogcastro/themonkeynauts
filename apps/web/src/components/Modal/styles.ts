import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);

  padding: 16px;
`;

export const Content = styled.div`
  max-width: min(560px, 100%);
  max-height: 90vh;
  overflow: auto;
`;
