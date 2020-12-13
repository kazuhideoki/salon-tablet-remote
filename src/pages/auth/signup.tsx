import React from 'react'
import { AuthForm } from '../../pageComponent/AuthFrom';
import { useStylesAuthForm } from './signin';
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../../lib/auth/initFirebase";

initFirebase()

const handleSingup = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);


export const Signup = () => {
  const classes = useStylesAuthForm()
  return (
    <div className={classes.root}>
      <div className={classes.authBox}>
        {/* <FirebaseAuth /> */}
        <AuthForm header="サインアップ" handleAuth={handleSingup} />
      </div>
    </div>
  );
}

export default Signup;
