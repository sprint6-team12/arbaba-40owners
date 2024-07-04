import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Footer from '@/components/Footer/footer';
import Gnb from '@/components/Gnb/Gnb';
import ModalsWrapper from '@/components/Modal/ModalsWrapper';
import PopupsWrapper from '@/components/Popup/PopupsWrapper';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const is404 = Component.name === 'Error404';
  return (
    <RecoilRoot>
      <ModalsWrapper />
      <PopupsWrapper />
      {!is404 && <Gnb />}
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  );
}
