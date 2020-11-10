//@ts-ignore
// import { config, Provider } from "next-auth/client";

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
// import { TSessionOnj } from "./index3";
import { getUserInfoFromEmail } from "../lib/getUserInfoFromEmail";
import { googleFontsUrl } from "../lib/googleFontsUrl";
import { GetStaticProps, GetServerSideProps } from "next";
import { MuiThemeProvider } from "@material-ui/core";
import { websiteTheme, WebsiteThemeProvider } from "../app/Store/themes/websiteTheme";
import { ParallaxProvider, Parallax, useController, } from 'react-scroll-parallax';
import { AuthProvider } from "../lib/auth/AuthProvider";
import { SwitchAppBar } from "../pageComponent/SwitchAppBar";
import { getSession, TSession } from "../lib/auth/getSession";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { getServerSideProps } from "./public_page/[public_page_slug]";
import App from 'next/app'


export default function MyApp({ Component, pageProps, slug }: AppProps) {
  const session = pageProps.session
  console.log('pageProps.sessionは ' + session)
    
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
        <AuthProvider>
          {session ? 
          <Component {...pageProps} />
          : 
          <WebSiteDrawer id="back-to-top-anchor">
            <Component {...pageProps} />
          </WebSiteDrawer>
          }
          {/* <SwitchAppBar session={session}>
            
          </SwitchAppBar> */}
        </AuthProvider>

      </>
    );


}