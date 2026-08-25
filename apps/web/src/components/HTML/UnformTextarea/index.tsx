import { useRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { useBoolean } from '@/hooks';
import {
  Container,
  Content
} from './styles';

export type TextareaProps = Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'ref'> & {
  name?: string;
  labelText?: string;
  error?: string;
  containerProps?: React.HTMLAttributes<HTMLLabelElement>;
  registration?: UseFormRegisterReturn;
}

export function UnformTextarea({
  labelText,
  error,
  containerProps,
  registration,
  ...rest
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isFocused = useBoolean(false);

  function handleFocusTextarea() {
    isFocused.changeToTrue();
  }

  return (
    <Container className="textarea_label" {...containerProps} isError={!!error}>
      <span className="textarea_text">{labelText}</span>
      <Content
        isFocused={isFocused.state}
        isError={!!error}
        onClick={() => textareaRef.current?.focus()}
      >
        <textarea
          id={registration?.name}
          ref={(element) => {
            textareaRef.current = element;
            registration?.ref(element);
          }}
          onFocus={handleFocusTextarea}
          onBlur={() => {
            isFocused.changeToFalse();
            registration?.onBlur(event as never);
          }}
          {...rest}
          {...(registration ? { onChange: registration.onChange, name: registration.name } : {})}
        />
      </Content>
      <span className="textarea_error">{error}</span>
    </Container>
  );
}
