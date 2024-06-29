export const STATUS_MAP = {
  pending: {
    backgroundColor: 'bg-green10',
    textColor: 'text-green20',
    text: '대기중',
  },
  accepted: {
    backgroundColor: 'bg-blue10',
    textColor: 'text-blue20',
    text: '승인 완료',
  },
  rejected: {
    backgroundColor: 'bg-red10',
    textColor: 'text-red40',
    text: '거절',
  },
  canceled: {
    backgroundColor: 'bg-gray10',
    textColor: 'text-gray40',
    text: '취소',
  },
} as const;
