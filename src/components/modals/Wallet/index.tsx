import { RiAlertFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

import {
  Modal,
  ModalProps
} from '@tg0/react-modal';

import { api } from '@/services/api';

import { Button } from '@/components';

import { COLORS } from '@/theme';

import {
  Container
} from './styles';
import { useAuth } from '@/hooks';
import { connectWallet } from '@/utils/wallet';
import { ApiError } from '@/utils/apiError';

export type ModalCustomProps = ModalProps & {
  handleClose: () => void;
};

export function Wallet({
  isOpen,
  handleClose
}: ModalCustomProps) {
  const { getPlayer } = useAuth();

  async function connectMetaMask() {
    try {
      const account = await connectWallet();
  
      await api.wallet.geral.saveWallet({
        wallet: account
      });

      toast(`Success, you have connected your metamask account in our app.`, {
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

      await getPlayer();

      handleClose();
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
    }
  }

  return (
    <Modal 
      isOpen={isOpen}
      containerTag={{
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      }}
    >
      <Container>
        <div className="cubic cubic1" />
        <div className="cubic cubic2" />
        <div className="cubic cubic3" />
        <div className="cubic cubic4" />
        <RiAlertFill />
        <div className="texts_container">
          <p className="text">This action is irreversible!</p>
          <p className="text">Once you have linked the wallet, you will not be able to modify it in the future.</p>
          <p className="text">Before linking your wallet to your account, make sure the active wallet is correct.</p>
        </div>
        <div className="buttons">
          <Button 
            text="Confirm"
            onClick={connectMetaMask}
          />
          <Button 
            text="Cancel"
            onClick={handleClose}
          />
        </div>
      </Container>
    </Modal>
  )
}