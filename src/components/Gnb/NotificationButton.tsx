import { useState } from 'react';
import ActiveButton from '/public/images/icon-status-active.svg';
import InActiveButton from '/public/images/icon-status-inactive.svg';

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
          <ActiveButton aria-label="알림 활성화" className="w-20px h-20px" />
        ) : (
          <InActiveButton
            aria-label="알림 비활성화"
            className="w-20px h-20px"
          />
        )}
      </button>
      {isModalOpen && <div></div>}
    </div>
  );
}
