import React from 'react'
import dynamic from "next/dynamic";
import { createStyles, makeStyles, Theme, Typography, useMediaQuery } from '@material-ui/core';
import { getSession } from '../../lib/auth/getSession';
import { AuthForm } from "../../pageComponent/AuthFrom";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../../lib/auth/initFirebase";
import Link from 'next/link';
import { AuthCircular } from '../../lib/AuthCircular';

export const useStylesAuthForm = (isTabletPortrait: boolean) => makeStyles((theme: Theme) => {

    return createStyles({
      root: {
        position: "absolute",
        backgroundImage: "url('/images/feature_img_signin.jpg')",
        backgroundSize: "cover",
        backgroundPosition: 'center',
        width: "100%",
        height: "100%",
        "&::before": {
          backgroundColor: 'rgba(0,0,0,0.4)',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          content: '""',
  
        },
      },
      authBoxContainer: {
        display: "flex",
        justifyContent: "center",
        maxWidth: 450,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        marginLeft: "auto",
        marginRight: isTabletPortrait ? "auto" : 0,
      },
      authBox: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        margin: "auto",
        borderRadius: theme.spacing(2),
        padding: theme.spacing(3),
        maxWidth: 300,
        maxHeight: 450,
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
    });
})

initFirebase();

const handleSignin = async (email: string, password: string) => {
  
  try {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  
    return firebase.auth().signInWithEmailAndPassword(email, password);

  } catch (error) {
    console.log('handleSigninは ' + error)
  }
}
const Signin = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const isTabletPortrait = useMediaQuery("(max-width:800px)");
  const classes = useStylesAuthForm(isTabletPortrait)();

  return (
    <div className={classes.root}>
      <div className={classes.authBoxContainer}>
        <div className={classes.authBox}>
          <AuthForm
            header="サインイン"
            button="サインイン"
            handleAuth={handleSignin}
            setIsClicked={setIsClicked}
          />
          <Typography variant="subtitle1" component="p">
            アカウントをお持ちでないですか？
            <br />
            <Link href="/auth/signup">
              <a>無料でアカウントを作る</a>
            </Link>
          </Typography>
        </div>
      </div>
      {isClicked ? <AuthCircular message='読み込み中'/> : null}
    </div>
  );
}

export const getServerSideProps =  async (context) => {
  const session = await getSession({req: context.req})
  if (session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
  }

  return { props: {}}
}

export default Signin;
