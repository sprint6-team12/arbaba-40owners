import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import PopupsWrapper from '@/components/Popup/PopupsWrapper';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <PopupsWrapper />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
