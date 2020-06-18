import React from 'react'
import { server } from '../config';
import { signin, signout, useSession, getSession } from "next-auth/client";
import { TextField, Button } from '@material-ui/core';
import { useDrawerProps } from '../app/View/Drawer';
import { checkPassword } from '../module/bcrypt';
import { useCheckPassword } from '../app/ActionCreator/user/useCheckPassword';


export const SignInForm = () => {
  const [pass, setPass] = React.useState('')
  const [email, setEmail] = React.useState('')

  const handleSubmitPassword = async () => {
    
  };

  

  return (
    <>
      <a href={`${server}/api/auth/signin`} onClick={(e) => { e.preventDefault(); signin(); }}>
        <button>メールアドレスでサインインする</button>
      </a>
      <input type="hidden" name="csrfToken" value="1d3044cf6526efab509f19a5cf439a75d4f07c64ed640f6e15397adf1cc48130"></input>
      <TextField
        id="index-email-input"
        label="email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="index-password-input"
        label="パスワード"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <Button onClick={() => handleSubmitPassword()}>サインイン</Button>
    </>
  )
}


// http://localhost:3000/api/auth/callback/email?email=cedar123pc%40gmail.com&token=fb851d4f4c835181544851eac4e341e4383a0b530626b55ed9c850c7a1511eea
