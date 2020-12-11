const dev = process.env.NODE_ENV !== "production";
    
// サーバーサイドでapi通信をするときに、sslの有無で切り替える
export const localhost = process.env.HTTPS || process.env.LOCALHOST 

// フロント側でapiにfetchする時
export const server = process.env.NEXT_PUBLIC_SITE;

// instagram apiでは、redirect uriにdev環境でもhttpsが必要。
export const instagramRedirectHost = dev
         ? `https://localhost:${process.env.NEXT_PUBLIC_PORT}`
         : process.env.NEXT_PUBLIC_SITE;
