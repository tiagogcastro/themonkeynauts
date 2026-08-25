import { HTMLInputTypeAttribute, useRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useBoolean } from '@/hooks';
import {
  Container,
  Content
} from './styles';

export type InputProps = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'> & {
  name?: string;
  labelText?: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
  containerProps?: React.HTMLAttributes<HTMLLabelElement>;
  registration?: UseFormRegisterReturn;
}

export function Input({
  type = 'text',
  labelText,
  error,
  containerProps,
  registration,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const passwordVisible = useBoolean(false);
  const isFocused = useBoolean(false);

  function handleFocusInput() {
    isFocused.changeToTrue();
  }

  function handlePasswordVisible(changeStateTo: boolean) {
    if(changeStateTo) {
      passwordVisible.changeToTrue();
    } else {
      passwordVisible.changeToFalse();
    }

    handleFocusInput();
  }

  return (
    <Container className="input_label" {...containerProps} isError={!!error}>
      <span className="input_text">{labelText}</span>
      <Content
        isFocused={isFocused.state}
        isError={!!error}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          type={type === 'password' && passwordVisible.state ? 'text': type}
          id={registration?.name}
          ref={(element) => {
            inputRef.current = element;
            registration?.ref(element);
          }}
          onFocus={handleFocusInput}
          onBlur={() => {
            isFocused.changeToFalse();
            registration?.onBlur(event as never);
          }}
          {...rest}
          {...(registration ? { onChange: registration.onChange, name: registration.name } : {})}
        />
        {type === 'password' && (
          passwordVisible.state ? (
            <button
              title="Hide password"
              type="button"
              onClick={() => handlePasswordVisible(false)}
              className="change_visible_password"
            >
              <AiFillEyeInvisible />
            </button>
          ) : (
            <button
              title="Show password"
              type="button"
              onClick={() => handlePasswordVisible(true)}
              className="change_visible_password"
            >
              <AiFillEye />
            </button>
          )
        )}
      </Content>
      <span className="input_error">{error}</span>
    </Container>
  );
}
