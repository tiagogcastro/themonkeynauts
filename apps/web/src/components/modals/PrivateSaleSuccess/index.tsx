import {
  Modal,
  ModalProps
} from '@tg0/react-modal';

import { Button } from '@/components';

import {
  Container
} from './styles';
import { BsCheckCircleFill } from 'react-icons/bs';

export type ModalCustomProps = ModalProps & {
  handleClose: () => void;
};

export function PrivateSaleSuccess({
  isOpen,
  handleClose,
  ...rest
}: ModalCustomProps) {

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
      {...rest}
    >
      <Container>
        <div className="cubic cubic1" />
        <div className="cubic cubic2" />
        <div className="cubic cubic3" />
        <div className="cubic cubic4" />

        <BsCheckCircleFill />

        <div className="texts_container">
          <p className="text">Hello Commander!</p>
          <p className="text">Thank you for your trust by purchasing our Private Sale.</p>
          <p className="text">If you want to join our telegram private group, access click on the button above and come talk to us directly</p>
          <p className="text">
            <a target="_blank" href="https://t.me/+FPF73R2flDdmMGUx">JOIN</a>
          </p>
        </div>

        <div className="buttons">
          <Button 
            text="Close"
            onClick={handleClose}
          />
        </div>
      </Container>
    </Modal>
  )
}