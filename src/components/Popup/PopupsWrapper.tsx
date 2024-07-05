import { useRecoilValue } from 'recoil';
import Popup from '@/components/Popup/Popup';
import popupsDataState from '@/recoil/atoms/PopupAtom';

function PopupsWrapper() {
  const popupsData = useRecoilValue(popupsDataState);
  return (
    <div className="fixed flex flex-col gap-8px bottom-30px right-1/2 translate-x-1/2 z-popup">
      {popupsData.map(({ id, message, duration, onClose }) => (
        <Popup
          key={id}
          message={message}
          duration={duration}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

export default PopupsWrapper;
