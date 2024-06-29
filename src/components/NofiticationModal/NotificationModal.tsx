import { NotificationModalProps } from '@/types/NotificationModal';
import { IconCloseBlack } from '@/utils/Icons';
import AlertItem from './AlertItem';

export default function NotificationModal({ data, onClose }: NotificationModalProps) {
  const items = data?.items || [];
  const filteredItem = items.filter(({ item }) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const itemDate = new Date(item.createdAt);

    return !item.read || (item.read && itemDate > oneWeekAgo);
  });

  return (
    <div className="w-350px h-400px rounded-10px bg-red10 border-1px py-24px px-20px">
      <div className="flex flex-col w-full h-full gap-12px">
        <div className="flex items-center justify-between">
          <p className="font-bold text-20px">알림 {filteredItem.length}개</p>
          <IconCloseBlack onClick={onClose} className="cursor-pointer"/>
        </div>
        <div
          className={`flex flex-col gap-12px ${filteredItem.length > 2 && 'overflow-y-scroll'}`}
        >
          {filteredItem.map(({ item }) => (
            <AlertItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
