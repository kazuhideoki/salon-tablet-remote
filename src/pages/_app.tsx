//@ts-ignore
import { config, Provider } from "next-auth/client";

// デバイス間のcssをリセットする
import "normalize.css"
// ベースのcssの適応(スクロールで更新を無効化)
import "../../public/base.scss";

// editor用のsnowテーマのcss
import "react-quill/dist/quill.snow.css";
// ReactQuillの整形
import "../../public/quill.scss";
import Head from "next/head";
import { server } from "../lib/loadUrl";
// require("dotenv").config();

export default function MyApp({ Component, pageProps }) {
  // サーバーサイドでnext-authのsessionをつかうための修正項目
  // "^2.1.0-beta.0",より
  // https://github.com/iaincollins/next-auth/pull/315
  const { session } = pageProps;
  return (
    <>
      <Head>
        <title>SALON TABLET</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Provider options={{ site: server }} session={session}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
