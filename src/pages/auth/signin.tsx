import React from "react";
import { signin, providers, csrfToken } from "next-auth/client";


import {
  TextField,
  Button,
  makeStyles,
  createStyles,
  Typography,
} from "@material-ui/core";
import { server } from "../../lib/loadUrl";
import Link from "next/link";
import { SEO } from "../../pageComponent/SEO";

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
      width: 300,
      // marginBottom: theme.spacing(1),
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
    },
    button: {
      marginBottom: theme.spacing(3),
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
    },
    a: {
      fontStyle: "none",
      color: "inherit",
      textDecoration: "none",
    },
  })
);

type Props = ReturnType<typeof useSignInFormProps> & {
  csrfToken: string;
  providers: any;
  className: string;
};

type TSignInFormMailProps = {
  newEmail: string
  setNewEmail: React.Dispatch<React.SetStateAction<string>>
  csrfToken: string
}

export const SignInFormMail: React.FC<TSignInFormMailProps> = (props) => {
  const classes = useStyles()
  
  return (
    <form
        method="post"
        // 末尾に「/」をつけてsafariでのCLIENT_FETCH_ERRORを回避 Json Web Tokenの関係か
        action={`${server}/api/auth/signin/email/`}
        onSubmit={(e) => {
          e.preventDefault();
          //@ts-ignore
          // signin("email", { email: document.getElementById("email").value });
          signin("email", { email: props.newEmail });
        }}
      >
        <Typography
          variant="h5"
          component="p"
          align="center"
          gutterBottom
          className={classes.typography}
        >
          初めての方
        </Typography>
        <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
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
          メールアドレスを登録して無料で始める
        </Button>
      </form>
  )
}

export const SignInFormPresenter: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={props.className}>
      <SignInFormMail {...props}/>

      <Typography
        variant="h5"
        component="p"
        align="center"
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
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
        >
          サインインする
        </Button>
      </form>

      {/* Sign in with facebook */}
      <Typography
        variant="h5"
        component="p"
        align="center"
        gutterBottom
        className={classes.typography}
      >
        SNSでサインイン
      </Typography>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={
          //@ts-ignore
          () => signin(props.providers.facebook.id)
        }
      >
        <a
          className={classes.a}
          href={
            //@ts-ignore
            props.providers.facebook.signinUrl
          }
          onClick={
            //@ts-ignore
            (e) => e.preventDefault()
          }
        >
          {
            //@ts-ignore
            props.providers.facebook.name
          }{" "}
          でサインインする
        </a>
      </Button>
      <Link href="/privacy" >
        <a style={{textAlign: 'center'}}>
        <Typography >
          Privacy policy
        </Typography>
        </a>
      </Link>
    </div>
  );
};

export const SignInForm = (props) => {
  const useProps = useSignInFormProps();
  // console.log("SignInForm" + JSON.stringify(props.csrfToken));

  return (
    <SignInFormPresenter
      {...useProps}
      csrfToken={props.csrfToken}
      providers={props.providers}
      className={props.className}
    />
  );
};
const SignIn = (props) => {
  return (
    <>
      <SEO title="サインイン"/>
      <SignInForm {...props}/>
    </>
  )
}


SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
    providers: await providers(context)
  }
}
export default SignIn