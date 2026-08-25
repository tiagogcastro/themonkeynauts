import Select, { Props as SelectProps } from 'react-select';
import type { UseFormRegisterReturn } from 'react-hook-form';
import {
  Container,
} from './styles';

import { COLORS } from '@/theme';

export type InputProps = Omit<SelectProps, 'name'> & {
  name?: string;
  labelText?: string;
  error?: string;
  containerProps?: React.HTMLAttributes<HTMLLabelElement>;
  fields: Array<{
    value: string;
    label?: string;
  }>;
  registration?: UseFormRegisterReturn & { value?: unknown };
}

export function InputSelect({
  labelText,
  error,
  containerProps,
  fields,
  registration,
  ...rest
}: InputProps) {
  return (
    <Container {...containerProps} isError={!!error}>
      <span className="input_text">{labelText}</span>
      <Select
        inputId={registration?.name}
        name={registration?.name}
        options={fields}
        onBlur={(event: unknown) => registration?.onBlur(event as never)}
        onChange={(option) => {
          const selected = option as { value?: unknown } | null;

          registration?.onChange({
            target: {
              name: registration.name,
              value: selected?.value ?? '',
            },
            type: 'select',
          });
        }}
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
          singleValue: (provided) => {
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
  );
}
