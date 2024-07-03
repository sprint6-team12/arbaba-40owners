import Button from '@/components/Button/Button';
import useNoticeDetailCardButton from '@/hooks/useNoticeDetailCardButton';

interface NoticeDetailCardButtonProps {
  userType: UserType | 'author';
  noticeState: NoticeStatus;
  userApplicationData: currentUserApplication | null;
}

function NoticeDetailCardButton({
  userType,
  noticeState,
  userApplicationData,
}: NoticeDetailCardButtonProps) {
  const buttonProps = useNoticeDetailCardButton(
    userType,
    noticeState,
    userApplicationData
  );

  if (!buttonProps) return null;

  return <Button {...buttonProps} />;
}

export default NoticeDetailCardButton;
