import Image from 'next/image';
import Link from 'next/link';
import Logo from '/public/images/logo.png';
import GnbButton from './GnbButton';
import SearchBar from './SearchBar';

interface GnbProps {
  userType?: 'employee' | 'employer' | 'guest';
  onClick: (pathname?: string) => void;
  hasNotification?: boolean;
}

export default function Gnb({
  userType = 'guest',
  onClick,
  hasNotification,
}: GnbProps) {
  return (
    <div className="flex justify-between items-center flex-wrap px-20px tablet:px-32px  pc:px-60px py-10px tablet:py-15px pc:py-15px">
      <div className="flex-col tablet:flex tablet:justify-between pc:flex-center tablet:flex-row pc:flex-row">
        <Link href="/">
          <div className="flex tablet:flex-center pc:flex-center w-81px tablet:w-112px pc:w-112px h-15px tablet:h-40px pc:h-40px">
            <Image src={Logo} alt="더줄게로고" />
          </div>
        </Link>
        <div className="flex-center">
          <SearchBar />
        </div>
      </div>
      <div className="">
        <GnbButton
          userType={userType}
          onClick={onClick}
          hasNotification={hasNotification}
        />
      </div>
    </div>
  );
}
