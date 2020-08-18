const dev = process.env.NODE_ENV !== "production";

const port =
  process.env.TEST === "true"
    ? process.env.NEXT_PUBLIC_PORT_TEST
    : process.env.NEXT_PUBLIC_PORT;


    
// HTTPSは "npm run https" のときに env変数として "https://localhoset:3000"で設定
// サーバーサイドでapi通信をするときに、sslの有無で切り替える
export const localhost =
         process.env.NEXT_PUBLIC_SITE_DEV_HTTPS + port ||
         process.env.NEXT_PUBLIC_SITE_DEV + port
// export const localhost = HTTPS || process.env.NEXT_PUBLIC_SITE_DEV ;

// フロント側でapiにfetchする時
export const server = dev
         ? process.env.NEXT_PUBLIC_SITE_DEV_HTTPS + port ||
           process.env.NEXT_PUBLIC_SITE_DEV + port
           
         : process.env.NEXT_PUBLIC_SITE;

// instagram apiでは、redirect uriにdev環境でもhttpsが必要。
export const instagramRedirectHost = dev
         ? process.env.NEXT_PUBLIC_SITE_DEV_HTTPS + port
         : process.env.NEXT_PUBLIC_SITE;

