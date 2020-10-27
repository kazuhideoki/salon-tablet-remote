// nextjsでmaterial-uiをうまく対応させるため
// https://developerhandbook.com/react/how-to-set-up-nextjs-material-ui/

import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { server } from '../lib/loadUrl'

const theme = responsiveFontSizes(createMuiTheme())

class MyDocument extends Document {
  domain = "https://salon-tablet.com";
  appName = "SALON TABLET";
  content = "美容室のためのタブレット専用ウェブサービスです。美容師と顧客のコミュニケーションプラットフォームを提供し、単価アップ、タブレット内の整理、美容室の雰囲気作りに貢献します。"

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />

          {/* 【PWA対応】next-pwaのdocumentより manifest.json も読み込む */}
          <meta name="application-name" content={this.appName} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={this.appName} />
          <meta name="description" content={this.content} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          {/* <meta
            name="msapplication-config"
            content="/static/icons/browserconfig.xml"
          /> */}
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          {/* <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/icons/favicon-16x16.png"
          /> */}
          <link
            rel="apple-touch-icon"
            type="image/png"
            // href="/images/icons/icon-192x192.png"
            href={`${server}/images/icons/icon-192x192.png`}
          />
          <link
            rel="icon"
            type="image/png"
            // href="/images/icons/icon-192x192.png"
            href={`${server}/images/icons/icon-192x192.png`}
          />

          <link rel="manifest" href="/manifest.json" />
          {/* <link
            rel="mask-icon"
            href="/static/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          /> */}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={this.domain} />
          <meta name="twitter:title" content="SALON TABLET" />
          <meta name="twitter:description" content={this.content} />
          <meta
            name="twitter:image"
            content={this.domain + "/images/icons/icon-192x192.png"}
          />
          {/* <meta name="twitter:creator" content="@DavidWShadow" /> */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={this.appName} />
          <meta property="og:description" content={this.content} />
          <meta property="og:site_name" content={this.appName} />
          <meta property="og:url" content={this.domain} />
          <meta
            property="og:image"
            content={this.domain + "/images/icons/icon-192x192.png"}
          />

          {/* 【PWA対応】next-pwaのdocumentより ここまで */}

          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
          />
          <style jsx global>
            {`
              html,
              body {
                height: 100%;
                width: 100%;
              }
              *,
              *:after,
              *:before {
                box-sizing: border-box;
              }
              body {
                font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                font-size: 1rem;
                margin: 0;
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  }
}

export default MyDocument
