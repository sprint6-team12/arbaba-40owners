import {
  formatDate,
  getWorkTime,
  getResultInfo,
} from '@/lib/utils/NotificationModal';
import { AlertItemProps } from '@/types/NotificationModal';

export default function AlertItem({ item }: { item: AlertItemProps }) {
  const { notice, result, shop } = item;
  const resultInfo = getResultInfo(result);

  if (!resultInfo) {
    return null;
  }

  const { formattedStartTime, formattedEndTime } = getWorkTime(
    notice.item.startsAt,
    notice.item.workhour
  );
  const formattedDate = formatDate(item.createdAt);

  return (
    <div
      key={item.id}
      className="flex flex-col p-4 bg-white border rounded gap-8px"
    >
      {resultInfo.icon}
      <p className="text-14px">
        {shop.item.name} ({formattedStartTime} ~ {formattedEndTime}) 공고 지원이{' '}
        {resultInfo.text}되었어요
      </p>
      <p className="text-12px text-gray40">{formattedDate}</p>
    </div>
  );
}
