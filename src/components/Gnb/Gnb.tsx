import Image from 'next/image';
import Link from 'next/link';
import Logo from '/public/images/logo.png';
import GnbButton from './GnbButton';
import SearchBar from './SearchBar';

interface GnbProps {
  userType?: 'employee' | 'employer' | 'guest';
  handleClick: (pathname?: string) => void;
  hasNotification?: boolean;
}

export default function Gnb({
  userType,
  handleClick,
  hasNotification,
}: GnbProps) {
  return (
    <div className="flex justify-between px-[20px] py-[10px]">
      <Link href="/">
        <Image src={Logo} alt="더줄게로고" className="w-[81px] h-[15px]" />
      </Link>
      <SearchBar />
      <GnbButton
        userType={userType}
        handleClick={handleClick}
        hasNotification={hasNotification}
      />
    </div>
  );
}
