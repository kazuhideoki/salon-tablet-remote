import React from 'react'
import { server } from '../config';
import { signin, signout, useSession, getSession } from "next-auth/client";
import { TextField, Button } from '@material-ui/core';
import { useDrawerProps } from '../app/View/Drawer';
import { checkPassword } from '../module/bcrypt';
import { useCheckPassword } from '../app/ActionCreator/user/useCheckPassword';


export const SignInForm = (props) => {

  return (
    <>
      <form
        method="post"
        action={`${server}/api/auth/signin/email`}
        onSubmit={(e) => {
          e.preventDefault();
          //@ts-ignore
          signin("email", { email: document.getElementById("email").value });
          // signin("email", { email: document.getElementById("email").nodeValue });
        }}
      >
        <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
        <label>
          Email address
          <input type="text" id="email" name="email" />
        </label>
        <button type="submit">Sign in with Email</button>
      </form>
      <form method="post" action={`${server}/api/auth/callback/credentials`}>
        <input name="email" type="text" defaultValue="" />
        <input name="password" type="password" defaultValue="" />
        <button type="submit">Sign in</button>
      </form>
    </>
  );
}
