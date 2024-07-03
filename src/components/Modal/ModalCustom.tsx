import ModalWrapper from '@/components/Modal/ModalWrapper';

interface ModalCustomProps {
  content: React.ReactNode;
  onClose?: () => void;
  autoClose?: boolean;
}

function ModalCustom({
  content,
  onClose,
  autoClose = false,
}: ModalCustomProps) {
  return (
    <ModalWrapper onClose={onClose} autoClose={autoClose}>
      {content}
    </ModalWrapper>
  );
}

export default ModalCustom;
