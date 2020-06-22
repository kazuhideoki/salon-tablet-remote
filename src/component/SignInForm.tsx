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
        // 末尾に「/」をつけてsafariでのCLIENT_FETCH_ERRORを回避 Json Web Tokenの関係か
        action={`${server}/api/auth/signin/email/`}
        onSubmit={(e) => {
          e.preventDefault();
          //@ts-ignore
          signin("email", { email: document.getElementById("email").value });
          // signin("email", { email: document.getElementById("email").nodeValue });
        }}
      >
        <h2>★初めての方</h2>
        <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
        <label>
          Email address
          <input type="text" id="email" name="email" />
        </label>
        <br />
        <button type="submit">メールアドレスでサインインする</button>
      </form>
      <h2>★すでにアカウントのある方</h2>
      <p>メールアドレスとパスワードでサインインする</p>
      {/* // 末尾に「/」をつけてsafariでのCLIENT_FETCH_ERRORを回避 Json Web Tokenの関係か */}
      <form method="post" action={`${server}/api/auth/callback/credentials/`}>
        メールアドレス
        <input name="email" type="text" defaultValue="" />
        <br />
        パスワード
        <input name="password" type="password" defaultValue="" />
        <br />
        <button type="submit">Sign in</button>
      </form>
    </>
  );
}
