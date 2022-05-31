import { useMetaMask } from 'metamask-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';

import { ethereum as ethereumConfig } from '@/config/ethereum';

import { Button } from '@/components';
import { COLORS } from '@/theme';
import { paymentByEthereum } from '@/utils';
import { useAuth, useBoolean } from '@/hooks';

import {
  Container,
  Content,
} from './styles';

type HandleChange = {
  event: React.ChangeEvent<HTMLInputElement>;
  max: number;
  min: number;
}

export function PrivateSale() {
  const { user } = useAuth();
  const { ethereum } = useMetaMask()
  
  const [inputValue, setInputValue] = useState('');
  const buttonHasBlocked = useBoolean(false);

  function handleChange({
    event,
    max,
    min,
  }: HandleChange) {
    let value: string | number = event.target.value.replace(/[^0-9.]/g, '');

    if(Number(value) < min || Number(value) > max) {
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

    setInputValue(String(value));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(!inputValue) {
      return toast('You need to enter a number between 0.1 and 1 to proceed with the purchase', {
        autoClose: 7000,
        pauseOnHover: true,
        type: 'warning',
        style: {
          background: COLORS.global.white_0,
          color: COLORS.global.black_0 ,
          fontSize: 14,
          fontFamily: 'Orbitron, sans-serif',
        }
      });
    }

    buttonHasBlocked.changeToTrue();

    toast(`${user?.user.nickname}, please wait for the metamask window to open.`, {
      autoClose: 7000,
      pauseOnHover: true,
      type: 'info',
      style: {
        background: COLORS.global.white_0,
        color: COLORS.global.black_0,
        fontSize: 14,
        fontFamily: 'Orbitron, sans-serif',
      }
    });

    toast(`if it doesn't open a popup, check your metamask`, {
      autoClose: 9000,
      pauseOnHover: true,
      type: 'info',
      style: {
        background: COLORS.global.white_0,
        color: COLORS.global.black_0,
        fontSize: 14,
        fontFamily: 'Orbitron, sans-serif',
      }
    });

    const { transaction, error } = await paymentByEthereum({
      ethereum,
      toAddress: ethereumConfig.preSaleTransaction.toAddress,
      ether: ethers.utils.parseEther(inputValue)._hex,
      dataContract: ethereumConfig.preSaleTransaction.dataContract,
    });

    if(transaction || error) {
      buttonHasBlocked.changeToFalse();
    }

    if(transaction) {
      toast(`${user?.user.nickname}, your ${inputValue} transaction was a success`, {
        autoClose: 5000,
        pauseOnHover: true,
        type: 'success',
        style: {
          background: COLORS.global.white_0,
          color: COLORS.global.black_0,
          fontSize: 14,
          fontFamily: 'Orbitron, sans-serif',
        }
      });
    }

    if(error) {
      toast(error.message, {
        autoClose: 5000,
        pauseOnHover: true,
        type: 'error',
        style: {
          background: COLORS.global.white_0,
          color: COLORS.global.red_0,
          fontSize: 14,
          fontFamily: 'Orbitron, sans-serif',
        }
      });
    }
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
          type="text"
          placeholder="Min 0.1 / max 1"
          onChange={(event) => handleChange({
            event,
            max: 1,
            min: 0.1
          })}
          value={inputValue}
        />
        <Button 
          type="submit" 
          text="BUY"
          loading={{
            state: buttonHasBlocked.state
          }}
        />
      </Content>
    </Container>
  );
}