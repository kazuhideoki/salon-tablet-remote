import { Button, Typography,makeStyles,createStyles,Theme } from '@material-ui/core'
import React from 'react'
import { useAuth } from '../lib/auth/AuthProvider';
import { sendVerificationMail } from '../lib/auth/sendVerificationMail';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
      root: {
        margin: theme.spacing(2)
      },
      button: {
        margin: theme.spacing(2),
      },
    });
})


export const PageNotEmailVerified = () => {
  const classes = useStyles()
  const { user, signout } = useAuth()

  return (
      <div className={classes.root}> 
        <Typography variant='h4' component='h2' gutterBottom align='center'>
          メールアドレスの確認が未完了です。
        </Typography>
        <Typography variant='h5' component='h3' gutterBottom align='center'>
          確認メールを受け取り、リンクをクリックしてください。その後サインインし直すとこのポップアップウィンドウは表示されなくなります。
        </Typography>
        <Button className={classes.button} variant='outlined' onClick={() => sendVerificationMail(user)}>
            確認メールを受け取る
        </Button>
        <Button className={classes.button} variant='outlined' onClick={() => signout('/auth/signin')}>
            サインインし直す
        </Button>
      </div>
  )
}
