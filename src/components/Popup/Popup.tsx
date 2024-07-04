import { useEffect, useState } from 'react';

const Popup = ({
  message,
  duration,
  onClose,
}: {
  message: string;
  duration?: number;
  onClose: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const fadeAnimationStyle = `${
    isVisible ? 'animate-fadeIn' : 'animate-fadeOut'
  }`;

  const fadeDuration = 500;

  const handleClose = () => {
    if (!isVisible) return;
    setIsVisible(false);
  };

  // isVisible false일때 fadeDuration동안 기다렸다가 close
  // setTimeout을 이용해서 상태를 관리하느라 fadeDuration에 -50 해주지 않으면 깜박거리는 이슈가 있음
  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => onClose(), fadeDuration - 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  // duration 있으면 자동으로 Close
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(
      () => setIsVisible(false),
      duration - fadeDuration
    );
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  return (
    <div
      className={`min-w-113px h-46px rounded-5px flex gap-8px justify-around items-center bg-red30 text-white text-16px px-16px ${fadeAnimationStyle}`}
    >
      <p className="block">{message}</p>
      {!duration && <button onClick={handleClose}>x</button>}
    </div>
  );
};

export default Popup;
