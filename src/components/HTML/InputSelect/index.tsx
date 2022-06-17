import { 
  useEffect, 
  useRef,
} from 'react';
import { useField } from '@unform/core';
import Select, { Props as SelectProps } from 'react-select';

import {
  Container,
} from './styles';

import { COLORS } from '@/theme';

export type InputProps = SelectProps & {
  name: string;
  labelText?: string;
  containerProps?: React.HTMLAttributes<HTMLLabelElement>;
  fields: Array<{
    value: string;
    label?: string;
  }>;
}

export function InputSelect({
  name,
  labelText,
  containerProps,
  fields,
  ...rest
}: InputProps) {
  const selectRef = useRef(null);
  const { fieldName, registerField, error, clearError } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => ref.props.value?.value || undefined,
      setValue: (ref, value) => {
        ref.select.setValue(value || undefined);
      },
      clearValue: (ref: any) => {
        ref.clearValue();
      }
    })
  }, [fieldName, registerField]);

  return (
    <Container {...containerProps} isError={!!error}>
      <span className="input_text">{labelText}</span>
      <Select
        ref={selectRef} 
        name={name}
        options={fields}
        onFocus={clearError}
        styles={{
          menu: (provided) => {
            return {
              ...provided,
              background: COLORS.colors.gray_blue,
              border: 0,
            }
          },
          container: (provided) => {
            return {
              ...provided,
              width: '100%',
              color: '#fff',
              background: COLORS.colors.tertiary_100,
            }
          },
          control: (provided) => {
            return {
              ...provided,
              width: '100%',
              color: '#fff',
              background: COLORS.colors.tertiary_100,
              border: `1px solid ${error 
                ? COLORS.global.red_0
                : COLORS.colors.gray_blue
              }`,
              padding: '4px'
            }
          },
          option: (provided) => {
            return {
              ...provided,
              width: '100%',
              color: '#fff',
              background: COLORS.colors.gray_blue,
              padding: '14px',
              ":hover": {
                background: COLORS.colors.tertiary_100
              },
            }
          },
          singleValue: (provided, props) => {
            return {
              ...provided,
              color: '#fff',
            }
          },
        }}
        {...rest}
      />
      <span className="input_error">{error}</span>
    </Container>
  )
}