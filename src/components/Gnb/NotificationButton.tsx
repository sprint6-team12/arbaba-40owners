import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import NotificationModal from '@/components/NofiticationModal/NotificationModal';
import { userState } from '@/recoil/atoms/AuthAtom';
import { AlertItemProps } from '@/types/NotificationModal';
import alertAPI from '@/utils/api/alertAPI';
import { IconStatusActive, IconStatusInactive } from '@/utils/Icons';

export default function NotificationButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationData, setNotificationData] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isModalOpen && user?.id) {
        try {
          const data = await alertAPI.getAlerts({ user_id: user.id });
          setNotificationData(data);
          setUnreadCount(
            data.items.filter((item: AlertItemProps) => !item.read).length
          );
        } catch (error) {
          error;
        }
      }
    };
    fetchNotifications();
  }, [isModalOpen, user?.id]);

  const handleClickNotification = async () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen && user?.id && unreadCount > 0) {
      try {
        await alertAPI.putAlerts({ user_id: user.id, alert_id: 'all' }); // 'all'을 사용하여 모든 알림을 읽음 처리
        setUnreadCount(0);
      } catch (error) {
        error;
      }
    }
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
      {isModalOpen && notificationData && (
        <div className="absolute top-full right-0 mt-2">
          <NotificationModal data={notificationData} />
        </div>
      )}
    </div>
  );
}
