import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// eslint-disable-next-line import/named
import { RecoilRoot, MutableSnapshot } from 'recoil';
import Footer from '@/components/Footer/footer';
import Gnb from '@/components/Gnb/Gnb';
import ModalsWrapper from '@/components/Modal/ModalsWrapper';
import Loading from '@/components/pageComponents/Loading/Loading';
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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const is404Page = router.pathname === '/404';

  return (
    <RecoilRoot initializeState={initializeState}>
      <Head>
        <title>아르바바와40인의사장들</title>
      </Head>
      <ModalsWrapper />
      <PopupsWrapper />
      {loading && <Loading />}
      {!is404Page && <Gnb />}
      <main className="min-h-[calc(100vh-76px-162px)] tablet:min-h-[calc(100vh-76px-84px)] pc:min-h-[calc(100vh-72px-98px)]">
        <Component {...pageProps} />
      </main>
      <Footer />
    </RecoilRoot>
  );
}
