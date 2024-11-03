import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
