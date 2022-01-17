import { Button } from '@/components';
import { COLORS } from '@/theme';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  Container,
  Content,
  InfoTitle_1
} from './styles';

export function PreSale() {
  const [inputValue, setInputValue] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value: string | number = event.target.value;
    let { min, max } = event.target;
    
    if(Number(value) < 0 || Number(value) > 1) {
      toast('You can only put numbers between 0 and 1', {
        autoClose: 5000,
        pauseOnHover: true,
        type: 'warning',
        style: {
          background: COLORS.global.white_0,
          color: COLORS.global.black_0 ,
          fontSize: 14,
          fontFamily: 'Orbitron, sans-serif',
        }
      });
      return inputValue;
    }

    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setInputValue(String(value));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(inputValue);
  }

  return (
    <Container>
      <Content onSubmit={handleSubmit}>
        <InfoTitle_1>Pre sale</InfoTitle_1>
        <input 
          type="number"
          placeholder="Min 0 / max 1"
          min="0"
          max="1"
          onChange={(event) => handleChange(event)}
          value={inputValue}
        />
        <Button type="submit" text="Text"/>
      </Content>
    </Container>
  );
}