import { Button } from '@/components';
import { ethereum as ethereumConfig } from '@/config/ethereum';
import { useAuth, useBoolean } from '@/hooks';
import { baseApi } from '@/services/api';
import { COLORS } from '@/theme';
import { paymentByEthereum } from '@/utils';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Container,
  Content
} from './styles';

type HandleClick = {
  max: number;
  min: number;
}

type WalletBallance = {
  player_balance: {
    bnb_amount_spent: number;
    bnb_amount_spent_max: number;
    wallet: string;
  }
}

export function PrivateSale() {
  const { player } = useAuth();
  
  const [inputValue, setInputValue] = useState('');
  const [walletBalance, setWalletBalance] = useState<WalletBallance | null>(null);
  const isButtonLoading = useBoolean(false);

  async function getWalletBalance() {
    try {
      const response = await baseApi.get<WalletBallance>('/sales/show-player-bnb-balance');

      const data = response.data;

      setWalletBalance(data)
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

  useEffect(() => {
    getWalletBalance();
  }, []);

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
    const ethereum = (window as any).ethereum;

    if(typeof ethereum === 'undefined') {
      throw new Error("Activate ethereum in your browser");
    }

    const chainId = await ethereum.request({ method: 'eth_chainId' });

    if (chainId !== ethereumConfig.network.mainNetBSC) {
      throw new Error('You are in wrong network. Please connect to BSC Mainnet network.');
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts?.[0];

    if(!account) {
      throw new Error('You have not connected your metamask account.');
    }

    if(player && player.player.wallet) {
      const walletDifferent = account !== player?.player.wallet;

      if(walletDifferent) {
        throw new Error("Active metamask wallet is not the wallet that is linked in our system.");
      }
      return; 
    }

    throw new Error("You need to link your metamask first.");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const ethereum = (window as any).ethereum;

    event.preventDefault();

    try {
      await verifyWallet();

      const validatedInput = handleClick({
        max: 3,
        min: 0.3
      });

      isButtonLoading.changeToTrue();

      if(validatedInput) {
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
    
        if(ethereumConfig.privateSaleTransaction.toAddress && ethereumConfig.privateSaleTransaction.dataContract) {
          const { transaction, error } = await paymentByEthereum({
            ethereum,
            toAddress: ethereumConfig.privateSaleTransaction.toAddress,
            ether: ethers.utils.parseEther(inputValue)._hex,
            dataContract: ethereumConfig.privateSaleTransaction.dataContract,
          });
    
          if(transaction || error) {
            isButtonLoading.changeToFalse();
          }
    
          if(transaction && player) {
            try {
              toast(`Wait for the transaction to be confirmed and saved in our database. This can take time`, {
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
  
              setInputValue('');
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
    } finally {
      isButtonLoading.changeToFalse();
    }
  }

  return (
    <Container>
      <Content onSubmit={handleSubmit}>
        <div className="texts_container">
          <p className="text">Welcome to the pre-sale of SPC, The Monkeynauts token.</p>
          <p className="text">To reduce the impact of large whales on our ecosystem, we stipulate that each account will be able to buy a minimum of 0.3 BNB and a maximum of 3 BNB, spreading the tokens among more players.</p>
          <p className="text">1 BNB is equivalent to 13.000 SPC</p>
          <p className="text">Read our whitepaper for more detailed information about our tokenomics. </p>
          <p className="text">
            You already purchased a total of <span>{walletBalance && walletBalance?.player_balance.bnb_amount_spent * 13000} SPCs</span> with your <span>{walletBalance?.player_balance.bnb_amount_spent} BNBs</span> sended.</p>
          
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
            state: isButtonLoading.state
          }}
        />
      </Content>
    </Container>
  );
}