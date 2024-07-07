import { Html, Head, Main, NextScript } from 'next/document';

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
          content="https://cdn.discordapp.com/attachments/1242764736924483644/1259417140373618769/image.png?ex=668b9b1d&is=668a499d&hm=64181ec26a4baf0dd27eff1d89957348468421b6c7cd040407f43321fc195c93&"
        />
        <meta property="og:url" content="https://the-julge-6-12.vercel.app/" />
        <title>아르바바와40인의사장들</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
