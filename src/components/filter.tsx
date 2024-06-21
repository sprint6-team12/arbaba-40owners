import { LOCATIONS } from '@/lib/data-locations';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const formatDate = (date: Date) => {
  const day = format(date, 'iii', { locale: ko }); // 요일을 한글로 출력
  return format(date, `yyyy/MM/dd/'${day}'`, { locale: ko });
};

export default function Filter() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="relative w-[390px] px-20px py-24px overflow-auto border-1px border-solid border-[#e5e4e7] rounded-[10px] bg-white">
      <div className="flex justify-between pb-18px">
        <p className="font-bold text-[20px]">상세 필터</p>
        <p>X버튼</p>
      </div>
      <div className="flex flex-col pb-18px gap-16px">
        <p>위치</p>
        <div className="p-36px border-1px border-solid rounded-[6px] grid grid-cols-2 gap-32px overflow-y-scroll h-[350px]">
          {LOCATIONS.map((item) => (
            <button key={item} type="button" className="text-[14px]">
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="border-solid border-b-2px border-[#f2f2f3] my-[18px]" />
      <div className="flex flex-col pb-[18px] gap-16px">
        <p>시작일</p>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy년 MM월 dd일"
          customInput={
            <input
              type="text"
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
              value={startDate ? formatDate(startDate) : ''}
              readOnly
            />
          }
        />
      </div>
      <div className="border-solid border-b-2 border-[#f2f2f3] my-[18px]" />
      <div className="flex flex-col gap-16px">
        <p>금액</p>
        <div className="flex items-center gap-[18px]">
          <div className="relative">
            <input
              type="text"
              placeholder="입력"
              className="w-[180px] py-16px px-20px border border-gray-300 rounded-6px pr-12"
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
