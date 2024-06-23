import Image from 'next/image';

interface PostImageProps {
  imageUrl: string;
  isClosed: boolean;
  closedText: string;
  passedText: string;
}

export default function PostImage({
  imageUrl,
  isClosed,
  closedText,
  passedText,
}: PostImageProps) {
  return (
    <div className="relative mb-12px tablet:mb-20px pc:mb-20px rounded-12px overflow-hidden w-[147px] tablet:w-280px pc:w-280px h-[84px] tablet:160px pc:160px">
      <Image
        src={imageUrl}
        className={`rounded-12px ${isClosed ? 'brightness-40' : ''}`}
        alt="가게 사진"
        fill
      />
      {isClosed && (
        <p className="text-20px tablet:text-28px pc:text-28px font-[700] text-gray30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {isClosed ? closedText : passedText}
        </p>
      )}
    </div>
  );
}
