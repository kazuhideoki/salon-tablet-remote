import { config, Provider } from "next-auth/client";

// デバイス間のcssをリセットする
import "normalize.css"
// editor用のsnowテーマのcss
import "react-quill/dist/quill.snow.css";
// ReactQuillの整形
import "../../public/quill.scss";
import { server } from "../config";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  // サーバーサイドでnext-authのsessionをつかうための修正項目
  // "^2.1.0-beta.0",より
  // https://github.com/iaincollins/next-auth/pull/315
  const { session } = pageProps;
  return (
    <>
      <Head>
        <title>SALON TABLET</title>
      </Head>
      <Provider options={{ site: process.env.SITE }} session={session}>
        <Component {...pageProps} />
      </Provider>
    </>

  );
}
