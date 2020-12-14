import React from 'react'
import dynamic from "next/dynamic";
import { createStyles, Link, makeStyles, Theme, Typography } from '@material-ui/core';
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



export const useStylesAuthForm = makeStyles((theme: Theme) => {

    return createStyles({
      root: {
        position: "absolute",
        backgroundImage: "url('/images/hair-stylist-combing-womans-hair.jpg')",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
      },
      img: {},
      authBox: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        margin: theme.spacing(3),
        borderRadius: theme.spacing(4),
        padding: theme.spacing(3),
        position: "absolute",
        right: 0,
      },
    });
})

initFirebase();


const handleSingin = (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password)

const Signin = () => {
  const classes = useStylesAuthForm();
  return (
    <div className={classes.root}>
      {/* <img className={classes.img} src={`${server}/images/hair-stylist-combing-womans-hair.jpg`}/> */}
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
