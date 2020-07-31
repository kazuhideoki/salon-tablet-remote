const dev = process.env.NODE_ENV !== "production";



export const server = dev
  ? "http://localhost:3000"
  : "https://salon-tablet.com";

// instagram apiでは、redirect uriにdev環境でもhttpsが必要。
export const instagramRedirectHost = dev
         ? process.env.NEXT_PUBLIC_VAGRANT_HOST
         : "https://salon-tablet.com";

