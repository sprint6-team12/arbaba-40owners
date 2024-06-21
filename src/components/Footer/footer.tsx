import FacebookIcon from '/public/images/icon-facebook-square.svg';
import InstagramIcon from '/public/images/icon-instagram.svg';
import EnvelopeIcon from '/public/images/icon-envelope-square.svg';

export default function Footer() {
  return (
    <footer className="flex justify-between p-20px bg-gray10">
      <div className="flex flex-col gap-10">
        <span className="order-3 font-normal text-16px text-gray50">
          @codeit - 2023
        </span>
        <div className="flex-center gap-10">
          <span className="font-normal text-16px text-gray50">
            Privacy Policy
          </span>
          <span className="font-normal text-16px text-gray50">FAQ</span>
        </div>
      </div>
      <div className="flex gap-3">
        <EnvelopeIcon alt="이메일" className="h-24px w-24px" />
        <FacebookIcon alt="페이스북" className="h-24px w-24px" />
        <InstagramIcon alt="인스타그램" className="h-24px w-24px" />
      </div>
    </footer>
  );
}
