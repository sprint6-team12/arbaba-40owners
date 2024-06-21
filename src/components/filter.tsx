import { LOCATIONS } from '@/lib/data-locations';

export default function Filter() {
  return (
    <div className="relative w-[390px] px-20px py-24px overflow-auto border-1px border-solid border-[#e5e4e7] rounded-[10px] bg-white">
      <div className="flex justify-between pb-18px">
        <p>상세 필터</p>
        <p>X버튼</p>
      </div>
      <div className="flex-col pb-18px">
        <p>위치</p>
        <div className="p-4px border-1px border-solid rounded-[6px] grid grid-cols-2 gap-12px overflow-y-scroll h-[350px]">
          {LOCATIONS.map((item) => (
            <button key={item} type="button">
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="border-solid border-b-2px border-[#f2f2f3]" />
      <div className="flex flex-col pb-[18px]">
        <p>시작일</p>
        {/* 날짜 선택 기능 */}
      </div>
      <div className="border-solid border-b-2 border-[#f2f2f3] my-[18px]" />
      <div className="flex flex-col">
        <p>금액</p>
        <div className="flex items-center gap-[18px]">
          <div className="relative">
            <input
              type="text"
              placeholder="입력"
              className="w-[180px] py-2 px-4 border border-gray-300 rounded-lg pr-12"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
              원
            </span>
          </div>
          <p>이상부터</p>
        </div>
      </div>
      <div className="flex justify-between mt-[20px]">
        <button
          className="bg-gray-300 text-white py-2 px-4 rounded-lg w-[80px]"
          onClick={() => {
            /* 초기화 기능 */
          }}
        >
          초기화
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg w-[260px]"
          onClick={() => {
            /* 적용하기 기능 */
          }}
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
