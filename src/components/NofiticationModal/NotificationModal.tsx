import { NotificationModalProps } from '@/types/NotificationModal';
import { IconCloseBlack } from '@/utils/Icons';
import AlertItem from './AlertItem';

export default function NotificationModal({ data }: NotificationModalProps) {
  const { items } = data;

  return (
    <div className="w-350px h-400px rounded-10px bg-red10 border-1px py-24px px-20px">
      <div className="flex flex-col w-full h-full gap-12px">
        <div className="flex items-center justify-between">
          <p className="font-bold text-20px">알림 {data.count}개</p>
          <IconCloseBlack />
        </div>
        <div
          className={`flex flex-col gap-12px ${items.length > 2 && 'overflow-y-scroll'}`}
        >
          {items.map(({ item }) => (
            <AlertItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
