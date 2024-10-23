import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          href="https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.eot"
        />
        <link rel="icon" href="/arbaba.png" type="image/x-icon" />
        <meta
          name="description"
          content="급하게 알바 구할 때는- 아르바바와 40인의 사장들"
        />
        <meta property="og:title" content="아르바바와40인의사장들" />
        <meta
          property="og:description"
          content="급하게 알바 구할 때는- 아르바바와 40인의 사장들"
        />
        <meta
          property="og:image"
          content="https://the-julge-6-12.vercel.app/arbaba.png"
        />
        <meta property="og:url" content="https://the-julge-6-12.vercel.app/" />
        <title>아르바바와40인의사장들</title>
      </Head>
      <body>
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
        ></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
