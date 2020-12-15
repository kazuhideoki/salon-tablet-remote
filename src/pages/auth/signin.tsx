import React from 'react'
import dynamic from "next/dynamic";
import { createStyles, Link, makeStyles, Theme, Typography, useMediaQuery } from '@material-ui/core';
import { getSession } from '../../lib/auth/getSession';
import { AuthForm } from "../../pageComponent/AuthFrom";
// クライアント側でないと動かないため
const FirebaseAuth = dynamic(() => import('../../lib/auth/FirebaseAuth'), {
  ssr: false,
});
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../../lib/auth/initFirebase";
import { server } from '../../lib/loadUrl';



export const useStylesAuthForm = (isTabletPortrait: boolean) => makeStyles((theme: Theme) => {

    // const isTabletPortrait = useMediaQuery("(max-width:800px)");

    return createStyles({
      root: {
        position: "absolute",
        backgroundImage: "url('/images/hair-stylist-combing-womans-hair.jpg')",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
      },
      authBoxContainer: {
        display: "flex",
        justifyContent: "center",
        maxWidth: "600px",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        marginLeft: "auto",
        marginRight: isTabletPortrait ? "auto" : 0,
      },
      authBox: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        // margin: theme.spacing(3),
        margin: "auto",
        borderRadius: theme.spacing(2),
        padding: theme.spacing(3),
        maxWidth: 380,
        maxHeight: 420,
        // position: "absolute",
        // right: 0,
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


const handleSingin = (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password)

const Signin = () => {
  const isTabletPortrait = useMediaQuery("(max-width:800px)");
  const classes = useStylesAuthForm(isTabletPortrait)();
  return (
    <div className={classes.root}>
      <div className={classes.authBoxContainer}>
        <div className={classes.authBox}>
          <AuthForm
            header="サインイン"
            button="サインイン"
            handleAuth={handleSingin}
          />
          <Typography variant="subtitle1" component="p">
            アカウントをお持ちでないですか？
            <Link href="/auth/signup">Sing up</Link>
          </Typography>
        </div>
      </div>
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
