import { config, Provider } from "next-auth/client";

// デバイス間のcssをリセットする
import "normalize.css"
// editor用のsnowテーマのcss
import "react-quill/dist/quill.snow.css";
// ReactQuillの整形
import "../../public/quill.scss";
import { server } from "../config";

export default function MyApp({ Component, pageProps }) {
  // サーバーサイドでnext-authのsessionをつかうための修正項目
  // "^2.1.0-beta.0",より
  // https://github.com/iaincollins/next-auth/pull/315
  const { session } = pageProps;
  return (
    <Provider options={{ site: server }} session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}
