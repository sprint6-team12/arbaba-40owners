type Status = 'pending' | 'accepted' | 'rejected';

interface StatusBadgeProps {
  status: Status;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const statusMap = {
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
  };

  const { backgroundColor, textColor, text } = statusMap[status];

  return (
    <span
      className={`px-10px py-6px rounded-20px font-bold text-12px tablet:text-14px pc:text-14px inline-flex justify-center items-center ${backgroundColor} ${textColor}`}
    >
      {text}
    </span>
  );
}

export default StatusBadge;
