import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../../util/auth/initFirebase';
import nookies from 'nookies';

initFirebase();

const firebaseAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    signInSuccessWithAuthResult: async ({
      user,
    }: firebase.auth.UserCredential) => {
      if (user) {
        const token = await user.getIdToken();

        nookies.set(undefined, 'st_token', token, {
          maxAge: 30 * 24 * 60 * 60,
          // pathを指定したらcookieがgSSRで取得できた
          path: '/',
        });
      }
    },
  },
};

const FirebaseAuth = (): JSX.Element => {
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
};

export default FirebaseAuth;
