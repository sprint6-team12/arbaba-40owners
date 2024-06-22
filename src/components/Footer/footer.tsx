import FacebookIcon from '/public/images/icon-facebook-square.svg';
import InstagramIcon from '/public/images/icon-instagram.svg';
import EnvelopeIcon from '/public/images/icon-envelope-square.svg';

export default function Footer() {
  return (
    <footer className="flex justify-between p-[20px] tablet:p-[30px] pc:px-[238px] py-[37px] bg-gray10">
      <div className="flex flex-col gap-[40px] tablet:flex-row pc:flex-row">
        <span className="order-3 tablet:order-none pc:order-none font-normal text-[16px] text-gray50">
          @codeit - 2023
        </span>
        <div className="flex items-center gap-[40px]">
          <span className="font-normal text-[16px] text-gray50 tablet:ml-[144px] pc:ml-[286px]">
            Privacy Policy
          </span>
          <span className="font-normal text-[16px] text-gray50">FAQ</span>
        </div>
      </div>
      <div className="flex gap-[12px]">
        <EnvelopeIcon aria-label="이메일" className="h-[24px] w-[24px]" />
        <FacebookIcon aria-label="페이스북" className="h-[24px] w-[24px]" />
        <InstagramIcon aria-label="인스타그램" className="h-[24px] w-[24px]" />
      </div>
    </footer>
  );
}
