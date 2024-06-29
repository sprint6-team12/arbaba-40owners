import { STATUS_MAP } from '@/constants/statusMap';

type Status = 'pending' | 'accepted' | 'rejected' | 'canceled';
interface StatusBadgeProps {
  status: Status;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const { backgroundColor, textColor, text } = STATUS_MAP[status];

  return (
    <span
      className={`px-10px py-6px rounded-20px tablet:font-bold pc:font-bold text-12px tablet:text-14px pc:text-14px inline-flex justify-center items-center ${backgroundColor} ${textColor}`}
    >
      {text}
    </span>
  );
}

export default StatusBadge;
