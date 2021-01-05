import {
  Button,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  CircularProgress,
} from '@material-ui/core';
import React from 'react';
import { useAuth } from '../util/auth/AuthProvider';
import { sendVerificationMail } from '../util/auth/sendVerificationMail';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      margin: theme.spacing(2),
    },
    buttons: {
      display: 'flex',
    },
    button: {
      margin: theme.spacing(2),
    },
    buttonLeft: {
      marginLeft: 'auto',
    },
    buttonRight: {
      marginRight: 'auto',
    },
  });
});

export const PageNotEmailVerified = () => {
  const classes = useStyles();
  const { user, signout } = useAuth();
  const [onClicked, setOnClicked] = React.useState(false);
  const [isSent, setIsSent] = React.useState<boolean | null>(null);

  const handleSendMail = async () => {
    setOnClicked(true);
    const result = user ? await sendVerificationMail(user) : null;
    setIsSent(result || false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        メールアドレスの確認が未完了です。
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom align="center">
        確認メールを受け取り、リンクをクリックしてください。
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom align="center">
        その後サインインし直すとこのポップアップウィンドウは表示されなくなります。
      </Typography>
      <div className={classes.buttons}>
        <div>
          <Button
            className={`${classes.button} ${classes.buttonLeft}`}
            variant="outlined"
            onClick={() => handleSendMail()}
            disabled={onClicked}>
            確認メールを受け取る
          </Button>
          {/* <br/> */}
          {onClicked && isSent === null ? (
            <div>
              <CircularProgress />
            </div>
          ) : null}
          {onClicked && isSent === true ? (
            <Typography variant="body1" component="p" color="primary">
              送信しました。
            </Typography>
          ) : isSent === false ? (
            <Typography variant="body1" component="p" color="error">
              エラー。送信できませんでした。サインし直して再度お試しください。
            </Typography>
          ) : null}
        </div>
        <div>
          <Button
            className={`${classes.button} ${classes.buttonRight}`}
            variant="outlined"
            onClick={() => signout('/auth/signin')}>
            サインインし直す
          </Button>
        </div>
      </div>
    </div>
  );
};
