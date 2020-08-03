const dev = process.env.NODE_ENV !== "production";

// HTTPSは "npm run https" のときに env変数として "https://localhoset:3000"で設定
// サーバーサイドでapi通信をするときに、sslの有無で切り替える
export const localhost = process.env.HTTPS || process.env.NEXT_PUBLIC_SITE_DEV ;
// export const localhost = HTTPS || process.env.NEXT_PUBLIC_SITE_DEV ;

// フロント側でapiにfetchする時
export const server = dev
  ? process.env.HTTPS || process.env.NEXT_PUBLIC_SITE_DEV
  // ? HTTPS || process.env.NEXT_PUBLIC_SITE_DEV
  : process.env.NEXT_PUBLIC_SITE;

// instagram apiでは、redirect uriにdev環境でもhttpsが必要。
export const instagramRedirectHost = dev
  ? process.env.NEXT_PUBLIC_REDIRECT_FROM_INSTAGRAM_LOCAL
  : process.env.NEXT_PUBLIC_SITE;

