import { makeStyles, Theme,createStyles, Typography, Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import { server } from '../../lib/loadUrl'

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    signinButton: {
      display: 'block',
      marginRight: 'auto',
      marginLeft: 'auto',
      textDecoration: 'none',
    }
  
  }
))

export const Error = () => {
  const classes = useStyles()
  return (
    <div className="error">
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        サインインに失敗しました
      </Typography>
        <Typography variant="body1" component="p" align="center" className="message" gutterBottom>
        入力内容をご確認ください。
      </Typography>
       <Button className={classes.signinButton}>
        <Link href="/auth/signin">
          <Typography variant='button'>
            Sign in
          </Typography>
        </Link>
      </Button>
    </div>
  )
}

export default Error
