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
      isLoading={loading?.state}
      type="button"
      disabled={loading?.state}
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