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
import { baseApi } from '@/services/api';

type HandleClick = {
  max: number;
  min: number;
}

export function PrivateSale() {
  const { player } = useAuth();
  const { ethereum, connect } = useMetaMask()
  
  const [inputValue, setInputValue] = useState('');
  const buttonHasBlocked = useBoolean(false);

  function handleClick({
    max,
    min,
  }: HandleClick) {
    let value: string | number = inputValue.replace(/[^0-9.]/g, '');

    setInputValue(String(value));

    if(!inputValue || Number(value) < min || Number(value) > max || value.length > 7) {
      toast(`You can only put numbers between ${min} and ${max}`, {
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

      return false
    }
    

    return true;
  }

  async function verifyWallet() {
    const connection = await connect();

    if(player?.player.wallet) {
      const foundWalletDifferent = connection?.every(where => where !== player?.player.wallet);

      if(foundWalletDifferent) {
        throw new Error("Active metamask wallet is not the wallet that is linked in our system.");
      }
      return; 
    }

    throw new Error("You need to link your metamask first.");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await verifyWallet();

      const validatedInput = handleClick({
        max: 3,
        min: 0.3
      })
  
      if(!validatedInput) {
        return toast(`Please, enter a value on input`, {
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
      }
  
      buttonHasBlocked.changeToTrue();
  
      toast(`${player?.player.nickname}, please wait for the metamask window to open.`, {
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

      console.log(
        ethereumConfig.privateSaleTransaction.toAddress,  
        ethereumConfig.privateSaleTransaction.dataContract
        )
  
      if(ethereumConfig.privateSaleTransaction.toAddress && ethereumConfig.privateSaleTransaction.dataContract) {
        const { transaction, error } = await paymentByEthereum({
          ethereum,
          toAddress: ethereumConfig.privateSaleTransaction.toAddress,
          ether: ethers.utils.parseEther(inputValue)._hex,
          dataContract: ethereumConfig.privateSaleTransaction.dataContract,
        });
  
        if(transaction || error) {
          buttonHasBlocked.changeToFalse();
        }
  
        if(transaction && player) {
          try {
            await baseApi.post('/sales/create-private-sale', {
              player_id: player.player.id,
              wallet: player.player.wallet,
              bnb_amount: Number(inputValue),
              tx_hash: transaction,
            })
  
            toast(`${player?.player.nickname}, your ${inputValue} transaction was a success`, {
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
          } catch {
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
    } catch (error: any) {
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
          <p className="text">To reduce the impact of large whales on our ecosystem, we stipulate that each account will be able to buy a minimum of 0.3 BNB and a maximum of 3 BNB, spreading the tokens among more players.</p>
          <p className="text">1 BNB is equivalent to 39.000 SPC</p>
          <p className="text">Read our whitepaper for more detailed information about our tokenomics. </p>

        </div>
        <input 
          type="text"
          placeholder="Min 0.3 / max 3"
          onChange={(event) => setInputValue(event.target.value)}
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