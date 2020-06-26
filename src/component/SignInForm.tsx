import React from 'react'
import { server } from '../config';
import { signin, signout, useSession, getSession } from "next-auth/client";
import { TextField, Button, makeStyles, createStyles } from "@material-ui/core";
import { useDrawerProps } from '../app/View/Drawer';
import { checkPassword } from '../module/bcrypt';
import { useCheckPassword } from '../app/ActionCreator/user/useCheckPassword';
import { TextFields } from '@material-ui/icons';

const useSignInFormProps = () => {
  const [newEmail, setNewEmail] = React.useState('')
  const [UserEmail, setUserEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

}

const useStyles = makeStyles((theme) =>
  createStyles({
    textField: {
      minWidth: 350,
    }
  })
)

export const SignInForm = (props) => {
  const classes = useStyles()

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
        {/* <label>
          Email address */}
        <TextField
          className={classes.textField}
          variant="outlined"
          // fullWidth
          id="email"
          type="text"
          name="email"
          label="メールアドレス"
          autoComplete="email"
          // value={props.email}
        />
        {/* <input type="text" id="email" name="email" /> */}
        {/* </label> */}
        <br />
        <Button type="submit" variant="contained" color="primary">
          サインイン
        </Button>
        {/* <button type="submit">メールアドレスでサインインする</button> */}
      </form>

      <h2>★すでにアカウントのある方</h2>
      <p>メールアドレスとパスワードでサインインする</p>
      {/* // 末尾に「/」をつけてsafariでのCLIENT_FETCH_ERRORを回避 Json Web Tokenの関係か */}

      <form method="post" action={`${server}/api/auth/callback/credentials/`}>
        {/* メールアドレス */}
        <TextField
          className={classes.textField}
          variant="outlined"
          // fullWidth
          // id="email"
          type="text"
          name="email"
          label="メールアドレス"
          autoComplete="email"
          // value={props.email}
        />
        {/* <input name="email" type="text" defaultValue="" /> */}
        <br />
        {/* パスワード */}
        <TextField
          className={classes.textField}
          variant="outlined"
          // fullWidth
          name="password"
          label="パスワード"
          type="password"
          id="password"
          autoComplete="current-password"
          // value={props.password}
          // onChange={(e) => props.setPassword(e.target.value)}
        />
        {/* <input name="password" type="password" defaultValue="" /> */}
        <br />
        <Button type="submit" variant="contained" color="primary">
          サインイン
        </Button>
        {/* <button type="submit">Sign in</button> */}
      </form>
    </>
  );
}
