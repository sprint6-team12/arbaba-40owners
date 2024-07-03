import router from 'next/router';
import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import {
  CancelApplicationModal,
  ProfileRegistrationModal,
} from '@/components/pageComponents/NoticeDetail/NoticeDetailModals';
import useModal from '@/hooks/useModal';
import usePopup from '@/hooks/usePopup';
import applicationAPI from '@/lib/api/applicationAPI';
import noticeAPI from '@/lib/api/noticeAPI';

const NOTICE_DETAIL_BUTTON_PROPS = {
  open: {
    className: 'button_large_fill',
    disabled: false,
    children: '신청하기',
  },
  closed: {
    className: 'button_large_fill',
    disabled: true,
    children: '신청불가',
  },
  pending: {
    className: 'button_large',
    disabled: false,
    children: '취소하기',
  },
  author: {
    className: 'button_large',
    disabled: false,
    children: '공고 편집하기',
  },
  employer: {
    className: 'button_large',
    disabled: false,
    children: '목록으로 돌아가기',
  },
};

const createNewApplication = async (shopId: string, noticeId: string) => {
  const { item } = await applicationAPI.postShopApply({
    shop_id: shopId,
    notice_id: noticeId,
  });
  return item;
};

const updateApplicationStatus = async (url: string, status: string) => {
  const { item } = await applicationAPI.putShopApply(url, status);
  return item;
};

interface NoticeDetailCardButtonProps {
  userType: UserType | 'author';
  noticeState: NoticeStatus;
  userApplicationData: currentUserApplication | null;
  links: Link[];
}

function NoticeDetailCardButton({
  userType,
  noticeState,
  userApplicationData,
  links,
}: NoticeDetailCardButtonProps) {
  const { openModal } = useModal();
  const { openPopup } = usePopup();
  const [applicationData, setApplicationData] = useState(userApplicationData);
  const [buttonProps, setButtonProps] = useState<{
    className: string;
    disabled: boolean;
    children: string;
    onClick?: () => void;
  } | null>(null);

  const shopId = links[0]['href'].split('/')[5];
  const noticeId = links[0]['href'].split('/')[7];
  const url =
    `shops/${shopId}/notices/${noticeId}` +
    (applicationData ? `/applications/${applicationData.id}` : '');

  const handleSuccessfulRequest = (
    item: currentUserApplication | Application,
    popupText: string
  ) => {
    const { id, status, createdAt } = item;
    setApplicationData({
      id: id,
      status: status,
      createdAt: createdAt,
    });
    openPopup('신청완료팝업', popupText, 3000);
  };

  const handleFailedRequest = (error: Error) => {
    const message = error.message || '실패했어요';
    openPopup('지원상태실패팝업', message, 3000);
  };

  const createApplication = async () => {
    try {
      let item;
      if (!applicationData) {
        item = await createNewApplication(shopId, noticeId);
      } else if (url) {
        item = await updateApplicationStatus(url, 'pending');
      }

      if (!item) return;

      handleSuccessfulRequest(item, '신청했어요');
    } catch (error) {
      handleFailedRequest(error as Error);
    }
  };

  const cancelApplication = async () => {
    try {
      if (applicationData && url) {
        const item = await updateApplicationStatus(url, 'canceled');
        handleSuccessfulRequest(item, '취소했어요');
      }
    } catch (error) {
      handleFailedRequest(error as Error);
    }
  };

  const handleClickCreateApplicationButton = () => {
    if (userType === 'guest')
      return openModal('ProfileRegistrationModal', ProfileRegistrationModal);

    createApplication();
  };

  const handleClickCancelApplicationButton = () => {
    openModal('CancelApplicationModal', CancelApplicationModal, {
      onConfirm: cancelApplication,
    });
  };

  // 상태에따라 버튼 세팅하는 useEffect
  useEffect(() => {
    const status: keyof typeof NOTICE_DETAIL_BUTTON_PROPS = (() => {
      if (applicationData?.status === 'pending') return 'pending';
      if (noticeState !== 'open') return 'closed';
      if (userType === 'author') return 'author';
      if (userType === 'employer') return 'employer';
      return 'open';
    })();

    const handleClickButton = (() => {
      if (status === 'pending') return handleClickCancelApplicationButton;
      if (status === 'employer') return () => router.push('/');
      if (status === 'author') return () => router.push('/edit');
      return handleClickCreateApplicationButton;
    })();

    return setButtonProps({
      ...NOTICE_DETAIL_BUTTON_PROPS[status],
      onClick: handleClickButton,
    });
  }, [userType, noticeState, applicationData, shopId, noticeId]);

  // employee case 일때 현재 유저의 지원상태로 업데이트해주는 useEffect
  useEffect(() => {
    if (userType !== 'employee') return;

    const updateNoticeStatus = async () => {
      const { item } = await noticeAPI.getShopNotice({
        shop_id: shopId,
        notice_id: noticeId,
        token: localStorage.getItem('token') || '',
      });
      if (!('currentUserApplication' in item)) return;
      setApplicationData(item.currentUserApplication?.item);
    };

    updateNoticeStatus();
  }, [userType, noticeState, shopId, noticeId]);

  if (!buttonProps) return null;

  return <Button {...buttonProps} />;
}

export default NoticeDetailCardButton;
