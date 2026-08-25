import styled, { keyframes } from 'styled-components';

import {
  COLORS
} from '@/theme';

type LoadingContainerProps = {
  size?: number;
};

export const LoadingContainer = styled.div<LoadingContainerProps>`
  width: ${({size}) => `${size || 1.4}rem`};
  height: ${({size}) => `${size || 1.4}rem`};
`;

const circleLoadingKeyFrame = keyframes`
  from {
    transform: rotate(0deg);
  }
  to { 
    transform: rotate(360deg);
  }
`;

export const CircleLoading = styled.svg<LoadingContainerProps>`
  width: 100%;
  height: 100%;
  
	border-radius: 50%;

	border: solid 4px ${COLORS.global.white_0};
	border-right-color: transparent;
	border-bottom-color: transparent;

  transition: all 0.5s ease-in;
  animation: ${circleLoadingKeyFrame} 1s linear infinite;
`;