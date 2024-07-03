import ModalPrimary from '@/components/Modal/ModalPrimary';

export default function ConfirmModal({ ...rest }) {
  return <ModalPrimary optionType="confirm" {...rest} />;
}
