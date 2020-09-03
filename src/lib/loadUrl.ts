const dev = process.env.NODE_ENV !== "production";
    
// HTTPSは "npm run https" 起動のときに env変数として SSL"https://localhost:3000"で設定

// サーバーサイドでapi通信をするときに、sslの有無で切り替える
export const localhost = process.env.HTTPS || process.env.LOCALHOST 

// フロント側でapiにfetchする時
// ※"npm run https"起動で serverではサーバー側で動作するが、client側では読み込まれない...→最初の読み込みに必要
export const server = process.env.HTTPS || process.env.NEXT_PUBLIC_SITE;

// instagram apiでは、redirect uriにdev環境でもhttpsが必要。
export const instagramRedirectHost = dev
         ? "https://localhost:3000"
         : process.env.NEXT_PUBLIC_SITE;

console.log(
    "devは " +
    dev +
    " localhostは " +
    localhost +
    " serverは " +
    server +
    " instagramRedirectHostは " +
    instagramRedirectHost
);