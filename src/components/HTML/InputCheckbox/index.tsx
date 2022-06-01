import * as S from './styles';

export type InputProps = React.HTMLAttributes<HTMLLabelElement> & {
  name?: string;
  containerProps?: React.HTMLAttributes<HTMLLabelElement>
}

export function InputCheckbox({
  children,
  name,
  ...rest
}: InputProps) {

  return (
    <S.Container {...rest} className="label_checkbox">
      <input name={name} type="checkbox"/>
      <div className="checkmark"/>
      {children}
    </S.Container>
  )
}