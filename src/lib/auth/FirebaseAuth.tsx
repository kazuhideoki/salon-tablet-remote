import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
// var firebaseui = require('firebaseui');
import 'firebase/auth'
import initFirebase from '../../lib/auth/initFirebase'
import nookies from 'nookies'

initFirebase()

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      
      const token = await user.getIdToken();

      nookies.set(undefined, 'token', token, {
        maxAge: 30 * 24 * 60 * 60,
        // pathを指定したらcookieがgSSRで取得できた
        path: '/',
      });
    },
  },
}

const FirebaseAuth = () => {
  return (
    <div>
      <StyledFirebaseAuth
      //@ts-ignore
        uiConfig={firebaseAuthConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>

  )
}

export default FirebaseAuth
