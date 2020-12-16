import React from 'react'
import { AuthForm } from '../../pageComponent/AuthFrom';
import { useStylesAuthForm } from './signin';
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../../lib/auth/initFirebase";
import { Typography, useMediaQuery } from '@material-ui/core';
import Link from 'next/link';
import { AuthCircular } from '../../lib/AuthCircular';

initFirebase();

const handleSingup = async (email: string, password: string) => {
  try {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);

    return firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log("handleSingupは " + error);
  }
};

const Signup = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const isTabletPortrait = useMediaQuery("(max-width:800px)");
  const classes = useStylesAuthForm(isTabletPortrait)();
  return (
    <div className={classes.root}>
      <div className={classes.authBoxContainer}>
        <div className={classes.authBox}>
          <AuthForm
            header="新規登録"
            button="アカウントを作成する"
            buttonColor="primary"
            handleAuth={handleSingup}
            setIsClicked={setIsClicked}
          />
          <Typography variant="subtitle1" component="p">
            アカウントをお持ちの方はこちら
            <br />
            <Link href="/auth/signin">
              <a>サインイン</a>
            </Link>
          </Typography>
        </div>
      </div>
      {isClicked ? <AuthCircular message='アカウント作成中'/> : null}
    </div>
  );
};

export default Signup;