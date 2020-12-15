import React from 'react'
import { AuthForm } from '../../pageComponent/AuthFrom';
import { useStylesAuthForm } from './signin';
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../../lib/auth/initFirebase";
import { Typography, useMediaQuery } from '@material-ui/core';
import Link from 'next/link';

initFirebase();

const handleSingup = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

const Signup = () => {
  const isTabletPortrait = useMediaQuery("(max-width:800px)");
  const classes = useStylesAuthForm(isTabletPortrait)();
  return (
    <div className={classes.root}>
      <div className={classes.authBoxContainer}>
        <div className={classes.authBox}>
          <AuthForm
            header="サインアップ"
            button="アカウントを作成する"
            buttonColor='primary'
            handleAuth={handleSingup}
          />
          <Typography variant="subtitle1" component="p">
            アカウントをお持ちの方はこちら
            <br />
            <Link href="/auth/signin"><a>サインイン</a></Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Signup;