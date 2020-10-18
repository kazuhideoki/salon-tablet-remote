//@ts-ignore
import { config, Provider } from "next-auth/client";

// デバイス間のcssをリセットする
import "normalize.css"
// ベースのcssの適応(スクロールで更新を無効化)
import "../../public/base.scss";

// editor用のsnowテーマのcss
import "react-quill/dist/quill.snow.css";

// ダウンロードフォント用設定 public/fontsにフォントファイルを入れる
import "../../public/fonts/fonts.css";

// ReactQuillの整形
import "../../public/quill.scss";



import Head from "next/head";
import { server } from "../lib/loadUrl";
import { TUserInfo } from "../app/Store/Types";
import WebSiteDrawer from "../pageComponent/WebsiteDrawer";
import { TSessionOnj } from ".";
import { getUserInfoFromEmail } from "../lib/getUserInfoFromEmail";
import { googleFontsUrl } from "../lib/googleFontsUrl";
import { GetStaticProps, GetServerSideProps } from "next";
import { MuiThemeProvider } from "@material-ui/core";
import { websiteTheme } from "../app/Store/themes/websiteTheme";
// require("dotenv").config();

export default function MyApp({ Component, pageProps, slug }) {
  // サーバーサイドでnext-authのsessionをつかうための修正項目
  // "^2.1.0-beta.0",より
  // https://github.com/iaincollins/next-auth/pull/315
  const session = pageProps.data ? pageProps.data.userInfo : null;

  if (session) {
    console.log(`_app if(session) session = ${JSON.stringify(session)}` );
    console.log('pagePropsは ' + JSON.stringify(Object.keys(pageProps)));
    
    return (
      <>
        <Head>
          {/* <title>{`${userInfo.shop_name} | SALON TABLET`}</title> */}
          <title>{`SALON TABLET`}</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          {/* "webフォント" */}
          {/* google fontsより */}
          <link href={googleFontsUrl} rel="stylesheet"></link>

          {/* quillのmodule */}
          {/* <script src="/node_modules/quill-image-drop-module/image-drop.min.js"></script> */}

        </Head>
        <Provider options={{ site: server }} session={session}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }

  console.log(`_app if(session) ではない session = ${session}`);
  console.log("pagePropsは " + JSON.stringify(Object.keys(pageProps)));

  return (
    <>
      <Head>
        <title>{`SALON TABLET`}</title>
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        /> */}
      </Head>
      <Provider options={{ site: server }} session={session}>
        <MuiThemeProvider theme={websiteTheme}>
          <WebSiteDrawer id="back-to-top-anchor" >
            <Component {...pageProps} />
          </WebSiteDrawer>
        </MuiThemeProvider>
      </Provider>
    </>
  );



}