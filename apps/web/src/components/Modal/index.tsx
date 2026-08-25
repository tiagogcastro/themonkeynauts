import { useEffect } from 'react';
import { Overlay, Content } from './styles';

export type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
};

export function Modal({ isOpen, handleClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <Content onClick={(event) => event.stopPropagation()}>
        {children}
      </Content>
    </Overlay>
  );
}
