import { Button } from '@/components';
import { PrivateSaleSuccess } from '@/components/modals/PrivateSaleSuccess';
import { ethereum as ethereumConfig } from '@/config/ethereum';
import { privateSale } from '@/config/privateSale';
import { useAuth, useBoolean } from '@/hooks';
import { baseApi } from '@/services/api';
import { COLORS } from '@/theme';
import { paymentByEthereum } from '@/utils';
import { ApiError } from '@/utils/apiError';
import { verifyWallet } from '@/utils/wallet';
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
    bnbAmount_spent: number;
    bnbAmount_spent_max: number;
    wallet: string;
  }
}

export function PrivateSale() {
  const { player } = useAuth();
  
  const [inputValue, setInputValue] = useState('');
  const [walletBalance, setWalletBalance] = useState<WalletBallance | null>(null);
  const isButtonLoading = useBoolean(false);

  const privateSaleSucessModal = useBoolean();

  async function getWalletBalance() {
    const response = await baseApi.get<WalletBallance>('/private-sales/show-player-bnb-balance');

    const data = response.data;

    setWalletBalance(data)
  }

  useEffect(() => {
    getWalletBalance();
  }, []);

  function handleChangeInput({
    max,
    min,
  }: HandleClick) {
    let value: string | number = inputValue.replace(/[^0-9\.]/g, '');

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const ethereum = (window as any).ethereum;

    event.preventDefault();

    try {
      const validatedInput = handleChangeInput({
        max: 3,
        min: 0.3
      });

      isButtonLoading.changeToTrue();

      if(validatedInput) {
        if(player) {
          await verifyWallet(player.player);
        }

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
    
        if(ethereumConfig.privateSaleTransaction.toAddress && ethereumConfig.privateSaleTransaction.contract.BNB) {
          const { transaction, error } = await paymentByEthereum({
            ethereum,
            toAddress: ethereumConfig.privateSaleTransaction.toAddress,
            ether: ethers.utils.parseEther(inputValue)._hex,
            dataContract: ethereumConfig.privateSaleTransaction.contract.BNB,
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
  
              await baseApi.post('/private-sales/create-private-sale', {
                bnbAmount: Number(inputValue),
                txHash: transaction,
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

              privateSaleSucessModal.changeToTrue();
            } catch(error: any) {
              console.log(error);
              const apiErrorResponse = ApiError(error);

              apiErrorResponse.messages.map(message => {
                return toast(message, {
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
              })
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
      // wallet error
      return toast(error.message, {
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
        {new Date() > new Date(privateSale.openOnDate) ? (
          <>
            <div className="texts_container_private">
              <p className="text">Welcome to the pre-sale of SPC, The Monkeynauts token.</p>
              <p className="text">To reduce the impact of large whales on our ecosystem, we stipulate that each account will be able to buy a minimum of 0.3 BNB and a maximum of 3 BNB, spreading the tokens among more players.</p>
              <p className="text">1 BNB is equivalent to 13.000 SPC</p>
              <p className="text">Read our whitepaper for more detailed information about our tokenomics. </p>
              {walletBalance?.player_balance.bnbAmount_spent && (
                <p className="text">
                You already purchased a total of <span>{walletBalance && walletBalance?.player_balance.bnbAmount_spent * 13000} SPCs</span> with your <span>{walletBalance?.player_balance.bnbAmount_spent} BNBs</span> sended.</p>
              )}
              
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
          </>
        ) : (
          <div className="texts_container_private">
            <p className="text">Private sale will be live on {privateSale.openOnDate}</p>
          </div>
        )}
      </Content>
      <PrivateSaleSuccess
        isOpen={privateSaleSucessModal.state} 
        handleClose={privateSaleSucessModal.changeToFalse} 
      />
    </Container>
  );
}