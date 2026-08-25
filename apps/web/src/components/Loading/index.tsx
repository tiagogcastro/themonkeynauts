import {
  LoadingContainer,
  CircleLoading,
} from './styles';

export type LoadingProps = {
  size?: number;
  type?: 'circle';
};

export function Loading({type = 'circle', ...rest}: LoadingProps) {
  const loadings = {
    circle: <CircleLoading {...rest}/>,
  };

  return (
    <LoadingContainer {...rest}>
      {loadings[type]}
    </LoadingContainer>
  );
}