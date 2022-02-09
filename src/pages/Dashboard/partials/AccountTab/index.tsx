import { FaReact } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import { useMetaMask } from 'metamask-react';
import { ethers } from 'ethers';
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

export type HandleChange = {
  event: React.ChangeEvent<HTMLInputElement>;
}

export function AccountTab() {
  const { user, signOut } = useAuth();
  const { ethereum } = useMetaMask();
  
  const walletModalIsOpen = useBoolean();
  const depositButtonHasBlocked = useBoolean(false);
  const withdrawButtonHasBlocked = useBoolean(false);

  const [inputValue, setInputValue] = useState('');

  function handleChangeWithdrawDeposit({
    event,
  }: HandleChange) {
    let value: string | number = event.target.value.replace(/[^0-9.]/g, '');

    setInputValue(String(value));
  }

  function handleSubmitWithdraw(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  async function handleSubmitDeposit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();

    if(!inputValue) {
      return toast('You need to enter the number to continue the deposit.', {
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

    depositButtonHasBlocked.changeToTrue();
    
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

    try {
      const { transaction, error } = await paymentByEthereum({
        ethereum,
        toAddress: ethereumConfig.preSaleTransaction.toAddress,
        ether: ethers.utils.parseEther(inputValue)._hex,
        dataContract: ethereumConfig.preSaleTransaction.dataContract,
      });
  
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

      if(transaction) {
        toast(`${user?.user.nickname}, your ${inputValue} deposit was a success`, {
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
    } catch(err: any) {
      toast(err.message, {
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
      depositButtonHasBlocked.changeToFalse();
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
                <strong title={user?.user.id} className="info_id">{user?.user.id_short}</strong>
              </UniqueInfo>
              <UniqueInfo>
                <span>Nickname</span>
                <strong>{user?.user.nickname}</strong>
              </UniqueInfo>
              <UniqueInfo>
                <span>E-mail</span>
                <strong>{user?.user.email}</strong>
              </UniqueInfo>
            </div>
            {!user?.user.wallet && (
              <div className="info_separator">
                <UniqueInfo>
                  <span>Wallet</span>
                  <Button 
                    className="wallet_button"
                    text="Link"
                    onClick={walletModalIsOpen.changeToTrue}  
                    />
                </UniqueInfo>
              </div>
            )}
          </Info>
        </Details>
        <SecondaryDetails>
          <ResourcesDetail>
            <InfoTitle_1 className="resources_title">Resources</InfoTitle_1>

            <Resources>
              <Resource>
                <img src={iron_ore} />
                <strong>0</strong>
              </Resource>
              <Resource>
                <img src={gold_ore} />
                <strong>0</strong>
              </Resource>
              <Resource>
                <img src={bronze_ore} />
                <strong>0</strong>
              </Resource>
              <Resource>
                <img src={scrap} />
                <strong>0</strong>
              </Resource>
              <Resource>
                <FaReact />
                <strong>0</strong>
              </Resource>
              <Resource>
                <img src={spc} />
                <strong>0</strong>
              </Resource>
            </Resources>
          </ResourcesDetail>
          <Spc>
            <InfoTitle_1 className="spc_title">WITHDRAW/DEPOSIT SPC</InfoTitle_1>
            <input 
              onChange={(event) => handleChangeWithdrawDeposit({
                event
              })}
              value={inputValue}
              placeholder="Withdraw/desposit spc" 
              type="text" 
            />
            <Button 
              type="submit" 
              text="Withdraw"
              loading={{
                state: withdrawButtonHasBlocked.state
              }}
              onClick={handleSubmitWithdraw}
            />
            <Button 
              type="submit" 
              text="Deposit"
              loading={{
                state: depositButtonHasBlocked.state
              }}
              onClick={handleSubmitDeposit}
            />
          </Spc>
        </SecondaryDetails>
      </Content>
      <Wallet 
        isOpen={walletModalIsOpen.state && !user?.user.wallet} 
        handleClose={walletModalIsOpen.changeToFalse}
      />
    </Container>
  );
}