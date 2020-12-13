import { Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import initFirebase from "../lib/auth/initFirebase";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import nookies from "nookies";

initFirebase();

export const SigninForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const passwordFieldRef = React.useRef(null);
  const router = useRouter()

  const handleSubmit = async () => {
    try {
    const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
    
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
    <div>
      <Typography variant="h3" component="h1">
        サインイン
      </Typography>
      <Typography variant="body1" component="p">
        メールアドレス
      </Typography>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        label="メールアドレス"
        id="email"
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            console.log('enter pressed');
            console.log(passwordFieldRef);
            
            e.preventDefault();
            passwordFieldRef.current.focus()

          }
        }}
      />
      <Typography variant="body1" component="p">
        パスワード
      </Typography>
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        label="パスワード"
        type='password'
        id="password"
        inputRef={passwordFieldRef}

        onKeyPress={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <br/>
      <Button onClick={() => handleSubmit()}>サインイン</Button>
    </div>
  );
};
