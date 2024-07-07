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
          content="https://cdn.discordapp.com/attachments/1228964135052644362/1259512794248904794/1.png?ex=668bf432&is=668aa2b2&hm=7f5f142140fd53d1692b6564815cbbe7caef161cb22af060af8f457c88f90e72&"
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
