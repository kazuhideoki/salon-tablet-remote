import React from 'react'
import dynamic from "next/dynamic";
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

export default signin
