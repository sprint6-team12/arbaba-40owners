import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import noticeAPI from '@/lib/api/noticeAPI';
import { userState } from '@/recoil/atoms/AuthAtom';

// 공고 데이터를 가져오는 훅
const fetchNoticeData = async (
  address: string
): Promise<NoticeListResponseData> => {
  return await noticeAPI.getNoticeList({
    address: address,
    sort: 'time',
  });
};

// 열린 공고만 필터링
const filterOpenNotices = (items: NoticeItem[]) => {
  return items.filter(({ item }) => item.closed === false);
};

// 랜덤으로 아이템을 선택
const getRandomItems = (items: NoticeItem[], count: number) => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 커스텀 훅: 맞춤 공고 3개 반환
const useCustomizedNotices = () => {
  const user = useRecoilValue(userState);
  const [customizedNotices, setCustomizedNotices] = useState<{
    items: NoticeItem[];
    count: number;
  }>({
    items: [],
    count: 0,
  });

  useEffect(() => {
    const getCustomizedNotices = async () => {
      try {
        const data = await fetchNoticeData(user.address);
        const openItems = filterOpenNotices(data.items);
        const randomItems = getRandomItems(openItems, 3);

        setCustomizedNotices({
          items: randomItems,
          count: randomItems.length,
        });
      } catch (error) {
        alert(`맞춤 공고 데이터 패치 에러: ${error}`);
      }
    };

    getCustomizedNotices();
  }, [user.address]);

  return customizedNotices;
};

export default useCustomizedNotices;
