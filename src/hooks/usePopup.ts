import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import popupsDataState from '@/recoil/atoms/PopupAtom';

const usePopup = () => {
  const [popupsData, setPopupsData] = useRecoilState(popupsDataState);

  const closePopup = useCallback(
    (id: string) => {
      setPopupsData((prevPopups) =>
        prevPopups.filter((popup) => popup.id !== id)
      );
    },
    [setPopupsData]
  );

  const openPopup = useCallback(
    (id: string, message: string, duration?: number) => {
      // duration 없을경우 삭제 버튼 추가
      const handleClose = () => closePopup(id);

      setPopupsData((prevPopups) => {
        // 중복 팝업 방지
        if (prevPopups.some((popup) => popup.id === id)) return prevPopups;
        return [...prevPopups, { id, message, duration, onClose: handleClose }];
      });

      return id;
    },
    [setPopupsData, closePopup]
  );

  return { popupsData, openPopup, closePopup };
};

export default usePopup;
