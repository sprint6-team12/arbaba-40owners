import Image from 'next/image';

interface PostImageProps {
  imageUrl: string;
  isClosed: boolean;
  isPassed: boolean;
}
const CLOSED_TEXT = '마감 완료';
const PASSED_TEXT = '지난 공고';

export default function PostImage({
  imageUrl,
  isClosed,
  isPassed,
}: PostImageProps) {
  const statusText = isClosed ? CLOSED_TEXT : PASSED_TEXT;
  return (
    <div className="relative mb-12px tablet:mb-20px pc:mb-20px rounded-12px overflow-hidden w-[147px] tablet:w-280px pc:w-280px h-[84px] tablet:h-160px pc:h-160px">
      <Image src={imageUrl} className="rounded-12px" alt="가게 사진" fill />
      {(isClosed || isPassed) && (
        <p className="break-keep text-16px tablet:text-28px pc:text-28px font-[700] text-gray30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {statusText}
        </p>
      )}
    </div>
  );
}
