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

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === 'fadeOut') {
      onClose();
    }
  };

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
      onAnimationEnd={handleAnimationEnd}
    >
      <p className="block">{message}</p>
      {!duration && <button onClick={handleClose}>x</button>}
    </div>
  );
};

export default Popup;
