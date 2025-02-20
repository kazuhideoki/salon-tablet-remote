// デバイス間のcssをリセットする
import 'normalize.css';
// ベースのcssの適応(スクロールで更新を無効化)
import '../../public/base.scss';

// editor用のsnowテーマのcss
import 'react-quill/dist/quill.snow.css';

// ダウンロードフォント用設定 public/fontsにフォントファイルを入れる
import '../../public/fonts/fonts.css';

// ReactQuillの整形
import '../../public/quill.scss';

import React from 'react';
import Head from 'next/head';
import WebSiteDrawer from '../app/components/pages/WebsiteDrawer';
import { googleFontsUrl } from '../util/googleFontsUrl';
import { AuthProvider } from '../util/auth/AuthProvider';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { MuiThemeProvider } from '@material-ui/core';
import { themeDefault } from '../app/stores/theme/lib/themes/themeDefault';
import { generateDefaultParamsFromTheme } from '../app/stores/theme/lib/paramsFromTheme';

export default function MyApp({ Component, pageProps }: AppProps) {
  const session = pageProps.session;

  return (
    <>
      <Head>
        <title>{`SALON TABLET`}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        {/* "webフォント" google fontsより*/}
        <link href={googleFontsUrl} rel="stylesheet"></link>
      </Head>

      <AuthProvider>
        {session ? (
          <Component {...pageProps} />
        ) : (
          <MuiThemeProvider
            theme={themeDefault(generateDefaultParamsFromTheme('default'))}>
            <WebSiteDrawer id="back-to-top-anchor">
              <Component {...pageProps} />
            </WebSiteDrawer>
          </MuiThemeProvider>
        )}
      </AuthProvider>
    </>
  );
}
