import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atoms/AuthAtom';
import { NotificationProps } from '@/types/NotificationModal';
import NotificationModal from '@/components/NofiticationModal/NotificationModal';
import alertAPI from '@/utils/api/alertAPI';
import { IconStatusActive, IconStatusInactive } from '@/utils/Icons';

const initialNotificationData: NotificationProps = {
  items: [],
  offset: 0,
  limit: 10,
  count: 0,
  hasNext: false,
  links: [],
};

export default function NotificationButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationData, setNotificationData] = useState<NotificationProps>(
    initialNotificationData
  );
  const [unreadCount, setUnreadCount] = useState(0);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isModalOpen && user?.id) {
        try {
          const data: NotificationProps = await alertAPI.getAlerts({
            user_id: user.id,
          });
          setNotificationData(data);
          setUnreadCount(data.items.filter(({ item }) => !item.read).length);
        } catch (error) {
          error;
        }
      }
    };
    fetchNotifications();
  }, [isModalOpen, user?.id]);

  const handleClickNotification = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative w-5 h-5">
      <button type="button" onClick={handleClickNotification}>
        {unreadCount > 0 ? (
          <IconStatusActive aria-label="알림 활성화" />
        ) : (
          <IconStatusInactive aria-label="알림 비활성화" />
        )}
      </button>
      {isModalOpen && (
        <div className="absolute top-full right-0 mt-2">
          <NotificationModal data={notificationData} />
        </div>
      )}
    </div>
  );
}
