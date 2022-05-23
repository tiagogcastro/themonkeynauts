import { 
  HTMLInputTypeAttribute, 
  useEffect, 
  useRef,
} from 'react';
import { useField } from '@unform/core';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { useBoolean } from '@/hooks';

import {
  Container,
  Content
} from './styles';

export type InputProps = React.HTMLAttributes<HTMLInputElement> & {
  name: string;
  labelText?: string;
  type?: HTMLInputTypeAttribute;
  containerProps?: React.HTMLAttributes<HTMLLabelElement>
}

export function Input({
  type = 'text',
  name,
  labelText,
  containerProps,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error, clearError } = useField(name)

  const passwordVisible = useBoolean(false);
  const isFocused = useBoolean(false);

  function handleFocusInput() {
    isFocused.changeToTrue()

    if(error) {
      clearError();
    }
  }

  function handlePasswordVisible(changeStateTo: boolean) {
    if(changeStateTo) {
      passwordVisible.changeToTrue();
    } else {
      passwordVisible.changeToFalse();
    }

    handleFocusInput();
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField]);

  return (
    <Container {...containerProps} isError={!!error}>
      <span className="input_text">{labelText}</span>
      <Content
        isFocused={isFocused.state}
        isError={!!error}
        onClick={() => isFocused.changeToTrue()}
      >
        <input 
          type={type === 'password' && passwordVisible.state ? 'text': type}
          name={name}
          ref={inputRef}
          defaultValue={defaultValue}
          onFocus={handleFocusInput}
          onBlur={() => isFocused.changeToFalse()}
          {...rest}
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
  )
}