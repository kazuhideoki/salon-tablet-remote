const dev = process.env.NODE_ENV !== "production";

// サーバーサイドでapi通信をするときに、sslの有無で切り替える
export const localhost = process.env.HTTPS || "http://localhost:3000";

// フロント側でapiにfetchする時
export const server = dev
  ? process.env.HTTPS || "http://localhost:3000"
  : "https://salon-tablet.com";

// instagram apiでは、redirect uriにdev環境でもhttpsが必要。
export const instagramRedirectHost = dev
  ? process.env.NEXT_PUBLIC_VAGRANT_HOST
  : "https://salon-tablet.com";

