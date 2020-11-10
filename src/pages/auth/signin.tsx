import React from 'react'
import dynamic from "next/dynamic";
import { GetServerSideProps } from 'next';
import { getSession } from '../../lib/auth/getSession';
import { Router } from 'next/router';
// クライアント側でないと動かないため
const FirebaseAuth = dynamic(() => import('../../lib/auth/FirebaseAuth'), {
  ssr: false,
});


const signin = () => {
  return (
    <div>
      <FirebaseAuth />
    </div>
  )
}

export const getServerSideProps =  async (context) => {
  const session = await getSession(context)
  if (session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
  }

  return { props: {}}
}

export default signin
