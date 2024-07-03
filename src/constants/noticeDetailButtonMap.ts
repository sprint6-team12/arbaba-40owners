const NOTICE_DETAIL_BUTTON_PROPS = {
  closed: {
    className: 'button_large_disApply',
    disabled: true,
    children: '신청불가',
  },
  author: {
    className: 'button_large',
    children: '공고 편집하기',
  },
  employer: {
    className: 'button_large',
    children: '목록으로 돌아가기',
  },
  employee: {
    default: {
      className: 'button_large_fill',
      children: '신청하기',
    },
    pending: {
      className: 'button_large',
      children: '취소하기',
    },
    canceled: {
      className: 'button_large_disApply',
      disabled: true,
      children: '취소됨',
    },
    rejected: {
      className: 'button_large_disApply',
      disabled: true,
      children: '거절됨',
    },
    accepted: {
      className: 'button_large_disApply',
      disabled: true,
      children: '승인됨',
    },
  },
  guest: {
    className: 'button_large_fill',
    children: '신청하기',
  },
};

export default NOTICE_DETAIL_BUTTON_PROPS;
