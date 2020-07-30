const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://salon-tablet.com";

// instagram apiでは、redirect uriにdev環境でもhttpsが必要。
export const instagramRedirectHost = dev
         ? "https://192.168.33.10"
         : "https://salon-tablet.com";

