import type { AppProps } from 'next/app';
// eslint-disable-next-line import/named
import { RecoilRoot, MutableSnapshot } from 'recoil';
import Footer from '@/components/Footer/footer';
import Gnb from '@/components/Gnb/Gnb';
import ModalsWrapper from '@/components/Modal/ModalsWrapper';
import PopupsWrapper from '@/components/Popup/PopupsWrapper';
import '@/styles/globals.css';
import { User, userState } from '@/recoil/atoms/AuthAtom';

const initializeState = ({ set }: MutableSnapshot) => {
  const initialUserState: User = {
    token: null,
    userId: null,
    shopId: null,
    type: 'guest',
    isLogin: false,
    address: null,
    userName: null,
    DetailAddress: null,
  };
  set(userState, initialUserState);
};
export default function App({ Component, pageProps }: AppProps) {
  const is404 = Component.name === 'Error404';
  return (
    <RecoilRoot initializeState={initializeState}>
      <ModalsWrapper />
      <PopupsWrapper />
      {!is404 && <Gnb />}
      {/* 100vh - (footer와 header 높이) 뺀 값을 최소 높이로 설정 */}
      <main className="min-h-[calc(100vh-76px-162px)] tablet:min-h-[calc(100vh-76px-84px)] pc:min-h-[calc(100vh-72px-98px)]">
        <Component {...pageProps} />
      </main>
      <Footer />
    </RecoilRoot>
  );
}
