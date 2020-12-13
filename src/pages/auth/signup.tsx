import React from 'react'
import { AuthForm } from '../../pageComponent/AuthFrom';
import { useStylesAuthForm } from './signin';
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../../lib/auth/initFirebase";
import { Typography } from '@material-ui/core';
import Link from 'next/link';

initFirebase()

const handleSingup = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);


export const Signup = () => {
  const classes = useStylesAuthForm()
  return (
    <div className={classes.root}>
      <div className={classes.authBox}>
        {/* <FirebaseAuth /> */}
        <AuthForm
          header="サインアップ"
          button="アカウントを作成する"
          handleAuth={handleSingup}
        />
        <Typography variant='subtitle1' component='p'>
        アカウントをお持ちの方はこちら
        <Link href='/auth/signin'>
          Sing in
        </Link>
      </Typography>
      </div>
    </div>
  );
}

export default Signup;
