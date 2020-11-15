import React from 'react'
import dynamic from "next/dynamic";
import { GetServerSideProps } from 'next';
import { Router } from 'next/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { getSession } from '../api/auth/get_session';
// クライアント側でないと動かないため
const FirebaseAuth = dynamic(() => import('../../lib/auth/FirebaseAuth'), {
  ssr: false,
});

const useStyles = makeStyles((theme: Theme) => {

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



const signin = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.authBox}>
        <FirebaseAuth />
      </div>
    </div>
  )
}

export const getServerSideProps =  async (context) => {
  const session = await getSession({req: context.req})
  if (session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
  }

  return { props: {}}
}

export default signin
