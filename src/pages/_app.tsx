import { config, Provider } from "next-auth/client";
config({ site: process.env.SITE }) // e.g. site: 'http://localhost:3000'

// デバイス間のcssをリセットする
import "normalize.css"
// editor用のsnowテーマのcss
import "react-quill/dist/quill.snow.css";
// ReactQuillの整形
import "../../public/quill.scss";

export default function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}
