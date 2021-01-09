import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Theme,
  createStyles,
} from '@material-ui/core';
import React from 'react';
import initFirebase from '../../../util/auth/initFirebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'next/router';
import nookies from 'nookies';

initFirebase();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 250,
      padding: theme.spacing(3),
    },
    header: {
      marginBottom: theme.spacing(3),
    },
    input: {
      marginBottom: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 0, 3),
    },
  })
);

type Props = {
  header: string;
  button: string;
  buttonColor?: 'primary';
  handleAuth: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential | null>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthForm: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const passwordFieldRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    props.setIsClicked(true);
    try {
      const user = await props.handleAuth(email, password);

      const token = await user?.user?.getIdToken();

      if (token) {
        nookies.set(undefined, 'st_token', token, {
          maxAge: 30 * 24 * 60 * 60,
          // pathを指定したらcookieがgSSRで取得できた
          path: '/',
        });
      }

      router.push('/');
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        alert('メールアドレス、もしくはパスワードが間違っています。');
      }
      if (errorCode === 'auth/invalid-email') {
        alert('正しいメールアドレスではありません。');
      }
      if (errorCode === 'auth/weak-password') {
        alert(
          'パスワード強度が低すぎます。より複雑な英数字の組み合わせ6文字以上にしてください。'
        );
      }
      props.setIsClicked(false);

      console.log(errorMessage);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" className={classes.header}>
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
          if (e.key == 'Enter') {
            e.preventDefault();
            passwordFieldRef.current?.focus();
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
          if (e.key == 'Enter') {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <br />
      <Button
        className={classes.button}
        variant="contained"
        color={props.buttonColor || 'default'}
        onClick={() => handleSubmit()}>
        {props.button}
      </Button>
    </div>
  );
};
