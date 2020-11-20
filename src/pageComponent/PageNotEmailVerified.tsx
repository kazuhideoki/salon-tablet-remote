import { Button, Typography,makeStyles,createStyles,Theme } from '@material-ui/core'
import React from 'react'
import { useAuth } from '../lib/auth/AuthProvider';
import { sendVerificationMail } from '../lib/auth/sendVerificationMail';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
      root: {
        margin: theme.spacing(2)
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
          確認メールを受け取り、リンクをクリックしてください。
        </Typography>
        <Typography variant='h5' component='h3' gutterBottom align='center'>
          その後サインインし直すとこのポップアップウィンドウは表示されなくなります。
        </Typography>
        <div className={classes.buttons}>
          <Button className={`${classes.button} ${classes.buttonLeft}`} variant='outlined' onClick={() => sendVerificationMail(user)}>
              確認メールを受け取る
          </Button>
          <Button className={`${classes.button} ${classes.buttonRight}`} variant='outlined' onClick={() => signout('/auth/signin')}>
              サインインし直す
          </Button>

        </div>
      </div>
  )
}
