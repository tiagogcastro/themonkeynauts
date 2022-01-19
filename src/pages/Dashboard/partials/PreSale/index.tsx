import { Button } from '@/components';
import { COLORS } from '@/theme';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  Container,
  Content,
} from './styles';

type HandleChange = {
  event: React.ChangeEvent<HTMLInputElement>;
  max: number;
  min: number;
}

export function PreSale() {
  const [inputValue, setInputValue] = useState('');

  function handleChange({
    event,
    max,
    min,
  }: HandleChange) {
    let value: string | number = event.target.value;
    
    if(Number(value) < 0 || Number(value) > 1) {
      toast('You can only put numbers between 0.1 and 1', {
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
        <div className="texts_container">
          <p className="text">Welcome to the pre-sale of SPC, The Monkeynauts token.</p>
          <p className="text">To reduce the impact of large whales on our ecosystem, we stipulate that each account will be able to buy a minimum of 0.1 BNB and a maximum of 1 BNB, spreading the tokens among more players.</p>
          <p className="text">In this pre-sale each SPC will be sold at a price of $0.10 and you will receive the equivalent of the deposited BNB in ​​tokens.</p>
          <p className="text">Read our whitepaper for more detailed information about our tokenomics. </p>

        </div>
        <input 
          type="number"
          placeholder="Min 0.1 / max 1"
          onChange={(event) => handleChange({
            event,
            max: 1,
            min: 0.1
          })}
          value={inputValue}
        />
        <Button type="submit" text="BUY"/>
      </Content>
    </Container>
  );
}