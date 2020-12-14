import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Theme,
  createStyles,
} from "@material-ui/core";
import React from "react";
import initFirebase from "../lib/auth/initFirebase";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import nookies from "nookies";
import classes from "*.module.css";

initFirebase();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    header: {
      marginBottom: theme.spacing(4)
    },
    input: {
      marginBottom: theme.spacing(3)
    }
  })
)

type TAuthForm = {
  header: string
  button: string
  handleAuth: (email: string, password: string) => Promise<firebase.auth.UserCredential>
}

export const AuthForm:React.FC<TAuthForm> = (props) => {
  const classes = useStyles()
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const passwordFieldRef = React.useRef(null);
  const router = useRouter()

  const handleSubmit = async () => {
    try {
    const user = await props.handleAuth(email, password)
    
    const token = await user.user.getIdToken();

    nookies.set(undefined, "st_token", token, {
      maxAge: 30 * 24 * 60 * 60,
      // pathを指定したらcookieがgSSRで取得できた
      path: "/",
    }); 

    router.push('/')

    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("signInWithEmailAndPasswordでエラー " + error.message);
    }

  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.header}>
        {props.header}
      </Typography>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={classes.input}
        fullWidth
        name="email"
        label="メールアドレス"
        id="email"
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            passwordFieldRef.current.focus();
          }
        }}
      />
      <br />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={classes.input}
        fullWidth
        name="password"
        label="パスワード"
        type="password"
        id="password"
        inputRef={passwordFieldRef}
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <br />
      <Button variant="outlined" onClick={() => handleSubmit()}>
        {props.button}
      </Button>
    </div>
  );
};
