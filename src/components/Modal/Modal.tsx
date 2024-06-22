import Button from '@/components/Button/Button';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import IconCheck from '/public/images/icon-check.svg';

interface ModalType {
  className?: string;
  optionType?: 'confirm' | 'actions';
  Icon?: React.ElementType;
  content?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 *
 * @param {'confirm' | 'actions'} optionType - confirm(확인버튼) | actions(예, 아니오 버튼)
 * @param {React.ComponentType} Icon - 아이콘 컴포넌트 (기본값: check아이콘)
 * @param {string} content - 텍스트 컨텐츠 (기본값: 정말 실행하시겠습니까?)
 * @param {() => void} onClose - useModal 사용 시 자동으로 추가되는 closeModal 함수
 * @param {() => void} onConfirm - 확인/예 버튼 클릭 시 실행될 함수
 * @param {() => void} onCancel - 아니오 버튼 클릭 시 실행될 함수 (optionType이 'actions'일 때 필요)
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
}: ModalType) {
  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  const handleCancel = () => {
    onClose();
    onCancel();
  };

  const ButtonsComponent =
    optionType === 'confirm' ? (
      <Button className="button_medium" onClick={handleConfirm}>
        확인
      </Button>
    ) : (
      <>
        <Button className="button_medium" onClick={handleCancel}>
          아니요
        </Button>
        <Button className="button_medium_fill" onClick={handleConfirm}>
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
          {ButtonsComponent}
        </div>
      </div>
    </ModalWrapper>
  );
}

export default Modal;
