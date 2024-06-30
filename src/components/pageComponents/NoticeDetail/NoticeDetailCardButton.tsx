import router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Button from '@/components/Button/Button';
import {
  CancelApplicationModal,
  ProfileRegistrationModal,
} from '@/components/pageComponents/NoticeDetail/NoticeDetailModals';
import useModal from '@/hooks/useModal';
import usePopup from '@/hooks/usePopup';
import useTestLink from '@/hooks/useTestLink';
import { userState } from '@/recoil/atoms/AuthAtom';

const NOTICE_DETAIL_BUTTON_PROPS = {
  open: {
    className: 'button_large_fill',
    disabled: false,
    children: '신청하기',
  },
  pending: {
    className: 'button_large',
    disabled: false,
    children: '취소하기',
  },
  closed: {
    className: 'button_large_fill',
    disabled: true,
    children: '신청불가',
  },
  employer: {
    className: 'button_large',
    disabled: false,
    children: '공고 편집하기',
  },
};

interface NoticeDetailCardButtonProps {
  noticeState: NoticeStatus;
  userApplicationState: ApplicationStatus | null;
  links: Link[];
}

// todo 중복지원 막기
// todo employer case - 공고상세페이지에서 리로드시 하이드레이션 오류
function NoticeDetailCardButton({
  noticeState,
  userApplicationState,
  links,
}: NoticeDetailCardButtonProps) {
  const { openModal } = useModal();
  const { openPopup } = usePopup();
  const { type } = useRecoilValue(userState);
  const [applicationState, setApplicationState] =
    useState(userApplicationState);
  const [apiLinks, setApiLinks] = useState(links);
  const apiRequestList = useTestLink(apiLinks);

  const handleCreateApplication = async () => {
    if (type === 'guest')
      return openModal('ProfileRegistrationModal', ProfileRegistrationModal);

    try {
      const { item, links } = await apiRequestList.application.create();
      setApiLinks((prevLinks) => [...prevLinks, ...links]);
      setApplicationState(item.status);
      openPopup('ProfileRegistrationModal', '신청했어요', 3000);
    } catch (error) {
      openPopup('CancelApplicationModal', '신청 실패', 3000);
    }
  };

  const handleCancelApplication = async () => {
    try {
      const { item } = await apiRequestList.application.update({
        data: { status: 'canceled' },
      });

      setApplicationState(item.status);
      openPopup('CancelApplicationModal', '취소했어요', 3000);
    } catch (error) {
      openPopup('CancelApplicationModal', '취소 실패', 3000);
    }
  };

  let buttonProps;

  switch (true) {
    case noticeState === 'closed' || noticeState === 'passed':
      buttonProps = {
        ...NOTICE_DETAIL_BUTTON_PROPS.closed,
      };
      break;
    case type === 'employee' && applicationState === 'pending':
      buttonProps = {
        ...NOTICE_DETAIL_BUTTON_PROPS.pending,
        onClick: () => {
          openModal('CancelApplicationModal', CancelApplicationModal, {
            onConfirm: handleCancelApplication,
          });
        },
      };
      break;
    case type === 'employer':
      buttonProps = {
        ...NOTICE_DETAIL_BUTTON_PROPS.employer,
        onClick: () => {
          router.push('/edit');
        },
      };
      break;
    default:
      buttonProps = {
        ...NOTICE_DETAIL_BUTTON_PROPS.open,
        onClick: handleCreateApplication,
      };
  }

  // employee case 일때 현재 유저의 지원상태로 업데이트해주는 useEffect
  useEffect(() => {
    if (type !== 'employee') return;

    const updateNoticeStatus = async () => {
      const { item, links } = await apiRequestList.notice.self();
      setApiLinks(links);
      setApplicationState(item?.currentUserApplication?.item?.status);

      if (item?.currentUserApplication?.item?.status === 'pending') {
        const { item, links } = await apiRequestList.application.create();
        setApiLinks((prevLinks) => [...prevLinks, ...links]);
        setApplicationState(item.status);
      }
    };

    updateNoticeStatus();
  }, [type]);

  return <Button {...buttonProps} />;
}

export default NoticeDetailCardButton;
