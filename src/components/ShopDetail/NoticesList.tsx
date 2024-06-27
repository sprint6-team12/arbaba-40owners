import { useCallback, useEffect, useRef, useState } from 'react';
import PostCard from '@/components/Post/PostCard';
import ShopNoData from '@/components/ShopDetail/ShopNoData';
import { Notices, Shops } from '@/types/ShopDetail';

interface NoticesListProps {
  noticesData: Notices | null;
  shopData: Shops;
}

const NOTICES_PER_PAGE = 6;

export default function NoticesList({
  noticesData,
  shopData,
}: NoticesListProps) {
  const [currentNoticesPage, setCurrentNoticesPage] = useState(1);

  const observer = useRef<IntersectionObserver | null>(null);
  const noticesRef = useRef<HTMLDivElement | null>(null);

  const currentNoticesData =
    noticesData?.items.slice(0, currentNoticesPage * NOTICES_PER_PAGE) || [];

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setCurrentNoticesPage((prevPage) => prevPage + 1);
      }
    },
    []
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (noticesRef.current) {
      observer.current.observe(noticesRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [observerCallback, noticesRef.current]);

  return (
    <div className="bg-[#fafafa]">
      <div className="mx-auto w-full px-32px py-60px max-w-[1000px]">
        {currentNoticesData.length === 0 ? (
          <ShopNoData title="공고를 등록해보세요." text="공고 등록하기" />
        ) : (
          <>
            <h1 className="font-bold text-start text-28px mb-24px pt-40px">
              등록한 공고
            </h1>
            <div className="flex gap-32px">
              <div className="grid grid-cols-2 gap-x-8px gap-y-12px my-0 mx-auto pc:gap-x-36px pc:gap-y-26px pc:grid-cols-3">
                {currentNoticesData.map((item) => (
                  <PostCard
                    key={item.item.id}
                    noticeData={item.item}
                    shopData={shopData}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div ref={noticesRef}></div>
    </div>
  );
}
