import { useState } from 'react';
import { IconStatusActive, IconStatusInactive } from '@/utils/Icons';

interface NotificationButtonProps {
  hasNotification: boolean;
}

export default function NotificationButton({
  hasNotification,
}: NotificationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickNotification = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button type="button" onClick={handleClickNotification}>
        {hasNotification ? (
          <IconStatusActive
            aria-label="알림 활성화"
            className="w-20px h-20px"
          />
        ) : (
          <IconStatusInactive
            aria-label="알림 비활성화"
            className="w-20px h-20px"
          />
        )}
      </button>
      {isModalOpen && <div></div>}
    </div>
  );
}
