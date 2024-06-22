import {
  formatDate,
  getEllipseIcon,
  getWorkTime,
  getResultText,
} from '@/lib/utils/NotificationModal';
import { AlertItemProps } from '@/types/NotificationModal';

export default function AlertItem({ item }: { item: AlertItemProps }) {
  const { notice, result, shop } = item;

  const { formattedStartTime, formattedEndTime } = getWorkTime(
    notice.item.startsAt,
    notice.item.workhour
  );

  const ellipseIcon = getEllipseIcon(result);
  const resultText = getResultText(result);
  const formattedDate = formatDate(item.createdAt);

  return (
    <div
      key={item.id}
      className="flex flex-col p-4 bg-white border rounded gap-8px"
    >
      {ellipseIcon}
      <p className="text-14px">
        {shop.item.name} ({formattedStartTime} ~ {formattedEndTime}) 공고 지원이{' '}
        {resultText}되었어요
      </p>
      <p className="text-12px text-gray40">{formattedDate}</p>
    </div>
  );
}
