import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import Post from '@/components/Post/Post';
import EmployerTable from '@/components/Table/EmployerTable';
import usePopup from '@/hooks/usePopup';
import { getShopApply } from '@/lib/api/applicationAPI';

function EmptyApplicantsList() {
  return (
    <div className="flex flex-col gap-8px text-gray500 text-16px py-12px h-200px">
      신청자가 없습니다.
    </div>
  );
}

const APPLY_LIMIT = 5;

function ApplicantsList({
  isAuthor,
  isOpen,
}: {
  isAuthor: boolean;
  isOpen: boolean;
}) {
  const router = useRouter();
  const { shop_id, notice_id } = router.query;
  const [applicantListData, setApplicantListData] =
    useState<ApplicationListResponseData>();
  const [applicantListCurrentPage, setApplicantListCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { openPopup } = usePopup();

  const fetchData = useCallback(async () => {
    try {
      const data = await getShopApply({
        shop_id: shop_id as string,
        notice_id: notice_id as string,
        limit: APPLY_LIMIT,
        offset: (applicantListCurrentPage - 1) * APPLY_LIMIT,
      });
      setApplicantListData(data);
    } finally {
      setIsLoading(false);
    }
  }, [applicantListCurrentPage, notice_id, shop_id]);

  const handleApplyPageChange = (page: number) => {
    setApplicantListCurrentPage(page);
  };

  // 오버레이 클릭 이벤트 핸들러
  const handleOverlayClick = () => {
    openPopup('공고마감팝업', '공고가 마감되었습니다.', 2000);
  };

  // 내 가게일 경우 지원자 목록을 가져오는 useState
  useEffect(() => {
    if (!shop_id || !notice_id) return setIsLoading(false);
    if (!isAuthor) return setIsLoading(false);

    fetchData();
  }, [fetchData, isAuthor, notice_id, shop_id]);

  // 페이지네이션
  useEffect(() => {
    fetchData();
  }, [applicantListCurrentPage, fetchData]);

  if (isLoading || !applicantListData) {
    return (
      <div className="h-300px w-full text-center min-h-[300px]">Loading...</div>
    );
  }

  return (
    <>
      <Post.Title text="신청자 목록" className="mb-8px" />

      <div className="relative rounded-10px overflow-hidden">
        {!isOpen && (
          <div
            className="absolute inset-0 z-20 h-[calc(100%-62px-6px)]"
            onClick={handleOverlayClick}
          ></div>
        )}
        {applicantListData.count !== 0 ? (
          <>
            <div className="[&_>div]:w-full">
              <EmployerTable data={applicantListData} />
            </div>
            <div className="bg-white border-1px h-64px flex-center rounded-b-10px w-full">
              <Pagination
                count={applicantListData.count}
                limit={APPLY_LIMIT}
                currentPage={applicantListCurrentPage}
                hasNext={applicantListData.hasNext}
                onPageChange={handleApplyPageChange}
              />
            </div>
          </>
        ) : (
          <EmptyApplicantsList />
        )}
      </div>
    </>
  );
}

export default ApplicantsList;
