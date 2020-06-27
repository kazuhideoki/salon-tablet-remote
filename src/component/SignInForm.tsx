import React from "react";
import { server } from "../config";
import { signin, signout, useSession, getSession } from "next-auth/client";
import {
  TextField,
  Button,
  makeStyles,
  createStyles,
  Typography,
} from "@material-ui/core";
import { useDrawerProps } from "../app/View/Drawer";
import { checkPassword } from "../module/bcrypt";
import { useCheckPassword } from "../app/ActionCreator/user/useCheckPassword";
import { TextFields } from "@material-ui/icons";

const useSignInFormProps = () => {
  const [newEmail, setNewEmail] = React.useState("");
  const [UserEmail, setUserEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return {
    newEmail,
    setNewEmail,
    UserEmail,
    setUserEmail,
    password,
    setPassword,
  };
};

const useStyles = makeStyles((theme) =>
  createStyles({
    typography: {
      marginBottom: theme.spacing(2),
    },
    textField: {
      minWidth: 350,
      marginBottom: theme.spacing(1),
    },
    button: {
      marginBottom: theme.spacing(3),
    },
  })
);

// type Props = {csrfToken: string }
type Props = ReturnType<typeof useSignInFormProps> & { csrfToken: string };

export const SignInFormPresenter: React.FC<Props> = (props) => {
  console.log("SignInFormPresenter" + JSON.stringify(props.csrfToken));
  const classes = useStyles();

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
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          className={classes.typography}
        >
          初めての方
        </Typography>
        <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
        {/* <input name="csrfToken" type="hidden" value={props.csrfToken} /> */}
        <TextField
          className={classes.textField}
          variant="outlined"
          id="email"
          type="text"
          name="email"
          label="メールアドレス"
          autoComplete="email"
          value={props.newEmail}
          onChange={(e) => props.setNewEmail(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          確認メールを送る
        </Button>
      </form>

      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        className={classes.typography}
      >
        アカウントをお持ちの方
      </Typography>
      <form method="post" action={`${server}/api/auth/callback/credentials/`}>
        {/* メールアドレス */}
        <TextField
          className={classes.textField}
          variant="outlined"
          type="text"
          name="email"
          label="メールアドレス"
          autoComplete="email"
          value={props.UserEmail}
          onChange={(e) => props.setUserEmail(e.target.value)}
        />
        <br />
        <TextField
          className={classes.textField}
          variant="outlined"
          name="password"
          label="パスワード"
          type="password"
          id="password"
          autoComplete="current-password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          サインイン
        </Button>
      </form>
    </>
  );
};

export const SignInForm = (props) => {
  const useProps = useSignInFormProps();
  // console.log("SignInForm" + JSON.stringify(props.csrfToken));

  return <SignInFormPresenter {...useProps} csrfToken={props.csrfToken} />;
};
