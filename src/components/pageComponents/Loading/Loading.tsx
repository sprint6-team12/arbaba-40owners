import Image from 'next/image';
import LoadingImage from '@/../../public/loading-arbaba.png';

function Loading() {
  return (
    <div className="flex-center h-screen">
      {' '}
      <Image src={LoadingImage} alt="로딩중" className="animate-float" />{' '}
    </div>
  );
}

export default Loading;
