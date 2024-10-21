import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  ProfileRegistrationModal,
  CancelApplicationModal,
  GuestModal,
} from '@/components/pageComponents/NoticeDetail/NoticeDetailModals';
import NOTICE_DETAIL_BUTTON_PROPS from '@/constants/noticeDetailButtonMap';
import useApplicationActions from '@/hooks/useApplicationActions';
import useModal from '@/hooks/useModal';
import { getShopNotice } from '@/lib/api/noticeAPI';
import { userState } from '@/recoil/atoms/AuthAtom';

interface NoticeDetailButtonProps {
  className: string;
  children: string;
  disabled?: boolean;
  onClick?: () => void;
}

const useNoticeDetailCardButton = (
  userType: UserType | 'author',
  noticeState: NoticeStatus,
  userApplicationData: currentUserApplication | null
): NoticeDetailButtonProps | null => {
  const { userName } = useRecoilValue(userState);
  const { openModal } = useModal();
  const [applicationData, setApplicationData] = useState(userApplicationData);
  const [buttonProps, setButtonProps] =
    useState<NoticeDetailButtonProps | null>(null);
  const router = useRouter();
  const { shop_id, notice_id } = router.query as {
    shop_id: string;
    notice_id: string;
  };

  // 지원 성공 처리
  const handleSuccess = (data: any) => {
    const { id, status, createdAt } = data.item;
    setApplicationData({ id, status, createdAt });
  };

  // 지원 및 취소 액션
  const { createApplication, cancelApplication } = useApplicationActions(
    {
      shop_id,
      notice_id,
      application_id: applicationData?.id,
    },
    handleSuccess
  );

  // 지원 버튼 클릭 핸들러
  const handleClickCreateApplicationButton = () => {
    if (userType === 'guest') return openModal('GuestModal', GuestModal);
    if (!userName)
      return openModal('ProfileRegistrationModal', ProfileRegistrationModal);
    createApplication('신청했어요');
  };

  // 취소 버튼 클릭 핸들러
  const handleClickCancelApplicationButton = () => {
    openModal('CancelApplicationModal', CancelApplicationModal, {
      onConfirm: () => cancelApplication('취소했어요'),
    });
  };

  const getButtonProps = () => {
    const handleClickButton = (() => {
      if (applicationData?.status === 'pending')
        return handleClickCancelApplicationButton;
      if (userType === 'employer') return () => router.push('/');
      if (userType === 'author')
        return () =>
          router.push(`/shops/${shop_id}/notices/${notice_id}/editNotice`);
      return handleClickCreateApplicationButton;
    })();

    if (noticeState !== 'open') return NOTICE_DETAIL_BUTTON_PROPS['closed'];
    if (userType !== 'employee')
      return {
        ...NOTICE_DETAIL_BUTTON_PROPS[userType || 'guest'],
        onClick: handleClickButton,
      };

    const statusProps =
      NOTICE_DETAIL_BUTTON_PROPS[userType][
        applicationData?.status || 'default'
      ];
    return { ...statusProps, onClick: handleClickButton };
  };

  // 버튼 프롭 설정
  useEffect(() => {
    setButtonProps(getButtonProps());
  }, [userType, noticeState, applicationData, shop_id, notice_id]);

  // 공고 상태 업데이트
  useEffect(() => {
    if (userType !== 'employee') return;
    const token = localStorage.getItem('token');
    if (!token) return;

    const updateNoticeStatus = async () => {
      const { item } = await getShopNotice({
        shop_id,
        notice_id,
      });
      if (!('currentUserApplication' in item)) return;
      setApplicationData(item.currentUserApplication?.item);
    };

    updateNoticeStatus();
  }, [userType, noticeState, shop_id, notice_id]);

  return buttonProps;
};

export default useNoticeDetailCardButton;
