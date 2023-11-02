import { ButtonContainer } from '@/components/ButtonContainer';
import { Button } from '@/components/ui/button';

import { popModal } from '.';
import { ModalContent, ModalHeader } from './Modal/Container';

export interface ConfirmProps {
  title: string;
  text: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function Confirm({
  title,
  text,
  onConfirm,
  onCancel,
}: ConfirmProps) {
  return (
    <ModalContent>
      <ModalHeader title={title} />
      <p>{text}</p>
      <ButtonContainer>
        <Button
          variant="outline"
          onClick={() => {
            popModal('Confirm');
            onCancel?.();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            popModal('Confirm');
            onConfirm();
          }}
        >
          Yes
        </Button>
      </ButtonContainer>
    </ModalContent>
  );
}
