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



export const useStylesAuthForm = makeStyles((theme: Theme) => {

    return createStyles({
      root: {
        position: 'relative',
      },
      authBox: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }
    });
})

initFirebase();


const handleSingin = (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password)

const Signin = () => {
  const classes = useStylesAuthForm();
  return (
    <div className={classes.root}>
      <div className={classes.authBox}>
        {/* <FirebaseAuth /> */}
        <AuthForm header="サインイン" button='サインイン' handleAuth={handleSingin} />
      <Typography variant='subtitle1' component='p'>
        アカウントをお持ちでないですか？
        <Link href='/auth/signup'>
          Sing up
        </Link>
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
