import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { getNoticeList } from '@/lib/api/noticeAPI';
import { userState } from '@/recoil/atoms/AuthAtom';

const fetchNoticeData = async (
  address: string | null
): Promise<NoticeListResponseData> => {
  return await getNoticeList({
    address: address,
    sort: 'time',
  });
};

const filterOpenNotices = (items: NoticeItem[]) => {
  return items.filter(({ item }) => item.closed === false);
};

const getRandomItems = (items: NoticeItem[], count: number) => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

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
        const addressData = await fetchNoticeData(user.address);
        let openItems = filterOpenNotices(addressData.items);
        if (openItems.length === 0) {
          const allAddress = await fetchNoticeData(null);
          openItems = filterOpenNotices(allAddress.items);
        }
        const randomItems = getRandomItems(openItems, 3);

        setCustomizedNotices({
          items: randomItems,
          count: randomItems.length,
        });
      } catch (error) {
        throw new Error(`맞춤 공고 데이터 패치 에러: ${error}`);
      }
    };

    getCustomizedNotices();
  }, [user.address]);

  return customizedNotices;
};

export default useCustomizedNotices;
