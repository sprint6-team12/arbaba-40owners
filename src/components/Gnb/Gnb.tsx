import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/../public/images/logo.png';
import GnbButton from './GnbButton';
import SearchBar from './SearchBar';

interface GnbProps {
  userType?: 'employee' | 'employer' | 'guest';
  handleClick: (pathname?: string) => void;
}

export default function Gnb({ userType, handleClick }: GnbProps) {
  return (
    <div>
      <Link href="/">
        <Image src={Logo} alt="더줄게로고" width={112} height={40} />
      </Link>
      <SearchBar />
      <GnbButton userType={userType} handleClick={handleClick} />
    </div>
  );
}
