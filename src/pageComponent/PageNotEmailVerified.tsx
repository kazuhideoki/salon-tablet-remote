import { Button, Typography,makeStyles,createStyles,Theme } from '@material-ui/core'
import React from 'react'
import { useAuth } from '../lib/auth/AuthProvider';
import { sendVerificationMail } from '../lib/auth/sendVerificationMail';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
    //   root: {
    //     position: 'relative',
    //   },
    //   MsgBox: {
    //     position:
    //   }
    });
})


export const PageNotEmailVerified = () => {
  const { user, signout } = useAuth()

  return (
    <div>
      <div>
        <Typography variant='h4' component='h2' gutterBottom>
          メールアドレスの確認をしてページを再読み込みしてください。
        </Typography>
        <Button variant='outlined' onClick={() => location.reload()}>
          <Typography variant='body1' component='span'>
            再読み込みする
          </Typography>
        </Button>
        <Button variant='outlined' onClick={() => sendVerificationMail(user)}>
          <Typography variant='body1' component='span'>
            確認メールを再送する
          </Typography>
        </Button>
        <Button variant='outlined' onClick={() => signout()}>
          <Typography variant='body1' component='span'>
            トップページに戻る
          </Typography>
        </Button>
      </div>
    </div>
  )
}
