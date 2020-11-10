import React from 'react'
import dynamic from "next/dynamic";
// import { FirebaseAuth } from '../../lib/auth/FirebaseAuth';
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

export default signin
