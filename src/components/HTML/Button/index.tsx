import {
  Loading
} from '@/components';

import {
  Container,
} from './styles';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  loading?: {
    state: boolean;
    size?: number;
  }
}

export function Button({text, loading, ...rest}: ButtonProps) {
  return (
    <Container
      type="button"
      {...rest}
    >
      {loading && loading.state ? (
        <Loading
          size={loading.size}
        />
      ): (
        text
      )}
    </Container>
  )
}