import Link from 'next/link';
import {
  IconEnvelopeSquare,
  IconFacebookSquare,
  IconInstagram,
} from '@/lib/utils/Icons';

export default function Footer() {
  return (
    <footer className="flex justify-between p-20px tablet:p-30px pc:px-[238px] py-37px bg-gray10 mt-80px tablet:mt-60px pc:mt-60px">
      <div className="flex flex-col gap-40px tablet:flex-row pc:flex-row tablet:basis-1/2 pc:basis-1/2 tablet:justify-between pc:justify-between">
        <span className="order-3 font-normal tablet:order-none pc:order-none text-16px text-gray50">
          @codeit - 2023
        </span>
        <div className="flex items-center gap-40px">
          <span className="font-normal text-16px text-gray50">
            Privacy Policy
          </span>
          <span className="font-normal text-16px text-gray50">FAQ</span>
        </div>
      </div>
      <div className="flex gap-12px">
        <Link href="https://www.gmail.com">
          <IconEnvelopeSquare aria-label="이메일" className="h-24px w-24px" />
        </Link>
        <Link href="https://www.facebook.com">
          <IconFacebookSquare aria-label="페이스북" className="h-24px w-24px" />
        </Link>
        <Link href="https://www.instagram.com">
          <IconInstagram aria-label="인스타그램" className="h-24px w-24px" />
        </Link>
      </div>
    </footer>
  );
}
