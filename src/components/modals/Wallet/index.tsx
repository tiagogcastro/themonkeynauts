import { useEffect } from 'react';
import { useMetaMask } from 'metamask-react';

import { Button } from '@/components';

import {
  Modal,
  ModalProps
} from '@tg0/react-modal';

import { RiAlertFill } from 'react-icons/ri';

import {
  Container
} from './styles';

export type ModalCustomProps = ModalProps & {
  handleClose: () => void;
};

export function Wallet({
  isOpen,
  handleClose
}: ModalCustomProps) {
  const { connect } = useMetaMask();

  async function connectMetaMask() {
    try {
      const connection = await connect();

      if(connection) {
        return handleClose();
      }
    } catch(err) {

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