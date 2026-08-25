import { 
  useEffect, 
  useRef,
} from 'react';
import { useField } from '@unform/core';

import { useBoolean } from '@/hooks';

import {
  Container,
  Content
} from './styles';

export type TextareaProps = React.HTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  labelText?: string;
  containerProps?: React.HTMLAttributes<HTMLLabelElement>
}

export function UnformTextarea({
  name,
  labelText,
  containerProps,
  ...rest
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, registerField, error, clearError } = useField(name)

  const isFocused = useBoolean(false);

  function handleFocusTextarea() {
    isFocused.changeToTrue()

    if(error) {
      clearError();
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef,
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
    <Container className="textarea_label" {...containerProps} isError={!!error}>
      <span className="textarea_text">{labelText}</span>
      <Content
        isFocused={isFocused.state}
        isError={!!error}
        onClick={() => isFocused.changeToTrue()}
      >
        <textarea 
          name={name}
          ref={textareaRef}
          defaultValue={defaultValue}
          onFocus={handleFocusTextarea}
          onBlur={isFocused.changeToFalse}
          {...rest}
        />
      </Content>
      <span className="textarea_error">{error}</span>
    </Container>
  )
}