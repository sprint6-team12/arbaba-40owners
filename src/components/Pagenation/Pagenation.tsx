import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import PrevArrow from '/public/images/icon-arrow-prev-pagination.svg';
import NextArrow from '/public/images/icon-arrow-next-pagination.svg';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  onPageChange: (page: number) => void;
}

// 페이지 버튼 UI, 숫자버튼을 누르면 부모컴포넌트의 onPageChange함수로 api 호출해서 새로운 props을 받는다
function Pagination({ totalPages, currentPage, hasNext }: PaginationProps) {
  const [isDisabledAtFirstPage, setIsDisabledAtFirstPage] = useState(false);
  const isFewPages = totalPages <= 7;

  // 부모컴포넌트에서 새로운 데이터 패치 실행한다.
  const handlePageClick = (data: { selected: number }) => {
    // const selectedPage = data.selected + 1;
    // onPageChange(selectedPage);
  };

  // 현재 페이지가 첫번째 페이지일 경우 처리
  useEffect(() => {
    const isFirstPage = currentPage === 1;
    setIsDisabledAtFirstPage(isFirstPage);
  }, [currentPage]);

  return (
    <div className="flex justify-center mt-8">
      <ReactPaginate
        previousLabel={
          <PrevArrow
            className={`${isDisabledAtFirstPage ? 'text-gray30 pointer-events-none' : 'text-black pointer-events-auto'} ${isFewPages && 'hidden'}`}
          />
        }
        nextLabel={
          <NextArrow
            className={`${hasNext ? 'text-black' : 'hidden'} ${isFewPages && 'hidden'}`}
          />
        } // 다음 페이지 버튼의 라벨
        breakLabel={null} // 표시할 페이지 외 다른 페이지 축약 표기
        pageCount={totalPages} // 총 페이지 수 설정
        pageRangeDisplayed={7} // 표시할 페이지 번호의 범위
        marginPagesDisplayed={0} // 표시할 페이지 이외에여백에 표시할 페이지 수
        onPageChange={handlePageClick} // 페이지 변경 시 호출될 핸들러
        containerClassName={'flex gap-2px'} // 페이지네이션 컨테이너의 클래스명
        pageClassName={'flex-center w-40px h-40px'} // 개별 페이지 항목의 클래스명
        previousClassName={`flex-center mr-10px`} // 이전 페이지 버튼의 클래스명
        nextClassName={'flex-center ml-10px'} // 다음 페이지 버튼의 클래스명
        activeClassName={
          'bg-red30 flex-center w-40px h-40px rounded-4px text-white'
        } // 현재 선택된 페이지 항목의 클래스명
        initialPage={currentPage - 1} // 초기 페이지 설정 (0부터 시작하므로 currentPage - 1)
        disableInitialCallback={true} // 초기에 onPageChange 호출 방지
      />
    </div>
  );
}

export default Pagination;
