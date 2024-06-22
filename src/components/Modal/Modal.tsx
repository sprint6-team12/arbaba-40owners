import Button from '@/components/Button/Button';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import IconCheck from '/public/images/icon-check.svg';

/**
 *
 * @param optionType - confirm(확인버튼) | actions(예, 아니오 버튼)
 * @param Icon - 아이콘 컴포넌트, 기본값 check
 * @param content - 텍스트 컨텐츠
 *
 * @returns
 */
function Modal({
  className,
  optionType,
  Icon = IconCheck,
  content = '정말 실행하시겠습니까?',
  onClose = () => {},
  onConfirm = () => {},
  onCancel = () => {},
}: {
  className?: string;
  optionType?: 'confirm' | 'actions';
  Icon?: React.ElementType;
  content?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  const handleCancel = () => {
    onClose();
    onCancel();
  };

  const ButtonsComponent = () =>
    optionType === 'confirm' ? (
      <Button className="button_medium" onClick={handleConfirm}>
        확인
      </Button>
    ) : (
      <>
        <Button className="button_medium" onClick={handleCancel}>
          아니요
        </Button>
        <Button className="button_medium_active" onClick={handleConfirm}>
          예
        </Button>
      </>
    );

  return (
    <ModalWrapper>
      <div
        className={`flex-center flex-col min-w-[298px] min-h-183px rounded-12px bg-white p-24px ${className}`}
      >
        <Icon className="mx-auto mb-16px" />
        <p className="text-center">{content}</p>
        <div className="flex-center gap-8px mt-24px [&>button]:w-80px [&>button]:p-0">
          <ButtonsComponent />
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Modal;
