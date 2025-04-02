import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  // ここでは静的な言語属性はセットせず、Htmlコンポーネントをそのまま使用
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
