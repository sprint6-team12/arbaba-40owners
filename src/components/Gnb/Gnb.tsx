import Image from 'next/image';
import Link from 'next/link';
import Logo from '/public/images/logo.png';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atoms/AuthAtom';
import GnbButton from './GnbButton';
import SearchBar from './SearchBar';

interface GnbProps {
  onClick: (pathname?: string) => void;
  hasNotification?: boolean;
}

export default function Gnb({ onClick, hasNotification }: GnbProps) {
  const { type } = useRecoilValue(userState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="flex justify-between items-center flex-wrap px-20px tablet:px-32px pc:px-[208px] py-10px tablet:py-15px pc:py-15px">
      <Link href="/">
        <div className="flex tablet:flex-center pc:flex-center w-81px tablet:w-112px pc:w-112px h-15px tablet:h-40px pc:h-40px">
          <Image src={Logo} alt="더줄게로고" />
        </div>
      </Link>
      <div className="flex-center order-1 tablet:order-none pc:order-none">
        <SearchBar />
      </div>
      <div>
        <GnbButton
          userType={type}
          onClick={onClick}
          hasNotification={hasNotification}
        />
      </div>
    </div>
  );
}
