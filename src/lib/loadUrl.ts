const dev = process.env.NODE_ENV !== "production";
    
// サーバーサイドでapi通信をするときに、sslの有無で切り替える
export const localhost = process.env.HTTPS || process.env.LOCALHOST 

// フロント側でapiにfetchする時
export const server = process.env.NEXT_PUBLIC_SITE;

// instagram apiでは、redirect uriにdev環境でもhttpsが必要。
export const instagramRedirectHost = dev
         ? `https://localhost:${process.env.NEXT_PUBLIC_PORT}`
         : process.env.NEXT_PUBLIC_SITE;

// console.log(
//     "devは " +
//     dev +
//     " localhostは " +
//     localhost +
//     " serverは " +
//     server +
//     " instagramRedirectHostは " +
//     instagramRedirectHost
// );

const user = {
  uid: "UNpukzBhYCUIVntsWIoZ16sxl1p2",
  displayName: null,
  photoURL: null,
  email: "cutterkaz@gmail.com",
  emailVerified: false,
  phoneNumber: null,
  isAnonymous: false,
  tenantId: null,
  providerData: [
    {
      uid: "cutterkaz@gmail.com",
      displayName: null,
      photoURL: null,
      email: "cutterkaz@gmail.com",
      phoneNumber: null,
      providerId: "password",
    },
  ],
  apiKey: "AIzaSyAaB0cRcZ2UR-eD9h884Oyib_DF5AfFc6Q",
  appName: "[DEFAULT]",
  authDomain: "salon-tablet-2.firebaseapp.com",
  stsTokenManager: {
    apiKey: "AIzaSyAaB0cRcZ2UR-eD9h884Oyib_DF5AfFc6Q",
    refreshToken:
      "AG8BCncxhV-3R333CYxuiPo8Pyt2rSRzcbSed_MA7GRtS--3F2hAY5yVXW2aSoyJSvi_0kwYg0CKoPGLrAAIUMqx7LmISkr2iU_mbixE2lj5FvnwSthyQIhGro5X8PKYGRSs6YFKVbb6MwDa3iHBX0xW7UqEz0JQFulA7YMNC7qCsRidP_hd1j03vvmiWxS97V1M14utsCh58T6A0wKSF5_fFjW-Ph2_Rg",
    accessToken:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJmOGI1NTdjMWNkMWUxZWM2ODBjZTkyYWFmY2U0NTIxMWUxZTRiNDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2Fsb24tdGFibGV0LTIiLCJhdWQiOiJzYWxvbi10YWJsZXQtMiIsImF1dGhfdGltZSI6MTYwNTA3MzI1NSwidXNlcl9pZCI6IlVOcHVrekJoWUNVSVZudHNXSW9aMTZzeGwxcDIiLCJzdWIiOiJVTnB1a3pCaFlDVUlWbnRzV0lvWjE2c3hsMXAyIiwiaWF0IjoxNjA1MDczMjU1LCJleHAiOjE2MDUwNzY4NTUsImVtYWlsIjoiY3V0dGVya2F6QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjdXR0ZXJrYXpAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.mN_Ip0baNmyULuU6CVq8bQD45s54qLQwkxcntVTFeluRsEb49vDsW79baKEusGygz-cdm8Tu5Q3hIk4HVfe6zejZoC9F6_oTRxWCBI24PqrGfJWjLHkK_GaGPwnGq4X7icu9unh-fKlYRpDZ3DU9Tq9mFCTz9_w_yUO-_JVB7v2dmMPvaYxTOgaITEj0kiCx2wZFR7e7FMEcWagRgluygO6boAWUs9S8oR4Fgi2MyJ5-Cy3aLkEQeO4xrZmt0fTM9MQo_OFNpFCfo3Utx6KponRwiG1ciQw0uEzyPFjAUBzHjPuVkfnlNIur1uijY2Ju56cQBYMEsHhjcyCnKoZ4bA",
    expirationTime: 1605076855000,
  },
  redirectEventId: null,
  lastLoginAt: "1605073255412",
  createdAt: "1604794943700",
  multiFactor: { enrolledFactors: [] },
};
