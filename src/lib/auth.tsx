import React from 'react'
import firebase from "firebase";
import { server } from './loadUrl';
var firebaseConfig = {
    apiKey: "AIzaSyAaB0cRcZ2UR-eD9h884Oyib_DF5AfFc6Q",
    authDomain: "salon-tablet-2.firebaseapp.com",
    databaseURL: "https://salon-tablet-2.firebaseio.com",
    projectId: "salon-tablet-2",
    storageBucket: "salon-tablet-2.appspot.com",
    messagingSenderId: "934585399011",
    appId: "1:934585399011:web:8a683ea74485663c4cf7d6",
    measurementId: "G-MSNQ25YSX5"
  };
firebase.initializeApp(firebaseConfig);
// var firebaseui = require('firebaseui'); 
import * as firebaseui from 'firebaseui'
import Head from 'next/head';


// Add the Firebase services that you want to use
// import "firebase/auth";


export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log('authResultは ' + authResult)
      console.log('redirectUrlは ' + redirectUrl)
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: server,
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: `${server}/privacy` 
};
 
export const Auth = () => {

  React.useEffect(() => {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start('#firebaseui-auth-container', uiConfig);
  })

  return (
    <div>
      <Head>
            <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.7.1/firebase-ui-auth.css" />

      </Head>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  )
}

export default Auth