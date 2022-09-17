import { FaReact } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
// import { useState } from 'react';
// import { ethers } from 'ethers';
import { toast } from 'react-toastify';

import { useAuth, useBoolean } from '@/hooks';
import { paymentByEthereum } from '@/utils';

import { Wallet } from '@/components/modals/Wallet';
import { Button } from '@/components';

import { ethereum as ethereumConfig } from '@/config/ethereum';

import bronze_ore from '@/assets/images/bronze_ore.png';
import iron_ore from '@/assets/images/iron_ore.png';
import gold_ore from '@/assets/images/gold_ore.png';
import scrap from '@/assets/images/scrap.png';
import spc from '@/assets/images/spc.png';

import { COLORS } from '@/theme';

import {
  Container,
  Content,
  InfoTitle_1,
  Details,
  Info,
  UniqueInfo,

  SecondaryDetails,
  ResourcesDetail,
  Resources,
  Resource,

  Spc,
} from './styles';
import { ApiError } from '@/utils/apiError';
import { baseApi } from '@/services/api';
import { verifyWallet } from '@/utils/wallet';
import { useState } from 'react';
import { ethers } from 'ethers';

export type HandleChange = {
  event: React.ChangeEvent<HTMLInputElement>;
}

export function AccountTab() {
  const { player, signOut } = useAuth();

  const withdrawDepositPermission = ['admin', 'owner'];
  const withdrawDepositShow = player && withdrawDepositPermission.includes(player?.player.role.toLowerCase());
  
  const walletModalIsOpen = useBoolean();
  const depositButtonHasBlocked = useBoolean(false);
  const withdrawButtonHasBlocked = useBoolean(false);

  const [inputValue, setInputValue] = useState('');

  function handleChangeInput({
    event,
  }: HandleChange) {
    let value: string | number = event.target.value.replace(/[^0-9.]/g, '');

    setInputValue(String(value));
  }

  function verifyIfHasInputValue(value: any, message: string) {
    if(!value) {
      toast(message, {
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

      return false;
    }
    return true;
  }

  function commonToast() {
    toast(`${player?.player.nickname}, please wait for the metamask window to open.`, {
      autoClose: 5000,
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
      autoClose: 6000,
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

  async function handleSubmitWithdraw(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();

    const verifyHasInputValue = verifyIfHasInputValue(inputValue, 'You need to enter the number to continue the withdraw.');
    if(verifyHasInputValue) {

      withdrawButtonHasBlocked.changeToTrue();

      try {
        await baseApi.post('/players/withdraw-tokens', {
          amount: inputValue
        });
        
        toast(`${player?.player.nickname}, your ${inputValue} withdraw was a success`, {
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
      } catch (error: any) {
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
        });
      } finally {
        withdrawButtonHasBlocked.changeToFalse();
      }
    }

  }

  async function handleSubmitDeposit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();

    const verifyHasInputValue = verifyIfHasInputValue(inputValue, 'You need to enter the number to continue the deposit.');
    if(verifyHasInputValue) {
      commonToast();

      depositButtonHasBlocked.changeToTrue();

      try {
        if(player) {
          await verifyWallet(player.player);
        }

        const { transaction, error } = await paymentByEthereum({
          ethereum: (window as any).ethereum,
          toAddress: ethereumConfig.deposit.toAddress,
          ether: ethers.utils.parseEther(inputValue)._hex,
          dataContract: ethereumConfig.deposit.contract.SPC,
        });
    
        if(error) {
          depositButtonHasBlocked.changeToFalse();

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
        }

        if(transaction) {
          toast(`Wait for us to confirm the deposit in our database`, {
            autoClose: 5000,
            pauseOnHover: true,
            type: 'info',
            style: {
              background: COLORS.global.white_0,
              color: COLORS.global.black_0,
              fontSize: 14,
              fontFamily: 'Orbitron, sans-serif',
            }
          });
          try {
            await baseApi.post('/players/deposit-tokens', {
              txHash: transaction
            });
            
            toast(`${player?.player.nickname}, your ${inputValue} deposit was a success`, {
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
          } catch (error: any) {
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
            });
          }

          depositButtonHasBlocked.changeToFalse();
        }

      } catch(error: any) {
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
        });

        depositButtonHasBlocked.changeToFalse();
      }
    }
  }

  return (
    <Container>
      <Content>
        <Details>
          <header className="detail_header">
            <InfoTitle_1 className="details_title">Details</InfoTitle_1>
            <button 
              className="signout_button"
              onClick={signOut}
            >
              <FiLogOut /> Signout
            </button>
          </header>

          <Info>
            <div className="info_separator">
              <UniqueInfo>
                <span>Your ID</span>
                <strong title={player?.player.id} className="info_id">{player?.player.id_short}</strong>
              </UniqueInfo>
              <UniqueInfo>
                <span>Nickname</span>
                <strong>{player?.player.nickname}</strong>
              </UniqueInfo>
              <UniqueInfo>
                <span>E-mail</span>
                <strong>{player?.player.email}</strong>
              </UniqueInfo>
            </div>
              <div className="info_separator">
                <UniqueInfo>
                  <span>Wallet</span>
                  {!player?.player.wallet ? (  
                    <Button 
                      className="wallet_button"
                      text="Link"
                      onClick={walletModalIsOpen.changeToTrue}  
                      />
                  ) : (
                    <strong
                      className="wallet"
                    >{player.player.wallet}</strong>
                  )}
                </UniqueInfo>
              </div>
          </Info>
        </Details>
        <SecondaryDetails>
          <ResourcesDetail>
            <InfoTitle_1 className="resources_title">Resources</InfoTitle_1>

            <Resources>
              <Resource>
                <img src={iron_ore} />
                <strong>{player?.resource.iron}</strong>
              </Resource>
              <Resource>
                <img src={gold_ore} />
                <strong>{player?.resource.gold}</strong>
              </Resource>
              <Resource>
                <img src={bronze_ore} />
                <strong>{player?.resource.copper}</strong>
              </Resource>
              <Resource>
                <img src={scrap} />
                <strong>{player?.resource.scrap}</strong>
              </Resource>
              <Resource>
                <FaReact />
                <strong>{player?.resource.science}</strong>
              </Resource>
              <Resource>
                <img src={spc} />
                <strong>{player?.resource.spc}</strong>
              </Resource>
            </Resources>
          </ResourcesDetail>
          {withdrawDepositShow && (
            <Spc>
              <InfoTitle_1 className="spc_title">WITHDRAW/DEPOSIT SPC</InfoTitle_1>
              <input 
                onChange={(event) => handleChangeInput({
                  event
                })}
                value={inputValue}
                placeholder="Withdraw/desposit spc" 
                type="text" 
              />
              <Button 
                type="submit" 
                text="Withdraw"
                disabled={withdrawButtonHasBlocked.state || depositButtonHasBlocked.state}
                loading={{
                  state: withdrawButtonHasBlocked.state
                }}
                onClick={handleSubmitWithdraw}
              />
              {/* <Button 
                type="submit" 
                text="Deposit"
                disabled={withdrawButtonHasBlocked.state || depositButtonHasBlocked.state}
                loading={{
                  state: depositButtonHasBlocked.state
                }}
                onClick={handleSubmitDeposit}
              /> */}
            </Spc>
          )}
        </SecondaryDetails>
      </Content>
      <Wallet 
        isOpen={walletModalIsOpen.state && !player?.player.wallet} 
        handleClose={walletModalIsOpen.changeToFalse}
      />
    </Container>
  );
}