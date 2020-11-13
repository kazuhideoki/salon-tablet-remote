export const sendVerificationMail = (user) => {
  
  user
    .sendEmailVerification()
    .then(function() {
      // apiUserInfoEmailVerified()
      return true
    })
    .catch(function(error) {
      // An error happened.
      return false
    });
}

const d = {
  uid: "Bv8LnJ03ahQm69ro5FqCLewr8vY2",
  displayName: null,
  photoURL: null,
  email: "edar123fun@gmail.com",
  emailVerified: false,
  phoneNumber: null,
  isAnonymous: false,
  tenantId: null,
  providerData: [
    {
      uid: "edar123fun@gmail.com",
      displayName: null,
      photoURL: null,
      email: "edar123fun@gmail.com",
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
      "AG8BCnfvDzBRolfZkjZDaSe43TRRDIgF9FqlD051dpCA-6ftEhyHvRqKc12J0fCn3ytvk0uPBFVz5r3uGNusgklSghgNl0mqSHtbhav3IS_52itdvHCGnTzWZCN3x7seHb5yLycxM_ivlSsV8-oRrtBdTRDIYkIIrwgvgwfuK89yx4Z2IEhVhYP3CBTDJriiDKhHPjl6sF2Kl3dNefjP-h4CsHMdYOEtTw",
    accessToken:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJmOGI1NTdjMWNkMWUxZWM2ODBjZTkyYWFmY2U0NTIxMWUxZTRiNDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2Fsb24tdGFibGV0LTIiLCJhdWQiOiJzYWxvbi10YWJsZXQtMiIsImF1dGhfdGltZSI6MTYwNTEzNTU4OCwidXNlcl9pZCI6IkJ2OExuSjAzYWhRbTY5cm81RnFDTGV3cjh2WTIiLCJzdWIiOiJCdjhMbkowM2FoUW02OXJvNUZxQ0xld3I4dlkyIiwiaWF0IjoxNjA1MTM1NTg4LCJleHAiOjE2MDUxMzkxODgsImVtYWlsIjoiZWRhcjEyM2Z1bkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZWRhcjEyM2Z1bkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.dqd8GunmRAkbjlxRxetY5jAmwzzFmU0LnJ6cLJjoTB0geVmZB3jcZomwNWeDt9TsITsnPR3ZrtPfzz3ru3Tszrk8b5-wB6bPGLVT5ynyCACvdWVeMihC3D197A1mo5TJvnqRzxZ26nHvnrC2YieaF0fV4QRBIDl9TzPN2IJMOEQa6EhgKxrHuzCVld3x1ti7ciPdPWdnGepFGQZdTzXElsaAfgtaHSzsfo_hpbgTsYqRlrH0UiMRJ3Yezu8Pn5z7EymSm9Ams4X-LQy28DROvoUEmF9w3iNzPGHpHrAFmk6POtV5xi9kKxN2u2xJZPSWJWvT1VU_35wk3yQuDhGKuA",
    expirationTime: 1605139188000,
  },
  redirectEventId: null,
  lastLoginAt: "1605135588398",
  createdAt: "1605103413569",
  multiFactor: { enrolledFactors: [] },
};
