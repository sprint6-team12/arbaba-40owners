import FormatUtils from '@/lib/utils/FormatUtils';
import { getResultInfo } from '@/lib/utils/NotificationModal';
import { AlertItemProps } from '@/types/NotificationModal';

export default function AlertItem({ item }: { item: AlertItemProps }) {
  const { notice, result, shop } = item;
  const resultInfo = getResultInfo(result);

  if (!resultInfo) {
    return null;
  }

  const { formattedStartDate, formattedStartTime, formattedEndTime } =
    FormatUtils.workSchedule(notice.item.startsAt, notice.item.workhour);
  const formattedDate = FormatUtils.distanceToNow(item.createdAt);

  return (
    <div
      key={item.id}
      className="flex flex-col p-4 bg-white border rounded gap-8px"
    >
      {resultInfo.icon}
      <p className="text-14px">
        {shop.item.name} ({formattedStartDate} {formattedStartTime} ~{' '}
        {formattedEndTime}) 공고 지원이
        {resultInfo.text}되었어요
      </p>
      <p className="text-12px text-gray40">{formattedDate}</p>
    </div>
  );
}
