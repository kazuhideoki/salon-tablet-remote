import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
var firebaseui = require('firebaseui');
import 'firebase/auth'
import initFirebase from '../../lib/auth/initFirebase'
import nookies from 'nookies'
// import initFirebase from '../utils/auth/initFirebase'
// import { setUserCookie } from '../utils/auth/userCookies'
// import { mapUserData } from '../utils/auth/mapUserData'

// Init the Firebase app.
initFirebase()

// const firebaseAuthConfig = {
//   signInFlow: 'popup',
//   // Auth providers
//   // https://github.com/firebase/firebaseui-web#configure-oauth-providers
//   signInOptions: [
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       requireDisplayName: false,
//     },
//   ],
//   signInSuccessUrl: '/',
//   credentialHelper: 'none',
//   callbacks: {
//     signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
//       const token = await user.getIdToken();
//       nookies.set(undefined, 'token', token, {});
//     },
//   },
// }
var ui = new firebaseui.auth.AuthUI(firebase.auth());   
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // signInFlow: 'popup',
  signInFlow: 'redirect',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      console.log('userは ' + JSON.stringify(user))
      console.log('redirectUrlは ' + redirectUrl)

      const token = await user.getIdToken();
      nookies.set(undefined, 'token', token, {
        maxAge: 30 * 24 * 60 * 60,
        // pathを指定したらcookieがgSSRで取得できた
        path: '/',
      });
    },
  },
});

const FirebaseAuth = () => {
  return (
    // <div>
    //   <StyledFirebaseAuth
    //   //@ts-ignore
    //     uiConfig={firebaseAuthConfig}
    //     firebaseAuth={firebase.auth()}
    //   />
    // </div>

    // Initialize the FirebaseUI Widget using Firebase.
    <div id='firebaseui-auth-container'>
    </div>
  )
}

export default FirebaseAuth
