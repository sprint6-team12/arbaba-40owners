import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import Footer from '@/components/Footer/footer';
import Gnb from '@/components/Gnb/Gnb';
import ModalsWrapper from '@/components/Modal/ModalsWrapper';
import PopupsWrapper from '@/components/Popup/PopupsWrapper';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const handleGnbButtonsClick = (pathname: string | undefined) => {
    if (pathname) {
      router.push(pathname);
    }
  };
  return (
    <RecoilRoot>
      <ModalsWrapper />
      <PopupsWrapper />
      <Gnb userType="employee" onClick={handleGnbButtonsClick} />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}
