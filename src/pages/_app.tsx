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
  const [isFirstLoad, setIsFirstLoad] = useState(true); // 첫 로드 체크
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    };

    // 첫 진입시에만 실행
    if (isFirstLoad && router.pathname === '/') {
      setIsFirstLoad(false);
      router.replace(router.pathname);
      return;
    }

    // 일반적인 라우트 변경 처리
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // 컴포넌트 마운트 시 로딩 해제
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events, isFirstLoad, router.pathname]);

  const is404Page = router.pathname === '/404';

  return (
    <RecoilRoot initializeState={initializeState}>
      <Head>
        <title>아르바바와40인의사장들</title>
      </Head>
      <ModalsWrapper />
      <PopupsWrapper />
      {!is404Page && <Gnb />}
      <main className="min-h-[calc(100vh-76px-162px)] tablet:min-h-[calc(100vh-76px-84px)] pc:min-h-[calc(100vh-72px-98px)]">
        {loading ? <Loading /> : <Component {...pageProps} />}
      </main>
      <Footer />
    </RecoilRoot>
  );
}
